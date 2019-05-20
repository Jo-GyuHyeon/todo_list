import * as React from 'react';
import './styles.scss';

const Wrapper = ({ children, wrapStyle = '' }) => (
  <div className={`wrapper ${wrapStyle}`}>{children}</div>
);

export default Wrapper;
