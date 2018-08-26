
import "mocha";

import * as chai from "chai";

import {
  TypeReference,
  KindReference,
  PointReference,
  LinkReference,
  LineReference,
} from "../source/index";

it(
  "TypeReference",
  async (): Promise<void> => {
    chai.expect(
      TypeReference.string().name(),
    )
      .to
      .equal("string");
    chai.expect(
      TypeReference.numberArray().name(),
    )
      .to
      .equal("number[]");
    chai.expect(
      TypeReference.booleanArray().name(),
    )
      .to
      .not
      .equal(TypeReference.boolean().name());
  },
);

it(
  "KindReference",
  async (): Promise<void> => {
    chai.expect(
      KindReference.get("test").name(),
    )
      .to
      .equal("test");
    chai.expect(
      KindReference.get("test").name(),
    )
      .to
      .equal(KindReference.get("test").name());
  },
);

it(
  "PointReference",
  async (): Promise<void> => {
    chai.expect(
      PointReference.get(
        "test2",
        KindReference.get("test")
      ).name(),
    )
      .to
      .equal("test2");
    chai.expect(
      PointReference.get(
        "test2",
        KindReference.get("test"),
      ).kind().name(),
    )
      .to
      .equal("test");
  },
);

it(
  "LinkReference",
  async (): Promise<void> => {
    chai.expect(
      LinkReference.get(
        KindReference.get("test"),
        KindReference.get("test2"),
      ).fromKind().name(),
    )
      .to
      .equal("test");
    chai.expect(
      LinkReference.get(
        KindReference.get("test"),
        KindReference.get("test2"),
      ).toKind().name(),
    )
      .to
      .equal("test2");
  },
);

it(
  "LineReference",
  async (): Promise<void> => {
    chai.expect(
      LineReference.get(
        PointReference.get("test1", KindReference.get("test2")),
        PointReference.get("test3", KindReference.get("test4")),
      ).fromPoint().name(),
    )
      .to
      .equal("test1");
    chai.expect(
      LineReference.get(
        PointReference.get("test1", KindReference.get("test2")),
        PointReference.get("test3", KindReference.get("test4")),
      ).toPoint().kind.name(),
    )
      .to
      .equal("test4");
  },
);
