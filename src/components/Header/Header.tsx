import React from 'react';
import styles from './Header.module.css';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <h1>Next.js 应用</h1>
    </header>
  );
};