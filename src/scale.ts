import { dna } from "./utility";

export const scale = (factor: number) => dna([factor, 0, 0, 0, factor, 0, 0, 0, 1]);
