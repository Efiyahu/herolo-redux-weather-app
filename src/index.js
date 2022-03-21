import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import { ThemeContextProvider } from './context/theme-context';

ReactDOM.render(
  <React.StrictMode>
    <ThemeContextProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ThemeContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
