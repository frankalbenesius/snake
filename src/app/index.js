import game from './game';
import handleKeydown from './handleKeydown';
import draw from './draw';
import updateScores from './updateScores';

const getTime = () => new Date().getTime();

document.addEventListener('keydown', handleKeydown, false);

const frame = lastFrame => () => {
  const startFrame = getTime(); // set start of this frame (milleseconds)
  const diff = (startFrame - lastFrame) / 1000.0; // seconds since last update
  game.update(diff); // trigger game to check for updates to game state
  draw(); // render to #canvas
  updateScores();
  setTimeout(frame(startFrame), 1); // begin next frame
};

const initialTime = getTime();
const startFrames = frame(initialTime); // create game loop starter
startFrames(); // set game loop in motion
