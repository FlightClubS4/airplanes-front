import React, { ReactNode } from 'react';
import { Button } from '../Button/Button';
import styles from './Modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  onConfirm: () => void;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{title}</h2>
        </div>
        <div className={styles.modalContent}>
          {children}
        </div>
        <div className={styles.modalActions}>
          <Button onClick={onClose} variant="secondary">取消</Button>
          <Button onClick={onConfirm}>确认</Button>
        </div>
      </div>
    </div>
  );
};