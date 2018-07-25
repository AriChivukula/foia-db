import "@babel/polyfill";
import { readFileSync } from "fs";
// @ts-ignore
import * as gremlin from "gremlin";

export const DB: gremlin.process.GraphTraversal = new gremlin.process.GraphTraversalSource(
  new gremlin.structure.Graph(),
  new gremlin.process.TraversalStrategies(),
  {
    sourceInstructions: [],
    stepInstructions: JSON.parse(readFileSync(".foia-db.json", "ascii")),
  },
);
