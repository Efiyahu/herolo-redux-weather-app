import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classes from './Header.module.scss';
import { AiFillHome } from 'react-icons/ai';
import { MdFavorite } from 'react-icons/md';
import ThemeContext from '../../context/theme-context';

function Header({ setGeo }) {
  const navigate = useNavigate();
  const { theme, setTheme } = useContext(ThemeContext);

  const handleClick = () => {
    setGeo({
      lat: '',
      lng: '',
    });
  };

  return (
    <header
      className={`${classes.header} ${
        theme === 'dark' ? classes.dark : classes.light
      }`}
    >
      <h1 className={classes.title} onClick={() => navigate('/')}>
        Herolo Weather Task
      </h1>

      <div className={classes.links}>
        <Link
          className={`${classes.link} ${
            theme === 'dark' ? classes.dark : classes.light
          }`}
          to="/"
          onClick={handleClick}
        >
          <AiFillHome style={{ marginRight: '.3rem' }} /> <span>Home</span>
        </Link>
        <Link
          className={`${classes.link} ${
            theme === 'dark' ? classes.dark : classes.light
          }`}
          to="/favorites"
        >
          <MdFavorite style={{ marginRight: '.3rem' }} /> Favorites
        </Link>
      </div>
    </header>
  );
}

export default Header;
