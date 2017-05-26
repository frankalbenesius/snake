import { directions, stepThreshold, growLength, cells } from './constants';
import createSegment from './createSegment';

const isSamePosition = (a, b) => {
  return a && b && a.x === b.x && a.y === b.y;
};

const getRandom = (min, max) => {
  return min + Math.random() * (max - min);
};

class Game {
  constructor() {
    this.reset();
    this.highScore = 0;
    this.playing = false;
  }
  reset() {
    this.secondsSinceStep = 0; // seconds since last update
    this.moves = []; // moves queue
    this.head = this.tail = {
      x: Math.round(cells.wide / 2),
      y: Math.round(cells.high / 2),
    }; // beginning of the linked list of snake segments
    this.length = 1; // amount of segments currently in the snake
    this.growth = 10; // amount of segments the snake still needs to grow
    this.score = 0; // amount of foods the snake has eaten
    this.food = this.getUnoccupiedPosition();
  }
  isPlaying() {
    return this.playing;
  }
  getLength() {
    return this.length;
  }
  getScores() {
    return {
      current: this.score,
      highest: this.highScore,
    };
  }
  start(initDirection) {
    this.reset();
    this.direction = initDirection;
    this.playing = true;
  }
  end() {
    this.playing = false;
  }
  move(newDirection) {
    const moveCount = this.moves.length;
    const previousDirection = moveCount
      ? this.moves[moveCount - 1]
      : this.direction;
    if (
      newDirection != previousDirection && // don't queue same direction twice
      newDirection != directions.oppositeOf[previousDirection] // don't queue backwards directions
    ) {
      this.moves.push(newDirection); // queue valid new direction
    }
  }
  update(seconds) {
    // update checks to see if we should trigger a step
    if (this.isPlaying()) {
      this.secondsSinceStep = this.secondsSinceStep + seconds;
      if (this.secondsSinceStep > stepThreshold) {
        this.secondsSinceStep = this.secondsSinceStep - stepThreshold;
        this.step();
      }
    }
  }
  step() {
    // our snake can move, lose, and/or eat during each step
    this.growToward(this.moves.shift()); // pop next move/direction and send it to grow
    this.shrink();

    if (this.snakeAteItself()) {
      this.end();
    } else if (this.snakeAteFood()) {
      this.growth += growLength;
      this.score += 1;
      if (this.score > this.highScore) {
        this.highScore = this.score;
      }
      this.food = this.getUnoccupiedPosition();
    }
  }
  growToward(newDirection) {
    if (typeof newDirection != 'undefined') {
      this.direction = newDirection;
    }

    const newSegment = createSegment(this.head, this.direction);

    // check for wall collision
    if (
      newSegment.x < 0 ||
      newSegment.y >= cells.high ||
      newSegment.y < 0 ||
      newSegment.x >= cells.wide
    ) {
      this.end();
    }

    // add the new segment before the head
    this.length += 1;
    this.head.prev = newSegment;
    newSegment.next = this.head;
    this.head = newSegment;
  }
  shrink() {
    if (this.growth) {
      this.growth -= 1;
    } else {
      this.length -= 1;
      // remove the trailing segment, redefine tail
      if (this.tail.prev) {
        // don't shrink if snake length is only 1
        this.tail = this.tail.prev;
        this.tail.next = null;
      }
    }
  }
  snakeAteFood() {
    return isSamePosition(this.food, this.head);
  }
  snakeAteItself() {
    return this.snakeOccupies(this.head, true);
  }
  snakeOccupies(position, ignoreHead) {
    // helper function to see if any snake segments intercept a position
    let segment = ignoreHead ? this.head.next : this.head;
    do {
      if (isSamePosition(segment, position)) {
        return true;
      }
    } while ((segment = segment.next));
    return false;
  }
  getUnoccupiedPosition() {
    // returns a cell unoccupied by snake segments
    const position = {};
    do {
      position.x = Math.round(getRandom(0, cells.wide - 1));
      position.y = Math.round(getRandom(0, cells.high - 1));
    } while (this.snakeOccupies(position));
    return position;
  }
}

export default new Game();
