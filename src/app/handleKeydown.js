import game from './game';
import { keys, directions } from './constants';

const handleKeydown = e => {
  let direction;

  switch (e.keyCode) {
    case keys.left: {
      direction = directions.left;
      break;
    }
    case keys.right: {
      direction = directions.right;
      break;
    }
    case keys.up: {
      direction = directions.up;
      break;
    }
    case keys.down: {
      direction = directions.down;
      break;
    }
  }

  if (direction != undefined) {
    e.preventDefault();
    if (game.isPlaying()) {
      game.move(direction);
    } else {
      game.start(direction);
    }
  }
};

export default handleKeydown;
