import "@babel/polyfill";
// @ts-ignore
import * as gremlin from "gremlin";

export const DB: gremlin.Graph = (new gremlin.structure.io.GraphSONReader()).read(".foia-db.json");
