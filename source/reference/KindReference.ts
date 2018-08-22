export interface IKindReference {
  readonly kindName: string;
}

export class KindReference {

  public static get(name: string): KindReference {
    return new KindReference({
      kindName: name,
    });
  }

  private constructor(
    private readonly props: IKindReference,
  ) {
  }

  public name(): string {
    return this.props.kindName;
  }
}
