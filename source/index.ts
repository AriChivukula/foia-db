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

export class Vertex {
  label: VertexLabel;
  id: VertexID;
  properties: {[idx: PropertyLabel]: PropertyValue};
  
  public toString(): string {
    return this.label + "/" + this.id;
  }
}

export class Edge {
  public label: EdgeLabel;
  public thread: [Vertex, Vertex];
  
  public toString(): string {
    return this.thread[0].label + "/" + this.label + "/" + this.thread[1].label + "/" + this.thread[0].id + "/" + this.thread[1].id;
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
    this.vertexToWrite = {
      label,
      id,
      properties: {},
    };
    this.storage.vertices = this.storage.vertices.concat([this.vertexToWrite]);
    return this;
  }

  public addE(label: EdgeLabel, thread: Vertex[]): Graph {
    this.edgeToWrite = {
      label,
      thread,
    };
    this.storage.edges = this.storage.edges.concat([this.edgeToWrite]);
    return this;
  }

  public property(label: PropertyLabel, value: PropertyValue): Graph {
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

  public hasLabel(label: VertexLabel): Graph {
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

  public count(): number {
    return this.verticesToRead.length;
  }

  public toList(): Vertex[] {
    return this.verticesToRead;
  }
}
