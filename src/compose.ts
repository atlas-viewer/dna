import { Strand } from "./types";
import { dna } from "./utility";

export const compose = (transformA: Strand, transformB: Strand, buffer?: Strand) => {
  if (transformA.length !== transformB.length || transformA.length !== 9) {
    throw new Error('Transforms must be Mat3 as Strand');
  }

  const mem = buffer ? buffer : dna(9);
  mem.set([
    // Row 1
    transformA[0] * transformB[0] + transformA[1] * transformB[3] + transformA[2] * transformB[6],
    transformA[0] * transformB[1] + transformA[1] * transformB[4] + transformA[2] * transformB[7],
    transformA[0] * transformB[2] + transformA[1] * transformB[5] + transformA[2] * transformB[8],

    // Row 2
    transformA[3] * transformB[0] + transformA[4] * transformB[3] + transformA[5] * transformB[6],
    transformA[3] * transformB[1] + transformA[4] * transformB[4] + transformA[5] * transformB[7],
    transformA[3] * transformB[2] + transformA[4] * transformB[5] + transformA[5] * transformB[8],

    // Row 3
    transformA[6] * transformB[0] + transformA[7] * transformB[3] + transformA[8] * transformB[6],
    transformA[6] * transformB[1] + transformA[7] * transformB[4] + transformA[8] * transformB[7],
    transformA[6] * transformB[2] + transformA[7] * transformB[5] + transformA[8] * transformB[8],
  ]);
  return mem;
};
