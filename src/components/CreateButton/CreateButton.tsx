'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../Button/Button';
import styles from './CreateButton.module.css';

export const CreateButton: React.FC = () => {
  const router = useRouter();

  const handleCreate = () => {
    router.push('/checkerboard');
  };

  return (
    <div className={styles.createButton}>
      <Button onClick={handleCreate}>创建</Button>
    </div>
  );
};