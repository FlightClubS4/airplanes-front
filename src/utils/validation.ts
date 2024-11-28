import { Direction } from '../types/airplane';

export const isAirplaneInBoard = (position: number, dir: Direction): boolean => {
  const row = Math.floor(position / 16);
  const col = position % 16;

  switch (dir) {
    case Direction.UP: {
      return row >= 0 && row <= 12 && col >= 2 && col <= 13;
    }
    case Direction.RIGHT: {
      return row >= 2 && row <= 13 && col >= 0 && col <= 12;
    }
    case Direction.DOWN: {
      return row >= 3 && row <= 15 && col >= 2 && col <= 13;
    }
    case Direction.LEFT: {
      return row >= 2 && row <= 13 && col >= 3 && col <= 15;
    }
    default:
      return false;
  }
};