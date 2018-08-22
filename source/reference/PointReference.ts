import {
  KindReference,
} from "./KindReference";

export interface IPointReference {
  readonly kindReference: KindReference;
  readonly pointName: string;
}

export class PointReference {

  public static get(pointName: string, kindReference: KindReference): PointReference {
    return new PointReference({
      pointName,
      kindReference,
    });
  }

  private constructor(
    private readonly props: IPointReference,
  ) {
  }

  public name(): string {
    return this.props.pointName;
  }
  
  public kind(): KindReference {
    return this.props.kindReference;
  }
}
