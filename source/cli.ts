import * as yargs from "yargs";

import {
  readIndexedDB,
} from "./index";

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
  await readIndexedDB(`${process.cwd()}/${argv.directory}`);
}
