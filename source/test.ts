import "mocha";

import * as chai from "chai";

import {
  DB,
} from "./index";

it(
  "test",
  async (): Promise<void> => {
    console.log(DB);
    chai.expect(DB.V().hasLabel("project").count()).to.equal(2);
  },
);
