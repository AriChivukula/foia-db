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
  const config: string = JSON.parse(readFileSync(".foia-db", "ascii"));
  Object.keys(config.folders).forEach((folder) => {
    validateFolder(lint, release, config, folder);
  });
}

function validateFolder(
  lint: boolean,
  release: boolean,
  config: any,
  folder: string,
): void {
  if (!existsSync("data/" + folder + "/")) {
    throw new Error("Missing data for " + folder);
  }
  readdirSync("data/" + folder + "/").forEach((document_path) => {
    validateDocument(lint, release, config, folder, document_path);
  });
}

function validateDocument(
  lint: boolean,
  release: boolean,
  config: any,
  folder: string,
  document_path: string,
): void {
  const document: string = JSON.parse(readFileSync("data/" + folder + "/" + document_path, "ascii"));
  // ...
}
