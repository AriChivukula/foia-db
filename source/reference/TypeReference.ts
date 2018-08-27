export enum Type {
  BOOLEAN,
  NUMBER,
  STRING,
}

export enum Count {
  ONE,
  MANY,
}

export interface ITypeReference {
  readonly count: Count;
  readonly type: Type;
}

export class TypeReference {
  
  public static one(type: Type): TypeReference {
    return new TypeReference({
      count: Count.ONE,
      type,
    });
  }
  
  public static many(type: Type): TypeReference {
    return new TypeReference({
      count: Count.MANY,
      type,
    });
  }

  private constructor(
    private readonly props: ITypeReference,
  ) {
  }
  
  public type(): Type {
    return this.props.type;
  }
  
  public count(): Count {
    return this.props.count;
  }
}
