import "@babel/polyfill";
import { readFileSync } from "fs";
// @ts-ignore
import * as gremlin from "gremlin";

export const DB: gremlin.GraphTraversal = (new gremlin.structure.io.GraphSONReader()).read(readFileSync(".foia-db.json", "ascii"));
