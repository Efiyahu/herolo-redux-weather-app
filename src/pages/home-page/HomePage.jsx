import React, { useState, useEffect, useContext } from 'react';
import classes from './HomePage.module.scss';

import { useDispatch, useSelector } from 'react-redux';

import Search from '../../components/search/Search';

import WeatherDisplay from '../../components/weather-display/WeatherDisplay';
import { fetchGeolocationCity } from '../../store/weater-actions';
import { ClipLoader } from 'react-spinners';
import ThemeContext from '../../context/theme-context';

function HomePage() {
  const { theme } = useContext(ThemeContext);
  // access store state
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  // to save locally the country and city name
  const [geo, setGeo] = useState({
    lat: '',
    lng: '',
  });

  // get geolocation

  useEffect(() => {
    const successCallback = (position) => {
      setGeo({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    };

    const errorCallback = () => {
      console.log('error getting position');
    };
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

    if (geo.lat !== '' && geo.lng !== '') {
      dispatch(fetchGeolocationCity(geo.lat, geo.lng));
    }
  }, [geo.lat, geo.lng, dispatch]);

  // choose which city to display

  return (
    <main
      className={`${classes.main} ${
        theme === 'dark' ? classes.dark : classes.light
      }`}
    >
      <Search />
      {state.loading && (
        <ClipLoader color={'crimson'} loading={state.loading} size={150} />
      )}
      <WeatherDisplay />
    </main>
  );
}

export default HomePage;
