import React from 'react';
import { Header } from '../Header/Header';
import { Menu } from '../Menu/Menu';
import { Container } from '../Container/Container';
import styles from './Layout.module.css';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.content}>
        <Menu />
        <Container>{children}</Container>
      </div>
    </div>
  );
};