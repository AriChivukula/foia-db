export interface IKindReference {
  readonly name: string;
}

export class KindReference {

  public static get(name: string): KindReference {
    return new KindReference({
      name,
    });
  }

  private constructor(
    private readonly props: IKindReference,
  ) {
  }

  public name(): string {
    return this.props.name;
  }
}
