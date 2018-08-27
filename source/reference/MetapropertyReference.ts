import {
  PropertyReference,
} from "./PropertyReference";
import {
  TypeReference,
} from "./TypeReference";

export interface IMetapropertyReference {
  readonly propertyReference: PropertyReference;
  readonly name: string;
  readonly typeReference: TypeReference;
}

export class MetapropertyReference {

  public static get(propertyReference: PropertyReference, name: string, typeReference: TypeReference): MetapropertyReference {
    return new MetapropertyReference({
      propertyReference,
      name,
      typeReference,
    });
  }

  private constructor(
    private readonly props: IMetapropertyReference,
  ) {
  }

  public property(): PropertyReference {
    return this.props.propertyReference;
  }
  
  public name(): string {
    return this.props.name;
  }
  
  public type(): TypeReference {
    return this.props.typeReference;
  }
}
