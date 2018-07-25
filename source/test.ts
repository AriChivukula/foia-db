import "mocha";

import * as chai from "chai";

import {
  DB,
} from "./index";

it(
  "test",
  async (): Promise<void> => {
    chai.expect(DB.V().hasLabel("project").count().next()).to.equal(2);
  },
);
