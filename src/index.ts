// Long strand of numbers describing the composition of spacial content

// Cheat sheet for mod 5 (v, x1, y1, x2, y2).
// Column  | mod | check
// visible | 0   | n % 5 == 0
// x1      | 1   | n % 5 === 1
// y1      | 2   | n % 5 === 2
// x2      | 3   | n % 5 === 3
// y2      | 4   | n % 5 === 4
// x1 + x2 | -   | n % 5 % 2 === 1
// y1 + y2 | -   | n % 5 && n % 5 % 2 === 0

export * from './compose';
export * from './dna-factory';
export * from './invert';
export * from './mutate';
export * from './scale';
export * from './scale-at-origin';
export * from './transform';
export * from './translate';
export * from './types';
export * from './utility';
export * from './identity';
