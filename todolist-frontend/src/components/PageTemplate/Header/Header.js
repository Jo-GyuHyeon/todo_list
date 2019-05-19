import React from 'react';
import ExpiredModalContainer from '../../../containers/ExpiredModalContainer';
import './styles.scss';

const day = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];
const month = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];
const date = new Date();
const today = day[date.getDay()];
const month_number = date.getMonth();

const Header = () => (
  <div className="header">
    <div className="date">
      <div className="date-title">{`${today}, ${month_number + 1}th`}</div>
      <div className="date-subtitle">{`${month[month_number]}`}</div>
    </div>
    <div className="title">todos</div>
    <ExpiredModalContainer />
  </div>
);

export default Header;
