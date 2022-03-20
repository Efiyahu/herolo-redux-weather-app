import React, { useState } from 'react';
import classes from './Search.module.scss';
import { searchWeather } from '../../store/weater-actions';
import { useDispatch } from 'react-redux';
import { FaSearch } from 'react-icons/fa';

function Search() {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(searchWeather(input));
  };
  return (
    <div className={classes.search}>
      <div className={classes['search-box']}>
        <input
          className={classes['search-txt']}
          type="text"
          name="input"
          placeholder="Enter a city"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className={classes['search-btn']} onClick={handleClick}>
          <FaSearch />
        </button>
      </div>
    </div>
  );
}

export default Search;
