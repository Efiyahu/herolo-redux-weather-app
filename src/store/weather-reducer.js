const initialState = {
  searchedCities: [],
  favorites: [],
  visited: [],
  currentCity: [],
  fiveDayInfo: [],
  loading: false,
  error: null,
};

const weatherReducer = (state = initialState, action) => {
  // weather action types
  switch (action.type) {
    case 'SEARCH_CITY_PENDING':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'SEARCH_CITY_SUCCESS':
      return {
        ...state,
        searchedCities: action.payload,
        loading: false,
        error: null,
      };
    case 'SEARCH_CITY_ERROR':
      return {
        ...state,
        searchedCities: [],
        loading: false,
        error: action.payload,
      };
    case 'SELECT_CITY_PENDING':
      return {
        ...state,
        loading: true,
        currentCity: [],
        error: null,
      };
    case 'SELECT_CITY_SUCCESS':
      return {
        ...state,
        loading: false,
        currentCity: action.payload,
        visited: [...state.visited, action.payload[0]],
      };
    case 'SELECT_CITY_ERROR':
      return {
        ...state,
        loading: false,
        currentCity: [],
        error: action.payload,
      };

    case 'DISPLAY_FIVE_DAY_PENDING':
      return {
        ...state,
        loading: true,
        fiveDayInfo: [],
        error: null,
      };
    case 'DISPLAY_FIVE_DAY_SUCCESS':
      return {
        ...state,
        loading: false,
        fiveDayInfo: action.payload,
        error: null,
      };
    case 'DISPLAY_FIVE_DAY_ERROR':
      return {
        ...state,
        loading: false,
        fiveDayInfo: [],
        error: action.payload,
      };

    case 'SEARCH_BY_GEO_PENDING':
      return {
        ...state,
        loading: true,
      };
    case 'SEARCH_BY_GEO_SUCCESS':
      return {
        ...state,
        loading: false,
        searchedCities: [action.payload],
      };
    case 'SEARCH_BY_GEO_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // sync action types
    case 'ADD_TO_FAVORITES':
      // as to not change the state but get a copy of the object
      const filteredArray = state.visited.filter(
        (el) => el.id !== action.payload.id
      );

      const favorite = { ...action.payload, isFavorite: true };

      return {
        ...state,
        favorites: [...state.favorites, favorite],
        visited: [...filteredArray, favorite],
      };

    case 'REMOVE_FROM_FAVORITES': {
      const copyObject = { ...action.payload };
      copyObject.isFavorite = false;
      const newVisitedArray = state.visited.filter(
        (el) => el.id !== copyObject.id
      );

      return {
        ...state,
        favorites: state.favorites.filter(
          (fav) => fav.id !== action.payload.id
        ),
        visited: [...newVisitedArray, { ...copyObject }],
      };
    }

    case 'SET_CURRENT_CITY':
      return {
        ...state,
        currentCity: [{ ...action.payload }],
      };

    default:
      return state;
  }
};

export default weatherReducer;
