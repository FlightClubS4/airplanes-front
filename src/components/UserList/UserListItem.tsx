'use client';

import React from 'react';
import { User } from '../../types/user';
import { Button } from '../Button/Button';
import styles from './UserList.module.css';

interface UserListItemProps {
  user: User;
}

export const UserListItem: React.FC<UserListItemProps> = ({ user }) => {
  const handleJoin = () => {
    console.log(`加入用户 ${user.id}`);
  };

  return (
    <div className={styles.userItem}>
      <span className={styles.nickname}>{user.nickname}</span>
      <Button onClick={handleJoin}>加入</Button>
    </div>
  );
};