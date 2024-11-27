import { useCallback } from 'react';
import { Direction } from '../types/airplane';

export const useAirplaneValidation = () => {
  return useCallback((position: number, dir: Direction) => {
    const row = Math.floor(position / 16);
    const col = position % 16;

    switch (dir) {
      case Direction.UP: {
        // 机头朝上时：
        // - 上边界：需要留出4格机身空间
        // - 左右边界：需要各留出2格机翼空间
        return row >= 0 && row <= 12 && col >= 2 && col <= 13;
      }
      case Direction.RIGHT: {
        // 机头朝右时：
        // - 右边界：需要留出4格机身空间
        // - 上下边界：需要各留出2格机翼空间
        return row >= 2 && row <= 13 && col >= 0 && col <= 12;
      }
      case Direction.DOWN: {
        // 机头朝下时：
        // - 下边界：需要留出4格机身空间
        // - 左右边界：需要各留出2格机翼空间
        return row >= 3 && row <= 15 && col >= 2 && col <= 13;
      }
      case Direction.LEFT: {
        // 机头朝左时：
        // - 左边界：需要留出4格机身空间
        // - 上下边界：需要各留出2格机翼空间
        return row >= 2 && row <= 13 && col >= 3 && col <= 15;
      }
    }
  }, []);
};