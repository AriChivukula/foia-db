import * as yargs from "yargs";

import {
  readIndexedDB,
} from "./index";
import {
  DBSchema,
} from 'idb';

yargs
  .usage(
    "$0",
    true,
    argParse,
    entryPoint,
  )
  .help()
  .argv;

function argParse(y: yargs.Argv<any>): yargs.Argv<any> {
  return y
    .option(
      "directory",
      {
        demandOption: true,
        describe: "Root DB Path",
      },
    );
}

async function entryPoint(argv: yargs.Arguments<any>): Promise<void> {
  const mod: { default: DBSchema } = require(`${process.cwd()}/${argv.directory}/schema`);
  await readIndexedDB(mod.default);
}
