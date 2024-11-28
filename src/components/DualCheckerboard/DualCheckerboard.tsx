'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Checkerboard } from '../Checkerboard/Checkerboard';
import { AttackBoard } from '../AttackBoard/AttackBoard';
import { BackButton } from '../BackButton/BackButton';
import { usePlayerStore } from '../../store/playerStore';
import styles from './DualCheckerboard.module.css';

export const DualCheckerboard: React.FC = () => {
  const { chipCount, setChipCount, players, addPlayer, reset } = usePlayerStore();
  console.warn("chipCount", chipCount);
  useEffect(() => {
    setChipCount(chipCount);
    // 重置玩家状态
    reset();
    // 添加当前玩家
    addPlayer('player1');
  }, [chipCount, setChipCount, addPlayer, reset]);

  return (
    <div className={styles.container}>
      <BackButton />
      <div className={styles.boardsContainer}>
        <div className={styles.checkerboardSection}>
          <h2 className={styles.title}>我的棋盘</h2>
          <Checkerboard hideRotate={true} />
        </div>
        
        <div className={styles.infoSection}>
          <h2 className={styles.title}>游戏信息</h2>
          <div className={styles.chipInfo}>
            <label className={styles.label}>筹码数量：</label>
            <input
              type="text"
              className={styles.chipInput}
              value={chipCount}
              readOnly
            />
            <div className={styles.playerStatus}>
              <p>玩家状态：{players.length}/2</p>
              {players.length < 2 && (
                <p className={styles.waitingMessage}>等待其他玩家加入...</p>
              )}
            </div>
          </div>
        </div>

        <div className={styles.checkerboardSection}>
          <h2 className={styles.title}>攻击棋盘</h2>
          <AttackBoard />
        </div>
      </div>
    </div>
  );
};