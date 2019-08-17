import { dna } from "./utility";

export const translate = (x: number, y: number) => dna([1, 0, x, 0, 1, y, 0, 0, 1]);
