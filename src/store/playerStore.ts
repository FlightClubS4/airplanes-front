import { create } from 'zustand';

interface Player {
  id: string;
  isReady: boolean;
}

interface PlayerState {
  players: Player[];
  // chipCount: number;
  roomInfo: {
    roomId: string;
    creator: string; 
    player2: string | null;
    chipAmount: string | number;
    status: string;
  };
  addPlayer: (playerId: string) => void;
  removePlayer: (playerId: string) => void;
  setPlayerReady: (playerId: string) => void;
  setRoomInfo: (roomInfo: Object) => void;
  reset: () => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  players: [],
  roomInfo: {
    roomId: '',
    creator: '',
    player2: null,
    chipAmount: "0",
    status: "waiting"
  },

  addPlayer: (playerId) =>
    set((state) => ({
      players: [...state.players, { id: playerId, isReady: false }]
    })),

  removePlayer: (playerId) =>
    set((state) => ({
      players: state.players.filter((player) => player.id !== playerId)
    })),

  setPlayerReady: (playerId) =>
    set((state) => ({
      players: state.players.map((player) =>
        player.id === playerId ? { ...player, isReady: true } : player
      )
    })),

  // setChipCount: (count) => set({ chipCount: count }),
  setRoomInfo: (roomInfo) => set({ roomInfo }),

  reset: () => set({ players: [] })
}));