import React from 'react';

const Link = ({ active, value, onClick }) => (
  <button
    onClick={onClick}
    disabled={active}
    style={{
      marginLeft: '4px'
    }}
  >
    {value}
  </button>
);

export default Link;
