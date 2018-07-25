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
  private vertexToWrite?: VertexStorage;
  private edgeToWrite?: EdgeStorage;
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
    this.vertexToWrite = undefined;
    this.edgeToWrite = undefined;
  }

  private endReads(): void {
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

  public addE(label: string, vertex: VertexStorage): Graph {
    this.endReads();
    this.edgeToWrite = {
      label,
      source_label = (this.vertexToWrite as VertexStorage).label,
      source_id: (this.vertexToWrite as VertexStorage).properties["id"],
      target_id: vertex.properties["id"],
      target_label = vertex.label,
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
    this.verticesToRead = (this.verticesToRead as VertexStorage[]).filter(vertex => vertex.label === label);
    return this;
  }

  public outE(label: string): Graph {
    return this;
  }

  /* Terminal */

  public count(): number {
    return (this.verticesToRead as VertexStorage[]).length;
  }

  public toList(): any[] {
    return (this.verticesToRead as VertexStorage[]).map(vertex => vertex.properties);
  }
}
