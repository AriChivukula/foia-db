# Freedom Oriented Information Automation Database

## References

### [`Count`](https://github.com/AriChivukula/foia-db/blob/master/source/reference/TypeReference.ts) = `[ONE, MANY]`

### [`Format`](https://github.com/AriChivukula/foia-db/blob/master/source/reference/TypeReference.ts) = `[BOOLEAN, NUMBER, STRING]`

### [`TypeReference`](https://github.com/AriChivukula/foia-db/blob/master/source/reference/TypeReference.ts) = `Count * Format`

### [`KindReference`](https://github.com/AriChivukula/foia-db/blob/master/source/reference/KindReference.ts) = `[$kind],[],[]`

### [`PointReference`](https://github.com/AriChivukula/foia-db/blob/master/source/reference/PointReference.ts) = `[$kind],[$point],[]`

### [`LinkReference`](https://github.com/AriChivukula/foia-db/blob/master/source/reference/LinkReference.ts) = `[$kind,$kind],[],[]`

### [`LineReference`](https://github.com/AriChivukula/foia-db/blob/master/source/reference/LineReference.ts) = `[$kind,$kind],[$point,$point],[]`

### [`PropertyReference`](https://github.com/AriChivukula/foia-db/blob/master/source/reference/PropertyReference.ts) = `$name * KindReference`

### [`DatumReference`](https://github.com/AriChivukula/foia-db/blob/master/source/reference/DatumReference.ts) = `$value * PropertyReference * PointReference`

### [`MetapropertyReference`](https://github.com/AriChivukula/foia-db/blob/master/source/reference/MetapropertyReference.ts) = `$name * PropertyReference`

### [`MetadatumReference`](https://github.com/AriChivukula/foia-db/blob/master/source/reference/MetadatumReference.ts) = `$value * MetapropertyReference * DatumReference`

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
