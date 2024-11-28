'use client';

import React, { useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Grid } from '../Checkerboard/Grid';
import styles from './AttackBoard.module.css';

export const AttackBoard: React.FC = () => {
  const handleCellClick = useCallback((id: number) => {
    console.log(`攻击格子 ${id}`);
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.container}>
        <div className={styles.board}>
          <Grid
            airplanes={[]}
            selectedAirplaneId={null}
            onDrop={() => {}}
            onCellClick={handleCellClick}
            invalidAirplanes={new Set()}
            isAttackBoard={true}
          />
        </div>
      </div>
    </DndProvider>
  );
};