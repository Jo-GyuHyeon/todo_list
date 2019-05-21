import React from 'react';
import Button from '../Common/Button';

const Link = ({ active, value, onClick }) => (
  <Button onClick={onClick} disabled={active}>
    {value}
  </Button>
);

export default Link;
