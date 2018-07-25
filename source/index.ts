import "@babel/polyfill";
import { readFileSync } from "fs";
// @ts-ignore
import * as gremlin from "gremlin";

export const DB: any = (new gremlin.structure.io.GraphSONWriter()).read(".foia-db.json");
