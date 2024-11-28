import { create } from 'zustand';

interface Player {
  id: string;
  isReady: boolean;
}

interface PlayerState {
  players: Player[];
  chipCount: number;
  addPlayer: (playerId: string) => void;
  removePlayer: (playerId: string) => void;
  setPlayerReady: (playerId: string) => void;
  setChipCount: (count: number) => void;
  reset: () => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  players: [],
  chipCount: 0,
  
  addPlayer: (playerId) =>
    set((state) => ({
      players: [...state.players, { id: playerId, isReady: false }],
    })),
    
  removePlayer: (playerId) =>
    set((state) => ({
      players: state.players.filter((player) => player.id !== playerId),
    })),
    
  setPlayerReady: (playerId) =>
    set((state) => ({
      players: state.players.map((player) =>
        player.id === playerId ? { ...player, isReady: true } : player
      ),
    })),
    
  setChipCount: (count) => set({ chipCount: count }),

  reset: () => set({ players: [], chipCount: 0 }),
}));