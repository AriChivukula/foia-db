import "mocha";

import * as chai from "chai";

import {
  Graph,
} from "./graph";

it(
  "test",
  async (): Promise<void> => {
    chai.expect(Graph.read().V().hasLabel("project").count()).to.equal(2);
  },
);
