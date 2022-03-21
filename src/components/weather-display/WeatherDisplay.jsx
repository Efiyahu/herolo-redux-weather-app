import React, { useState, useContext } from 'react';
import Card from '../card/Card';
import classes from './WeatherDisplay.module.scss';
import Rain from '../../assets/rain.png';
import { useDispatch, useSelector } from 'react-redux';
import { selectCity } from '../../store/weater-actions';
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import { MdOutlineFavorite } from 'react-icons/md';
import ThemeContext from '../../context/theme-context';

function WeatherDisplay() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [cityPointer, setCityPointer] = useState(0);
  const { theme } = useContext(ThemeContext);
  const handleClick = (index) => {
    dispatch(selectCity(state.location[index].Key));
    setCityPointer(index);
  };

  return (
    <>
      {state.location.length > 0 && <h3>Which Country?</h3>}
      <div className={classes.countries}>
        {state.location.map((loc, index) => (
          <div key={loc.Key}>
            <p
              className={`${classes.country} ${
                theme === 'dark' ? classes.dark : classes.light
              }`}
              onClick={() => handleClick(index)}
            >
              {loc.LocalizedName} - {loc.AdministrativeArea.LocalizedName}
              <br />
              {loc.Country.LocalizedName}
            </p>
          </div>
        ))}
      </div>
      {state.currentCity.length > 0 && (
        <div
          className={`${classes.container} ${
            theme === 'dark' ? classes.dark : classes.light
          }`}
        >
          <div className={classes['container-header']}>
            {/* Left side of the current weather display */}
            <div className={classes.left}>
              <div className={classes.img}>
                <img src={Rain} alt="rain" />
              </div>
              <div>
                <h3 className={classes.text}>
                  {state.geoCity
                    ? state.geoCity.LocalizedName
                    : state.location[cityPointer].LocalizedName}
                </h3>
                <h3 className={classes.text}>
                  {state.geoCity
                    ? state.geoCity.AdministrativeArea.LocalizedName
                    : state.location[cityPointer].AdministrativeArea
                        .LocalizedName}{' '}
                  -{' '}
                  {state.geoCity
                    ? state.geoCity.Country.LocalizedName
                    : state.location[cityPointer].Country.LocalizedName}
                </h3>
                <h5 className={classes['sub-text']}>
                  {state.currentCity.length > 0 &&
                    state.currentCity[0].WeatherText}{' '}
                  {state.currentCity.length > 0 &&
                    state.currentCity[0].Temperature.Metric.Value}
                  &#176; c
                </h5>
              </div>
            </div>
            {/* right side to add to favorite */}
            <div className={classes.right}>
              <div className={classes.favorite}>
                <MdOutlineFavoriteBorder size={25} color={'crimson'} />
                <button
                  className={`${classes.btn} ${
                    theme === 'dark' ? classes.dark : classes.light
                  }`}
                >
                  Add to Favorites
                </button>
              </div>
            </div>
          </div>
          <h1 style={{ textAlign: 'center' }}> 5-day Forecast</h1>
          {/* Display the 5-day forecast cards */}
          <div className={classes.bottom}>
            {state.fiveDayInfo.length > 0 &&
              state.fiveDayInfo.map((dayInfo, index) => (
                <Card key={index} dayInfo={dayInfo} />
              ))}
          </div>
        </div>
      )}
    </>
  );
}

export default WeatherDisplay;
