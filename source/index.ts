import "@babel/polyfill";
import "fake-indexeddb/auto";

import {
  promises,
} from 'fs';
import {
  DBSchema,
  IDBPDatabase,
  openDB,
} from 'idb';

export interface JSONSchema {
  [s: string]: {
    key: "string";
    value: {
      [s: string]: string;
    };
  };
}

export async function readIndexedDB<T extends DBSchema>(directory: string): Promise<IDBPDatabase<T>> {
  const mod: { default: T } = require(`${directory}/schema`);
  const data = await promises.readFile(`${directory}/schema.json`, { encoding: "ascii" });
  const schema: JSONSchema = JSON.parse(data);
  const db = await openDB<T>("db", 0);
  await setupSchema(directory, db, schema);
  return db;
}

async function setupSchema<T extends DBSchema>(directory: string, db: IDBPDatabase<T>, schema: JSONSchema): Promise<void> {
}

async function setupCollection<T extends DBSchema>(directory: string, db: IDBPDatabase<T>, schema: JSONSchema, collection: string): Promise<void> {
}

async function setupDocument<T extends DBSchema>(directory: string, db: IDBPDatabase<T>, schema: JSONSchema, collection: string, document: IDBValidKey): Promise<void> {
}
