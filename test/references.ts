
import "mocha";

import * as chai from "chai";

import {
  TypeReference,
} from "../source/index";

it(
  "TypeReference",
  async (): Promise<void> => {
    chai.expect(TypeReference.string().name()).to.equal("string");
    chai.expect(TypeReference.numberList().name()).to.equal("number[]");
    chai.expect(TypeReference.booleanList().name()).to.not.equal(TypeReference.boolean().name());
  },
);
