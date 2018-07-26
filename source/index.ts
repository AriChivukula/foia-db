import "@babel/polyfill";
import { readFileSync, writeFileSync } from "fs";

interface EdgeStorage {
  label: string;
  source_id: any;
  source_label: string;
  target_id: any;
  target_label: string;
}

interface VertexStorage {
 label: string;
 properties: any;
}

interface GraphStorage {
  edges: EdgeStorage[];
  vertices: VertexStorage[];
}

export class Graph {

  private storage: GraphStorage;
  private edgeToWrite?: EdgeStorage;
  private vertexToWrite?: VertexStorage;
  private edgesToRead?: EdgeStorage[];
  private verticesToRead?: VertexStorage[];

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

  private endWrites(): void {
    this.edgeToWrite = undefined;
    this.vertexToWrite = undefined;
  }

  private endReads(): void {
    this.edgesToRead = undefined;
    this.verticesToRead = undefined;
  }

  public write(): void {
    writeFileSync(".foia-db.json", JSON.stringify(this.storage))
  }

  /* Write */

  public addV(label: string): Graph {
    this.endReads();
    this.vertexToWrite = {
      label,
      properties: {},
    };
    this.storage.vertices = this.storage.vertices.concat([this.vertexToWrite]);
    return this;
  }

  public addE(label: string, target_label: string, target_id: string): Graph {
    this.endReads();
    this.edgeToWrite = {
      label,
      source_label: (this.vertexToWrite as VertexStorage).label,
      source_id: (this.vertexToWrite as VertexStorage).properties["id"],
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
    this.endWrites();
    this.verticesToRead = Object.values(this.storage.vertices);
    return this;
  }

  public hasLabel(label: string): Graph {
    this.verticesToRead = (this.verticesToRead as VertexStorage[]).filter((vertex: VertexStorage) => vertex.label === label);
    const nextEdges: any = {};
    (this.verticesToRead as VertexStorage[]).map(
      (vertex: VertexStorage) => {
        (this.edgesToRead as EdgeStorage[]).concat(
          Object.values(this.storage.edges)
            .filter((edge: EdgeStorage) => edge.source_id === vertex.properties["id"] && edge.source_label === vertex.label)
            .map(
              (edge: EdgeStorage) => {
                nextEdges[vertex.label + "/" + vertex.properties["id"] + "--EDGE--" + edge.source_label + "/" + edge.source_id] = vertex;
              },
            );
        );
      },
    );
    this.edgesToRead = Object.values(nextEdges);
    return this;
  }

  public outE(label: string): Graph {
    this.edgesToRead = (this.edgesToRead as EdgeStorage[]).filter((edge: EdgeStorage) => edge.label === label);
    const nextVertices: any = {};
    (this.edgesToRead as EdgeStorage[]).map(
      (edge: EdgeStorage) => {
        (this.verticesToRead as VertexStorage[]).concat(
          Object.values(this.storage.vertices)
            .filter((vertex: VertexStorage) => vertex.properties["id"] === edge.target_id && vertex.label === edge.label)
            .map(
              (vertex: VertexStorage) => {
                nextVertices[vertex.label + "/" + vertex.properties["id"]] = vertex;
              },
            );
        );
      },
    );
    this.verticesToRead = Object.values(nextVertices);
    return this;
  }

  /* Terminal */

  public count(): number {
    return (this.verticesToRead as VertexStorage[]).length;
  }

  public toList(): any[] {
    return (this.verticesToRead as VertexStorage[]).map((vertex: VertexStorage) => vertex.properties);
  }
}
