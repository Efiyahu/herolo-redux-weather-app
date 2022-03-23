import React, { useState, useContext } from 'react';
import classes from './Search.module.scss';
import { searchWeather } from '../../store/weater-actions';
import { useDispatch } from 'react-redux';

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
          theme ? classes.dark : classes.light
        }`}
      >
        <input
          className={`${classes['search-txt']} ${
            theme ? classes.dark : classes.light
          }`}
          type="text"
          name="input"
          required
          placeholder="Enter a city"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          type="submit"
          className={`${classes['search-btn']} ${
            theme ? classes.dark : classes.light
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
