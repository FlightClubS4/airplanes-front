import { create } from "zustand";
import { Airplane, Direction } from "../types/airplane";
import { isAirplaneInBoard } from "../utils/validation";
import { checkAirplanesOverlap } from "../utils/airplane";

interface AttackCell {
  id: number;
  hitType: "head" | "body" | "miss";
}

interface GameState {
  airplanes: Airplane[];
  selectedAirplaneId: number | null;
  invalidAirplanes: Set<number>;
  isGameCreated: boolean;
  myBoardHits: number[]; // 对手攻击我的位置
  attackBoardHits: AttackCell[]; // 我攻击对手的记录
  setAirplanes: (airplanes: Airplane[]) => void;
  setSelectedAirplane: (id: number | null) => void;
  updateAirplanePosition: (id: number, position: number) => void;
  rotateAirplane: (id: number) => void;
  validateAirplanes: () => void;
  setGameCreated: (created: boolean) => void;
  addMyBoardHit: (position: number) => void;
  addAttackBoardHit: (hit: AttackCell) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  airplanes: [],
  selectedAirplaneId: null,
  invalidAirplanes: new Set<number>(),
  isGameCreated: false,
  myBoardHits: [],
  attackBoardHits: [],

  setAirplanes: (airplanes) => {
    set({ airplanes });
    get().validateAirplanes();
  },

  setSelectedAirplane: (id) => {
    if (!get().isGameCreated) {
      set({ selectedAirplaneId: id });
    }
  },

  updateAirplanePosition: (id, position) => {
    if (get().isGameCreated) return;

    set((state) => ({
      airplanes: state.airplanes.map((airplane) =>
        airplane.id === id ? { ...airplane, position } : airplane
      )
    }));
    get().validateAirplanes();
  },

  rotateAirplane: (id) => {
    if (get().isGameCreated) return;

    set((state) => ({
      airplanes: state.airplanes.map((airplane) =>
        airplane.id === id
          ? {
              ...airplane,
              direction: ((airplane.direction + 1) % 4) as Direction
            }
          : airplane
      )
    }));
    get().validateAirplanes();
  },

  validateAirplanes: () => {
    const { airplanes } = get();
    const invalid = new Set<number>();

    airplanes.forEach((airplane) => {
      if (!isAirplaneInBoard(airplane.position, airplane.direction)) {
        invalid.add(airplane.id);
      }
    });

    airplanes.forEach((airplane1, index) => {
      airplanes.slice(index + 1).forEach((airplane2) => {
        if (checkAirplanesOverlap(airplane1, airplane2)) {
          invalid.add(airplane1.id);
          invalid.add(airplane2.id);
        }
      });
    });

    set({ invalidAirplanes: invalid });
  },

  setGameCreated: (created) => set({ isGameCreated: created }),

  addMyBoardHit: (position) => {
    set((state) => ({
      myBoardHits: [...state.myBoardHits, position]
    }));
  },

  addAttackBoardHit: (hit) => {
    set((state) => ({
      attackBoardHits: [...state.attackBoardHits, hit]
    }));
  },

  resetGame: () => {
    set({
      selectedAirplaneId: null,
      isGameCreated: false,
      myBoardHits: [],
      attackBoardHits: []
    });
  }
}));
