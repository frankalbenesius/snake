import { directions } from './constants';

export default (head, direction) => {
  let newSegment;
  switch (direction) {
    case directions.left: {
      return {
        x: head.x - 1,
        y: head.y,
      };
    }
    case directions.right: {
      return {
        x: head.x + 1,
        y: head.y,
      };
    }
    case directions.up: {
      return {
        x: head.x,
        y: head.y - 1,
      };
    }
    case directions.down: {
      return {
        x: head.x,
        y: head.y + 1,
      };
    }
  }
};
