import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {SlidingMenu} from './sliding-menu';
import styles from './navigation.module.css';

export const Navigation = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const setIsMenuVisibleToTrue = () => setIsMenuVisible(true);
  const setIsMenuVisibleToFalse = () => setIsMenuVisible(false);

  const logOut = () => {
    localStorage.removeItem('username');
    window.location = '/';
  };

  return (
    <>
      <nav className={styles.navigationStrip}>
        <button
          className={styles.burgerButton}
          onClick={setIsMenuVisibleToTrue}
        >
          ☰
        </button>
        <h1>EventEdge</h1>
        <Link to="/login">
          {localStorage.getItem('username') ? (
            <a className={styles.link} onClick={logOut}>
              Log Out
            </a>
          ) : (
            <a>Login</a>
          )}
        </Link>
      </nav>
      {isMenuVisible && <SlidingMenu onClose={setIsMenuVisibleToFalse} />}
    </>
  );
};
