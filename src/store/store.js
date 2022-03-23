import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import weatherReducer from './weather-reducer';

// use the redux-thunk library to make async calls
// setting up the initial store
const store = createStore(
  weatherReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
