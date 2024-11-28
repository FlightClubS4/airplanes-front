import { useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import { publishPlayerJoin, publishPlayerLeave, subscribeToPlayers } from '../services/ably';

export const useGamePlayers = (playerId?: string) => {
  const { addPlayer, removePlayer, players } = useGameStore();

  useEffect(() => {
    if (!playerId) return;

    // 添加当前玩家
    addPlayer(playerId);
    publishPlayerJoin(playerId);

    // 订阅其他玩家的加入/离开事件
    const unsubscribe = subscribeToPlayers((message) => {
      const { playerId: remotePlayerId } = message.data;
      if (message.name === 'player-join') {
        addPlayer(remotePlayerId);
      } else if (message.name === 'player-leave') {
        removePlayer(remotePlayerId);
      }
    });

    // 清理函数
    return () => {
      publishPlayerLeave(playerId);
      removePlayer(playerId);
      unsubscribe();
    };
  }, [playerId, addPlayer, removePlayer]);

  return players;
};