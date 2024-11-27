import React from 'react';
import Link from 'next/link';
import styles from './Menu.module.css';

export const Menu: React.FC = () => {
  return (
    <nav className={styles.menu}>
      <Link href="/" className={styles.link}>
        Home
      </Link>
      <Link href="/chip" className={styles.link}>
        ChipPage
      </Link>
    </nav>
  );
};