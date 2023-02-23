import { dna } from './utility';

export const rotate = (dx: number, dy: number) => {
  const rad = Math.atan2(dy, dx);

  return dna([
    Math.cos(rad), -Math.sin(rad), 0,
    Math.sin(rad), Math.cos(rad), 0,
    0, 0, 1
  ])
};

export const rotateDegrees = (deg: number) => rotate(Math.cos(deg), Math.sin(deg));
