'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Grid } from './Grid';
import { Direction, Airplane } from '../../types/airplane';
import { useAirplaneValidation } from '../../hooks/useAirplaneValidation';
import { generateAirplanes, checkAirplanesOverlap, getAirplanePositions } from '../../utils/airplane';
import { getCellInfo } from '../../utils/cellHash';
import styles from './Checkerboard.module.css';

export const Checkerboard: React.FC = () => {
  const [airplanes, setAirplanes] = useState<Airplane[]>([]);
  const [selectedAirplaneId, setSelectedAirplaneId] = useState<number | null>(null);
  const [invalidAirplanes, setInvalidAirplanes] = useState<Set<number>>(new Set());
  
  const isAirplaneInBoard = useAirplaneValidation();

  useEffect(() => {
    // 初始化时生成三架飞机
    const initialAirplanes = generateAirplanes(3, isAirplaneInBoard);
    setAirplanes(initialAirplanes);
  }, [isAirplaneInBoard]);

  // 检查飞机位置是否有效
  const validateAirplanes = useCallback((currentAirplanes: Airplane[]) => {
    const invalid = new Set<number>();

    currentAirplanes.forEach(airplane => {
      // 检查是否在棋盘范围内
      if (!isAirplaneInBoard(airplane.position, airplane.direction)) {
        invalid.add(airplane.id);
        return;
      }

      // 检查是否与其他飞机重叠
      currentAirplanes.forEach(other => {
        if (airplane.id !== other.id && checkAirplanesOverlap(airplane, other)) {
          invalid.add(airplane.id);
          invalid.add(other.id);
        }
      });
    });

    return invalid;
  }, [isAirplaneInBoard]);

  useEffect(() => {
    const invalid = validateAirplanes(airplanes);
    setInvalidAirplanes(invalid);
  }, [airplanes, validateAirplanes]);

  const handleRotate = useCallback(() => {
    if (selectedAirplaneId === null) return;

    setAirplanes(prevAirplanes => {
      return prevAirplanes.map(airplane => {
        if (airplane.id !== selectedAirplaneId) return airplane;
        const newDirection = (airplane.direction + 1) % 4 as Direction;
        return { ...airplane, direction: newDirection };
      });
    });
  }, [selectedAirplaneId]);

  const handleDrop = useCallback((cellId: number, clickedCellOffset: number, airplaneId: number) => {
    const newPosition = cellId - clickedCellOffset;
    
    setAirplanes(prevAirplanes => {
      return prevAirplanes.map(airplane => {
        if (airplane.id !== airplaneId) return airplane;
        return { ...airplane, position: newPosition };
      });
    });
  }, []);

  const handleCellClick = useCallback((id: number, isAirplanePart: boolean, airplaneId: number | null) => {
    if (airplaneId !== null) {
      setSelectedAirplaneId(airplaneId);
    }
    const cellInfo = getCellInfo(id, isAirplanePart, airplaneId !== null);
    console.log(cellInfo);
  }, []);

  const isReady = invalidAirplanes.size === 0;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.container}>
        <div className={styles.buttonGroup}>
          <button 
            onClick={handleRotate} 
            className={styles.rotateButton}
            disabled={selectedAirplaneId === null}
          >
            旋转飞机
          </button>
          <button 
            className={styles.readyButton}
            disabled={!isReady}
          >
            创建
          </button>
        </div>
        <div className={styles.checkerboard}>
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