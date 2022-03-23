import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import classes from './Header.module.scss';
import { AiFillHome } from 'react-icons/ai';
import { MdFavorite } from 'react-icons/md';
import ThemeContext from '../../context/theme-context';
import Toggle from '../toggle/Toggle';

function Header() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <header
      className={`${classes.header} ${theme ? classes.dark : classes.light}`}
    >
      <h1 className={classes.title}>Weather-4-U</h1>

      <div className={classes.links}>
        <Link
          className={`${classes.link} ${theme ? classes.dark : classes.light}`}
          to="/"
        >
          <AiFillHome style={{ marginRight: '.3rem' }} /> <span>Home</span>
        </Link>
        <Link
          className={`${classes.link} ${theme ? classes.dark : classes.light}`}
          to="/favorites"
        >
          <MdFavorite style={{ marginRight: '.3rem' }} /> Favorites
        </Link>
      </div>
      <Toggle
        checked={theme}
        isTemp={false}
        setContext={setTheme}
        title="Theme"
      />
    </header>
  );
}

export default Header;
