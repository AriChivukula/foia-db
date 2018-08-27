
import "mocha";

import * as chai from "chai";

import {
  Count,
  Format,
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
    let type = TypeReference.get(Count.ONE, Format.STRING);
    chai.expect(type.count())
      .to
      .equal(Count.ONE);
    chai.expect(type.format())
      .to
      .equal(Format.STRING);
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
      KindReference.get("test2"),
      "test1",
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
      PointReference.get(KindReference.get("test1"), "test2"),
      PointReference.get(KindReference.get("test3"), "test4"),
    );
    chai.expect(line.toPoint().kind().name())
      .to
      .equal("test1");
    chai.expect(line.fromPoint().name())
      .to
      .equal("test2");
    chai.expect(line.toPoint().kind().name())
      .to
      .equal("test3");
    chai.expect(line.toPoint().name())
      .to
      .equal("test4");
  },
);

it(
  "PropertyReference",
  async (): Promise<void> => {
    let property = PropertyReference.get(
      "test1",
      KindReference.get("test2"),
      TypeReference.get(Count.ONE, Format.STRING),
    );
    chai.expect(property.name())
      .to
      .equal("test1");
    chai.expect((property.schema() as KindReference).name())
      .to
      .equal("test2");
    chai.expect(property.type().count())
      .to
      .equal(Count.ONE);
    chai.expect(property.type().format())
      .to
      .equal(Format.STRING);
  },
);


it(
  "DataReference",
  async (): Promise<void> => {
    let data = DataReference.get(
      PointReference.get(
        "test2",
        KindReference.get("test1"),
      ),
      PropertyReference.get(
        KindReference.get("test3"),
        "test4",
        TypeReference.get(Count.ONE, Format.STRING),
      ),
      "test4",
    );
    chai.expect((data.anchor() as PointReference).kind().name())
      .to
      .equal("test1");
    chai.expect((data.anchor() as PointReference).name())
      .to
      .equal("test2");
    chai.expect(data.property().kind().name())
      .to
      .equal("test3");
    chai.expect(data.property().name())
      .to
      .equal("test4");
    chai.expect(data.property().type().count())
      .to
      .equal(Count.ONE);
    chai.expect(data.property().type().format())
      .to
      .equal(Format.STRING);
    chai.expect(data.value())
      .to
      .equal("test4");
  },
);
