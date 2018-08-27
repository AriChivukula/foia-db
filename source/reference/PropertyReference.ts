import {
  KindReference,
} from "./KindReference";
import {
  LinkReference,
} from "./LinkReference";
import {
  TypeReference,
} from "./TypeReference";

export type SchemaReference = KindReference | LinkReference;

export interface IPropertyReference {
  readonly name: string;
  readonly schemaReference: SchemaReference;
  readonly typeReference: TypeReference;
}

export class PropertyReference {

  public static get(name: string, schemaReference: SchemaReference, typeReference: TypeReference): PropertyReference {
    return new PropertyReference({
      name,
      schemaReference,
      typeReference,
    });
  }

  private constructor(
    private readonly props: IPropertyReference,
  ) {
  }

  public name(): string {
    return this.props.name;
  }

  public schema(): SchemaReference {
    return this.props.schemaReference;
  }
  
  public type(): TypeReference {
    return this.props.typeReference;
  }
}
