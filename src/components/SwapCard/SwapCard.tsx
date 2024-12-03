'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '../Button/Button';
import styles from './SwapCard.module.css';

const CHIP_RATE = 1000000; // 1 ETH = 1,000,000 FAT

type Token = 'ETH' | 'FAT';

export const SwapCard = () => {
  const [sellAmount, setSellAmount] = useState('');
  const [buyAmount, setBuyAmount] = useState('0');
  const [sellToken, setSellToken] = useState<Token>('ETH');
  const [buyToken, setBuyToken] = useState<Token>('FAT');

  useEffect(() => {
    if (sellAmount) {
      const sellValue = parseFloat(sellAmount);
      if (!isNaN(sellValue)) {
        if (sellToken === 'ETH' && buyToken === 'FAT') {
          setBuyAmount((sellValue * CHIP_RATE).toFixed(6));
        } else if (sellToken === 'FAT' && buyToken === 'ETH') {
          setBuyAmount((sellValue / CHIP_RATE).toFixed(6));
        } else {
          setBuyAmount(sellAmount);
        }
      }
    } else {
      setBuyAmount('0.00');
    }
  }, [sellAmount, sellToken, buyToken]);

  const handleSellAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setSellAmount(value);
    }
  };

  const handleSwitch = () => {
    const tempToken = sellToken;
    setSellToken(buyToken);
    setBuyToken(tempToken);
    setSellAmount('');
    setBuyAmount('0');
  };

  return (
    <div className={styles.card}>
      <div className={styles.swapContainer}>
        <div className={styles.inputGroup}>
          <label>Sell</label>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              value={sellAmount}
              onChange={handleSellAmountChange}
              placeholder="0.00"
              className={styles.input}
            />
            <select 
              value={sellToken}
              onChange={(e) => {
                setSellToken(e.target.value as Token);
                setBuyToken(e.target.value === 'ETH' ? 'FAT' : 'ETH');
                setSellAmount('');
                setBuyAmount('0');
              }}
              className={styles.select}
            >
              <option value="ETH">ETH</option>
              <option value="FAT">FAT</option>
            </select>
          </div>
        </div>

        <button onClick={handleSwitch} className={styles.switchButton}>
          ⇅
        </button>

        <div className={styles.inputGroup}>
          <label>Buy</label>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              value={buyAmount}
              readOnly
              className={`${styles.input} ${styles.readOnly}`}
            />
            <select 
              value={buyToken}
              onChange={(e) => {
                setBuyToken(e.target.value as Token);
                setSellToken(e.target.value === 'ETH' ? 'FAT' : 'ETH');
                setSellAmount('');
                setBuyAmount('0');
              }}
              className={styles.select}
            >
              <option value="ETH">ETH</option>
              <option value="FAT">FAT</option>
            </select>
          </div>
        </div>
      </div>

      <Button onClick={() => console.log('Swap clicked')}>
        Swap
      </Button>
    </div>
  );
};