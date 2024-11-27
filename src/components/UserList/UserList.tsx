import React from 'react';
import { UserListItem } from './UserListItem';
import { mockUsers } from '../../data/mockUsers';
import styles from './UserList.module.css';

export const UserList: React.FC = () => {
  return (
    <div className={styles.userList}>
      {mockUsers.map((user) => (
        <UserListItem key={user.id} user={user} />
      ))}
    </div>
  );
};