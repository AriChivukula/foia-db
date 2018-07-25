import "mocha";

import * as chai from "chai";

import {
  DB,
} from "./index";

it(
  "test",
  async (): Promise<void> => {
    chai.expect(DB.traversal().V().count()).to.equal(3);
  },
);
