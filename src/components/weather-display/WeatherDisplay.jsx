import React, { useContext } from 'react';
import Card from '../card/Card';
import classes from './WeatherDisplay.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { selectCity } from '../../store/weater-actions';
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import { MdOutlineFavorite } from 'react-icons/md';
import ThemeContext from '../../context/theme-context';
import Toggle from '../toggle/Toggle';
import { v4 as uuidv4 } from 'uuid';
import TempContext from '../../context/temp-context';
import { ClipLoader } from 'react-spinners';

function WeatherDisplay() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { theme } = useContext(ThemeContext);
  const { temp, setTemp } = useContext(TempContext);
  const handleClick = (index) => {
    dispatch(selectCity(state.searchedCities[index]));
  };

  const convertToFahrenheit = (value) => {
    return ((value * 9) / 5 + 32).toFixed(1);
  };

  const addToFavorites = () => {
    dispatch({ type: 'ADD_TO_FAVORITES', payload: state.currentCity[0] });
  };

  const removeFromFavorites = () => {
    dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: state.currentCity[0] });
  };

  // check if it's in the favorites state
  const checkFavorite = (id) => {
    const searchedPlace = state.visited.find((el) => el.id === id);
    if (searchedPlace.isFavorite) {
      return true;
    }
    return false;
  };

  return (
    <>
      {state.searchedCities.length > 0 && <h3>Which Country?</h3>}
      <div className={classes.countries}>
        {state.searchedCities.map((loc, index) => (
          <div key={uuidv4()}>
            <p
              className={`${classes.country} ${
                theme ? classes.dark : classes.light
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
      {state.currentCity.length > 0 && state.searchedCities.length > 0 && (
        <div
          className={`${classes.container} ${
            theme ? classes.dark : classes.light
          }`}
        >
          <div className={classes['container-header']}>
            {/* Left side of the current weather display */}
            <div className={classes.left}>
              <div className={classes.img}>
                <img
                  src={
                    process.env.PUBLIC_URL +
                    `/images/${state.currentCity[0].weatherIcon}.png`
                  }
                  alt="rain"
                />
              </div>
              <div>
                <h3 className={classes.text}>
                  {state.currentCity[0].cityName}
                </h3>
                <h3 className={classes.text}>
                  {state.currentCity[0].region} - {state.currentCity[0].country}
                </h3>
                <h5 className={classes['sub-text']}>
                  {state.currentCity[0].weatherText}{' '}
                  {!temp
                    ? state.currentCity[0].currentWeather
                    : convertToFahrenheit(state.currentCity[0].currentWeather)}
                  &#176; {!temp ? 'C' : 'F'}
                </h5>
                <Toggle
                  setContext={setTemp}
                  checked={temp}
                  title="Celcius/Fahrenheit"
                />
              </div>
            </div>
            {/* right side to add to favorite */}
            <div className={classes.right}>
              <div className={classes.favorite}>
                {checkFavorite(state.currentCity[0].id) ? (
                  <MdOutlineFavorite
                    size={25}
                    color={theme ? 'crimson' : 'green'}
                  />
                ) : (
                  <MdOutlineFavoriteBorder
                    size={25}
                    color={theme ? 'crimson' : 'green'}
                  />
                )}
                {checkFavorite(state.currentCity[0].id) ? (
                  <button
                    className={`${classes.btn} ${
                      theme ? classes.dark : classes.light
                    }`}
                    onClick={removeFromFavorites}
                  >
                    Remove Favorite
                  </button>
                ) : (
                  <button
                    className={`${classes.btn} ${
                      theme ? classes.dark : classes.light
                    }`}
                    onClick={addToFavorites}
                  >
                    Add Favorite
                  </button>
                )}
              </div>
            </div>
          </div>
          <h1
            style={{ textAlign: 'center' }}
            className={classes['five-day-title']}
          >
            {' '}
            5-day Forecast
          </h1>
          {/* Display the 5-day forecast cards */}
          <div className={classes.bottom}>
            {state.loading && (
              <ClipLoader
                color={theme ? 'crimson' : 'yellowgreen'}
                loading={state.loading}
                size={150}
              />
            )}
            {state.fiveDayInfo.length > 0 &&
              state.fiveDayInfo.map((dayInfo, index) => (
                <Card key={uuidv4()} dayInfo={dayInfo} />
              ))}
          </div>
        </div>
      )}
    </>
  );
}

export default WeatherDisplay;
