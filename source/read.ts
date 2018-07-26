import "@babel/polyfill";
import {
  readFileSync,
  writeFileSync,
} from "fs";

export type VertexLabel = string;
export type VertexID = any;

export type PropertyLabel = string;
export type PropertyValue = any;

export type EdgeLabel = string;
export type EdgeID = string;

export function vl(label: string): VertexLabel {
  return "VL-" + label;
}

export function el(label: string): EdgeLabel {
  return "EL-" + label;
}

export function vi(label: any): VertexID {
  return label;
}

export function ei(label: string): EdgeID {
  return label;
}

export interface IVertex {
  label: VertexLabel;
  id: VertexID;
  properties: {[idx: string]: PropertyValue};
}

export class Vertex {

  public static new(props: IVertex): Vertex {
    return new Vertex(props);
  }

  private constructor(
    private readonly props: IVertex,
  ) {
  }
  
  public toString(): string {
    return this.props.label + "/" + this.props.id;
  }
}

export interface IEdge {
  label: EdgeLabel;
  thread: [Vertex, Vertex];
}

export class Edge {

  public static new(props: IEdge): Edge {
    return new Edge(props);
  }

  private constructor(
    private readonly props: IEdge,
  ) {
  }

  public toString(): string {
    return this.props.thread[0].props.label + "/" + this.props.label + "/" + this.props.thread[1].props.label + "/" + this.props.thread[0].props.id + "/" + this.props.thread[1].props.id;
  }
}

export interface IGraph {
  public edges: IEdge[];
  public vertices: IVertex[];
}

export class Graph {
  
  private edgeToWrite?: Edge;
  private vertexToWrite?: Vertex;
  private edgesToRead: IEdge[] = [];
  private verticesToRead: IVertex[]= [];

  public static new(): Graph {
    return new Graph({
      edges: [],
      vertices: [],
    });
  }
  
  public static read(): Graph {
    return new Graph(JSON.parse(readFileSync(".foia-db.json", "ascii")));
  }

  private constructor(
    private readonly props: IGraph,
  ) {
  }

  public write(): void {
    writeFileSync(".foia-db.json", JSON.stringify(this.props))
  }

  /* Write */

  public addV(label: VertexLabel, id: VertexID): Graph {
    this.vertexToWrite = Vertex.new({
      label,
      id,
      properties: {},
    });
    this.vertices = this.vertices.concat([this.vertexToWrite.props]);
    return this;
  }

  public addE(label: EdgeLabel, thread: Vertex[]): Graph {
    this.edgeToWrite = Edge.new({
      label,
      thread,
    });
    this.edges = this.edges.concat([this.edgeToWrite.props]);
    return this;
  }

  public addP(label: PropertyLabel, value: PropertyValue): Graph {
    (this.vertexToWrite as IVertex).properties[key] = value;
    return this;
  }

  /* Read */

  public V(): Graph {
    this.verticesToRead = Object.values(this.storage.vertices);
    return this;
  }
  
  public E(): Graph {
    this.edgesToRead = Object.values(this.storage.edges);
    return this;
  }

  public outV(label: VertexLabel): Graph {
    this.verticesToRead = this.verticesToRead.filter((vertex: IVertex) => vertex.label === label);
    const nextEdges: any = {};
    this.verticesToRead.map(
      (vertex: IVertex) => {
        Object.values(this.storage.edges)
          .filter((edge: IEdge) => edge.thread[0].id === vertex.id && edge.thread[0].label === vertex.label)
          .map(
            (edge: IEdge) => {
              nextEdges[edge] = edge;
            },
          );
      },
    );
    this.edgesToRead = Object.values(nextEdges);
    return this;
  }

  public outE(label: EdgeLabel): Graph {
    this.edgesToRead = this.edgesToRead.filter((edge: IEdge) => edge.label === label);
    const nextVertices: any = {};
    this.edgesToRead.map(
      (edge: IEdge) => {
        Object.values(this.storage.vertices)
          .filter((vertex: IVertex) => vertex.id === edge.thread[1].id && vertex.label === edge.thread[1].label)
          .map(
            (vertex: IVertex) => {
              nextVertices[IVertex] = vertex;
            },
          );
      },
    );
    this.verticesToRead = Object.values(nextVertices);
    return this;
  }

  /* Terminal */

  public countV(): number {
    return this.verticesToRead.length;
  }

  public listV(): IVertex[] {
    return this.verticesToRead;
  }
  
  public countE(): number {
    return this.edgesToRead.length;
  }

  public listE(): IEdge[] {
    return this.edgesToRead;
  }
}
