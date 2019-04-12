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
  const data = await promises.readFile(`${directory}/schema.json`, {encoding: "ascii"});
  const schema: JSONSchema = JSON.parse(data);
  const db = await openDB<T>("db", 1);
  await setupSchema(directory, db, schema);
  return db;
}

async function setupSchema<T extends DBSchema>(directory: string, db: IDBPDatabase<T>, schema: JSONSchema): Promise<void> {
  const promises = [];
  for (const collection in schema) {
    promises.push(setupCollection(directory, db, schema, collection));
  }
  await Promise.all(promises);
}

async function setupCollection<T extends DBSchema>(directory: string, db: IDBPDatabase<T>, schema: JSONSchema, collection: string): Promise<void> {
  const os = db.createObjectStore(collection);
  let paths = await promises.readdir(`${directory}/${collection}`);
  const promises = [];
  for (const path of paths) {
    const document = path.replace(`${directory}/${collection}/`, "").replace(".json", "");
    promises.push(setupDocument(directory, db, schema, collection, document));
  }
  await Promise.all(promises);
}

async function setupDocument<T extends DBSchema>(directory: string, db: IDBPDatabase<T>, schema: JSONSchema, collection: string, document: IDBValidKey): Promise<void> {
}
