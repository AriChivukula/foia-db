
import "mocha";

import * as chai from "chai";

import {
  TypeReference,
  KindReference,
} from "../source/index";

it(
  "TypeReference",
  async (): Promise<void> => {
    chai.expect(TypeReference.string().name()).to.equal("string");
    chai.expect(TypeReference.numberArray().name()).to.equal("number[]");
    chai.expect(TypeReference.booleanArray().name()).to.not.equal(TypeReference.boolean().name());
  },
);

it(
  "KindReference",
  async (): Promise<void> => {
    chai.expect(KindReference.get("test").name()).to.equal("test");
    chai.expect(KindReference.get("test").name()).to.equal(KindReference.get("test").name());
    chai.expect(KindReference.get("test").name()).to.not.equal(KindReference.get("test2").name());
  },
);
