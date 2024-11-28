'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../Button/Button';
import { Modal } from '../Modal/Modal';
import { useGameStore } from '../../store/gameStore';
import styles from './CreateButton.module.css';

export const CreateButton: React.FC = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chipCount, setChipCount] = useState('');
  const { invalidAirplanes, setGameCreated } = useGameStore();

  const handleCreate = () => {
    if (invalidAirplanes.size > 0) {
      alert('飞机摆放错误，请检查飞机摆放');
      return;
    }
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    const count = parseInt(chipCount, 10);
    if (count > 0) {
      setGameCreated(true);
      router.push(`/chip?count=${count}`);
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <div className={styles.createButton}>
        <Button onClick={handleCreate}>创建游戏</Button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="创建新游戏"
        onConfirm={handleConfirm}
      >
        <div>
          <label htmlFor="chipCount">请输入筹码数量：</label>
          <input
            id="chipCount"
            type="number"
            min="1"
            value={chipCount}
            onChange={(e) => setChipCount(e.target.value)}
            className={styles.input}
            placeholder="请输入大于0的数字"
          />
        </div>
      </Modal>
    </>
  );
};