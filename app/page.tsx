'use client';

import { Layout } from '../src/components/Layout/Layout';
import { CreateButton } from '../src/components/CreateButton/CreateButton';
import { Checkerboard } from '../src/components/Checkerboard/Checkerboard';
import { UserList } from '../src/components/UserList';
import styles from './page.module.css';

export default function Home() {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.checkerboardSection}>
          <Checkerboard />
        </div>
        <div className={styles.rightSection}>
          <div className={styles.rightHeader}>
            <CreateButton />
          </div>
          <UserList />
        </div>
      </div>
    </Layout>
  );
}