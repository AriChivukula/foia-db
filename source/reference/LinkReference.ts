import {
  KindReference,
} from "./KindReference";

export interface ILinkReference {
  readonly fromKindReference: KindReference;
  readonly toKindReference: KindReference;
}

export class LinkReference {

  public static get(fromKindReference: KindReference, toKindReference: KindReference): LinkReference {
    return new LinkReference({
      fromKindReference,
      toKindReference,
    });
  }

  private constructor(
    private readonly props: ILinkReference,
  ) {
  }

  public toKind(): KindReference {
    return this.props.fromKindReference;
  }
  
  public fromKind(): KindReference {
    return this.props.toKindReference;
  }
}
