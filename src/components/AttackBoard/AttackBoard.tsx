"use client";

import React, { useCallback } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { AttackGrid } from "./AttackGrid";
import { useGameStore } from "../../store/gameStore";
import styles from "./AttackBoard.module.css";

export type HitType = "head" | "body" | "miss";

export interface HitCell {
  id: number;
  hitType: HitType;
}

export const AttackBoard: React.FC = () => {
  const { attackBoardHits, addAttackBoardHit, addMyBoardHit } = useGameStore();

  const handleCellClick = useCallback(
    (id: number) => {
      // 检查是否已经攻击过这个位置
      if (attackBoardHits.some((hit) => hit.id === id)) {
        return;
      }

      // 随机决定命中类型
      const random = Math.random();
      let hitType: HitType;

      if (random < 0.2) {
        hitType = "head";
      } else if (random < 0.5) {
        hitType = "body";
      } else {
        hitType = "miss";
      }

      // 记录我的攻击
      addAttackBoardHit({ id, hitType });

      // 模拟对手的攻击
      const opponentAttackPosition = Math.floor(Math.random() * 256);
      addMyBoardHit(opponentAttackPosition);
    },
    [attackBoardHits, addAttackBoardHit, addMyBoardHit]
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.container}>
        <div className={styles.board}>
          <AttackGrid
            hitCells={attackBoardHits}
            onCellClick={handleCellClick}
          />
        </div>
      </div>
    </DndProvider>
  );
};
