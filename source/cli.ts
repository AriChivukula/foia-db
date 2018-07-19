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
          "lint",
          {
            boolean: true,
            describe: "Expect No Changes",
          },
        )
        .option(
          "release",
          {
            boolean: true,
            describe: "Expect No Changes",
          },
        ),
      (argv: yargs.Arguments): void => {
        validateConfig(argv.release, argv.lint);
      },
    )
    .help()
    .argv;
}

function validateConfig(
  lint: boolean,
  release: boolean,
): void {
  const config: any = JSON.parse(readFileSync(".foia-db", "ascii"));
  Object.keys(config.folders).forEach((folder_name) => {
    validateFolder(lint, release, config, folder_name);
  });
}

function validateFolder(
  lint: boolean,
  release: boolean,
  config: any,
  folder_name: string,
): void {
  if (!existsSync("data/" + folder_name + "/")) {
    throw new Error("Missing data for " + folder_name);
  }
  readdirSync("data/" + folder_name + "/").forEach((document_name) => {
    validateDocument(lint, release, config, folder_name, document_name);
  });
}

function validateDocument(
  lint: boolean,
  release: boolean,
  config: any,
  folder_name: string,
  document_name: string,
): void {
  const document: string = JSON.parse(readFileSync("data/" + folder_name + "/" + document_name, "ascii"));
  // ...
}
