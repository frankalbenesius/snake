import { directions, stepThreshold } from './constants';

const canvas = document.getElementById('canvas');
const width = (canvas.width = canvas.offsetWidth);
const height = (canvas.height = canvas.offsetHeight);
const context = canvas.getContext('2d');
const cellSize = 10; //pixels
const cells = {
  wide: width / cellSize,
  high: height / cellSize,
};

const growBy = 10;
class Game {
  constructor() {
    this.reset();
  }
  reset() {
    this.playing = false; //TODO switch to false
    this.secondsSinceStep = 0; // seconds since last update
    this.moves = []; // moves queue
    this.head = this.tail = {
      x: Math.round(cells.wide / 2),
      y: Math.round(cells.high / 2),
    }; // beginning of the linked list of snake segments
    this.length = 1; // snake segment length
    this.growth = 10; // amount of segments the snake still needs to grow
    this.score = 0;
    this.food = this.unoccupied();
  }
  start(initDirection) {
    this.reset();
    this.direction = initDirection;
    this.food = this.unoccupied();
    this.playing = true;
  }
  end() {
    this.playing = false;
  }
  isPlaying() {
    return this.playing;
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
    if (this.isPlaying()) {
      this.secondsSinceStep = this.secondsSinceStep + seconds;
      if (this.secondsSinceStep > stepThreshold) {
        this.secondsSinceStep = this.secondsSinceStep - stepThreshold;
        this.step();
      }
    }
  }
  step() {
    // snake can change size each step by
    // adding or decreasing segments
    this.increase(this.moves.shift()); // pop next direction and send it to increase
    this.decrease();

    if (this.snakeOccupies(this.head, true)) {
      this.end();
    } else if (this.foodOccupies(this.head)) {
      this.growth += growBy;
      this.score += 1;
      this.food = this.unoccupied();
    }
  }
  addSegment(segment) {
    this.length += 1;
    if (this.head) {
      this.head.prev = segment;
      segment.next = this.head;
    } else {
      console.log('no this.head -- how???');
    }
    this.head = segment;
  }
  removeSegment() {
    this.length -= 1;
    if (this.tail.prev) {
      this.tail = this.tail.prev;
      this.tail.next = null;
    }
  }
  increase(newDirection) {
    this.direction = typeof newDirection != 'undefined'
      ? newDirection
      : this.direction;
    // TODO handle reaching the wall
    let newSegment;
    switch (this.direction) {
      case directions.left: {
        newSegment = {
          x: this.head.x - 1,
          y: this.head.y,
        };
        // check for wall collision
        if (newSegment.x < 0) {
          this.end();
        }
        break;
      }
      case directions.right: {
        newSegment = {
          x: this.head.x + 1,
          y: this.head.y,
        };
        if (newSegment.x >= cells.wide) {
          this.end();
        }
        break;
      }
      case directions.up: {
        newSegment = {
          x: this.head.x,
          y: this.head.y - 1,
        };
        if (newSegment.y < 0) {
          this.end();
        }
        break;
      }
      case directions.down: {
        newSegment = {
          x: this.head.x,
          y: this.head.y + 1,
        };
        if (newSegment.y >= cells.high) {
          this.end();
        }
        break;
      }
    }
    this.addSegment(newSegment);
  }
  decrease() {
    if (this.growth) {
      this.growth -= 1;
    } else {
      this.removeSegment();
    }
  }
  occupies(a, b) {
    return a && b && a.x === b.x && a.y === b.y;
  }
  foodOccupies(position) {
    return this.occupies(this.food, position);
  }
  snakeOccupies(position, ignoreHead) {
    let segment = ignoreHead ? this.head.next : this.head;
    // TODO change this to forEach or something
    do {
      if (this.occupies(segment, position)) {
        return true;
      }
    } while ((segment = segment.next));
    return false;
  }
  unoccupied() {
    // returns a cell unoccupied by snake segments
    const position = {};
    do {
      position.x = Math.round(this.random(0, cells.wide - 1));
      position.y = Math.round(this.random(0, cells.high - 1));
    } while (this.snakeOccupies(position));
    return position;
  }
  random(min, max) {
    // TODO: remove this from object
    return min + Math.random() * (max - min);
  }
}

export default new Game();
