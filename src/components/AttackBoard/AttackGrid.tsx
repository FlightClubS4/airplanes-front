"use client";

import React from "react";
import { AttackCell } from "./AttackCell";
import { HitCell } from "./AttackBoard";
import styles from "./AttackBoard.module.css";

interface AttackGridProps {
  hitCells: HitCell[];
  onCellClick: (id: number) => void;
}

export const AttackGrid: React.FC<AttackGridProps> = ({
  hitCells,
  onCellClick
}) => {
  return (
    <div className={styles.grid}>
      {Array.from({ length: 256 }, (_, i) => {
        const hit = hitCells.find((cell) => cell.id === i);
        return (
          <AttackCell key={i} id={i} hit={hit} onClick={() => onCellClick(i)} />
        );
      })}
    </div>
  );
};
