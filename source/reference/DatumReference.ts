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

export interface IDatumReference {
  readonly anchorReference: AnchorReference;
  readonly propertyReference: PropertyReference;
  readonly value: any;
}

export class DatumReference {

  public static get(anchorReference: AnchorReference, propertyReference: PropertyReference, value: any): DatumReference {
    return new DatumReference({
      anchorReference,
      propertyReference,
      value,
    });
  }

  private constructor(
    private readonly props: IDatumReference,
  ) {
  }

  public anchor(): AnchorReference {
    return this.props.anchorReference;
  }
  
  public property(): PropertyReference {
    return this.props.propertyReference;
  }
  
  public value(): any {
    return this.props.value;
  }
}
