import React, { useContext } from 'react';
import TempContext from '../../context/temp-context';
import ThemeContext from '../../context/theme-context';
import classes from './Card.module.scss';

function Card({ dayInfo }) {
  const { theme } = useContext(ThemeContext);
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
  const { temp } = useContext(TempContext);

  const converToFahrenheit = (value) => {
    return ((value * 9) / 5 + 32).toFixed(1);
  };
  return (
    <div className={`${classes.card} ${theme ? classes.dark : classes.light}`}>
      <h2 className={classes.title}>{displayDay[day]}</h2>
      <h4 className={classes.subtitle}>
        Min:{' '}
        {!temp
          ? dayInfo.Temperature.Maximum.Value
          : converToFahrenheit(dayInfo.Temperature.Maximum.Value)}
        &#176; {temp ? 'F' : 'C'}
      </h4>
      <h4 className={classes.subtitle}>
        Max:{' '}
        {!temp
          ? dayInfo.Temperature.Minimum.Value
          : converToFahrenheit(dayInfo.Temperature.Minimum.Value)}
        &#176; {temp ? 'F' : 'C'}
      </h4>
    </div>
  );
}

export default Card;
