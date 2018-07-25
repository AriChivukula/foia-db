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
  Object.keys(config.folders).forEach((folder_name: string) => {
    validateFolder(config, folder_name, graph);
  });
  if (compile) {
    console.log("Writing DB");
    graph.write();
  }
}

function validateFolder(
  config: any,
  folder_name: string,
  graph: Graph,
): void {
  console.log(folder_name);
  if (!existsSync("db/" + folder_name + "/")) {
    throwError(
      [folder_name],
      "Missing data",
    );
  }
  readdirSync("db/" + folder_name + "/").forEach((document_name: string) => {
    validateDocument(config, folder_name, document_name, graph);
  });
}

function validateDocument(
  config: any,
  folder_name: string,
  document_name: string,
  graph: Graph,
): void {
  console.log(folder_name + "/" + document_name);
  graph.addVertex(folder_name);
  const key_type: string = config.folders[folder_name].key.type;
  switch(key_type) {
    case "string":
      if (document_name.trim() !== document_name) {
        throwError(
          [folder_name, document_name],
          "This is not a proper string " + document_name,
        );
      }
      graph.property("id", document_name);
      break;
    case "number":
      if (parseInt(document_name, 10).toString() !== document_name.replace(/^0+(?!$)/, "")) {
        throwError(
          [folder_name, document_name],
          "This is not a proper number " + document_name,
        );
      }
      graph.property("id", parseInt(document_name, 10));
      break;
    default:
      throwError(
        [folder_name, document_name],
        "Unsupported data type " + key_type,
      );
  }
  Object.keys(config.folders[folder_name].document).forEach((value_name: string) => {
    graph.property(
      value_name,
      validateValue(config, folder_name, document_name, value_name),
    );
  });
}

function validateValue(
  config: any,
  folder_name: string,
  document_name: string,
  value_name: string,
): any {
  console.log(folder_name + "/" + document_name + "/" + value_name);
  const documentConfig: any = config.folders[folder_name].document;
  const doc: any = JSON.parse(readFileSync("db/" + folder_name + "/" + document_name, "ascii"));
  const final_value: any = doc[value_name];
  const value_type: string = documentConfig[value_name].type;
  switch(value_type) {
    case "string":
      if (typeof final_value !== "string") {
        throwError(
          [folder_name, document_name, value_name],
          "This is not a proper string " + final_value,
        );
      }
      break;
    case "string[]":
      if (!Array.isArray(final_value) || !final_value.every((value) => typeof value === "string")) {
        throwError(
          [folder_name, document_name, value_name],
          "This is not a proper string[] " + final_value,
        );
      }
      break;
    case "number":
      if (typeof final_value !== "number") {
        throwError(
          [folder_name, document_name, value_name],
          "This is not a proper number " + final_value,
        );
      }
      break;
    case "number[]":
      if (!Array.isArray(final_value) || !final_value.every((value) => typeof value === "number")) {
        throwError(
          [folder_name, document_name, value_name],
          "This is not a proper number[] " + final_value,
        );
      }
      break;
    case "boolean":
      if (typeof final_value !== "boolean") {
        throwError(
          [folder_name, document_name, value_name],
          "This is not a proper boolean " + final_value,
        );
      }
      break;
    case "boolean[]":
      if (!Array.isArray(final_value) || !final_value.every((value) => typeof value === "boolean")) {
        throwError(
          [folder_name, document_name, value_name],
          "This is not a proper boolean[] " + final_value,
        );
      }
      break;
    default:
      throwError(
        [folder_name, document_name, value_name],
        "Unsupported data type " + value_type,
      );
  }
  return final_value;
}

function throwError(breadcrumbs: string[], message: string): void {
  throw new Error("<" + breadcrumbs.join(",") + "> " + message);
}
