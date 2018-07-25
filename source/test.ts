import "mocha";

import * as chai from "chai";

import {
  DB,
} from "./index";

it(
  "test",
  async (): Promise<void> => {
    const d: any = await DB;
    chai.expect(d.V().hasLabel("project").count()).to.equal(2);
  },
);
