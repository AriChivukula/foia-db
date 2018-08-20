import {
  readFileSync,
  writeFileSync,
} from "fs";

export type MetadataLabel = string;

export function ml(label: string): MetadataLabel {
  return label;
}

export type MetadataID = any;

export function mi(id: any): MetadataID {
  return id;
}

export interface IMetadata {
  id: MetadataID;
}

export type PropertyLabel = string;

export function pl(label: string): PropertyLabel {
  return label;
}

export type PropertyID = any;

export function pi(id: any): PropertyID {
  return id;
}

export interface IProperty {
  id: PropertyID;
  metadata: {[idx: string]: IMetadata};
}

export type VertexLabel = string;

export function vl(label: string): VertexLabel {
  return label;
}

export type VertexID = string;

export function vi(id: string): VertexID {
  return id;
}

export interface IVertex {
  label: VertexLabel;
  id: VertexID;
  properties: {[idx: string]: IProperty};
}

function vk(vertex: IVertex): string {
  return vertex.label + "/" + vertex.id;
}

export interface IEdge {
  first: [VertexLabel, VertexID];
  last: [VertexLabel, VertexID];
  properties: {[idx: string]: IProperty};
}

function vk_first(edge: IEdge): string {
  return edge.first[0] + "/" + edge.first[1];
}


function vk_last(edge: IEdge): string {
  return edge.last[0] + "/" + edge.last[1];
}

function ek(edge: IEdge): string {
  return vk_first(edge) + "/" + vk_last(edge);
}

export interface IGraph {
  edges: IEdge[];
  vertices: IVertex[];
}

export class Graph {
  
  private edgeToWrite?: IEdge;
  private vertexToWrite?: IVertex;
  private propertyToWrite?: IProperty;
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

  public addVertex(label: VertexLabel, id: VertexID): Graph {
    this.vertexToWrite = {
      label,
      id,
      properties: {},
    };
    this.props.vertices = this.props.vertices.concat([this.vertexToWrite]);
    return this;
  }

  public addEdge(first: [VertexLabel, VertexID], last: [VertexLabel, VertexID]): Graph {
    this.edgeToWrite = {
      first,
      last,
      properties: {},
    };
    this.props.edges = this.props.edges.concat([this.edgeToWrite]);
    return this;
  }

  public addVertexProperty(label: PropertyLabel, id: PropertyID): Graph {
    this.propertyToWrite = {
      "id": id,
      metadata: {},
    };
    (this.vertexToWrite as IVertex).properties[label] = this.propertyToWrite;
    return this;
  }
  
  public addEdgeProperty(label: PropertyLabel, id: PropertyID): Graph {
    this.propertyToWrite = {
      "id": id,
      metadata: {},
    };
    (this.edgeToWrite as IEdge).properties[label] = this.propertyToWrite;
    return this;
  }
  
  public addMetadata(label: MetadataLabel, id: MetadataID): Graph {
    (this.propertyToWrite as IProperty).metadata[label] = {
      "id": id,
    };
    return this;
  }

  /* Read */

  public Vertices(): Graph {
    this.verticesToRead = this.props.vertices;
    return this;
  }
  
  public Edges(): Graph {
    this.edgesToRead = this.props.edges;
    return this;
  }

  public outVertex(label: VertexLabel): Graph {
    this.verticesToRead = this.verticesToRead.filter((vertex: IVertex) => vertex.label === label);
    let nextEdges: {[id: string]: IEdge} = {};
    this.verticesToRead.forEach(
      (vertex: IVertex) => {
        this.props.edges
          .filter((edge: IEdge) => vk_first(edge) === vk(vertex))
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

  public outEdge(label: VertexLabel): Graph {
    this.edgesToRead = this.edgesToRead.filter((edge: IEdge) => edge.last[0] === label);
    let nextVertices: {[id: string]: IVertex} = {};
    this.edgesToRead.forEach(
      (edge: IEdge) => {
        this.props.vertices
          .filter((vertex: IVertex) => vk(vertex) === vk_last(edge))
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

  public countVertices(): number {
    return this.verticesToRead.length;
  }

  public listVertices(): IVertex[] {
    return this.verticesToRead;
  }
  
  public countEdges(): number {
    return this.edgesToRead.length;
  }

  public listEdges(): IEdge[] {
    return this.edgesToRead;
  }
}
