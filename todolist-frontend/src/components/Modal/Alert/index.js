import React, { Component } from 'react';
import { ReactComponent as CancelIcon } from '../ic-cancel.svg';
import './style.scss';

class AlertModal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.escFunction, false);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.escFunction, false);
  }

  escFunction = event => {
    if (event.keyCode === 27 || event.keyCode === 13) {
      this.props.onClose();
    }
  };

  render() {
    const { onClose, message } = this.props;
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
  }
}

export default AlertModal;
