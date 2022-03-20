import React from 'react';
import Card from '../card/Card';
import classes from './WeatherDisplay.module.scss';
import Rain from '../../assets/rain.png';
import { useSelector } from 'react-redux';

function WeatherDisplay({ cityInfo }) {
  const state = useSelector((state) => state);
  return (
    <div className={classes.container}>
      <div className={classes['container-header']}>
        {/* Left side of the current weather display */}
        <div className={classes.left}>
          <div className={classes.img}>
            <img src={Rain} alt="rain" />
          </div>
          <div>
            <h2>{cityInfo.city}</h2>
            <h2>
              {cityInfo.state} - {cityInfo.country}
            </h2>
            <h4>38&#176; c</h4>
          </div>
        </div>
        {/* right side to add to favorite */}
        <div className={classes.right}>
          <div className={classes.favorite}>
            <button className={classes.btn}>Add to Favorites</button>
          </div>
        </div>
      </div>
      <h1 style={{ textAlign: 'center' }}> 5-day Forecast</h1>
      {/* Display the 5-day forecast cards */}
      <div className={classes.bottom}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}

export default WeatherDisplay;
