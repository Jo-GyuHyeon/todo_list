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
const sub_title = `${today}, ${month_number + 1}th ${month[month_number]}`;

const Header = () => (
  <div className="header">
    <div className="date">
      <div className="title">Todo</div>
      <div className="subtitle">{sub_title}</div>
    </div>
    <ExpiredModalContainer />
  </div>
);

export default Header;
