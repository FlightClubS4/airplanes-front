'use client';

import { Layout } from '../src/components/Layout/Layout';
import { CreateButton } from '../src/components/CreateButton/CreateButton';
import { UserList } from '../src/components/UserList';
import styles from './page.module.css';

export default function Home() {
  return (
    <Layout>
      <div className={styles.homeContainer}>
        <CreateButton />
        <h1>用户列表</h1>
        <UserList />
      </div>
    </Layout>
  );
}