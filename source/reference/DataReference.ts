import {
  PointReference,
} from "./PointReference";
import {
  LineReference,
} from "./LineReference";
import {
  ValueReference,
} from "./ValueReference";

export type AnchorReference = PointReference | LineReference;

export interface IDataReference {
  readonly anchorReference: AnchorReference;
  readonly name: string;
  readonly valueReference: ValueReference;
}

export class DataReference {

  public static get(anchorReference: AnchorReference, name: string, valueReference: ValueReference): DataReference {
    return new DataReference({
      anchorReference,
      name,
      valueReference,
    });
  }

  private constructor(
    private readonly props: IDataReference,
  ) {
  }

  public anchor(): AnchorReference {
    return this.props.anchorReference;
  }
  
  public name(): string {
    return this.props.name;
  }
  
  public value(): ValueReference {
    return this.props.valueReference;
  }
}
