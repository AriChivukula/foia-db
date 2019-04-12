import "@babel/polyfill";
import "fake-indexeddb/auto";

import {
  promises,
} from 'fs';
import {
  DBSchema,
  openDB,
} from 'idb';

export async function readIndexedDB<T extends DBSchema>(directory: string): Promise<IDBPDatabase<T>> {
  const mod: { default: T } = require(`${directory}/schema`);
  const data = await promises.readFile(`${directory}/schema.json`);
  const jsonData = JSON.parse(data);
  return await openDB<T>(
    "db",
    0,
    {
      upgrade(db, oldVersion, newVersion, transaction) {
      },
      blocked() {
      },
      blocking() {
      }
    },
  );
}
