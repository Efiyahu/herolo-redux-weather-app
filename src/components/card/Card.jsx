import React from 'react';
import classes from './Card.module.scss';

function Card({ dayInfo }) {
  const date = new Date(dayInfo.Date);
  const day = date.getDay();
  const displayDay = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
  };
  return (
    <div className={classes.card}>
      <h2 className={classes.title}>{displayDay[day]}</h2>
      <h4 className={classes.subtitle}>
        Min: {dayInfo.Temperature.Maximum.Value}&#176; c
      </h4>
      <h4 className={classes.subtitle}>
        Max: {dayInfo.Temperature.Minimum.Value}&#176; c
      </h4>
    </div>
  );
}

export default Card;
