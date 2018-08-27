import {
  PropertyReference,
} from "./PropertyReference";
import {
  TypeReference,
} from "./TypeReference";

export interface IMetapropertyReference {
  readonly name: string;
  readonly propertyReference: PropertyReference;
  readonly typeReference: TypeReference;
}

export class MetapropertyReference {

  public static get(name: string, propertyReference: PropertyReference, typeReference: TypeReference): MetapropertyReference {
    return new MetapropertyReference({
      name,
      propertyReference,
      typeReference,
    });
  }

  private constructor(
    private readonly props: IMetapropertyReference,
  ) {
  }

  public name(): string {
    return this.props.name;
  }

  public property(): PropertyReference {
    return this.props.propertyReference;
  }

  public type(): TypeReference {
    return this.props.typeReference;
  }
}
