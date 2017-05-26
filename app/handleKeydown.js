import game from './game';
import { keys, directions } from './constants';

const handleKeydown = e => {
  let handled = false;

  if (game.isPlaying()) {
    switch (e.keyCode) {
      case keys.left: {
        game.move(directions.left);
        handled = true;
        break;
      }
      case keys.right: {
        game.move(directions.right);
        handled = true;
        break;
      }
      case keys.up: {
        game.move(directions.up);
        handled = true;
        break;
      }
      case keys.down: {
        game.move(directions.down);
        handled = true;
        break;
      }
      case keys.esc: {
        game.end();
        handled = true;
        break;
      }
    }
  } else if (e.keyCode == keys.space) {
    game.start();
    handled = true;
  }

  if (handled) {
    e.preventDefault(); // if key even was used for game, stop event bubbling
  }
};

export default handleKeydown;
