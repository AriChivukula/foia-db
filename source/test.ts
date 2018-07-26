import "mocha";

import * as chai from "chai";

import {
  Graph,
  el,
  vl,
} from "./index";

it(
  "V#count",
  async (): Promise<void> => {
    chai.expect(Graph.read().V().outV(vl("project")).countV()).to.equal(2);
  },
);

it(
  "V#toList",
  async (): Promise<void> => {
    chai.expect(Graph.read().V().outV(vl("user")).listV()).to.deep.equal([
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
    chai.expect(Graph.read().V().outL(vl("user")).outE(el("created")).countE()).to.equal(2);
  },
);

it(
  "E#toList",
  async (): Promise<void> => {
    chai.expect(Graph.read().V().outL(vl("project")).outE(el("creator")).listE()).to.deep.equal([
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
