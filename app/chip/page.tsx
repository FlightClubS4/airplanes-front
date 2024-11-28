'use client';

import { Layout } from '../../src/components/Layout/Layout';
import { DualCheckerboard } from '../../src/components/DualCheckerboard/DualCheckerboard';
import styles from './page.module.css';

export default function ChipPage() {
  return (
    <Layout>
      <div className={styles.container}>
        <DualCheckerboard />
      </div>
    </Layout>
  );
}