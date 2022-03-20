import React, { useState } from 'react';
import classes from './HomePage.module.scss';

import { useDispatch, useSelector } from 'react-redux';

import Search from '../../components/search/Search';
import { selectCity } from '../../store/weater-actions';
import WeatherDisplay from '../../components/weather-display/WeatherDisplay';

function HomePage() {
  // access store state
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  // to save locally the country and city name
  const [cityInfo, setCityInfo] = useState({
    city: '',
    state: '',
    country: '',
  });

  // choose which city to display
  const handleClick = (index) => {
    dispatch(selectCity(state.location[index].Key));

    setCityInfo({
      city: state.location[index].LocalizedName,
      state: state.location[index].AdministrativeArea.LocalizedName,
      country: state.location[index].Country.LocalizedName,
    });
  };

  return (
    <main className={classes.main}>
      <Search />
      {state.loading && <h1>Loading...</h1>}
      {state.location.length > 0 && (
        <>
          <div className={classes.countries}>
            {state.location.map((location, index) => (
              <>
                <p
                  className={classes.country}
                  onClick={() => handleClick(index)}
                >
                  {location.LocalizedName} -{' '}
                  {location.AdministrativeArea.LocalizedName}
                  <br />
                  {location.Country.LocalizedName}
                </p>
              </>
            ))}
          </div>
          <WeatherDisplay cityInfo={cityInfo} />
        </>
      )}
    </main>
  );
}

export default HomePage;
