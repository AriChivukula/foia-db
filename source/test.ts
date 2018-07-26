import "mocha";

import * as chai from "chai";

import {
  Graph,
  el,
  vl,
} from "./read";

it(
  "E#countV",
  async (): Promise<void> => {
    chai.expect(Graph.read().E().outE(el("created")).outV(vl("project")).countV()).to.equal(2);
  },
);

it(
  "E#listV",
  async (): Promise<void> => {
    chai.expect(Graph.read().E().outE(el("creator")).outV(vl("user")).listV()).to.deep.equal([
      {
        "id": "ari",
        "label": "user",
        "properties": {
          "genders": [
            100,
            0,
          ],
          "pronouns": [
            "they",
            "them",
            "their",
          ],
          "thoughts": [
            true,
            false,
          ],
        },
      },
    ]);
  },
);

it(
  "E#countE",
  async (): Promise<void> => {
    chai.expect(Graph.read().E().outE(el("created")).countE()).to.equal(2);
  },
);

it(
  "E#listE",
  async (): Promise<void> => {
    chai.expect(Graph.read().E().outE(el("creator")).listE()).to.deep.equal([
      {
        "id": "ari",
        "label": "user",
        "properties": {
          "genders": [
            100,
            0,
          ],
          "pronouns": [
            "they",
            "them",
            "their",
          ],
          "thoughts": [
            true,
            false,
          ],
        },
      },
    ]);
  },
);

it(
  "V#countV",
  async (): Promise<void> => {
    chai.expect(Graph.read().V().outV(vl("project")).countV()).to.equal(2);
  },
);

it(
  "V#listV",
  async (): Promise<void> => {
    chai.expect(Graph.read().V().outV(vl("user")).listV()).to.deep.equal([
      {
        "id": "ari",
        "label": "user",
        "properties": {
          "genders": [
            100,
            0,
          ],
          "pronouns": [
            "they",
            "them",
            "their",
          ],
          "thoughts": [
            true,
            false,
          ],
        },
      },
    ]);
  },
);

it(
  "V#countE",
  async (): Promise<void> => {
    chai.expect(Graph.read().V().outV(vl("user")).outE(el("created")).countE()).to.equal(2);
  },
);

it(
  "V#listE",
  async (): Promise<void> => {
    chai.expect(Graph.read().V().outV(vl("project")).outE(el("creator")).listE()).to.deep.equal([
      {
        "id": "ari",
        "label": "user",
        "properties": {
          "genders": [
            100,
            0,
          ],
          "pronouns": [
            "they",
            "them",
            "their",
          ],
          "thoughts": [
            true,
            false,
          ],
        },
      },
    ]);
  },
);
