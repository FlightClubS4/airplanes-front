'use client';

import React, { useCallback, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Grid } from './Grid';
import { useGameStore } from '../../store/gameStore';
import { generateAirplanes } from '../../utils/airplane';
import { isAirplaneInBoard } from '../../utils/validation';
import styles from './Checkerboard.module.css';

interface CheckerboardProps {
  hideRotate?: boolean;
}

export const Checkerboard: React.FC<CheckerboardProps> = ({ 
  hideRotate = false
}) => {
  const { 
    airplanes,
    selectedAirplaneId,
    setSelectedAirplane,
    updateAirplanePosition,
    rotateAirplane,
    setAirplanes,
    invalidAirplanes
  } = useGameStore();
  
  useEffect(() => {
    if (airplanes.length === 0) {
      const initialAirplanes = generateAirplanes(3, isAirplaneInBoard);
      setAirplanes(initialAirplanes);
    }
  }, [airplanes.length, setAirplanes]);

  const handleDrop = useCallback((cellId: number, clickedCellOffset: number, airplaneId: number) => {
    const newPosition = cellId - clickedCellOffset;
    updateAirplanePosition(airplaneId, newPosition);
  }, [updateAirplanePosition]);

  const handleCellClick = useCallback((id: number, isAirplanePart: boolean, airplaneId: number | null) => {
    if (airplaneId !== null) {
      setSelectedAirplane(selectedAirplaneId === airplaneId ? null : airplaneId);
    } else {
      setSelectedAirplane(null);
    }
  }, [setSelectedAirplane, selectedAirplaneId]);

  const handleRotate = useCallback(() => {
    if (selectedAirplaneId !== null) {
      rotateAirplane(selectedAirplaneId);
    }
  }, [selectedAirplaneId, rotateAirplane]);

  const handleBoardClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedAirplane(null);
    }
  }, [setSelectedAirplane]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.container}>
        {!hideRotate && (
          <div className={styles.buttonGroup}>
            <button 
              onClick={handleRotate}
              className={styles.rotateButton}
              disabled={selectedAirplaneId === null}
            >
              旋转飞机
            </button>
          </div>
        )}
        <div 
          className={styles.checkerboard}
          onClick={handleBoardClick}
        >
          <Grid
            airplanes={airplanes}
            selectedAirplaneId={selectedAirplaneId}
            onDrop={handleDrop}
            onCellClick={handleCellClick}
            invalidAirplanes={invalidAirplanes}
          />
        </div>
      </div>
    </DndProvider>
  );
};