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
  console.log("Loading Config");
  const config: any = JSON.parse(readFileSync(".foia-db", "ascii"));
  const graph: Graph = Graph.new();
  Object.keys(config.vertices).forEach((vertex_label: string) => {
    validateFolder(config, vertex_label, graph);
  });
  if (compile) {
    console.log("Writing DB");
    graph.write();
  }
}

function validateFolder(
  config: any,
  vertex_label: string,
  graph: Graph,
): void {
  console.log(vertex_label);
  if (!existsSync("db/" + vertex_label + "/")) {
    throwError(
      [vertex_label],
      "Missing data",
    );
  }
  readdirSync("db/" + vertex_label + "/").forEach((vertex_id: string) => {
    validateDocument(config, vertex_label, vertex_id, graph);
  });
}

function validateDocument(
  config: any,
  vertex_label: string,
  vertex_id: string,
  graph: Graph,
): void {
  console.log(vertex_label + "/" + vertex_id);
  graph.addV(vertex_label);
  const key_type: string = config.folders[vertex_label].key.type;
  switch(key_type) {
    case "string":
      if (vertex_id.trim() !== vertex_id) {
        throwError(
          [vertex_label, vertex_id],
          "This is not a proper string " + vertex_id,
        );
      }
      graph.property("id", vertex_id);
      break;
    case "number":
      if (parseInt(vertex_id, 10).toString() !== vertex_id.replace(/^0+(?!$)/, "")) {
        throwError(
          [vertex_label, vertex_id],
          "This is not a proper number " + vertex_id,
        );
      }
      graph.property("id", parseInt(vertex_id, 10));
      break;
    default:
      throwError(
        [vertex_label, vertex_id],
        "Unsupported data type " + key_type,
      );
  }
  Object.keys(config.folders[vertex_label].document).forEach((property_key: string) => {
    graph.property(
      property_key,
      validateVertexProperty(config, vertex_label, vertex_id, property_key),
    );
  });
}

function validateVertexProperty(
  config: any,
  vertex_label: string,
  vertex_id: string,
  property_key: string,
): any {
  console.log(vertex_label + "/" + vertex_id + "/" + property_key);
  const documentConfig: any = config.folders[vertex_label].document;
  const doc: any = JSON.parse(readFileSync("db/" + vertex_label + "/" + vertex_id, "ascii"));
  const final_value: any = doc[property_key];
  const value_type: string = documentConfig[property_key].type;
  switch(value_type) {
    case "string":
      if (typeof final_value !== "string") {
        throwError(
          [vertex_label, vertex_id, property_key],
          "This is not a proper string " + final_value,
        );
      }
      break;
    case "string[]":
      if (!Array.isArray(final_value) || !final_value.every((value) => typeof value === "string")) {
        throwError(
          [vertex_label, vertex_id, property_key],
          "This is not a proper string[] " + final_value,
        );
      }
      break;
    case "number":
      if (typeof final_value !== "number") {
        throwError(
          [vertex_label, vertex_id, property_key],
          "This is not a proper number " + final_value,
        );
      }
      break;
    case "number[]":
      if (!Array.isArray(final_value) || !final_value.every((value) => typeof value === "number")) {
        throwError(
          [vertex_label, vertex_id, property_key],
          "This is not a proper number[] " + final_value,
        );
      }
      break;
    case "boolean":
      if (typeof final_value !== "boolean") {
        throwError(
          [vertex_label, vertex_id, property_key],
          "This is not a proper boolean " + final_value,
        );
      }
      break;
    case "boolean[]":
      if (!Array.isArray(final_value) || !final_value.every((value) => typeof value === "boolean")) {
        throwError(
          [vertex_label, vertex_id, property_key],
          "This is not a proper boolean[] " + final_value,
        );
      }
      break;
    default:
      throwError(
        [vertex_label, vertex_id, property_key],
        "Unsupported data type " + value_type,
      );
  }
  return final_value;
}

function throwError(breadcrumbs: string[], message: string): void {
  throw new Error("<" + breadcrumbs.join(",") + "> " + message);
}
