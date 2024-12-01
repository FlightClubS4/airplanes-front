"use client";

import React from "react";
import { HitCell } from "./AttackBoard";
import styles from "./AttackBoard.module.css";

interface AttackCellProps {
  id: number;
  hit: HitCell | undefined;
  onClick: () => void;
}

export const AttackCell: React.FC<AttackCellProps> = ({ id, hit, onClick }) => {
  const cellClassName = `
    ${styles.cell}
    ${hit?.hitType === "head" ? styles.hitHead : ""}
    ${hit?.hitType === "body" ? styles.hitBody : ""}
    ${hit?.hitType === "miss" ? styles.hitMiss : ""}
  `;

  return (
    <div
      className={cellClassName}
      onClick={!hit ? onClick : undefined}
      style={{ cursor: hit ? "default" : "crosshair" }}
    >
      <span className={styles.cellId}>{id}</span>
      {hit && <div className={styles.hit} />}
    </div>
  );
};
