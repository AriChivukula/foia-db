export interface ITypeReference {
  readonly typeName: string;
  readonly isList: boolean;
}

export class TypeReference {
  
  public static boolean(): TypeReference {
    return new TypeReference({
      typeName: "boolean",
      isList: false,
    });
  }
  
  public static booleanArray(): TypeReference {
    return new TypeReference({
      typeName: "boolean",
      isList: true,
    });
  }

  public static number(): TypeReference {
    return new TypeReference({
      typeName: "number",
      isList: false,
    });
  }
  
  public static numberArray(): TypeReference {
    return new TypeReference({
      typeName: "number",
      isList: true,
    });
  }
  
  public static string(): TypeReference {
    return new TypeReference({
      typeName: "string",
      isList: false,
    });
  }
  
  public static stringArray(): TypeReference {
    return new TypeReference({
      typeName: "string",
      isList: true,
    });
  }

  private constructor(
    private readonly props: ITypeReference,
  ) {
  }
  
  public name(): string {
    return this.props.typeName + (this.props.isList ? "[]" : "");
  }
}
