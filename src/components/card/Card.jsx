import React from 'react';
import classes from './Card.module.scss';

function Card() {
  return (
    <div className={classes.card}>
      <h2 className={classes.title}>Sunday</h2>
      <h4 className={classes.subtitle}>38&#176; c</h4>
    </div>
  );
}

export default Card;
