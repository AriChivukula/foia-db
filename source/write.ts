#!/usr/bin/env node

import { existsSync, readdirSync, readFileSync, writeFileSync } from "fs";
import * as yargs from "yargs";

import { vi, ei, Graph, EdgeID, EdgeLabel, PropertyLabel, PropertyValue, VertexID, VertexLabel } from "./read";

if (require.main === module) {
  yargs
    .usage(
      "$0",
      "FOIA DB",
      (y: yargs.Argv): yargs.Argv => y
        .option(
          "compile",
          {
            boolean: true,
            describe: "Write out db",
          },
        ),
      (argv: yargs.Arguments): void => {
        validateConfig(argv.compile);
      },
    )
    .help()
    .argv;
}

function validateConfig(
  compile: boolean,
): void {
  const config: any = JSON.parse(readFileSync(".foia-db", "ascii"));
  const graph: Graph = Graph.new();
  Object.keys(config).forEach((vertex_label: string) => {
    validateVertices(graph, config, vl(vertex_label));
  });
  if (compile) {
    graph.write();
  }
}

function validateVertices(
  graph: Graph,
  config: any,
  vertex_label: VertexLabel,
): void {
  const breadcrumbs: Breadcrumb = {
    label: [vertex_label],
    id: [],
  };
  printBreadcrumbs(breadcrumbs);
  if (!existsSync("db/" + vertex_label + "/")) {
    return;
  }
  readdirSync("db/" + vertex_label + "/")
    .forEach((vertex_path: string) => {
      if (vertex_path.endsWith(".json")) {
        validateVertex(
          graph,
          config,
          vertex_label,
          vi(vertex_path.replace(".json", "")),
        );
      }
    });
}

function validateVertex(
  graph: Graph,
  config: any,
  vertex_label: VertexLabel,
  vertex_id: VertexID,
): void {
  const vertex_id_type: string = config[vertex_label].id.type;
  if (vertex_id_type === "number") {
    vertex_id = parseInt(vertex_id, 10);
  }
  const breadcrumbs: Breadcrumb = {
    label: [vertex_label],
    id: [vertex_id],
  };
  printBreadcrumbs(breadcrumbs);
  switch(vertex_id_type) {
    case "string":
      if (vertex_id.trim() !== vertex_id) {
        throwError(
          breadcrumbs,
          "This is not a proper string " + vertex_id,
        );
      }
      break;
    case "number":
      if (parseInt(vertex_id, 10).toString() !== vertex_id.replace(/^0+(?!$)/, "")) {
        throwError(
          breadcrumbs,
          "This is not a proper number " + vertex_id,
        );
      }
      break;
    default:
      throwError(
        breadcrumbs,
        "Unsupported data type " + vertex_id_type,
      );
  }
  graph.addV(vertex_label, vertex_id);
  Object.keys(config[vertex_label].properties).forEach((property_label: PropertyLabel) => {
    validateVertexProperty(
      graph,
      config,
      vertex_label,
      vertex_id,
      property_label,
    );
  });
  Object.keys(config[vertex_label].edges).forEach((edge_label: string) => {
    const target_label: VertexLabel = config[vertex_label].edges[edge_label].type;
    validateEdges(
      graph,
      config,
      vertex_label,
      el(edge_label),
      target_label,
    );
  });
}

function validateVertexProperty(
  graph: Graph,
  config: any,
  vertex_label: VertexLabel,
  property_label: PropertyLabel,
  vertex_id: VertexID,
): void {
  const breadcrumb: Breadcrumb = {
    label: [vertex_label, property_label],
    id: [vertex_id],
  };
  printBreadcrumbs(breadcrumb);
  const doc: any = JSON.parse(readFileSync("db/" + vertex_label + "/" + vertex_id + ".json", "ascii"));
  const property_value: PropertyValue = doc[property_label];
  const property_type: string = config[vertex_label].properties[property_label].type;
  switch(property_type) {
    case "string":
      if (typeof property_value !== "string") {
        throwError(
          breadcrumb,
          "This is not a proper string " + property_value,
        );
      }
      break;
    case "string[]":
      if (!Array.isArray(property_value) || !property_value.every((value) => typeof value === "string")) {
        throwError(
          breadcrumb,
          "This is not a proper string[] " + property_value,
        );
      }
      break;
    case "number":
      if (typeof property_value !== "number") {
        throwError(
          breadcrumb,
          "This is not a proper number " + property_value,
        );
      }
      break;
    case "number[]":
      if (!Array.isArray(property_value) || !property_value.every((value) => typeof value === "number")) {
        throwError(
          breadcrumb,
          "This is not a proper number[] " + property_value,
        );
      }
      break;
    case "boolean":
      if (typeof property_value !== "boolean") {
        throwError(
          breadcrumb,
          "This is not a proper boolean " + property_value,
        );
      }
      break;
    case "boolean[]":
      if (!Array.isArray(property_value) || !property_value.every((value) => typeof value === "boolean")) {
        throwError(
          breadcrumb,
          "This is not a proper boolean[] " + property_value,
        );
      }
      break;
    default:
      throwError(
        breadcrumb,
        "Unsupported data type " + property_type,
      );
  }
  graph.addP(property_label, property_value);
}

function validateEdges(
  graph: Graph,
  config: any,
  thread_0_label: VertexLabel,
  edge_label: EdgeLabel,
  thread_1_label: VertexLabel,
): void {
  const breadcrumbs: Breadcrumb = {
    label: [thread_0_label, edge_label, thread_1_label],
    id: [],
  };
  printBreadcrumbs(breadcrumbs);
  if (!existsSync("db/" + thread_0_label + "/" + edge_label + "/" + thread_1_label + "/")) {
    return;
  }
  readdirSync("db/" + thread_0_label + "/" + edge_label + "/" + thread_1_label + "/")
    .map((target_path: string) => {
      const edge_id: EdgeID = ei(target_path.replace(".json", ""));
      const thread_ids: VertexID[] = edge_id.split("-").map(vi);
      validateEdge(
        graph,
        config,
        thread_0_label,
        edge_label,
        thread_1_label,
        thread_ids[0],
        thread_ids[1],
      );
    });
}

function validateEdge(
  graph: Graph,
  config: any,
  thread_0_label: VertexLabel,
  edge_label: EdgeLabel,
  thread_1_label: VertexLabel,
  thread_0_id: VertexID,
  thread_1_id: VertexID,
): void {
  if (config[thread_1_label].id.type === "number") {
    thread_1_id = parseInt(thread_1_id, 10);
  }
  const breadcrumbs: Breadcrumb = {
    label: [thread_0_label, edge_label, thread_1_label],
    id: [thread_0_id, thread_1_id],
  };
  printBreadcrumbs(breadcrumbs);
  graph.addE(
    edge_label,
    [
      {
        id: thread_0_id,
        label: thread_0_label,
        properties: {},
      },
      {
        id: thread_1_id,
        label: thread_1_label,
        properties: {},
      },
    ],
  );
}

interface Breadcrumb {
  label: any[];
  id: any[];
};

function printBreadcrumbs(breadcrumb: Breadcrumb): void {
  console.log(breadcrumb.label.join(",") + "<>" + breadcrumb.id.join(","));
}

function throwError(breadcrumb: Breadcrumb, message: string): never {
  throw new Error(breadcrumb.label.join(",") + "<>" + breadcrumb.id.join(",")+ "\n" + message);
}
