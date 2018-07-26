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

export interface Vertex {
  label: VertexLabel;
  id: VertexID;
  properties: {[idx: PropertyLabel]: PropertyValue};
}

export interface Edge {
  label: EdgeLabel;
  thread: Vertex[]
}

export interface GraphStore {
  edges: Edge[];
  vertices: Vertex[];
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
    (this.vertexToWrite as VertexStorage).properties[key] = value;
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
    this.verticesToRead = this.verticesToRead.filter((vertex: VertexStorage) => vertex.label === label);
    const nextEdges: any = {};
    this.verticesToRead.map(
      (vertex: VertexStorage) => {
        Object.values(this.storage.edges)
          .filter((edge: EdgeStorage) => edge.source_id === vertex.id && edge.source_label === vertex.label)
          .map(
            (edge: EdgeStorage) => {
              nextEdges[edge.source_label + "-" + edge.source_id + "-" + edge.label + "-" + edge.target_label + "-" + edge.target_id] = edge;
            },
          );
      },
    );
    this.edgesToRead = Object.values(nextEdges);
    return this;
  }

  public outE(label: EdgeLabel): Graph {
    this.edgesToRead = this.edgesToRead.filter((edge: EdgeStorage) => edge.label === label);
    const nextVertices: any = {};
    this.edgesToRead.map(
      (edge: EdgeStorage) => {
        Object.values(this.storage.vertices)
          .filter((vertex: VertexStorage) => vertex.id === edge.target_id && vertex.label === edge.target_label)
          .map(
            (vertex: VertexStorage) => {
              nextVertices[vertex.label + "-" + vertex.id] = vertex;
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
