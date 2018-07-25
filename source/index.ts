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
  private vertexToWrite?: VertexStorage;
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
        vertices: [],
      };
    }
  }

  private endWrites(): void {
    this.vertexToWrite = undefined;
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
 
  public property(name: string, value: any): Graph {
    (this.vertexToWrite as VertexStorage)[name] = value;
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
 
  /* Terminal */

  public count(): number {
    return (this.verticesToRead as VertexStorage[]).length;
  }

  public toList(): object[] {
    return this.verticesToRead.map(vertex => vertex.properties);
  }
}
