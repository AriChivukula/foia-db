import "@babel/polyfill";
import { readFileSync, writeFileSync } from "fs";

export class Graph {

  public static new(): Graph {
    return new Graph();
  }

  public static read(): Graph {
    return new Graph();
  }

  private constructor() {}

  public write(): void {
  }

  public property(name: string, value: any): Graph {
    return this;
  }

  public addVertex(label: string): Graph {
    return this;
  }

  public V(): Graph {
    return this;
  }

  public hasLabel(label: string): Graph {
    return this;
  }

  public count(): number {
    return this;
  }
}
