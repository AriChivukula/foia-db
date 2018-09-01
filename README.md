# Freedom Oriented Information Automation Database

## References

### Base

#### [`Count`](https://github.com/AriChivukula/foia-db/blob/master/source/reference/TypeReference.ts): `ONE`, `MANY`

#### [`Format`](https://github.com/AriChivukula/foia-db/blob/master/source/reference/TypeReference.ts): `BOOLEAN`, `NUMBER`, `STRING`

#### [`Type`](https://github.com/AriChivukula/foia-db/blob/master/source/reference/TypeReference.ts): `Count` * `Format`

### Schema

#### [`Kind`](https://github.com/AriChivukula/foia-db/blob/master/source/reference/KindReference.ts): `kinds[1]`

#### [`Link`](https://github.com/AriChivukula/foia-db/blob/master/source/reference/LinkReference.ts): `kinds[2]`

#### [`Property`](https://github.com/AriChivukula/foia-db/blob/master/source/reference/PropertyReference.ts): `kinds[$]`, `properties[1]`, `type`

#### [`Metaproperty`](https://github.com/AriChivukula/foia-db/blob/master/source/reference/MetapropertyReference.ts): `kinds[$]`, `properties[2]`, `type`

### Anchor

#### [`Point`](https://github.com/AriChivukula/foia-db/blob/master/source/reference/PointReference.ts): `kinds[1]`, `points[1]`

#### [`Line`](https://github.com/AriChivukula/foia-db/blob/master/source/reference/LineReference.ts): `kinds[2]`, `points[2]`

#### [`Datum`](https://github.com/AriChivukula/foia-db/blob/master/source/reference/DatumReference.ts): `kinds[$]`, `points[$]`, `properties[2]`, `value`

#### [`Metadatum`](https://github.com/AriChivukula/foia-db/blob/master/source/reference/MetadatumReference.ts): `kinds[$]`, `points[$]`, `properties[1]`, `value`

## [`Ledger`](https://github.com/AriChivukula/foia-db/blob/master/source/reference/Ledger.ts)

## Query

### Kind

`oneKind(name: string): KindReference`

`allKinds(): KindReference[]`

### Point

`onePoint(kind: KindReference, name: string): PointReference`

`allPoints(kind: KindReference): PointReference[]`

### Link

`oneLink(fromKind: KindReference, toKind: KindReference): LinkReference`

`allLinks(fromKind: KindReference): LinkReference[]`

### Line

`oneLine(fromPoint: PointReference, toPoint: PointReference): LineReference`

`allLines(fromPoint: PointReference): LineReference[]`

### Property

`oneProperty(schema: SchemaReference, name: string): PropertyReference`

`allProperties(schema: SchemaReference): PropertyReference[]`

### Datum

`oneDatum(anchor: AnchorReference, name: string): DatumReference`

`allData(anchor: AnchorReference): DatumReference[]`

### Metaproperty

`oneMetaproperty(property: PropertyReference, name: string): MetapropertyReference`

`allMetaproperties(property: PropertyReference): MetapropertyReference[]`

### Metadatum

`oneMetadatum(datum: DatumReference, name: string): MetadatumReference`

`allMetadata(datum: DatumReference): MetadatumReference[]`
