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
  private edgesToRead?: Set<EdgeStorage>;
  private verticesToRead?: Set<VertexStorage>;

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

  public addE(label: string, vertex: VertexStorage): Graph {
    this.endReads();
    this.edgeToWrite = {
      label,
      source_label: (this.vertexToWrite as VertexStorage).label,
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
    this.verticesToRead = new Set(Object.values(this.storage.vertices));
    return this;
  }

  public hasLabel(label: string): Graph {
    this.verticesToRead = (this.verticesToRead as Set<VertexStorage>).filter(vertex => vertex.label === label);
    this.edgesToRead = new Set();
    this.verticesToRead.map(
      vertex => {
        this.edgesToRead = new Set(this.edgesToRead.concat(
          Object.values(this.storage.edges)
            .filter(edge => edge.source_id === vertex.properties["id"] &&
                            edge.source_label === vertex.label)
        ));
      },
    );
    return this;
  }

  public outE(label: string): Graph {
    this.edgesToRead = (this.edgesToRead as Set<EdgeStorage>).filter(edge => edge.label === label);
    this.verticesToRead = new Set();
    this.edgesToRead.map(
      edge => {
        this.verticesToRead = new Set(this.verticesToRead.concat(
          Object.values(this.storage.vertices)
            .filter(vertex => vertex.properties["id"] === edge.target_id &&
                              vertex.label === edge.label)
        ));
      },
    );
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
