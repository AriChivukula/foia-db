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

`setData(point: PointReference, name: string, data: any): DataReference`

`unsetData(data: DataReference): void`

### Metadata

`setMetadata(data: DataReference, name: string, data: any): MetadataReference`

`unsetMetadata(metadata: MetadataReference): void`

## Query

### 

### 

