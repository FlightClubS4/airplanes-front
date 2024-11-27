'use client';

import { Layout } from '../components/Layout';
import { UserList } from '../components/UserList';
import { CreateButton } from '../components/CreateButton/CreateButton';
import styles from './page.module.css';

export default function Home() {
  return (
    <Layout>
      <div className={styles.homeContainer}>
        <CreateButton />
        <UserList />
      </div>
    </Layout>
  );
}