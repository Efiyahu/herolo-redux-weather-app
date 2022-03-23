import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ThemeContext from '../../context/theme-context';
import classes from './FavoritesPage.module.scss';
import { v4 as uuidv4 } from 'uuid';
import TempContext from '../../context/temp-context';
import { useNavigate } from 'react-router-dom';

function FavoritesPage() {
  const dispatch = useDispatch();
  const { theme } = useContext(ThemeContext);
  const { temp } = useContext(TempContext);
  const favorites = useSelector((state) => state.favorites);
  const navigate = useNavigate();

  const removeFromFavorites = (key) => {
    dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: key });
  };

  const convertToFahrenheit = (value) => {
    return ((value * 9) / 5 + 32).toFixed(1);
  };

  const handleClick = (item) => {
    //change the id back to Key for the dispatch

    dispatch({ type: 'SET_CURRENT_CITY', payload: item });
    navigate('/');
  };

  return (
    <div
      className={`${classes.container} ${theme ? classes.dark : classes.light}`}
    >
      <h1 className={classes['main-title']}>Favorites Page</h1>
      <div className={classes.cards}>
        {favorites.length > 0 &&
          favorites.map((favorite) => {
            return (
              <div key={uuidv4()} className={classes.card}>
                <div className={classes.name}>
                  <h3>{favorite.cityName}</h3>
                  <h4>{favorite.region}</h4>
                  <h5>{favorite.country}</h5>
                  <h4 style={{ marginTop: '.2rem' }}>{favorite.weatherText}</h4>
                </div>
                <h4>
                  {!temp
                    ? favorite.currentWeather
                    : convertToFahrenheit(favorite.currentWeather)}
                  &#176; {!temp ? 'C' : 'F'}
                </h4>
                <div className={classes.image}>
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      `/images/${favorite.weatherIcon}.png`
                    }
                    alt="weather"
                  />
                </div>
                <button
                  className={`${classes.btn} ${
                    theme ? classes.dark : classes.light
                  }`}
                  onClick={() => removeFromFavorites(favorite)}
                >
                  Remove from Favorites
                </button>
                <button
                  className={`${classes.btn} ${
                    theme ? classes.dark : classes.light
                  }`}
                  onClick={() => handleClick(favorite)}
                >
                  Show Details
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default FavoritesPage;
