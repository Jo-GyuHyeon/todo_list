import React from 'react';
import { ReactComponent as CancelIcon } from '../ic-cancel.svg';
import styles from './AlertModal.module.css';

const AlertModal = ({ onClose, message }) => {
  return (
    <div className={styles.modalWrapper}>
      <div className={styles.content}>
        <div>
          <div className={styles.cancelButton} onClick={onClose}>
            <CancelIcon />
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.message}>{message}</div>
          <div className={styles.buttonWrapper}>
            <button
              className={`${styles.button} ${styles.submit}`}
              onClick={onClose}
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
