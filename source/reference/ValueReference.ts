import {
  TypeReference,
} from "./TypeReference";

export interface IValueReference {
  readonly typeReference: TypeReference;
  readonly value: any;
}

export class ValueReference {

  public static get(typeReference: TypeReference, value: any): ValueReference {
    return new ValueReference({
      typeReference,
      value,
    });
  }

  private constructor(
    private readonly props: IValueReference,
  ) {
  }

  public type(): TypeReference {
    return this.props.typeReference;
  }
  
  public value(): any {
    return this.props.value;
  }
}
