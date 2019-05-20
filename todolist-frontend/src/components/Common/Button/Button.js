import * as React from 'react';
import './style.scss';

const Button = ({ children, color, onClick, disabled, type }) => (
  <button
    className={`button ${color || ''}`}
    onClick={onClick}
    disabled={disabled}
    type={type}
  >
    {children}
  </button>
);

export default Button;
