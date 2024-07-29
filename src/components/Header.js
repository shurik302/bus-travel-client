import React, { useContext, useEffect, useState } from 'react';
import '../stylesheets/Header.css';
import LanguageSwitcher from './LanguageSwitcher';
import LogoBig from '../images/logo_big.png';
import { useTranslation } from 'react-i18next';
import { StoreContext } from '../store/store';

function Header() {
  const { t } = useTranslation();
  const store = useContext(StoreContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      console.log("Token found in localStorage, checking authentication");
      store.checkAuth().then(() => {
        console.log("Authentication check completed");
      }).catch(error => {
        console.error("Error during authentication check:", error);
      });
    } else {
      console.log("No token found in localStorage");
    }
  }, [store]);

  const handleLoginClick = () => {
    console.log("Navigating to login page");
    window.location.href = '/Authorisation'; // Redirect to login page
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  console.log("Current auth state:", store.isAuth);

  return (
    <div className="Header">
      <div className="Logo">
        <a href="/">
          <img src={LogoBig} alt="Logo" />
        </a>
      </div>

      <div className="links">
        <a href="/map">{t('F_Link')}</a>
        <a href="/travels">{t('S_Link')}</a>
        <a href="/routes">{t('T_Link')}</a>
        <a href="/help">{t('Th_Link')}</a>
      </div>

      <div className='UserAndLang'>
        {
          store.isAuth ? (
            <div className='User'>
              <a href='/account'>
                <i className="fa-solid fa-user"></i>
              </a>
            </div>
          ) : (
            <div className='NotLogged'>
              <a href='/Authorisation' onClick={handleLoginClick}>{t('ProposeLogin')}</a>
              <a href='/Authorisation' onClick={handleLoginClick}><i className="fa-solid fa-user"></i></a>
            </div>
          )
        }

        <div className="LanguageSwitcher">
          <LanguageSwitcher />
        </div>

        <div className='BurgerButton' onClick={toggleMenu}>
          <i className="fa-solid fa-bars"></i>
        </div>

        <div className={`links-container ${isMenuOpen ? 'visible' : ''}`}>
          <div className='close-button' onClick={closeMenu}>
            <i className="fa-solid fa-xmark"></i>
          </div>
          <div className='links'>
            <a href="/map">{t('F_Link')}</a>
            <a href="/travels">{t('S_Link')}</a>
            <a href="/routes">{t('T_Link')}</a>
            <a href="/help">{t('Th_Link')}</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
