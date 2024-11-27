'use client';

import { Layout } from '../../src/components/Layout';
import { BackButton } from '../../src/components/BackButton/BackButton';
import { Checkerboard } from '../../src/components/Checkerboard/Checkerboard';
import styles from './page.module.css';

export default function CheckerboardPage() {
  return (
    <Layout>
      <div className={styles.checkerboardContainer}>
        <BackButton />
        <h1>棋盘页面</h1>
        <div className={styles.content}>
          <Checkerboard />
        </div>
      </div>
    </Layout>
  );
}