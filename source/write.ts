#!/usr/bin/env node

import { existsSync, readdirSync, readFileSync, writeFileSync } from "fs";
import * as yargs from "yargs";

import { vi, Graph, PropertyID, PropertyLabel, VertexID, VertexLabel, MetadataLabel, MetadataID } from "./read";

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
    validateVertices(graph, config, vertex_label);
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
  const breadcrumbs: any[] = [vertex_label];
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
  const breadcrumbs: any[] = [vertex_label, vertex_id];
  printBreadcrumbs(breadcrumbs);
  graph.addVertex(vertex_label, vertex_id);
  Object.keys(config[vertex_label].properties).forEach((property_label: PropertyLabel) => {
    validateVertexProperty(
      graph,
      config,
      vertex_label,
      vertex_id,
      property_label,
    );
  });
  Object.keys(config[vertex_label].edges).forEach((last_label: VertexLabel) => {
    validateEdges(
      graph,
      config,
      vertex_label,
      vertex_id,
      last_label,
    );
  });
}

function validateVertexProperty(
  graph: Graph,
  config: any,
  vertex_label: VertexLabel,
  vertex_id: VertexID,
  property_label: PropertyLabel,
): void {
  const breadcrumb: any[] = [vertex_label, vertex_id, property_label];
  printBreadcrumbs(breadcrumb);
  const doc: any = JSON.parse(readFileSync("db/" + vertex_label + "/" + vertex_id + ".json", "ascii"));
  const property_id: PropertyID = doc[property_label];
  const property_type: string = config[vertex_label].properties[property_label].type;
  validateID(property_type, property_id, breadcrumb);
  graph.addVertexProperty(property_label, property_id);
  Object.keys(config[vertex_label].properties[property_label].metadata).forEach((metadata_label: MetadataLabel) => {
    validateVertexPropertyMetadata(
      graph,
      config,
      vertex_label,
      vertex_id,
      property_label,
      metadata_label,
    );
  });
}

function validateVertexPropertyMetadata(
  graph: Graph,
  config: any,
  vertex_label: VertexLabel,
  vertex_id: VertexID,
  property_label: PropertyLabel,
  metadata_label: MetadataLabel,
): void {
  const breadcrumb: any[] = [vertex_label, vertex_id, property_label, metadata_label];
  printBreadcrumbs(breadcrumb);
  const doc: any = JSON.parse(readFileSync("db/" + vertex_label + "/" + vertex_id + "/" + property_label + ".json", "ascii"));
  const metadata_id: MetadataID = doc[metadata_label];
  const metadata_type: string = config[vertex_label].properties[property_label].metadata[metadata_label].type;
  validateID(metadata_type, metadata_id, breadcrumb);
  graph.addMetadata(metadata_label, metadata_id);
}

function validateEdges(
  graph: Graph,
  config: any,
  first_label: VertexLabel,
  first_id: VertexID,
  last_label: VertexLabel,
): void {
  const breadcrumbs: any[] = [first_label, first_id, last_label];
  printBreadcrumbs(breadcrumbs);
  if (!existsSync("db/" + first_label + "/" + first_id + "/" + last_label + "/")) {
    return;
  }
  readdirSync("db/" + first_label + "/" + first_id + "/" + last_label + "/")
    .map((target_path: string) => {
      if (target_path.endsWith(".json")) {
        validateEdge(
          graph,
          config,
          first_label,
          first_id,
          last_label,
          vi(target_path.replace(".json", "")),
        );
      }
    });
}

function validateEdge(
  graph: Graph,
  config: any,
  first_label: VertexLabel,
  first_id: VertexID,
  last_label: VertexLabel,
  last_id: VertexID,
): void {
  const breadcrumbs: any[] = [first_label, first_id, last_label, last_id];
  printBreadcrumbs(breadcrumbs);
  graph.addEdge(
    [
      first_label,
      first_id,
    ],
    [
      last_label,
      last_id,
    ],
  );
  Object.keys(config[first_label].edges[last_label].properties).forEach((property_label: PropertyLabel) => {
    validateEdgeProperty(
      graph,
      config,
      first_label,
      first_id,
      last_label,
      last_id,
      property_label,
    );
  });
}

function validateEdgeProperty(
  graph: Graph,
  config: any,
  first_label: VertexLabel,
  first_id: VertexID,
  last_label: VertexLabel,
  last_id: VertexID,
  property_label: PropertyLabel,
): void {
  const breadcrumb: any[] = [first_label, first_id, last_label, last_id, property_label];
  printBreadcrumbs(breadcrumb);
  const doc: any = JSON.parse(readFileSync("db/" + first_label + "/" + first_id + "/" + last_label + "/" + last_id + ".json", "ascii"));
  const property_id: PropertyID = doc[property_label];
  const property_type: string = config[first_label].edges[last_label].properties[property_label].type;
  validateID(property_type, property_id, breadcrumb);
  graph.addEdgeProperty(property_label, property_id);
  Object.keys(config[first_label].edges[last_label].properties[property_label].metadata).forEach((metadata_label: MetadataLabel) => {
    validateEdgePropertyMetadata(
      graph,
      config,
      first_label,
      first_id,
      last_label,
      last_id,
      property_label,
      metadata_label,
    );
  });
}

function validateEdgePropertyMetadata(
  graph: Graph,
  config: any,
  first_label: VertexLabel,
  first_id: VertexID,
  last_label: VertexLabel,
  last_id: VertexID,
  property_label: PropertyLabel,
  metadata_label: MetadataLabel,
): void {
}

function validateID(
  type: string,
  id: string,
  breadcrumb: any[],
): void {
  switch(type) {
    case "string":
      if (typeof id !== "string") {
        throwError(
          breadcrumb,
          "This is not a proper string " + id,
        );
      }
      break;
    case "string[]":
      if (!Array.isArray(id) || !id.every((value) => typeof value === "string")) {
        throwError(
          breadcrumb,
          "This is not a proper string[] " + id,
        );
      }
      break;
    case "number":
      if (typeof id !== "number") {
        throwError(
          breadcrumb,
          "This is not a proper number " + id,
        );
      }
      break;
    case "number[]":
      if (!Array.isArray(id) || !id.every((value) => typeof value === "number")) {
        throwError(
          breadcrumb,
          "This is not a proper number[] " + id,
        );
      }
      break;
    case "boolean":
      if (typeof id !== "boolean") {
        throwError(
          breadcrumb,
          "This is not a proper boolean " + id,
        );
      }
      break;
    case "boolean[]":
      if (!Array.isArray(id) || !id.every((value) => typeof value === "boolean")) {
        throwError(
          breadcrumb,
          "This is not a proper boolean[] " + id,
        );
      }
      break;
    default:
      throwError(
        breadcrumb,
        "Unsupported data type " + type,
      );
  }
}

function printBreadcrumbs(breadcrumb: any[]): void {
  console.log(breadcrumb.join(","));
}

function throwError(breadcrumb: any[], message: string): never {
  throw new Error(breadcrumb.join(",") + message);
}
