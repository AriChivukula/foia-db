import "mocha";

import * as chai from "chai";

import {
  DB,
} from "./index";

it(
  "test",
  async (): Promise<void> => {
    console.log(DB);
    const result: number = await DB.V().hasLabel("project").count().next();
    chai.expect(result).to.equal(2);
  },
);
