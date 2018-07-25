import "@babel/polyfill";
import { readFileSync } from "fs";
// @ts-ignore
import * as gremlin from "gremlin";

export class FOIAGraphSource extends gremlin.process.GraphTraversalSource {
}

export class FOIAGraph extends gremlin.structure.Graph {
  
  public traversal(): FOIAGraphSource {
    return new FOIAGraphSource(this, new gremlin.process.TraversalStrategies());
  }
}

export const DB: gremlin.process.GraphTraversalSource = (new FOIAGraph()).traversal();
