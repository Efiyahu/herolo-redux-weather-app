import React, { useState, useContext } from 'react';
import classes from './Search.module.scss';
import { searchWeather, selectCity } from '../../store/weater-actions';
import { useDispatch, useSelector } from 'react-redux';

import { FaSearch } from 'react-icons/fa';
import ThemeContext from '../../context/theme-context';

function Search() {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const { theme } = useContext(ThemeContext);

  const handleClick = () => {
    dispatch(searchWeather(input));
  };
  return (
    <div className={classes.search}>
      <div
        className={`${classes['search-box']} ${
          theme === 'dark' ? classes.dark : classes.light
        }`}
      >
        <input
          className={`${classes['search-txt']} ${
            theme === 'dark' ? classes.dark : classes.light
          }`}
          type="text"
          name="input"
          placeholder="Enter a city"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          className={`${classes['search-btn']} ${
            theme === 'dark' ? classes.dark : classes.light
          }`}
          onClick={handleClick}
        >
          <FaSearch />
        </button>
      </div>
    </div>
  );
}

export default Search;
