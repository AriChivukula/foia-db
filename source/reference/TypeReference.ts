export interface ITypeReference {
  readonly list: boolean;
  readonly name: string;
}

export class TypeReference {
  
  public static boolean(): TypeReference {
    return new TypeReference({
      list: false,
      name: "boolean",
    });
  }
  
  public static booleanArray(): TypeReference {
    return new TypeReference({
      list: true,
      name: "boolean",
    });
  }

  public static number(): TypeReference {
    return new TypeReference({
      list: false,
      name: "number",
    });
  }
  
  public static numberArray(): TypeReference {
    return new TypeReference({
      list: true,
      name: "number",
    });
  }
  
  public static string(): TypeReference {
    return new TypeReference({
      list: false,
      name: "string",
    });
  }
  
  public static stringArray(): TypeReference {
    return new TypeReference({
      list: true,
      name: "string",
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
