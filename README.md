# Freedom Oriented Information Automation Database

## References

### [TypeReference](https://github.com/AriChivukula/foia-db/blob/master/source/reference/TypeReference.ts)

### [KindReference](https://github.com/AriChivukula/foia-db/blob/master/source/reference/KindReference.ts)

### [PointReference](https://github.com/AriChivukula/foia-db/blob/master/source/reference/PointReference.ts)

### [LinkReference](https://github.com/AriChivukula/foia-db/blob/master/source/reference/LinkReference.ts)

### [LineReference](https://github.com/AriChivukula/foia-db/blob/master/source/reference/LineReference.ts)

### [PropertyReference](https://github.com/AriChivukula/foia-db/blob/master/source/reference/PropertyReference.ts)

### [DatumReference](https://github.com/AriChivukula/foia-db/blob/master/source/reference/DatumReference.ts)

### [MetapropertyReference](https://github.com/AriChivukula/foia-db/blob/master/source/reference/MetapropertyReference.ts)

### [MetadatumReference](https://github.com/AriChivukula/foia-db/blob/master/source/reference/MetadatumReference.ts)

## Define

### Kind

`addKind(name: string): KindReference`

`removeKind(kind: KindReference): void`

### Link

`addLink(fromKind: KindReference, toKind: KindReference): LinkReference`

`removeLink(link: LinkReference): void`

### Property

`addProperty(name: string, schema: SchemaReference, type: TypeReference): PropertyReference`

`removeProperty(property: PropertyReference): void`

### Metaproperty

`addMetaproperty(name: string, property: PropertyReference, type: TypeReference): MetapropertyReference`

`removeMetaproperty(metaproperty: MetapropertyReference): void`

## Populate

### Point

`setPoint(kind: KindReference, name: string): PointReference`

`unsetPoint(point: PointReference): void`

### Datum

`setDatum(anchor: AnchorReference, propertyReference: PropertyReference, value: any): DatumReference`

`unsetDatum(datum: DatumReference): void`

### Metadatum

`setMetadatum(datum: DatumReference, metapropertyReference: MetapropertyReference, value: any): MetadatumReference`

`unsetMetadatum(metadatum: MetadatumReference): void`

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
