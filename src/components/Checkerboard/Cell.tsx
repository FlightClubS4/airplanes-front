'use client';

import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { DragItem } from '../../types/airplane';
import styles from './Checkerboard.module.css';

interface CellProps {
  id: number;
  isAirplanePart: boolean;
  isAirplaneHead: boolean;
  onDrop: (id: number, clickedCellOffset: number, airplaneId: number) => void;
  onClick: (id: number, isAirplanePart: boolean) => void;
  airplanePosition: number;
  isSelected: boolean;
  isInvalid: boolean;
  airplaneId: number | null;
}

export const Cell: React.FC<CellProps> = ({ 
  id, 
  isAirplanePart, 
  isAirplaneHead, 
  onDrop, 
  onClick,
  airplanePosition,
  isSelected,
  isInvalid,
  airplaneId
}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'airplane',
    drop: (item: DragItem) => {
      onDrop(id, item.clickedCellOffset, item.airplaneId);
      return undefined;
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'airplane',
    item: (): DragItem => {
      const clickedCellOffset = id - airplanePosition;
      return {
        id,
        clickedCellOffset,
        airplaneId: airplaneId || 0
      };
    },
    canDrag: isAirplanePart && airplaneId !== null,
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [id, isAirplanePart, airplanePosition, airplaneId]);

  const ref = useRef<HTMLDivElement>(null);
  drag(drop(ref));

  const handleClick = () => {
    onClick(id, isAirplanePart);
  };

  return (
    <div
      ref={ref}
      className={`
        ${styles.cell} 
        ${isOver ? styles.cellOver : ''} 
        ${isSelected ? styles.selected : ''} 
        ${isInvalid ? styles.invalid : ''}
      `}
      onClick={handleClick}
    >
      <span className={styles.cellId}>{id}</span>
      {isAirplanePart && (
        <div 
          className={`
            ${styles.airplanePart} 
            ${isAirplaneHead ? styles.airplaneHead : ''} 
            ${isDragging ? styles.dragging : ''}
          `}
        />
      )}
    </div>
  );
};