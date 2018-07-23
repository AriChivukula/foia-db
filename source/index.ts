import "@babel/polyfill";
import { readFileSync } from "fs";

export const Client: any = JSON.parse(readFileSync(".foia-db.json", "ascii"));;
