'use client';

import React from 'react';
import { User } from '../../types/user';
import { Button } from '../Button/Button';
import { useGameStore } from '../../store/gameStore';
import styles from './UserList.module.css';

interface UserListItemProps {
  user: User;
}

export const UserListItem: React.FC<UserListItemProps> = ({ user }) => {
  const { invalidAirplanes } = useGameStore();

  const handleJoin = () => {
    if (invalidAirplanes.size > 0) {
      alert('飞机摆放错误，请检查飞机摆放');
      return;
    }
    console.log(`加入用户 ${user.id}`);
  };

  return (
    <div className={styles.userItem}>
      <span className={styles.nickname}>{user.nickname}</span>
      <Button onClick={handleJoin}>加入</Button>
    </div>
  );
};