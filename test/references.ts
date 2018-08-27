
import "mocha";

import * as chai from "chai";

import {
  TypeReference,
  KindReference,
  PointReference,
  LinkReference,
  LineReference,
  PropertyReference,
  DataReference,
  MetapropertyReference,
  MetadataReference,
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

it(
  "PropertyReference",
  async (): Promise<void> => {
    let property = PropertyReference.get(
      KindReference.get("test1"),
      "test2",
      TypeReference.string(),
    );
    chai.expect(property.schema().name())
      .to
      .equal("test1");
    chai.expect(property.name())
      .to
      .equal("test2");
    chai.expect(property.type().name())
      .to
      .equal("string");
  },
);


it(
  "DataReference",
  async (): Promise<void> => {
    let data = DataReference.get(
      PointReference.get(
        KindReference.get("test1"),
        "test2",
      ),
      PropertyReference.get(
        KindReference.get("test3"),
        "test4",
        TypeReference.string(),
      ),
      "test4",
    );
    chai.expect(data.anchor().kind().name())
      .to
      .equal("test1");
    chai.expect(data.anchor().name())
      .to
      .equal("test2");
    chai.expect(data.property().kind().name())
      .to
      .equal("test3");
    chai.expect(data.property().name())
      .to
      .equal("test4");
    chai.expect(data.property().type().name())
      .to
      .equal("string");
    chai.expect(data.value())
      .to
      .equal("test4");
  },
);
