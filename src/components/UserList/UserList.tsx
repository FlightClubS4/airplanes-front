import React from 'react';
import { UserListItem } from './UserListItem';
import { mockUsers } from '../../data/mockUsers';
import styles from './UserList.module.css';

export const UserList: React.FC = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>可加入的游戏</h2>
      <div className={styles.userList}>
        {mockUsers.length > 0 ? (
          mockUsers.map((user) => (
            <UserListItem key={user.id} user={user} />
          ))
        ) : (
          <div className={styles.emptyMessage}>
            暂无可加入的游戏
          </div>
        )}
      </div>
    </div>
  );
};