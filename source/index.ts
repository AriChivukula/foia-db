import "@babel/polyfill";
import { readFileSync } from "fs";

export const DB: any = JSON.parse(readFileSync(".foia-db.json", "ascii"));;
