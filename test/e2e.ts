import "mocha";

import * as chai from "chai";

import {
  readIndexedDB,
} from "../source/index";

it(
  "readIndexedDB",
  async (): Promise<void> => {
    await readIndexedDB("../db");
  },
);
