import { Strand } from './types';
import { dna } from './utility';

export const transform = (points: Strand, transformation: Strand, buffer?: Strand): Strand => {
  const len = points.length;
  const ret = buffer && buffer.length >= len ? buffer.slice(0, len) : dna(len);
  for (let index = 0; index < len; index++) {
    ret[index] =
      index % 5 === 0
        ? transformation[6] * points[index + 1] +
          transformation[7] * points[index + 2] +
          transformation[8] * points[index]
        : (index % 5) % 2 === 1
        ? /* x */
          transformation[0] * points[index] + transformation[1] * points[index + 1] + transformation[2]
        : /* y */
          transformation[3] * points[index - 1] + transformation[4] * points[index] + transformation[5];
  }
  return ret;
};
