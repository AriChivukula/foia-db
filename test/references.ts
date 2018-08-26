
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
    let kind = KindReference.get("test");
    chai.expect(kind.name())
      .to
      .equal("test");
  },
);

it(
  "PointReference",
  async (): Promise<void> => {
    let point = PointReference.get(
      "test1",
      KindReference.get("test2")
    );
    chai.expect(point.name())
      .to
      .equal("test1");
    chai.expect(point.kind().name())
      .to
      .equal("test2");
  },
);

it(
  "LinkReference",
  async (): Promise<void> => {
    let link = LinkReference.get(
      KindReference.get("test1"),
      KindReference.get("test2"),
    );
    chai.expect(link.fromKind().name())
      .to
      .equal("test1");
    chai.expect(link.toKind().name())
      .to
      .equal("test2");
  },
);

it(
  "LineReference",
  async (): Promise<void> => {
    let line = LineReference.get(
      PointReference.get("test1", KindReference.get("test2")),
      PointReference.get("test3", KindReference.get("test4")),
    );
    chai.expect(line.fromPoint().name())
      .to
      .equal("test1");
    chai.expect(line.toPoint().kind().name())
      .to
      .equal("test4");
  },
);
