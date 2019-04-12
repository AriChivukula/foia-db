import {
  DBSchema,
} from 'idb';
 
interface TestDB extends DBSchema {
  "project": {
    key: number,
    value: {
      "description": string,
      "days": number,
      "timestamp": Date,
    },
    indexes: {
      "description": string,
      "days": number,
      "timestamp": Date,
    },
  },
  "user": {
    key: string,
    value: {
      "genders": number[],
      "pronouns": string[],
      "timestamps": Date[],
    },
    indexes: {
      "genders": number,
      "pronouns": string,
      "timestamps": Date,
    },
  },
}

export default TestDB;
