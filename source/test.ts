import "mocha";

import * as chai from "chai";

import {
  Graph,
} from "./index";

it(
  "count",
  async (): Promise<void> => {
    chai.expect(Graph.read().V().hasLabel("project").count()).to.equal(2);
  },
);

it(
  "toList",
  async (): Promise<void> => {
    chai.expect(Graph.read().V().hasLabel("user").toList()).to.deep.equal([{
      "genders": [1E+2, 0],
      "id": "ari",
      "pronouns": ["they", "them", "their"],
      "thoughts": [true, false]
    }]);
  },
);
