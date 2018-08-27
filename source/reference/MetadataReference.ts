import {
  DataReference,
} from "./DataReference";
import {
  MetapropertyReference,
} from "./MetapropertyReference";

export interface IMetadataReference {
  readonly dataReference: DataReference;
  readonly metapropertyReference: MetapropertyReference;
  readonly value: any;
}

export class MetadataReference {

  public static get(dataReference: DataReference, metapropertyReference: MetapropertyReference, value: any): MetadataReference {
    return new MetadataReference({
      dataReference,
      metapropertyReference,
      value,
    });
  }

  private constructor(
    private readonly props: IMetadataReference,
  ) {
  }

  public data(): DataReference {
    return this.props.dataReference;
  }
  
  public metaproperty(): MetapropertyReference {
    return this.props.metapropertyReference;
  }
  
  public value(): any {
    return this.props.value;
  }
}
