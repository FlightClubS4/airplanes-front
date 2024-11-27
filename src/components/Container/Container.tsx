import React from 'react';
import styles from './Container.module.css';

export const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
};