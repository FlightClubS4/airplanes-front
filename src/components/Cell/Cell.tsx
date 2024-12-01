"use client";

import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { DragItem } from "../../types/airplane";
import { useGameStore } from "../../store/gameStore";
import styles from "./Cell.module.css";

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
  isAttackBoard?: boolean;
  isHit?: boolean;
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
  airplaneId,
  isAttackBoard = false,
  isHit = false
}) => {
  const { isGameCreated } = useGameStore();

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "airplane",
      drop: (item: DragItem) => {
        if (!isGameCreated && !isAttackBoard) {
          onDrop(id, item.clickedCellOffset, item.airplaneId);
        }
        return undefined;
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver()
      })
    }),
    [id, onDrop, isGameCreated, isAttackBoard]
  );

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "airplane",
      item: (): DragItem => {
        const clickedCellOffset = id - airplanePosition;
        return {
          id,
          clickedCellOffset,
          airplaneId: airplaneId || 0
        };
      },
      canDrag:
        !isGameCreated &&
        !isAttackBoard &&
        isAirplanePart &&
        airplaneId !== null,
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging()
      })
    }),
    [
      id,
      isAirplanePart,
      airplanePosition,
      airplaneId,
      isGameCreated,
      isAttackBoard
    ]
  );

  const ref = useRef<HTMLDivElement>(null);
  drag(drop(ref));

  const handleClick = () => {
    if (isAttackBoard) {
      onClick(id, false);
    } else if (!isGameCreated) {
      onClick(id, isAirplanePart);
    }
  };

  const cellClassName = `
    ${styles.cell}
    ${isOver && !isGameCreated && !isAttackBoard ? styles.cellOver : ""}
    ${isSelected && !isGameCreated && !isAttackBoard ? styles.selected : ""}
    ${isInvalid ? styles.invalid : ""}
    ${isGameCreated || isAttackBoard ? styles.disabled : ""}
    ${isAttackBoard ? styles.attackCell : ""}
  `;

  return (
    <div ref={ref} className={cellClassName} onClick={handleClick}>
      <span className={styles.cellId}>{id}</span>
      {isAirplanePart && !isAttackBoard && (
        <div
          className={`
            ${styles.airplanePart}
            ${isAirplaneHead ? styles.airplaneHead : ""}
            ${isDragging ? styles.dragging : ""}
          `}
        />
      )}
      {isHit && <div className={styles.hitMark}>✖️</div>}
    </div>
  );
};
