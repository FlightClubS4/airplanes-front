'use client';

import { Layout } from '../../components/Layout';
import { BackButton } from '../../components/BackButton/BackButton';
import { Checkerboard } from '../../components/Checkerboard/Checkerboard';
import styles from './page.module.css';

export default function CheckerboardPage() {
  return (
    <Layout>
      <div className={styles.checkerboardContainer}>
        <BackButton />
        <h1 className={styles.title}>棋盘页面</h1>
        <div className={styles.content}>
          <Checkerboard />
        </div>
      </div>
    </Layout>
  );
}