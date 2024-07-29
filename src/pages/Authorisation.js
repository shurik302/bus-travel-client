import React, { useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Context } from '..';
import '../stylesheets/Authorisation.css';
import { Helmet } from 'react-helmet-async';

function Authorisation() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { store } = useContext(Context);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  useEffect(() => {
    setError('');
  }, [email, password]);

  const handleLogin = async () => {
    console.log("Attempting login with email:", email);
    if (password.length < 8 || password.length > 32) {
      setError(t('PasswordLengthError'));
      console.log("Password length error");
      return;
    }

    if (!validateEmail(email)) {
      setError(t('InvalidEmailError'));
      console.log("Invalid email error");
      return;
    }

    try {
      const isLoggedIn = await store.login(email, password);
      console.log("Login result:", isLoggedIn);
      if (isLoggedIn) {
        store.checkAuth();
        navigate('/account');
        console.log("User is logged in, navigating to account page");
        store.checkAuth();
        window.location.reload(); 
      } else {
        setError(t('AuthenticationError'));
        console.log("Authentication error");
      }
    } catch (error) {
      setError(t('AuthenticationError'));
      console.error("Login error:", error);
    }
  };

  return (
    <div className='Authorisation'>
      <Helmet>
        <title>{t('titles.authorisation')}</title> {/* Установите заголовок страницы */}
      </Helmet>
      <div className='LeftPart'>
        <div className='SignIn'>
          <h2>{t('SignIn')}</h2>
          <div className='DownPart'>
            <div className='Form'>
              <input
                type='email'
                placeholder={t('Email')}
                value={email}
                onChange={e => setEmail(e.target.value)}
                className={!validateEmail(email) && email ? 'error' : ''}
              />
              <input
                type='password'
                placeholder={t('Password')}
                value={password}
                onChange={e => setPassword(e.target.value)}
                className={(password.length < 8 || password.length > 32) && password ? 'error' : ''}
              />
              {error && <div className='error-message'>{error}</div>}
              <button onClick={handleLogin}>
                <span>{t('SignIn')}</span>
              </button>
            </div>
            <div className='SocialIcons'>
              <i className="fab fa-google"></i>
              <i className="fab fa-apple"></i>
            </div>
          </div>
        </div>
      </div>

      <div className='RightPart'>
        <h2>{t('WelcomeBack')}</h2>
        <p>{t('KeepConnected')}</p>
        <a href='/registration'>{t('CreateAccount')}</a>
      </div>
    </div>
  );
}

export default Authorisation;
