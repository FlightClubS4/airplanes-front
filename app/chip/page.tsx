'use client';

import { Layout } from '../../src/components/Layout/Layout';
import { SwapCard } from '../../src/components/SwapCard/SwapCard';
import styles from './page.module.css';

export default function ChipPage() {
  return (
    <Layout>
      <div className={styles.container}>
        <SwapCard />
      </div>
    </Layout>
  );
}