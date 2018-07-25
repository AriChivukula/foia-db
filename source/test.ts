import "mocha";

import * as chai from "chai";

import {
  DB,
} from "./index";

it(
  "test",
  async (): Promise<void> => {
    expect(DB.V().count()).to.equal(3);
  },
);
