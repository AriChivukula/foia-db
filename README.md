# Freedom Oriented Information Automation Database

## Classes

### TypeReference

`getName(): string`

### KindReference

`getName(): string`

### PointReference

`getKind(): KindReference`

`getName(): string`

### LinkReference

`getFromKind(): KindReference`

`getToKind(): KindReference`

### LineReference

`getFromPoint(): PointReference`

`getToPoint(): PointReference`

### PropertyReference

`getAnchor(): KindReference | LinkReference`

`getName(): string`

`getType(): TypeReference`

### DataReference

`getAnchor(): PointReference | LineReference`

`getName(): string`

`getType(): TypeReference`

`getValue(): any`

### MetapropertyReference

`getMetaproperty(): PropertyReference`

`getName(): string`

`getType(): TypeReference`

### MetadataReference

`getMetaproperty(): PropertyReference`

`getName(): string`

`getType(): TypeReference`

`getValue(): any`

## Define

### Kind

`addKind(name: string): KindReference`

`removeKind(kind: KindReference): void`

### Link

`addLink(fromKind: KindReference, toKind: KindReference): LinkReference`

`removeLink(link: LinkReference): void`

### Property

`addProperty(anchor: KindReference | LinkReference, name: string, type: TypeReference): PropertyReference`

`removeProperty(property: PropertyReference): void`

### Metaproperty

`addMetaproperty(property: PropertyReference, name: string, type: TypeReference): MetapropertyReference`

`removeMetaproperty(metaproperty: MetapropertyReference): void`

## Populate

### Point

`setPoint(kind: KindReference, name: string): PointReference`

`unsetPoint(point: PointReference): void`

### Data

`setData(anchor: PointReference | LineReference, name: string, value: any): DataReference`

`unsetData(data: DataReference): void`

### Metadata

`setMetadata(data: DataReference, name: string, value: any): MetadataReference`

`unsetMetadata(metadata: MetadataReference): void`

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

`oneProperty(anchor: KindReference | LinkReference, name: string): PropertyReference`

`allProperties(anchor: KindReference | LinkReference): PropertyReference[]`

### Data

`oneDatum(anchor: PointReference | LineReference, name: string): DataReference`

`allData(anchor: PointReference | LineReference): DataReference[]`

### Metaproperty

`oneMetaproperty(property: PropertyReference, name: string, type: TypeReference): MetapropertyReference`

`allMetaproperties(property: PropertyReference): MetapropertyReference[]`

### Metadata

`oneMetadatum(property: PropertyReference, name: string): MetadataReference`

`allMetadata(property: PropertyReference): MetadataReference[]`
