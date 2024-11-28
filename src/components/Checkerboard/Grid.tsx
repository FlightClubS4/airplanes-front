'use client';

import React from 'react';
import { Cell } from './Cell';
import { Airplane } from '../../types/airplane';
import { getAirplanePositions } from '../../utils/airplane';
import styles from './Checkerboard.module.css';

interface GridProps {
  airplanes: Airplane[];
  selectedAirplaneId: number | null;
  invalidAirplanes: Set<number>;
  onDrop: (id: number, clickedCellOffset: number, airplaneId: number) => void;
  onCellClick: (id: number, isAirplanePart: boolean, airplaneId: number | null) => void;
  isAttackBoard?: boolean;
}

export const Grid: React.FC<GridProps> = ({
  airplanes,
  selectedAirplaneId,
  invalidAirplanes,
  onDrop,
  onCellClick,
  isAttackBoard = false
}) => {
  const cellToAirplane = new Map<number, number>();
  
  if (!isAttackBoard) {
    airplanes.forEach(airplane => {
      const positions = getAirplanePositions(airplane);
      positions.forEach(pos => {
        cellToAirplane.set(pos, airplane.id);
      });
    });
  }

  return (
    <div className={styles.grid}>
      {Array.from({ length: 256 }, (_, i) => {
        const airplaneId = cellToAirplane.get(i) ?? null;
        const airplane = airplanes.find(a => a.id === airplaneId);
        const isAirplanePart = airplaneId !== null;
        const isAirplaneHead = airplane?.position === i;
        const isInvalid = airplaneId !== null && invalidAirplanes.has(airplaneId);

        return (
          <Cell
            key={i}
            id={i}
            isAirplanePart={isAirplanePart}
            isAirplaneHead={!!isAirplaneHead}
            onDrop={(id, offset, draggedAirplaneId) => onDrop(id, offset, draggedAirplaneId)}
            onClick={(id, isPart) => onCellClick(id, isPart, airplaneId)}
            airplanePosition={airplane?.position ?? 0}
            isSelected={airplaneId === selectedAirplaneId}
            isInvalid={isInvalid}
            airplaneId={airplaneId}
            isAttackBoard={isAttackBoard}
          />
        );
      })}
    </div>
  );
};