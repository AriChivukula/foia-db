import "@babel/polyfill";
import { readFileSync } from "fs";
// @ts-ignore
import * as gremlin from "gremlin";

export class FOIAGraph extends gremlin.structure.Graph {
}

export const DB: gremlin.process.GraphTraversal = (new FOIAGraph()).traversal();
