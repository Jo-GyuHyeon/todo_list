import React from 'react';

const Link = ({ active, value, onClick }) => (
  <button onClick={onClick} disabled={active}>
    {value}
  </button>
);

export default Link;
