'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../Button/Button';
import styles from './BackButton.module.css';

export const BackButton: React.FC = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className={styles.backButton}>
      <Button onClick={handleBack} variant="secondary">返回</Button>
    </div>
  );
};