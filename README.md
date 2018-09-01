# Freedom Oriented Information Automation Database

## References

### Base

#### [`Count`](https://github.com/AriChivukula/foia-db/blob/master/source/reference/TypeReference.ts)
`ONE | MANY`

#### [`Format`](https://github.com/AriChivukula/foia-db/blob/master/source/reference/TypeReference.ts)
`BOOLEAN | NUMBER | STRING`

#### [`Type`](https://github.com/AriChivukula/foia-db/blob/master/source/reference/TypeReference.ts)
`Count[1] Format[1]`

#### `Value`
`Value[JSON.stringify(...)]`

### Schema

#### [`Kind`](https://github.com/AriChivukula/foia-db/blob/master/source/reference/KindReference.ts)
`Kind[1]`

#### [`Link`](https://github.com/AriChivukula/foia-db/blob/master/source/reference/LinkReference.ts)
`Kind[2]`

#### [`Property`](https://github.com/AriChivukula/foia-db/blob/master/source/reference/PropertyReference.ts)
`Kind[$] Property[1] Type`

#### [`Metaproperty`](https://github.com/AriChivukula/foia-db/blob/master/source/reference/MetapropertyReference.ts)
`Kind[$] Property[2] Type`

### Anchor

#### [`Point`](https://github.com/AriChivukula/foia-db/blob/master/source/reference/PointReference.ts)
`Kind[1] Point[1]`

#### [`Line`](https://github.com/AriChivukula/foia-db/blob/master/source/reference/LineReference.ts)
`Kind[2] Point[2]`

#### [`Datum`](https://github.com/AriChivukula/foia-db/blob/master/source/reference/DatumReference.ts)
`Kind[$] Property[1] Point[$] Value`

#### [`Metadatum`](https://github.com/AriChivukula/foia-db/blob/master/source/reference/MetadatumReference.ts)
`Kind[$] Property[2] Point[$] Value`

## [`Ledger`](https://github.com/AriChivukula/foia-db/blob/master/source/ledger/Ledger.ts)

## [`Query`](https://github.com/AriChivukula/foia-db/blob/master/source/query/Query.ts)

### Match

#### =

#### ~

#### <

#### >

#### !

#### &

#### |

### Select

#### Kind

#### Property

#### Point

#### Type

#### Value
