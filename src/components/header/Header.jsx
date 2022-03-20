import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classes from './Header.module.scss';
import { AiFillHome } from 'react-icons/ai';
import { MdFavorite } from 'react-icons/md';

function Header() {
  const navigate = useNavigate();

  return (
    <header className={classes.header}>
      <h1 className={classes.title} onClick={() => navigate('/')}>
        Herolo Weather Task
      </h1>

      <div className={classes.links}>
        <Link className={classes.link} to="/">
          <AiFillHome style={{ marginRight: '.3rem' }} /> <span>Home</span>
        </Link>
        <Link className={classes.link} to="/favorites">
          <MdFavorite style={{ marginRight: '.3rem' }} /> Favorites
        </Link>
      </div>
    </header>
  );
}

export default Header;
