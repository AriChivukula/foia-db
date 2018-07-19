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
            describe: "Expect No Changes",
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
  Object.keys(config.folders).forEach((folder_name) => {
    validateFolder(config, folder_name);
  });
}

function validateFolder(
  config: any,
  folder_name: string,
): void {
  if (!existsSync("data/" + folder_name + "/")) {
    throw new Error("Missing data for " + folder_name);
  }
  readdirSync("data/" + folder_name + "/").forEach((document_name) => {
    validateDocument(config, folder_name, document_name);
  });
}

function validateDocument(
  config: any,
  folder_name: string,
  document_name: string,
): void {
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
  const document: string = JSON.parse(readFileSync("data/" + folder_name + "/" + document_name, "ascii"));
  const documentConfig: any = config.folders[folder_name].document;
  Object.keys(documentConfig).forEach((value_name) => {
    const value: string = document[value_name];
    const value_type: string = documentConfig[value_name].type;
    switch(value_type) {
      case "string":
        if (value.trim() !== value) {
          throw new Error("This is not a proper string " + value)
        }
        break;
      case "number":
        if (parseInt(value, 10).toString() !== value) {
          throw new Error("This is not a proper number " + value)
        }
        break;
      default:
        throw new Error("Unsupported data type " + value_type);
    }
  });
}
