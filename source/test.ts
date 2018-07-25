import "mocha";

import * as chai from "chai";

import {
  DB,
} from "./index";

it(
  "test",
  async (): Promise<void> => {
    const count: number = await DB.V().hasLabel("project").count();
    chai.expect(count).to.equal(2);
  },
);
