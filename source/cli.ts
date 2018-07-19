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
  const config: string = JSON.parse(readFileSync(".foia-db").toString());
  Object.keys(config).forEach((table) => {
    validateTable(lint, release, config[table]);
  });
}

function validateTable(
  lint: boolean,
  release: boolean,
  table: any,
): void {
  if (!existsSync("data/" + table.name + "/")) {
    throw new Error("Missing data for " + table.name);
  }
  readdirSync("data/" + table.name + "/").forEach((document_path) => {
    validateDocument(lint, release, table, document_path);
  });
}

function validateDocument(
  lint: boolean,
  release: boolean,
  table: any,
  document_path: string,
): void {
  const document: string = JSON.parse(readFileSync("data/" + table.name + "/" + document_path).toString());
  // ...
}
