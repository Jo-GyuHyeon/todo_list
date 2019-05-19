import React from 'react';
import { ReactComponent as CancelIcon } from '../ic-cancel.svg';
import './style.scss';
const AlertModal = ({ onClose, message }) => {
  return (
    <div className="modalWrapper">
      <div className="content">
        <div>
          <div className="cancelButton" onClick={onClose}>
            <CancelIcon />
          </div>
        </div>
        <div className="content">
          <div className="message">{message}</div>
          <div className="buttonWrapper">
            <button className="button submit" onClick={onClose}>
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
