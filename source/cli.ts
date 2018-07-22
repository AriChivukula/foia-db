#!/usr/bin/env node

import { existsSync, readdirSync, readFileSync, writeFileSync } from "fs";
import * as yargs from "yargs";

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
  const final_db: any = {};
  const config: any = JSON.parse(readFileSync(".foia-db", "ascii"));
  Object.keys(config.folders).forEach((folder_name: string) => {
    final_db[folder_name] = validateFolder(config, folder_name);
  });
  if (compile) {
    writeFileSync(".foia-db.json", JSON.stringify(final_db));
  }
}

function validateFolder(
  config: any,
  folder_name: string,
): any {
  const final_folder: any = {};
  if (!existsSync("data/" + folder_name + "/")) {
    throw new Error("Missing data for " + folder_name);
  }
  readdirSync("data/" + folder_name + "/").forEach((document_name: string) => {
    final_folder[document_name] = validateDocument(config, folder_name, document_name);
  });
  return final_folder;
}

function validateDocument(
  config: any,
  folder_name: string,
  document_name: string,
): any {
  const final_document: any = {};
  const key_type: string = config.folders[folder_name].key.type;
  switch(key_type) {
    case "string":
      if (document_name.trim() !== document_name) {
        throw new Error("This is not a proper string " + document_name)
      }
      break;
    case "number":
      if (parseInt(document_name, 10).toString() !== document_name) {
        throw new Error("This is not a proper number " + document_name)
      }
      break;
    default:
      throw new Error("Unsupported data type " + key_type);
  }
  Object.keys(config.folders[folder_name].document).forEach((value_name: string) => {
    final_document[value_name] = validateValue(config, folder_name, document_name, value_name);
  });
  return final_document;
}

function validateValue(
  config: any,
  folder_name: string,
  document_name: string,
  value_name: string,
): any {
  const documentConfig: any = config.folders[folder_name].document;
  const doc: any = JSON.parse(readFileSync("data/" + folder_name + "/" + document_name, "ascii"));
  const final_value: any = doc[value_name];
  const value_type: string = documentConfig[value_name].type;
  switch(value_type) {
    case "string":
      if (typeof final_value !== "string") {
        throw new Error("This is not a proper string " + final_value)
      }
      break;
    case "string[]":
      if (!Array.isArray(final_value) || !final_value.every((value) => typeof value === "string")) {
        throw new Error("This is not a proper string array " + final_value)
      }
      break;
    case "number":
      if (typeof final_value !== "number") {
        throw new Error("This is not a proper number " + final_value)
      }
      break;
    case "number[]":
      if (!Array.isArray(final_value) || !final_value.every((value) => typeof value === "number")) {
        throw new Error("This is not a proper number array " + final_value)
      }
      break;
    default:
      throw new Error("Unsupported data type " + value_type);
  }
  return final_value;
}
