import "mocha";
import * as chai from "chai";

import {
  DBSchema,
} from "idb";

import {
  readIndexedDB,
} from "../source/index";

it(
  "readIndexedDB",
  async (): Promise<void> => {
    await readIndexedDB<DBSchema>("../db");
  },
);
