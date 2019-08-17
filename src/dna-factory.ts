import { PositionPair, Projection, Strand } from "./types";
import { dna } from "./utility";

export class DnaFactory {
  points: Strand;
  index: number = 0;
  length: number;

  constructor(length: number) {
    this.length = length;
    this.points = dna(this.length);
  }

  static grid(columns: number = 1, rows: number = 1) {
    return new DnaFactory(5 * columns * rows);
  }

  static point(x: number, y: number) {
    return dna([1, x, y, x, y]);
  }

  static positionPair(positionPair: PositionPair): Strand {
    return dna([1, positionPair.x1, positionPair.y1, positionPair.x2, positionPair.y2]);
  }

  static projection(projection: Projection): Strand {
    return DnaFactory.singleBox(projection.width, projection.height, projection.x, projection.y);
  }

  static singleBox(width: number, height: number, x: number = 0, y: number = 0): Strand {
    return dna([1, x, y, width + x, height + y]);
  }

  row(func: (factory: this) => this): this {
    return func(this);
  }

  addPoints(x1: number, y1: number, x2: number, y2: number): this {
    this.points.set([1, x1, y1, x2, y2], this.index);
    this.index += 5;
    return this;
  }

  addBox(x: number, y: number, width: number, height: number): this {
    this.addPoints(x, y, x + width, y + height);
    return this;
  }

  build(): Strand {
    if (this.index < this.length) {
      throw new Error(`Incomplete strand. ${this.index / 5} of ${this.length / 5}`);
    }

    return this.points;
  }
}

