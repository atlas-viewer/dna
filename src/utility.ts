import { Strand } from "./types";

export const hidePointsOutsideRegion = (points: Strand, target: Strand, buffer?: Strand): Strand => {
  const len = points.length;
  const ret = buffer ? buffer : dna(len);
  for (let index = 0; index < len; index++) {
    ret[index] =
        index % 5 === 0
            ? /* x1 */ points[index + 1] < target[3] && // x1 left - x2 right
            /* x2 */ points[index + 3] > target[1] && // x2 right - x1 left
            /* y1 */ points[index + 2] < target[4] && // y1 top - y2 bottom
            /* y2 */ points[index + 4] > target[2] // y2 bottom - y1 top
            ? 1
            : 0
            : points[index];
  }
  return ret;
};

export function dna(length: number): Strand;
export function dna(arrayOrArrayBuffer: ArrayLike<number> | ArrayBufferLike): Strand;
export function dna(buffer: ArrayBufferLike, byteOffset: number, length?: number): Strand;
export function dna(buffer: any, byteOffset?: any, length?: any): Strand {
  return new Float32Array(buffer, byteOffset, length);
}

export const getIntersection = (boxA: Strand, boxB: Strand, buffer?: Strand): Strand => {
  const intersects =
      /* x1 */ boxA[1] <= boxB[3] && // x1 left - x2 right
      /* x2 */ boxA[3] >= boxB[1] && // x2 right - x1 left
      /* y1 */ boxA[2] <= boxB[4] && // y1 top - y2 bottom
      /* y2 */ boxA[4] >= boxB[2]; // y2 bottom - y1 top

  const mem = buffer ? buffer : dna(5);
  if (!intersects) {
    mem.set([0, 0, 0, 0, 0]);
    return mem;
  }
  mem.set([
    1,
    Math.max(boxA[1], boxB[1]),
    Math.max(boxA[2], boxB[2]),
    Math.min(boxA[3], boxB[3]),
    Math.min(boxA[4], boxB[4]),
  ]);
  return mem;
};

export const dnaLength = (points: Strand) => points.length / 5;

export const filterPoints = (points: Strand) =>
    points.filter((v, index: number, arr) => arr[index - (index % 5)]);
