export enum Direction {
  UP = 0,
  RIGHT = 1,
  DOWN = 2,
  LEFT = 3,
}

export interface Airplane {
  id: number;
  position: number;
  direction: Direction;
}

export interface DragItem {
  id: number;
  clickedCellOffset: number;
  airplaneId: number;
}

export interface AirplaneOffsets {
  body: number[];      // 机身偏移量（4格）
  wings: number[];     // 机翼偏移量（5格）
  tail: number[];      // 机尾偏移量（3格）
}

// 不同方向的偏移量配置
export const DirectionOffsets: Record<Direction, AirplaneOffsets> = {
  [Direction.UP]: {
    body: [0, 16, 32, 48],                    // 垂直向下4格
    wings: [-2, -1, 0, 1, 2].map(x => x + 16), // 中间位置的翅膀
    tail: [-1, 0, 1].map(x => x + 48),        // 底部的尾翼
  },
  [Direction.RIGHT]: {
    body: [0, 1, 2, 3],                       // 水平向右4格
    wings: [-32, -16, 0, 16, 32].map(x => x + 1), // 中间位置的翅膀
    tail: [-16, 0, 16].map(x => x + 3),       // 右侧的尾翼
  },
  [Direction.DOWN]: {
    body: [0, -16, -32, -48],                 // 垂直向上4格
    wings: [-2, -1, 0, 1, 2].map(x => x - 16), // 中间位置的翅膀
    tail: [-1, 0, 1].map(x => x - 48),        // 顶部的尾翼
  },
  [Direction.LEFT]: {
    body: [0, -1, -2, -3],                    // 水平向左4格
    wings: [-32, -16, 0, 16, 32].map(x => x - 1), // 中间位置的翅膀
    tail: [-16, 0, 16].map(x => x - 3),       // 左侧的尾翼
  },
};