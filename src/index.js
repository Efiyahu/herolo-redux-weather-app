import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import { ThemeContextProvider } from './context/theme-context';
import { TempContextProvider } from './context/temp-context';

ReactDOM.render(
  <React.StrictMode>
    <TempContextProvider>
      <ThemeContextProvider>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </ThemeContextProvider>
    </TempContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
