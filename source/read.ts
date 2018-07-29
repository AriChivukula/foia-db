import "@babel/polyfill";
import {
  readFileSync,
  writeFileSync,
} from "fs";

export type VertexLabel = string;

export function vl(label: string): VertexLabel {
  return label;
}

export type VertexID = string;

export function vi(id: string): VertexID {
  return id;
}

export type PropertyLabel = string;

export function pl(label: string): PropertyLabel {
  return label;
}

export type PropertyID = any;

export function pi(id: any): PropertyID {
  return id;
}

export interface IVertex {
  label: VertexLabel;
  id: VertexID;
  properties: {[idx: string]: PropertyValue};
}

function vk(vertex: IVertex): string {
  return vertex.label + "/" + vertex.id;
}

export interface IEdge {
  first: [VertexLabel, VertexID];
  last: [VertexLabel, VertexID];
  properties: {[idx: string]: PropertyValue};
}

function ek(edge: IEdge): string {
  return edge.first[0] + "/" + edge.first[1] + "/" + edge.last[0] + "/" + edge.last[1];
}

export interface IGraph {
  edges: IEdge[];
  vertices: IVertex[];
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
    this.vertexToWrite = {
      label,
      id,
      properties: {},
    };
    this.props.vertices = this.props.vertices.concat([this.vertexToWrite]);
    return this;
  }

  public addE(label: EdgeLabel, thread: [IVertex, IVertex]): Graph {
    this.edgeToWrite = {
      label,
      thread,
    };
    this.props.edges = this.props.edges.concat([this.edgeToWrite]);
    return this;
  }

  public addP(label: PropertyLabel, value: PropertyValue): Graph {
    (this.vertexToWrite as IVertex).properties[label] = value;
    return this;
  }

  /* Read */

  public V(): Graph {
    this.verticesToRead = this.props.vertices;
    return this;
  }
  
  public E(): Graph {
    this.edgesToRead = this.props.edges;
    return this;
  }

  public outV(label: VertexLabel): Graph {
    this.verticesToRead = this.verticesToRead.filter((vertex: IVertex) => vertex.label === label);
    let nextEdges: {[id: string]: IEdge} = {};
    this.verticesToRead.forEach(
      (vertex: IVertex) => {
        this.props.edges
          .filter((edge: IEdge) => vk(edge.thread[0]) === vk(vertex))
          .forEach(
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
    let nextVertices: {[id: string]: IVertex} = {};
    this.edgesToRead.forEach(
      (edge: IEdge) => {
        this.props.vertices
          .filter((vertex: IVertex) => vk(vertex) === vk(edge.thread[1]))
          .forEach(
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
