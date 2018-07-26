#!/usr/bin/env node

import { existsSync, readdirSync, readFileSync, writeFileSync } from "fs";
import * as yargs from "yargs";

import { Graph, EdgeID, EdgeLabel, PropertyLabel, PropertyValue, VertexID, VertexLabel } from "./index";

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
  Object.keys(config).forEach((vertex_label: VertexLabel) => {
    validateVertices(config, vertex_label, graph);
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
  const breadcrumbs: Breadcrumbs = [
    [vertex_label],
  ];
  printPreadcrumbs(breadcrumbs);
  if (!existsSync("db/" + vertex_label + "/")) {
    return;
  }
  readdirSync("db/" + vertex_label + "/")
    .forEach((vertex_path: string) => {
      if (vertex_path.endsWith(".json")) {
        validateVertex(
          config,
          vertex_label,
          vertex_path.replace(".json"),
          graph,
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
  const breadcrumbs: Breadcrumbs = [
    [vertex_label],
    [vertex_id],
  ];
  printBreadcrumbs(breadcrumbs);
  const verted_id_type: string = config[vertex_label].id.type;
  switch(verted_id_type) {
    case "string":
      if (vertex_id.trim() !== vertex_id) {
        throwError(
          breadcrumbs,
          "This is not a proper string " + vertex_id,
        );
      }
      graph.addV(vertex_label, vertex_id);
      break;
    case "number":
      if (parseInt(vertex_id, 10).toString() !== vertex_id.replace(/^0+(?!$)/, "")) {
        throwError(
          breadcrumbs,
          "This is not a proper number " + vertex_id,
        );
      }
      graph.addV(vertex_label, parseInt(vertex_id, 10));
      break;
    default:
      throwError(
        breadcrumbs,
        "Unsupported data type " + vertex_id_type,
      );
  }
  Object.keys(config[vertex_label].properties).forEach((property_key: PropertyLabel) => {
    validateVertexProperty(config, vertex_label, vertex_id, property_label, graph);
  });
  Object.keys(config[vertex_label].edges).forEach((edge_label: EdgeLabel) => {
    const target_label: VertexLabel = config[vertex_label].edges[edge_label].type;
    validateEdges(config, vertex_label, vertex_id, edge_label, target_label, graph);
  });
}

function validateVertexProperty(
  graph: Graph,
  config: any,
  vertex_label: VertexLabel,
  property_label: PropertyLabel,
  vertex_id: VertexID,
): void {
  const breadcrumbs: Breadcrumbs = [
    [vertex_label, property_label],
    [vertex_id],
  ];
  printBreadcrumbs(breadcrumbs);
  const doc: any = JSON.parse(readFileSync("db/" + vertex_label + "/" + vertex_id + ".json", "ascii"));
  const property_value: PropertyValue = doc[property_label];
  const property_type: string = config[vertex_label].properties[property_label].type;
  switch(property_type) {
    case "string":
      if (typeof property_value !== "string") {
        throwError(
          breadcrumbs,
          "This is not a proper string " + property_value,
        );
      }
      break;
    case "string[]":
      if (!Array.isArray(property_value) || !property_value.every((value) => typeof value === "string")) {
        throwError(
          breadcrumbs,
          "This is not a proper string[] " + property_value,
        );
      }
      break;
    case "number":
      if (typeof property_value !== "number") {
        throwError(
          breadcrumbs,
          "This is not a proper number " + property_value,
        );
      }
      break;
    case "number[]":
      if (!Array.isArray(property_value) || !property_value.every((value) => typeof value === "number")) {
        throwError(
          breadcrumbs,
          "This is not a proper number[] " + property_value,
        );
      }
      break;
    case "boolean":
      if (typeof property_value !== "boolean") {
        throwError(
          breadcrumbs,
          "This is not a proper boolean " + property_value,
        );
      }
      break;
    case "boolean[]":
      if (!Array.isArray(property_value) || !property_value.every((value) => typeof value === "boolean")) {
        throwError(
          breadcrumbs,
          "This is not a proper boolean[] " + property_value,
        );
      }
      break;
    default:
      throwError(
        breadcrumbs,
        "Unsupported data type " + property_type,
      );
  }
  graph.property(property_label, property_value);
}

function validateEdges(
  graph: Graph,
  config: any,
  thread_0_label: VertexLabel,
  edge_label: EdgeLabel,
  thread_1_label: VertexLabel,
  graph: Graph,
): void {
  const breadcrumbs: Breadcrumbs = [
    [thread_0_label, edge_label, thread_1_label],
  ];
  printBreadcrumbs(breadcrumbs);
  if (!existsSync("db/" + thread_0_label + "/" + edge_label + "/" + thread_1_label + "/")) {
    return;
  }
  readdirSync("db/" + thread_0_label + "/" + edge_label + "/" + thread_1_label + "/")
    .map((target_path: string) => {
      const edge_id: EdgeID = target_path.replace(".json", "");
      const thread_ids [VertexID, VertexID] = edge_id.split("-");
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
  const breadcrumbs: Breadcrumbs = [
    [thread_0_label, edge_label, thread_1_label],
    [thread_0_id, thread_1_id],
  ];
  printBreadcrumbs(breadcrumbs);
  if (config[target_label].id.type === "number") {
    target_id = parseInt(target_id, 10);
  }
  graph.addE(
    edge_label,
    target_label,
    target_id,
  );
}

type Breadcrumbs = [
  [VertexLabel, ?EdgeLabel, ?VertexLabel, ?PropertyLabel],
  [?VertexID, ?EdgeID],
];

function printBreadcrumbs(breadcrumbs: Breadcrumbs): void {
  console.log(
    breadcrumbs
      .map((breadcrumb: any[]) => breadcrumb.join(","))
      .join("<>"),
  );
}

function throwError(breadcrumbs: Breadcrumbs, message: string): never {
  throw new Error(
    breadcrumbs
      .map((breadcrumb: any[]) => breadcrumb.join(","))
      .join("<>")
    + "\n"
    + message,
  );
}
