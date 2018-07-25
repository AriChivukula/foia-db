import "@babel/polyfill";
import { readFileSync, writeFileSync } from "fs";

interface VertexStorage {
 label: string;
 properties: object;
}

interface GraphStorage {
 vertices: VertexStorage[];
}

export class Graph {
  
  private storage: GraphStorage;
  private vertexToWrite: ?VertexStorage = null;
  private verticesToRead: ?(VertexStorage[]) = null;

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
        vertices: [],
      };
    }
  }

  private endWrites(): void {
    this.vertexToWrite = null;
  }

  private endReads(): void {
    this.verticesToRead = null;
  }

  public write(): void {
    writeFileSync(".foia-db.json", JSON.stringify(this.storage))
  }

  public property(name: string, value: any): Graph {
    this.vertexToWrite[name] = value;
    return this;
  }

  public addVertex(label: string): Graph {
    this.endReads();
    this.vertexToWrite = {
      label,
      properties: {},
    };
    this.storage.vertices = this.storage.vertices.concat([this.vertexToWrite]);
    return this;
  }

  public V(): Graph {
    this.endWrites();
    this.verticesToRead = Object.values(this.storage.vertices);
    return this;
  }

  public hasLabel(label: string): Graph {
    this.verticesToRead = this.verticesToRead.filter(vertex => vertex.label === label);
    return this;
  }

  public count(): number {
    return this.verticesToRead.length;
  }

  public toList(): object[] {
    return this.verticesToRead.map(vertex => vertex.properties);
  }
}
