'use client';

import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useNetwork } from 'wagmi';
import styles from './Header.module.css';

export const Header: React.FC = () => {
  const { chain } = useNetwork();

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <h1>Next.js 应用</h1>
        <div className={styles.walletSection}>
          <ConnectButton 
            label="连接钱包"
            showBalance={{
              smallScreen: false,
              largeScreen: true,
            }}
            chainStatus="full"
            accountStatus={{
              smallScreen: "avatar",
              largeScreen: "full",
            }}
          />
        </div>
      </div>
    </header>
  );
};