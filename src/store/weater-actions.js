export const searchWeather = (input) => {
  // redux thunk allows us to make async tasks
  return async (dispatch, getState) => {
    dispatch({ type: 'SEARCH_CITY_PENDING' });

    try {
      const response = await fetch(
        `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=%09tifBSVtKNWx7qdSGbrZsi6usHmoijA2q&q=${input}`
      );

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();

      dispatch({ type: 'SEARCH_CITY_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'SEARCH_CITY_ERROR', payload: error });
    }
  };
};

export const selectCity = (cityKey) => {
  // choose a city from the array of locations from the search input

  return async (dispatch, getState) => {
    dispatch({ type: 'SELECT_CITY_PENDING' });

    try {
      const response = await fetch(
        `http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=%09tifBSVtKNWx7qdSGbrZsi6usHmoijA2q&details=true`
      );

      if (!response.ok) throw new Error();

      const data = await response.json();
      dispatch({ type: 'SELECT_CITY_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'SELECT_CITY_ERROR', payload: error });
    }
  };
};

export const displayFiveDayInfo = (cityKey) => {
  // display the weather info of a selected city in a 5 day forecast

  return async (dispatch, getState) => {
    dispatch({ type: 'DISPLAY_FIVE_DAY_PENDING' });

    try {
      const response = await fetch(
        `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=tifBSVtKNWx7qdSGbrZsi6usHmoijA2q&metric=true`
      );

      const data = await response.json();
      dispatch({ type: 'DISPLAY_FIVE_DAY_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'DISPLAY_FIVE_DAY_ERROR', payload: error });
    }
  };
};
