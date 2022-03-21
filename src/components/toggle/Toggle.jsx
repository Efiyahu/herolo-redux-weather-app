import React from 'react';
import classes from './Toggle.module.scss';

function Toggle({ setContext, title }) {
  return (
    <div className={classes.container}>
      <h5>{title}</h5>
      <label className={classes.switch}>
        <input
          type="checkbox"
          onChange={() => setContext((prevState) => !prevState)}
        />
        <span className={classes.slider}></span>
      </label>
    </div>
  );
}

export default Toggle;
