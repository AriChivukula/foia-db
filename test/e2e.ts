import "mocha";

import * as chai from "chai";

import {
  noop,
} from "../source/index";

it(
  "noop",
  async (): Promise<void> => {
    noop();
  },
);
