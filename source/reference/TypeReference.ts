export enum Count {
  ONE,
  MANY,
}

export enum Format {
  BOOLEAN,
  NUMBER,
  STRING,
}

export interface ITypeReference {
  readonly count: Count;
  readonly format: Format;
}

export class TypeReference {
  
  public static get(count: Count, format: Format): TypeReference {
    return new TypeReference({
      count,
      format,
    });
  }

  private constructor(
    private readonly props: ITypeReference,
  ) {
  }
  
  public count(): Count {
    return this.props.count;
  }
  
  public format(): Format {
    return this.props.format;
  }
}
