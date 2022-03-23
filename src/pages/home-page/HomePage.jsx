import React, { useEffect, useContext } from 'react';
import classes from './HomePage.module.scss';

import { useDispatch, useSelector } from 'react-redux';

import Search from '../../components/search/Search';

import WeatherDisplay from '../../components/weather-display/WeatherDisplay';
import { fetchGeolocationCity } from '../../store/weater-actions';
import { ClipLoader } from 'react-spinners';
import ThemeContext from '../../context/theme-context';
import { toast } from 'react-toastify';
import GeolocationContext from '../../context/geolocation.context';

function HomePage() {
  const { theme } = useContext(ThemeContext);
  // access store state
  const { geolocation, setGeolocation, initialLoad, setInitialLoad } =
    useContext(GeolocationContext);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  // get geolocation

  useEffect(() => {
    const successCallback = (position) => {
      setGeolocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    };

    const errorCallback = () => {
      if (initialLoad) {
        toast.error(
          'Could not get current Geolocation information, (allow using location in browser settings)'
        );
        setInitialLoad(false);
      }
    };
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    if (geolocation.lat !== '' && geolocation.lng !== '' && initialLoad) {
      dispatch(fetchGeolocationCity(geolocation.lat, geolocation.lng));
      setInitialLoad(false);
    }
  }, [geolocation, dispatch, setGeolocation, setInitialLoad, initialLoad]);

  // // choose which city to display

  return (
    <main className={`${classes.main} ${theme ? classes.dark : classes.light}`}>
      <Search />
      {state.loading && (
        <ClipLoader
          color={theme ? 'crimson' : 'yellowgreen'}
          loading={state.loading}
          size={100}
        />
      )}
      <WeatherDisplay />
    </main>
  );
}

export default HomePage;
