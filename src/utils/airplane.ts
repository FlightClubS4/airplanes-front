import { Direction, Airplane, DirectionOffsets } from '../types/airplane';
import { useAirplaneValidation } from '../hooks/useAirplaneValidation';

// 获取飞机占用的所有格子
export const getAirplanePositions = (airplane: Airplane): Set<number> => {
  const positions = new Set<number>();
  const offsets = DirectionOffsets[airplane.direction];
  
  // 添加机身位置
  offsets.body.forEach(offset => {
    positions.add(airplane.position + offset);
  });
  
  // 添加机翼位置
  offsets.wings.forEach(offset => {
    positions.add(airplane.position + offset);
  });
  
  // 添加机尾位置
  offsets.tail.forEach(offset => {
    positions.add(airplane.position + offset);
  });

  return positions;
};

// 检查两架飞机是否重叠
export const checkAirplanesOverlap = (airplane1: Airplane, airplane2: Airplane): boolean => {
  const positions1 = getAirplanePositions(airplane1);
  const positions2 = getAirplanePositions(airplane2);

  for (const pos of positions1) {
    if (positions2.has(pos)) {
      return true;
    }
  }

  return false;
};

// 生成随机位置
const generateRandomPosition = (): number => {
  return Math.floor(Math.random() * 256);
};

// 生成随机方向
const generateRandomDirection = (): Direction => {
  return Math.floor(Math.random() * 4) as Direction;
};

// 生成一架有效的飞机
export const generateValidAirplane = (
  id: number,
  existingAirplanes: Airplane[],
  isAirplaneInBoard: ReturnType<typeof useAirplaneValidation>
): Airplane => {
  let attempts = 0;
  const maxAttempts = 1000;

  while (attempts < maxAttempts) {
    const position = generateRandomPosition();
    const direction = generateRandomDirection();

    // 检查是否在棋盘范围内
    if (!isAirplaneInBoard(position, direction)) {
      attempts++;
      continue;
    }

    const newAirplane: Airplane = { id, position, direction };

    // 检查是否与现有飞机重叠
    const hasOverlap = existingAirplanes.some(existing => 
      checkAirplanesOverlap(newAirplane, existing)
    );

    if (!hasOverlap) {
      return newAirplane;
    }

    attempts++;
  }

  throw new Error('无法生成有效的飞机位置');
};

// 生成指定数量的飞机
export const generateAirplanes = (
  count: number,
  isAirplaneInBoard: ReturnType<typeof useAirplaneValidation>
): Airplane[] => {
  const airplanes: Airplane[] = [];

  for (let i = 0; i < count; i++) {
    const airplane = generateValidAirplane(i, airplanes, isAirplaneInBoard);
    airplanes.push(airplane);
  }

  return airplanes;
};