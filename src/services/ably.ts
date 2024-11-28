import Ably from 'ably';

const apiKey = process.env.NEXT_PUBLIC_ABLY_API_KEY || 'your-api-key';
const ably = new Ably.Realtime(apiKey);

export const gameChannel = ably.channels.get('game-channel');

export const publishPlayerJoin = (playerId: string) => {
  gameChannel.publish('player-join', { playerId });
};

export const publishPlayerLeave = (playerId: string) => {
  gameChannel.publish('player-leave', { playerId });
};

export const subscribeToPlayers = (callback: (message: any) => void) => {
  gameChannel.subscribe('player-join', callback);
  gameChannel.subscribe('player-leave', callback);
  return () => {
    gameChannel.unsubscribe('player-join', callback);
    gameChannel.unsubscribe('player-leave', callback);
  };
};

export const subscribeToGameState = (callback: (message: any) => void) => {
  gameChannel.subscribe('game-state', callback);
  return () => {
    gameChannel.unsubscribe('game-state', callback);
  };
};

export const publishGameState = (state: any) => {
  gameChannel.publish('game-state', state);
};