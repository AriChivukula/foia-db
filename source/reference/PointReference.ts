import {
  KindReference,
} from "./KindReference";

export interface IPointReference {
  readonly kindReference: KindReference;
  readonly name: string;
}

export class PointReference {

  public static get(kindReference: KindReference, name: string): PointReference {
    return new PointReference({
      kindReference,
      name,
    });
  }

  private constructor(
    private readonly props: IPointReference,
  ) {
  }

  public kind(): KindReference {
    return this.props.kindReference;
  }

  public name(): string {
    return this.props.pointName;
  }
}
