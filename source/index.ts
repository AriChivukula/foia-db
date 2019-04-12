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
  return await openDB<T>(
    "db",
    0,
    {
      upgrade(db, oldVersion, newVersion, transaction) {
        await setupSchema(db, schema);
      },
      blocked() {
      },
      blocking() {
      }
    },
  );
}


async function setupSchema<T extends DBSchema>(db: IDBPDatabase<T>, schema: JSONSchema): Promise<void> {
}

async function setupCollection<T extends DBSchema>(db: IDBPDatabase<T>, schema: JSONSchema, collection: string): Promise<void> {
}

async function setupDocument<T extends DBSchema>(db: IDBPDatabase<T>, schema: JSONSchema, collection: string, document: IDBValidKey): Promise<void> {
}
