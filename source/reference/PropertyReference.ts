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
  readonly schemaReference: SchemaReference;
  readonly name: string;
  readonly typeReference: TypeReference;
}

export class PropertyReference {

  public static get(schemaReference: SchemaReference, name: string, typeReference: TypeReference): PropertyReference {
    return new PropertyReference({
      schemaReference,
      name,
      typeReference,
    });
  }

  private constructor(
    private readonly props: IPropertyReference,
  ) {
  }

  public schema(): SchemaReference {
    return this.props.schemaReference;
  }
  
  public name(): string {
    return this.props.name;
  }
  
  public type(): TypeReference {
    return this.props.typeReference;
  }
}
