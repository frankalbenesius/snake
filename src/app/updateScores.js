import { scoreEl, highScoreEl } from './constants';
import game from './game';

export default () => {
  const scores = game.getScores();
  scoreEl.innerHTML = parseInt(scores.current, 10);
  highScoreEl.innerHTML = parseInt(scores.highest, 10);
};
