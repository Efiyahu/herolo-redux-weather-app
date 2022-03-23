import { toast } from 'react-toastify';

// search cities by input that returns an array of cities
export const searchWeather = (input) => {
  // redux thunk allows us to make async tasks
  return async (dispatch) => {
    dispatch({ type: 'SEARCH_CITY_PENDING' });

    try {
      const response = await fetch(
        `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=eyrod3oWoFd8F1kLbA50y3tj24ZHWO7S&q=${input}`
      );

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();
      dispatch({ type: 'SEARCH_CITY_SUCCESS', payload: data });

      return dispatch(selectCity(data[0]));
    } catch (error) {
      dispatch({ type: 'SEARCH_CITY_ERROR', payload: error });
      toast.error(error.message + ' please enter a valid city name');
    }
  };
};

// select a specific city from the array of cities available to display
export const selectCity = (city) => {
  // choose a city from the array of locations from the search input

  return async (dispatch) => {
    dispatch({ type: 'SELECT_CITY_PENDING' });

    try {
      const response = await fetch(
        `https://dataservice.accuweather.com/currentconditions/v1/${city.Key}?apikey=eyrod3oWoFd8F1kLbA50y3tj24ZHWO7S&details=true`
      );

      if (!response.ok) throw new Error();

      const data = await response.json();

      // get the relevent info needed
      const newObject = {
        cityName: city.LocalizedName,
        region: city.AdministrativeArea.LocalizedName,
        country: city.Country.LocalizedName,
        id: city.Key,
        currentWeather: data[0].ApparentTemperature.Metric.Value,
        weatherIcon: data[0].WeatherIcon,
        weatherText: data[0].WeatherText,
        isFavorite: false,
      };
      // create shallow copy of the data object to add the isFavorite field
      dispatch({
        type: 'SELECT_CITY_SUCCESS',
        payload: [{ ...newObject }],
      });

      return dispatch(displayFiveDayInfo(newObject.id));
    } catch (error) {
      dispatch({ type: 'SELECT_CITY_ERROR', payload: error });
      toast.error(error.message + ' current city Info');
    }
  };
};

// get the fiveday forecast info about a specific city
export const displayFiveDayInfo = (cityKey) => {
  // display the weather info of a selected city in a 5 day forecast

  return async (dispatch) => {
    dispatch({ type: 'DISPLAY_FIVE_DAY_PENDING' });

    try {
      const response = await fetch(
        `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=eyrod3oWoFd8F1kLbA50y3tj24ZHWO7S&metric=true`
      );

      const data = await response.json();
      dispatch({
        type: 'DISPLAY_FIVE_DAY_SUCCESS',
        payload: data.DailyForecasts,
      });
    } catch (error) {
      dispatch({ type: 'DISPLAY_FIVE_DAY_ERROR', payload: error });
      toast.error('Could not show the correct 5-day data, server prolbem!');
    }
  };
};

// fetch the default city from Geolocation API
export const fetchGeolocationCity = (lat, lng) => {
  return async (dispatch) => {
    dispatch({ type: 'SEARCH_BY_GEO_PENDING' });

    try {
      const response = await fetch(
        `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=%09eyrod3oWoFd8F1kLbA50y3tj24ZHWO7S&q=${lat}%2C${lng}`
      );

      console.log(response.ok);

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();
      dispatch({
        type: 'SEARCH_BY_GEO_SUCCESS',
        payload: data,
      });
      return dispatch(selectCity(data));
    } catch (error) {
      dispatch({ type: 'SEARCH_BY_GEO_ERROR', payload: error });
      toast.error(error.message + ' could not get Geolocation Info');
    }
  };
};
