import { cellSize } from './constants';
import game from './game';

// TODO consolidate these constants
const canvas = document.getElementById('canvas');
const width = (canvas.width = canvas.offsetWidth);
const height = (canvas.height = canvas.offsetHeight);
const context = canvas.getContext('2d');

const draw = () => {
  context.clearRect(0, 0, width, height);
  context.globalAlpha = game.isPlaying ? 1.0 : 0.5;

  // draw food
  context.fillStyle = 'green';
  context.fillRect(
    game.food.x * cellSize,
    game.food.y * cellSize,
    cellSize,
    cellSize,
  );

  // draw snake head
  context.fillStyle = 'black';
  context.fillRect(
    game.head.x * cellSize,
    game.head.y * cellSize,
    cellSize,
    cellSize,
  );

  // draw snake body segments
  let segment = game.head;
  let n = 0;
  while ((segment = segment.next)) {
    context.fillStyle = 'cyan';
    context.fillRect(
      segment.x * cellSize + 1,
      segment.y * cellSize + 1,
      cellSize - 2,
      cellSize - 2,
    );
  }

  // draw score
  // TODO: move outside canvas
  context.fillStyle = 'green';
  context.font = 'bold 1rem arial';
  context.fillText(game.score.toString(), 10, 30);
};

export default draw;
