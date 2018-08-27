import {
  PointReference,
} from "./PointReference";
import {
  LineReference,
} from "./LineReference";
import {
  PropertyReference,
} from "./PropertyReference";

export type AnchorReference = PointReference | LineReference;

export interface IDataReference {
  readonly anchorReference: AnchorReference;
  readonly propertyReference: PropertyReference;
  readonly value: any;
}

export class DataReference {

  public static get(anchorReference: AnchorReference, propertyReference: PropertyReference, value: any): DataReference {
    return new DataReference({
      anchorReference,
      propertyReference,
      value,
    });
  }

  private constructor(
    private readonly props: IDataReference,
  ) {
  }

  public anchor(): AnchorReference {
    return this.props.anchorReference;
  }
  
  public property(): string {
    return this.props.propertyReference;
  }
  
  public value(): any {
    return this.props.value;
  }
}
