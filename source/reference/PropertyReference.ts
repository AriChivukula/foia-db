import {
  KindReference,
} from "./KindReference";
import {
  LinkReference,
} from "./LinkReference";
import {
  TypeReference,
} from "./TypeReference";

export type AnchorReference = KindReference | LinkReference;

export interface IPropertyReference {
  readonly anchorReference: AnchorReference;
  readonly name: string;
  readonly typeReference: TypeReference;
}

export class PropertyReference {

  public static get(anchorReference: AnchorReference, name: string, typeReference: TypeReference): PropertyReference {
    return new PropertyReference({
      anchorReference,
      name,
      typeReference,
    });
  }

  private constructor(
    private readonly props: IPropertyReference,
  ) {
  }

  public anchor(): AnchorReference {
    return this.props.anchorReference;
  }
  
  public name(): string {
    return this.props.name;
  }
  
  public type(): TypeReference {
    return this.props.typeReference;
  }
}
