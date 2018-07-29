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
    chai.expect(Graph.read().Edges().outEdge(el("created")).outVertex(vl("project")).countVertices()).to.equal(2);
  },
);

it(
  "E#listV",
  async (): Promise<void> => {
    chai.expect(Graph.read().Edges().outEdge(el("creator")).outVertex(vl("user")).listVertices()).to.deep.equal([
      {
        "id": "ari",
        "label": "VL-user",
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
    chai.expect(Graph.read().Edges().outEdge(el("created")).countEdges()).to.equal(2);
  },
);

it(
  "E#listE",
  async (): Promise<void> => {
    chai.expect(Graph.read().Edges().outEdge(el("creator")).listEdges()).to.deep.equal([
      {
        "label": "EL-creator",
        "thread": [
          {
            "id": 0,
            "label": "VL-project",
            "properties": {},
          },
          {
            "id": "ari",
            "label": "VL-user",
            "properties": {},
          },
        ],
      },
      {
        "label": "EL-creator",
        "thread": [
          {
            "id": 1,
            "label": "VL-project",
            "properties": {},
          },
          {
            "id": "ari",
            "label": "VL-user",
            "properties": {},
          },
        ],
      },
    ]);
  },
);

it(
  "V#countV",
  async (): Promise<void> => {
    chai.expect(Graph.read().Vertices().outVertex(vl("project")).countVertices()).to.equal(2);
  },
);

it(
  "V#listV",
  async (): Promise<void> => {
    chai.expect(Graph.read().Vertices().outVertex(vl("user")).listVertices()).to.deep.equal([
      {
        "id": "ari",
        "label": "VL-user",
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
    chai.expect(Graph.read().Vertices().outVertex(vl("user")).outEdge(el("created")).countEdges()).to.equal(2);
  },
);

it(
  "V#listE",
  async (): Promise<void> => {
    chai.expect(Graph.read().Vertices().outVertex(vl("project")).outEdge(el("creator")).listEdges()).to.deep.equal([
      {
        "label": "EL-creator",
        "thread": [
          {
            "id": 0,
            "label": "VL-project",
            "properties": {},
          },
          {
            "id": "ari",
            "label": "VL-user",
            "properties": {},
          },
        ],
      },
      {
        "label": "EL-creator",
        "thread": [
          {
            "id": 1,
            "label": "VL-project",
            "properties": {},
          },
          {
            "id": "ari",
            "label": "VL-user",
            "properties": {},
          },
        ],
      },
    ]);
  },
);
