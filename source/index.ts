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
  private activeVertex: ?VertexStorage;

  public static new(): Graph {
    return new Graph(false);
  }

  public static read(): Graph {
    return new Graph(true);
  }

  private constructor(try_read: bool) {
    if (try_read) {
      this.storage = JSON.parse(readFileSync(".foia-db.json", "ascii"));
    } else {
      this.storage = {
        vertices: [],
      };
    }
  }

  public write(): void {
    writeFileSync(".foia-db.json", JSON.stringify(this.storage))
  }

  public property(name: string, value: any): Graph {
    this.activeVertex[name] = value;
    return this;
  }

  public addVertex(label: string): Graph {
    this.activeVertex = {
      label,
      {},
    };
    this.storage.vertices = this.storage.vertices.concat([this.activeVertex]);
    return this;
  }

  public V(): Graph {
    this.activeVertex = undefined;
    return this;
  }

  public hasLabel(label: string): Graph {
    return this;
  }

  public count(): number {
    return 0;
  }
}
