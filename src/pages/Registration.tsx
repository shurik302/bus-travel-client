import React, { FC, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Context } from '..';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import '../stylesheets/Registration.css';

const Registration: FC = () => {
  const { t } = useTranslation();
  const { store } = useContext(Context);
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  useEffect(() => {
    setError('');
  }, [email, password]);

  const handleRegistration = async () => {
    console.log("Attempting registration with email:", email);
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
      await store.registration(email, password);
      console.log("Registration successful, navigating to account page");
      store.checkAuth();
      navigate('/account');
      window.location.reload(); 

    } catch (error: any) {
      console.error('Registration error:', error);
      setError(t('AuthenticationError'));
    }
  };

  return (
    <div className='Registration'>
      <div className='LeftPart'>
        <div className='SignIn'>
          <h2>{t('Registration')}</h2>
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
              <button onClick={handleRegistration}>
                <span>{t('RegistrationButton')}</span>
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
        <h2>{t('WelcomeReg')}</h2>
        <p>{t('RegText')}</p>
        <a href='/authorisation'>{t('login')}</a>
      </div>
    </div>
  );
};

export default observer(Registration);
