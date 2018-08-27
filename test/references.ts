
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
  DatumReference,
  MetapropertyReference,
  MetadatumReference,
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
    chai.expect(line.fromPoint().kind().name())
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
  "DatumReference",
  async (): Promise<void> => {
    let datum = DatumReference.get(
      PointReference.get(
        KindReference.get("test1"),
        "test2",
      ),
      PropertyReference.get(
        "test3",
        KindReference.get("test1"),
        TypeReference.get(Count.ONE, Format.STRING),
      ),
      "test4",
    );
    chai.expect((datum.anchor() as PointReference).kind().name())
      .to
      .equal("test1");
    chai.expect((datum.anchor() as PointReference).name())
      .to
      .equal("test2");
    chai.expect(datum.property().name())
      .to
      .equal("test3");
    chai.expect((datum.property().schema() as KindReference).name())
      .to
      .equal("test1");
    chai.expect(datum.property().type().count())
      .to
      .equal(Count.ONE);
    chai.expect(datum.property().type().format())
      .to
      .equal(Format.STRING);
    chai.expect(datum.value())
      .to
      .equal("test4");
  },
);

it(
  "MetapropertyReference",
  async (): Promise<void> => {
    let metaproperty = MetapropertyReference.get(
      "test1",
      PropertyReference.get(
        "test2",
        KindReference.get("test3"),
        TypeReference.get(Count.ONE, Format.STRING),
      ),
      TypeReference.get(Count.ONE, Format.STRING),
    );
    chai.expect(metaproperty.name())
      .to
      .equal("test1");
    chai.expect(metaproperty.property().name())
      .to
      .equal("test2");
    chai.expect((metaproperty.property().schema() as KindReference).name())
      .to
      .equal("test3");
    chai.expect(metaproperty.property().type().count())
      .to
      .equal(Count.ONE);
    chai.expect(metaproperty.property().type().format())
      .to
      .equal(Format.STRING);
    chai.expect(metaproperty.type().count())
      .to
      .equal(Count.ONE);
    chai.expect(metaproperty.type().format())
      .to
      .equal(Format.STRING);
  },
);

it(
  "MetadatumReference",
  async (): Promise<void> => {
    let metadatum = MetadatumReference.get(
      DatumReference.get(
        PointReference.get(
          KindReference.get("test1"),
          "test2",
        ),
        PropertyReference.get(
          "test3",
          KindReference.get("test1"),
          TypeReference.get(Count.ONE, Format.STRING),
        ),
        "test4",
      ),
      MetapropertyReference.get(
        "test5",
        PropertyReference.get(
          "test3",
          KindReference.get("test1"),
          TypeReference.get(Count.ONE, Format.STRING),
        ),
        TypeReference.get(Count.ONE, Format.STRING),
      ),
      "test6",
    );
    chai.expect((metadatum.datum().anchor() as PointReference).kind().name())
      .to
      .equal("test1");
    chai.expect((metadatum.datum().anchor() as PointReference).name())
      .to
      .equal("test2");
    chai.expect(metadatum.datum().property().name())
      .to
      .equal("test3");
    chai.expect((metadatum.datum().property().schema() as KindReference).name())
      .to
      .equal("test1");
    chai.expect(metadatum.datum().property().type().count())
      .to
      .equal(Count.ONE);
    chai.expect(metadatum.datum().property().type().format())
      .to
      .equal(Format.STRING);
    chai.expect(metadatum.datum().value())
      .to
      .equal("test4");
    chai.expect(metadatum.metaproperty().name())
      .to
      .equal("test5");
    chai.expect(metadatum.metaproperty().property().name())
      .to
      .equal("test3");
    chai.expect((metadatum.metaproperty().property().schema() as KindReference).name())
      .to
      .equal("test1");
    chai.expect(metadatum.metaproperty().property().type().count())
      .to
      .equal(Count.ONE);
    chai.expect(metadatum.metaproperty().property().type().format())
      .to
      .equal(Format.STRING);
    chai.expect(metadatum.metaproperty().type().count())
      .to
      .equal(Count.ONE);
    chai.expect(metadatum.metaproperty().type().format())
      .to
      .equal(Format.STRING);
    chai.expect(metadatum.value())
      .to
      .equal("test6");
  },
);
