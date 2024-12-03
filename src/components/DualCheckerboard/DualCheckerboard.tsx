"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Checkerboard } from "../Checkerboard/Checkerboard";
import { AttackBoard } from "../AttackBoard/AttackBoard";
import { BackButton } from "../BackButton/BackButton";
import { usePlayerStore } from "../../store/playerStore";
import { Button } from "../Button/Button";
import styles from "./DualCheckerboard.module.css";
import useAbly from "@/services/ably";
import { useAccount } from "wagmi";

export const DualCheckerboard: React.FC = () => {
  const { roomInfo, players, addPlayer, reset } = usePlayerStore();
  const { lobbyChannel, getRoomChannel } = useAbly();
  const { address } = useAccount();
  useEffect(() => {
    // lobbyChannel.subscribe("room-updated", (message) => {
    //   console.warn(message);
    // });

    // 重置玩家状态
    reset();
    // 添加当前玩家
    addPlayer("player1");

    const roomChannel = getRoomChannel(roomInfo.roomId);
    // console.warn(roomChannel.presence);
    roomChannel.presence.subscribe("enter", (presenceMessage) => {
      console.log(`${presenceMessage.clientId} 进入了房间`);
      roomChannel.presence.update({
        player: address, // 玩家地址
        status: "ready", // 自定义状态
        timestamp: Date.now() // 可选，标记时间
      });
    });

    roomChannel.presence.subscribe("update", (presenceMessage) => {
      console.log(`${presenceMessage.clientId} 更新了状态`);
    });

    roomChannel.presence.get((err, message) => {
      console.warn(message);
    });
  }, [addPlayer, reset]);

  

  const handleRaise = () => {};

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
            <Button onClick={handleRaise}>加筹码</Button>
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
