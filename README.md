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

### Metadata

`addMetadata(property: PropertyReference, name: string, type: TypeReference): MetadataReference`

`removeMetadata(metadata: MetadataReference): void`
