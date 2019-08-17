import { Strand } from "./types";
import { dna } from "./utility";

export const invert = (transformation: Strand): Strand => {
  const a00 = transformation[0];
  const a01 = transformation[1];
  const a02 = transformation[2];
  const a10 = transformation[3];
  const a11 = transformation[4];
  const a12 = transformation[5];
  const a20 = transformation[6];
  const a21 = transformation[7];
  const a22 = transformation[8];

  const det01 = a22 * a11 - a12 * a21;
  const det11 = -a22 * a10 + a12 * a20;
  const det21 = a21 * a10 - a11 * a20;

  let det = a00 * det01 + a01 * det11 + a02 * det21;

  /* istanbul ignore next */
  if (!det) {
    // Impossible path, unless you bring custom or invalid transforms.
    throw new Error('Could not invert');
  }

  det = 1.0 / det;

  return dna([
    det01 * det,
    (-a22 * a01 + a02 * a21) * det,
    (a12 * a01 - a02 * a11) * det,
    det11 * det,
    (a22 * a00 - a02 * a20) * det,
    (-a12 * a00 + a02 * a10) * det,
    det21 * det,
    (-a21 * a00 + a01 * a20) * det,
    (a11 * a00 - a01 * a10) * det,
  ]);
};
