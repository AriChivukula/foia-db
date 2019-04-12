import "@babel/polyfill";
import "fake-indexeddb/auto";

import {
  DBSchema,
} from 'idb';

export async function readIndexedDB(directory: string): Promise<void> {
  const mod: { default: DBSchema } = require(`${directory}/schema`);
  console.log(mod.default);
}
