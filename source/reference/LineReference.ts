import {
  PointReference,
} from "./PointReference";

export interface ILineReference {
  readonly fromPointReference: PointReference;
  readonly toPointReference: PointReference;
}

export class LineReference {

  public static get(fromPointReference: PointReference, toPointReference: PointReference): LineReference {
    return new LineReference({
      fromPointReference,
      toPointReference,
    });
  }

  private constructor(
    private readonly props: ILineReference,
  ) {
  }

  public fromPoint(): PointReference {
    return this.props.fromPointReference;
  }
  
  public toPoint(): PointReference {
    return this.props.toPointReference;
  }
}
