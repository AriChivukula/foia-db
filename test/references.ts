
import "mocha";

import * as chai from "chai";

import {
  TypeReference,
  KindReference,
  PointReference,
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
  },
);

it(
  "PointReference",
  async (): Promise<void> => {
    chai.expect(PointReference.get("test2", KindReference.get("test")).name()).to.equal("test2");
    chai.expect(PointReference.get("test2", KindReference.get("test")).kind().name()).to.equal("test");
  },
);
