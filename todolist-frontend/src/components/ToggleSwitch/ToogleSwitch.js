import * as React from 'react';
import './style.scss';

const ToogleSwitch = ({ onClick, checked }) => (
  <div>
    <label className="switch">
      <input
        className="switch__checkbox"
        type="checkbox"
        onChange={onClick}
        checked={checked}
      />
      <span className="slider-round" />
    </label>
  </div>
);

export default ToogleSwitch;
