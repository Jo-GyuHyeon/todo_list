import * as React from 'react';
import './style.scss';

const ToggleSwitch = ({ onChange, checked }) => (
  <div className="toggleSwitch">
    <span className="chekced">{checked ? 'on' : 'off'}</span>
    <label className="switch">
      <div className="tooltip">
        <span className="tooltip__tooltiptext">Alarms for deadlines</span>
        <input
          className="switch__checkbox"
          type="checkbox"
          onChange={onChange}
          checked={checked}
        />
        <span className="slider-round" />
      </div>
    </label>
  </div>
);

export default ToggleSwitch;
