import * as React from 'react';
import './style.scss';

const CheckBox = ({ onClick, id, checked }) => (
  <div className="container" onClick={() => onClick(id)}>
    <input className="checkbox" type="checkbox" checked={checked} readOnly />
    <span className="checkmark" />
  </div>
);

export default CheckBox;
