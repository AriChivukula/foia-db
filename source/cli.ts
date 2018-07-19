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
  Object.keys(config).forEach((table) => {
    validateTable(lint, release, config, table);
  });
}

function validateTable(
  lint: boolean,
  release: boolean,
  config: any,
  table: string,
): void {
  if (!existsSync("data/" +table + "/")) {
    throw new Error("Missing data for " + table);
  }
  readdirSync("data/" + table + "/").forEach((document_path) => {
    validateDocument(lint, release, config, table, document_path);
  });
}

function validateDocument(
  lint: boolean,
  release: boolean,
  config: any,
  table: string,
  document_path: string,
): void {
  const document: string = JSON.parse(readFileSync("data/" + table + "/" + document_path, "ascii"));
  // ...
}
