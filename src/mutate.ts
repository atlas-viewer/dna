import { Strand } from "./types";

export const mutate = (points: Strand, transformation: Strand) => {
  return points.forEach((v, index, arr) => {
    arr[index] =
        index % 5 === 0
            ? transformation[6] * arr[index + 1] + transformation[7] * arr[index + 2] + transformation[8] * v
            : (index % 5) % 2 === 1
            ? /* x */
            transformation[0] * v + transformation[1] * arr[index + 1] + transformation[2]
            : /* y */
            transformation[3] * arr[index - 1] + transformation[4] * v + transformation[5];
  });
};
