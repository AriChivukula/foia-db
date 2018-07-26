import "@babel/polyfill";
import {
  readFileSync,
  writeFileSync,
} from "fs";

export interface EdgeStorage {
  label: string;
  source_id: any;
  source_label: string;
  target_id: any;
  target_label: string;
}

export interface VertexStorage {
  label: string;
  id: any;
  properties: any;
}

export interface GraphStorage {
  edges: EdgeStorage[];
  vertices: VertexStorage[];
}

export class Graph {

  private storage: GraphStorage;
  private edgeToWrite?: EdgeStorage;
  private vertexToWrite?: VertexStorage;
  private edgesToRead: EdgeStorage[] = [];
  private verticesToRead: VertexStorage[]= [];

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

  public addV(label: string, id: any): Graph {
    this.vertexToWrite = {
      label,
      id,
      properties: {},
    };
    this.storage.vertices = this.storage.vertices.concat([this.vertexToWrite]);
    return this;
  }

  public addE(label: string, target_label: string, target_id: any): Graph {
    this.edgeToWrite = {
      label,
      source_label: (this.vertexToWrite as VertexStorage).label,
      source_id: (this.vertexToWrite as VertexStorage).properties["_id"],
      target_label,
      target_id,
    };
    this.storage.edges = this.storage.edges.concat([this.edgeToWrite]);
    return this;
  }

  public property(key: string, value: any): Graph {
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

  public hasLabel(label: string): Graph {
    this.verticesToRead = this.verticesToRead.filter((vertex: VertexStorage) => vertex.label === label);
    const nextEdges: any = {};
    this.verticesToRead.map(
      (vertex: VertexStorage) => {
        Object.values(this.storage.edges)
          .filter((edge: EdgeStorage) => edge.source_id === vertex.properties["_id"] && edge.source_label === vertex.label)
          .map(
            (edge: EdgeStorage) => {
              nextEdges[edge.source_label + "/" + edge.source_id + "/" + edge.label + "/" + edge.target_label + "/" + edge.target_id] = edge;
            },
          );
      },
    );
    this.edgesToRead = Object.values(nextEdges);
    return this;
  }

  public outE(label: string): Graph {
    this.edgesToRead = this.edgesToRead.filter((edge: EdgeStorage) => edge.label === label);
    const nextVertices: any = {};
    this.edgesToRead.map(
      (edge: EdgeStorage) => {
        Object.values(this.storage.vertices)
          .filter((vertex: VertexStorage) => vertex.properties["_id"] === edge.target_id && vertex.label === edge.target_label)
          .map(
            (vertex: VertexStorage) => {
              nextVertices[vertex.label + "/" + vertex.properties["_id"]] = vertex;
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

  public toList(): VertexStorage[] {
    return this.verticesToRead;
  }
}
