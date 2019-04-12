import {
  DBSchema,
} from 'idb';
 
interface TestDB extends DBSchema {
  project: {
    key: number,
    value: {
      description: string,
      days: number,
      active: boolean,
      timestamp: Date,
    },
    indexes: {
      description: string,
      days: number,
      active: boolean,
      timestamp: Date,
    },
  },
  user: {
    key: string,
    value: {
      genders: number[],
      pronouns: string[],
      thoughts: boolean[],
      timestamps: Date[],
    },
    indexes: {
      genders: number,
      pronouns: string,
      thoughts: boolean,
      timestamps: Date,
    },
  },
}
