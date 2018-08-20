import "mocha";

import * as chai from "chai";

import {
  Graph,
  vl,
} from "../source/read";

it(
  "E#countV",
  async (): Promise<void> => {
    chai.expect(Graph.read().Edges().outEdge(vl("user")).outVertex(vl("project")).countVertices()).to.equal(0);
  },
);

it(
  "E#listV",
  async (): Promise<void> => {
    chai.expect(Graph.read().Edges().outEdge(vl("project")).outVertex(vl("user")).listVertices()).to.deep.equal([]);
  },
);

it(
  "E#countE",
  async (): Promise<void> => {
    chai.expect(Graph.read().Edges().outEdge(vl("project")).countEdges()).to.equal(2);
  },
);

it(
  "E#listE",
  async (): Promise<void> => {
    chai.expect(Graph.read().Edges().outEdge(vl("user")).listEdges()).to.deep.equal([
      {
        "first": [
          "project",
          "0",
        ],
        "last": [
          "user",
          "ari",
        ],
        "properties": {
          "controls": {
            "id": [2, 3],
            "metadata": {
              "B": {
                "id": "test",
              },
            },
          },
          "permissions": {
            "id": ["four", "five"],
            "metadata": {
              "C": {
                "id": 42,
              },
            },
          },
          "thoughts": {
            "id": [false, true],
            "metadata": {
              "A": {
                "id": true,
              },
            },
          },
        },
      },
      {
        "first": [
          "project",
          "1",
        ],
        "last": [
         "user",
         "ari",
        ],
        "properties": {
          "controls": {
            "id": [3, 2],
            "metadata": {
              "B": {
                "id": "test2",
              },
            },
          },
          "permissions": {
            "id": ["five", "four"],
            "metadata": {
              "C": {
                "id": 43,
              },
            },
          },
          "thoughts": {
            "id": [true, false],
            "metadata": {
              "A": {
                "id": false,
              },
            },
          },
        },
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
        "label": "user",
        "properties": {
          "genders": {
            "id": [
              100,
              0,
            ],
            "metadata": {
              "G": {
                "id": [false, false],
              },
            },
          },
          "pronouns": {
            "id": [
              "they",
              "them",
              "their",
            ],
            "metadata": {
              "H": {
                "id": [1, 4, 9],
              },
            },
          },
          "thoughts": {
            "id": [
              true,
              false,
            ],
            "metadata": {
              "I": {
                "id": ["hello", "world"],
              },
            },
          },
        },
      },
    ]);
  },
);

it(
  "V#countE",
  async (): Promise<void> => {
    chai.expect(Graph.read().Vertices().outVertex(vl("user")).outEdge(vl("project")).countEdges()).to.equal(2);
  },
);

it(
  "V#listE",
  async (): Promise<void> => {
    chai.expect(Graph.read().Vertices().outVertex(vl("project")).outEdge(vl("user")).listEdges()).to.deep.equal([
      {
        "first": [
          "project",
          "0",
        ],
        "last": [
          "user",
          "ari",
        ],
        "properties": {
          "controls": {
            "id": [2, 3],
            "metadata": {
              "B": {
                "id": "test",
              },
            },
          },
          "permissions": {
            "id": ["four", "five"],
            "metadata": {
              "C": {
                "id": 42,
              },
            },
          },
          "thoughts": {
            "id": [false, true],
            "metadata": {
              "A": {
                "id": true,
              },
            },
          },
        },
      },
      {
        "first": [
          "project",
          "1",
        ],
        "last": [
         "user",
         "ari",
        ],
        "properties": {
          "controls": {
            "id": [3, 2],
            "metadata": {
              "B": {
                "id": "test2",
              },
            },
          },
          "permissions": {
            "id": ["five", "four"],
            "metadata": {
              "C": {
                "id": 43,
              },
            },
          },
          "thoughts": {
            "id": [true, false],
            "metadata": {
              "A": {
                "id": false,
              },
            },
          },
        },
      },
    ]);
  },
);
