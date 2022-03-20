const initialState = {
  location: [],
  favorites: [],
  loading: false,
  currentCity: null,
  error: null,
};

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SEARCH_CITY_PENDING':
      return {
        ...state,
        location: [],
        loading: true,
        error: null,
      };
    case 'SEARCH_CITY_SUCCESS':
      return {
        ...state,
        location: action.payload,
        loading: false,
        error: null,
      };
    case 'SEARCH_CITY_ERROR':
      return {
        ...state,
        location: [],
        loading: false,
        error: action.payload,
      };
    case 'SELECT_CITY_PENDING':
      return {
        ...state,
        loading: true,
        currentCity: null,
        error: null,
      };
    case 'SELECT_CITY_SUCCESS':
      return {
        ...state,
        loading: false,
        currentCity: action.payload,
      };
    case 'SELECT_CITY_ERROR':
      return {
        ...state,
        loading: false,
        currentCity: null,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default weatherReducer;
