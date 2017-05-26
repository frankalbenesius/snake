export const canvasEl = document.getElementById('canvas');
export const scoreEl = document.getElementById('score');
export const highScoreEl = document.getElementById('highScore');

export const keys = {
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

export const stepThreshold = 0.06; // seconds per game step

export const growLength = 10;

export const width = (canvas.width = canvas.offsetWidth);
export const height = (canvas.height = canvas.offsetHeight);
export const cellSize = 10; //px
export const cells = {
  wide: width / cellSize,
  high: height / cellSize,
};
