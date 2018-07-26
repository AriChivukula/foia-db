#!/usr/bin/env node

import { existsSync, readdirSync, readFileSync, writeFileSync } from "fs";
import * as yargs from "yargs";

import { Graph } from "./index";

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
    validateVertices(config, vertex_label, graph);
  });
  if (compile) {
    graph.write();
  }
}

function validateVertices(
  config: any,
  vertex_label: string,
  graph: Graph,
): void {
  printContext([vertex_label]);
  if (!existsSync("db/VL-" + vertex_label + "/VI-*.json")) {
    return;
  }
  readdirSync("db/VL-" + vertex_label + "/VI-*.json").forEach((vertex_id: string) => {
    validateVertex(config, vertex_label, vertex_id, graph);
  });
}

function validateVertex(
  config: any,
  vertex_label: string,
  vertex_id: string,
  graph: Graph,
): void {
  printContext([vertex_label, vertex_id]);
  const verted_id_type: string = config[vertex_label].id.type;
  switch(verted_id_type) {
    case "string":
      if (vertex_id.trim() !== vertex_id) {
        throwError(
          [vertex_label, vertex_id],
          "This is not a proper string " + vertex_id,
        );
      }
      graph.addV(vertex_label, vertex_id);
      break;
    case "number":
      if (parseInt(vertex_id, 10).toString() !== vertex_id.replace(/^0+(?!$)/, "")) {
        throwError(
          [vertex_label, vertex_id],
          "This is not a proper number " + vertex_id,
        );
      }
      graph.addV(vertex_label, parseInt(vertex_id, 10));
      break;
    default:
      throwError(
        [vertex_label, vertex_id],
        "Unsupported data type " + verted_id_type,
      );
  }
  Object.keys(config[vertex_label].properties).forEach((property_key: string) => {
    graph.property(
      property_key,
      validateVertexProperty(config, vertex_label, vertex_id, property_key),
    );
  });
  Object.keys(config[vertex_label].edges).forEach((edge_label: string) => {
    const target_label: string = config[vertex_label].edges[edge_label].type;
    validateEdge(config, vertex_label, vertex_id, edge_label, target_label).forEach(
      (target_id: any) => {
        graph.addE(
          edge_label,
          target_label,
          target_id,
        );
      },
    );
  });
}

function validateVertexProperty(
  config: any,
  vertex_label: string,
  vertex_id: string,
  property_key: string,
): any {
  printContext([vertex_label, vertex_id, property_key]);
  const doc: any = JSON.parse(readFileSync("db/VL-" + vertex_label + "/VI-" + vertex_id + ".json", "ascii"));
  const property_value: any = doc[property_key];
  const property_type: string = config[vertex_label].properties[property_key].type;
  switch(property_type) {
    case "string":
      if (typeof property_value !== "string") {
        throwError(
          [vertex_label, vertex_id, property_key],
          "This is not a proper string " + property_value,
        );
      }
      break;
    case "string[]":
      if (!Array.isArray(property_value) || !property_value.every((value) => typeof value === "string")) {
        throwError(
          [vertex_label, vertex_id, property_key],
          "This is not a proper string[] " + property_value,
        );
      }
      break;
    case "number":
      if (typeof property_value !== "number") {
        throwError(
          [vertex_label, vertex_id, property_key],
          "This is not a proper number " + property_value,
        );
      }
      break;
    case "number[]":
      if (!Array.isArray(property_value) || !property_value.every((value) => typeof value === "number")) {
        throwError(
          [vertex_label, vertex_id, property_key],
          "This is not a proper number[] " + property_value,
        );
      }
      break;
    case "boolean":
      if (typeof property_value !== "boolean") {
        throwError(
          [vertex_label, vertex_id, property_key],
          "This is not a proper boolean " + property_value,
        );
      }
      break;
    case "boolean[]":
      if (!Array.isArray(property_value) || !property_value.every((value) => typeof value === "boolean")) {
        throwError(
          [vertex_label, vertex_id, property_key],
          "This is not a proper boolean[] " + property_value,
        );
      }
      break;
    default:
      throwError(
        [vertex_label, vertex_id, property_key],
        "Unsupported data type " + property_type,
      );
  }
  return property_value;
}

function validateEdge(
  config: any,
  vertex_label: string,
  vertex_id: string,
  edge_label: string,
  target_label: string,
): any[] {
  printContext([vertex_label, vertex_id, edge_label, target_label]);
  return readdirSync("db/VL-" + vertex_label + "/VI-" + vertex_id + "/EL-" + edge_label + "/TL-" + target_label + "/EI-*.json")
    .map((target_id: string) => {
      if (config[target_label].id.type === "number") {
        return parseInt(target_id, 10);
      }
      return target_id;
    });
}

function printContext(breadcrumbs: string[]): void {
  console.log("<" + breadcrumbs.join(",") + ">");
}

function throwError(breadcrumbs: string[], message: string): never {
  throw new Error("<" + breadcrumbs.join(",") + "> " + message);
}
