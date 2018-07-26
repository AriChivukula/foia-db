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
    return this.props.thread[0].label + "/" + this.props.label + "/" + this.props.thread[1].label + "/" + this.props.thread[0].id + "/" + this.props.thread[1].id;
  }
}

export interface GraphStore {
  public edges: Edge[];
  public vertices: Vertex[];
}

export class Graph {

  private storage: GraphStorage;
  private edgeToWrite?: Edge;
  private vertexToWrite?: Vertex;
  private edgesToRead: Edge[] = [];
  private verticesToRead: Vertex[]= [];

  public static new(): Graph {
    return new Graph(false);
  }

  public static read(): Graph {
    return new Graph(true);
  }

  private constructor(try_read: boolean) {
    if (try_read) {
      this.storage = JSON.parse(readFileSync(".foia-db.json", "ascii"));
    } else {
      this.storage = {
        edges: [],
        vertices: [],
      };
    }
  }

  public write(): void {
    writeFileSync(".foia-db.json", JSON.stringify(this.storage))
  }

  /* Write */

  public addV(label: VertexLabel, id: VertexID): Graph {
    this.vertexToWrite = Vertex.new({
      label,
      id,
      properties: {},
    });
    this.storage.vertices = this.storage.vertices.concat([this.vertexToWrite]);
    return this;
  }

  public addE(label: EdgeLabel, thread: Vertex[]): Graph {
    this.edgeToWrite = Edge.new({
      label,
      thread,
    });
    this.storage.edges = this.storage.edges.concat([this.edgeToWrite]);
    return this;
  }

  public addP(label: PropertyLabel, value: PropertyValue): Graph {
    (this.vertexToWrite as Vertex).properties[key] = value;
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
    this.verticesToRead = this.verticesToRead.filter((vertex: Vertex) => vertex.label === label);
    const nextEdges: any = {};
    this.verticesToRead.map(
      (vertex: Vertex) => {
        Object.values(this.storage.edges)
          .filter((edge: Edge) => edge.thread[0].id === vertex.id && edge.thread[0].label === vertex.label)
          .map(
            (edge: Edge) => {
              nextEdges[edge] = edge;
            },
          );
      },
    );
    this.edgesToRead = Object.values(nextEdges);
    return this;
  }

  public outE(label: EdgeLabel): Graph {
    this.edgesToRead = this.edgesToRead.filter((edge: Edge) => edge.label === label);
    const nextVertices: any = {};
    this.edgesToRead.map(
      (edge: EdgeStorage) => {
        Object.values(this.storage.vertices)
          .filter((vertex: Vertex) => vertex.id === edge.thread[1].id && vertex.label === edge.thread[1].label)
          .map(
            (vertex: Vertex) => {
              nextVertices[vertex] = vertex;
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

  public listV(): Vertex[] {
    return this.verticesToRead;
  }
  
  public countE(): number {
    return this.edgesToRead.length;
  }

  public listE(): Edge[] {
    return this.edgesToRead;
  }
}
