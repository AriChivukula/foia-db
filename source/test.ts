import "mocha";

import * as chai from "chai";

import {
  Graph,
} from "./index";

it(
  "V#count",
  async (): Promise<void> => {
    chai.expect(Graph.read().V().hasLabel("project").count()).to.equal(2);
  },
);

it(
  "V#toList",
  async (): Promise<void> => {
    chai.expect(Graph.read().V().hasLabel("user").toList()).to.deep.equal([
      {
        "id": "ari",
        "label": "user",
        "properties": {
          "genders": [1E+2, 0],
          "pronouns": ["they", "them", "their"],
          "thoughts": [true, false]
        }
      }
    ]);
  },
);

it(
  "E#count",
  async (): Promise<void> => {
    chai.expect(Graph.read().V().hasLabel("user").outE("created").count()).to.equal(2);
  },
);

it(
  "E#toList",
  async (): Promise<void> => {
    chai.expect(Graph.read().V().hasLabel("project").outE("creator").toList()).to.deep.equal([
      {
        "id": "ari",
        "label": "user",
        "properties": {
          "genders": [1E+2, 0],
          "pronouns": ["they", "them", "their"],
          "thoughts": [true, false]
        }
      }
    ]);
  },
);
