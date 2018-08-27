import {
  DatumReference,
} from "./DatumReference";
import {
  MetapropertyReference,
} from "./MetapropertyReference";

export interface IMetadatumReference {
  readonly datumReference: DatumReference;
  readonly metapropertyReference: MetapropertyReference;
  readonly value: any;
}

export class MetadatumReference {

  public static get(datumReference: DatumReference, metapropertyReference: MetapropertyReference, value: any): MetadatumReference {
    return new MetadatumReference({
      datumReference,
      metapropertyReference,
      value,
    });
  }

  private constructor(
    private readonly props: IMetadatumReference,
  ) {
  }

  public datum(): DatumReference {
    return this.props.datumReference;
  }
  
  public metaproperty(): MetapropertyReference {
    return this.props.metapropertyReference;
  }
  
  public value(): any {
    return this.props.value;
  }
}
