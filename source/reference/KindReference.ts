export interface IKindReference {
  readonly kindName: string;
}

export class KindReference {

  public static get(kindName: string): KindReference {
    return new KindReference({
      kindName,
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
