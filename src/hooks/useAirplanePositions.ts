import { useCallback } from 'react';
import { Direction, DirectionOffsets } from '../types/airplane';

export const useAirplanePositions = (airplanePosition: number, direction: Direction) => {
  return useCallback(() => {
    const positions = new Set<number>();
    const offsets = DirectionOffsets[direction];
    
    // 添加机身位置
    offsets.body.forEach(offset => {
      positions.add(airplanePosition + offset);
    });
    
    // 添加机翼位置
    offsets.wings.forEach(offset => {
      positions.add(airplanePosition + offset);
    });
    
    // 添加机尾位置
    offsets.tail.forEach(offset => {
      positions.add(airplanePosition + offset);
    });

    return positions;
  }, [airplanePosition, direction])();
};