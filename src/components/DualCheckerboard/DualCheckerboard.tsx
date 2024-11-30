'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Checkerboard } from '../Checkerboard/Checkerboard';
import { AttackBoard } from '../AttackBoard/AttackBoard';
import { BackButton } from '../BackButton/BackButton';
import { usePlayerStore } from '../../store/playerStore';
import styles from './DualCheckerboard.module.css';
import useAbly from "@/services/ably";

export const DualCheckerboard: React.FC = () => {
  const { roomInfo, players, addPlayer, reset } = usePlayerStore();
  const { lobbyChannel, getRoomChannel } = useAbly();
  useEffect(() => {
    lobbyChannel.subscribe("room-updated", (message) => {
      console.warn(message);
    });

    // 重置玩家状态
    reset();
    // 添加当前玩家
    addPlayer('player1');

    getRoomChannel(roomInfo.roomId).presence.subscribe("enter", (presenceMessage) => {
      console.log(`${presenceMessage.clientId} 进入了房间`);
      console.log(presenceMessage);
    });
  }, [addPlayer, reset]);

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
              value={roomInfo.chipAmount}
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