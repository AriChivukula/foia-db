# Freedom Oriented Information Automation Database

## Define

### Kind

`addKind(kind: string): KindReference`

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

`setData(anchor: PointReference | LineReference, name: string, data: any): DataReference`

`unsetData(data: DataReference): void`

### Metadata

`setMetadata(data: DataReference, name: string, data: any): MetadataReference`

`unsetMetadata(metadata: MetadataReference): void`

## Query

### Kind

`getKind(kind: string): KindReference`

`getKinds(): KindReference[]`

### Point

`getPoint(kind: KindReference, name: string): PointReference`

`getPoints(kind: KindReference): PointReference[]`

### Link

`getLink(fromKind: KindReference, toKind: KindReference): LinkReference`

`getLinks(fromKind: KindReference): LinkReference[]`

### Line

`getLine(fromPoint: PointReference, toPoint: PointReference): LineReference`

`getLines(fromPoint: PointReference): LineReference[]`

### Property

`getProperty(anchor: KindReference | LinkReference, name: string, type: TypeReference): PropertyReference`

`getProperties(anchor: KindReference | LinkReference): PropertyReference[]`

### Data

### Metaproperty

`getMetaproperty(property: PropertyReference, name: string, type: TypeReference): MetapropertyReference`

`getMetaproperty(property: PropertyReference): MetapropertyReference[]`

### Metadata
