import { cellSize } from './constants';
import game from './game';
import getTransitionColor from './getTransitionColor';

// colors based on palette: https://palx.jxnblk.com/35f28a
const black = '#36413b';
const green = '#35f287';
const orange = '#f28735';
const fuschia = '#e535f2';

// TODO consolidate these constants
const canvas = document.getElementById('canvas');
const width = (canvas.width = canvas.offsetWidth);
const height = (canvas.height = canvas.offsetHeight);
const context = canvas.getContext('2d');

const draw = () => {
  context.clearRect(0, 0, width, height);
  context.globalAlpha = game.isPlaying() ? 1.0 : 0.5;

  // draw food
  context.fillStyle = orange;
  context.fillRect(
    game.food.x * cellSize,
    game.food.y * cellSize,
    cellSize,
    cellSize,
  );

  // draw snake body segments
  let segment = game.head;
  let n = 1;
  while ((segment = segment.next)) {
    const ratio = n / game.length;
    context.fillStyle = getTransitionColor(fuschia, green, ratio);
    context.fillRect(
      segment.x * cellSize,
      segment.y * cellSize,
      cellSize,
      cellSize,
    );
    n++;
  }

  // draw snake head
  context.fillStyle = black;
  context.fillRect(
    game.head.x * cellSize,
    game.head.y * cellSize,
    cellSize,
    cellSize,
  );

  // draw score
  // TODO: move outside canvas
  context.fillStyle = black;
  context.font = 'bold 1rem arial';
  context.fillText(game.score.toString(), 10, 30);
};

export default draw;
