export const keys = {
  esc: 27,
  space: 32,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
};

export const directions = {
  up: 0,
  down: 1,
  left: 2,
  right: 3,
  oppositeOf: [1, 0, 3, 2],
};

export const initialDirection = directions.left;

export const stepThreshold = 0.06; // seconds per game step

export const cellSize = 10;
