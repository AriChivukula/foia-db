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

function vk(vertex: IVertex): string {
  return edge.label + "/" + edge.id;
}

export interface IEdge {
  label: EdgeLabel;
  thread: [IVertex, IVertex];
}

function ek(edge: IEdge): string {
  return edge.thread[0].label + "/" + edge.label + "/" + edge.thread[1].label + "/" + edge.thread[0].id + "/" + edge.thread[1].id;
}

export interface IGraph {
  public edges: IEdge[];
  public vertices: IVertex[];
}

export class Graph {
  
  private edgeToWrite?: IEdge;
  private vertexToWrite?: IVertex;
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
    this.vertices = this.vertices.concat([this.vertexToWrite]);
    return this;
  }

  public addE(label: EdgeLabel, thread: [IVertex, IVertex]): Graph {
    this.edgeToWrite = Edge.new({
      label,
      thread,
    });
    this.edges = this.edges.concat([this.edgeToWrite]);
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
          .filter((edge: IEdge) => vk(edge.thread[0]) === vk(vertex))
          .map(
            (edge: IEdge) => {
              nextEdges[ek(edge)] = edge;
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
          .filter((vertex: IVertex) => vk(vertex) === vk(edge.thread[1]))
          .map(
            (vertex: IVertex) => {
              nextVertices[vk(vertex)] = vertex;
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
