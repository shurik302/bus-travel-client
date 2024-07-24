import React from 'react';
import Picking from '../components/Picking';
import { useTranslation } from 'react-i18next';
import '../stylesheets/Home.css';
import ImageMap from '../background_images/ImageMap.png';

const Home = () => {
  const { t } = useTranslation();
  return (
    <div className='Home'>
      <div className='MainContent'>
        <div className='WelcomminPart'>
          <div className='TextWelcommingPart'>
            <h1 className='MainGreeting'>{t('MainGreeting')}</h1>
            <h2 className='SecondGreeting'>{t('SecondGreeting')}</h2>
          </div>
        </div>
        <div className='PickingPart'>
          <Picking />
        </div>
        <div className='InfoAndLinks'>
          <div className='AdditionalLinks'>
            <a href='/travels' className='FirstAddLink AddLink'>
              <i className="fa-solid fa-ticket"></i>
              <span>{t('FirstAddLink')}</span>
            </a>
            <a href='/map' className='SecondAddLink AddLink'>
              <i className="fa-solid fa-route"></i>
              <span>{t('SecondAddLink')}</span>
            </a>
            <a href='/help' className='ThirdAddLink AddLink'>
              <i className="fa-solid fa-question"></i>
              <span>{t('ThirdAddLink')}</span>
            </a>
            <a href='help' className='ForthAddLink AddLink'>
              <i className="fa-solid fa-handshake-angle"></i>
              <span>{t('FourthAddLink')}</span>
            </a>
          </div>
          <div className='TR' />
          <a href='/map' className='MapSegment'>
            <div className='ImageMap'>
              <img src={ImageMap} />
            </div>
            <div className='TextMapSeg'>
              <div className='TextPartMap'>
                <span className='MainNameMapSeg'>
                  {t('MainNameMapSeg')}
                </span>
                <span className='SecNameMapSeg'>
                  {t('SecNameMapSeg')}
                </span>
              </div>
              <span className='AddNameMapSeg'>
                {t('AddNameMapSeg')}
                <i className="fa-solid fa-chevron-right"></i>
              </span>
            </div>
          </a>
          <div className='TR' />
          <div className='AdditionalDescriptions'>
            <div className='AdditionalDescr FirstAddDesc'>
              <i className="fa-solid fa-bus"></i>
              <div className='TextAddLink'>
                <span>{t('NameFirstAddDesc')}</span>
                <span>{t('FirstAddDesc')}</span>
              </div>
            </div>
            <div className='AdditionalDescr SecondAddDesc'>
              <i className="fa-solid fa-right-left"></i>
              <div className='TextAddLink'>
                <span>{t('NameSecondAddDesc')}</span>
                <span>{t('SecondAddDesc')}</span>
              </div>
            </div>
            <div className='AdditionalDescr ThirdAddDesc'>
              <i className="fa-solid fa-shield"></i>
              <div className='TextAddLink'>
                <span>{t('NameThirdAddDesc')}</span>
                <span>{t('ThirdAddDesc')}</span>
              </div>
            </div>
            <div className='AdditionalDescr FourthAddDesc'>
              <i className="fa-solid fa-money-check-dollar"></i>
              <div className='TextAddLink'>
                <span>{t('NameFourthAddDesc')}</span>
                <span>{t('FourthAddDesc')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='DescriptionOfServices'>
        <div className='TextDescSer'>
          <span className='NameSer'>{t('NameSerF')}</span>
          <span className='DescrSer'>{t('DescrSerF')}</span>
        </div>
        <div className='TextDescSer'>
          <span className='NameSer'>{t('NameSerS')}</span>
          <span className='DescrSer'>{t('DescrSerS')}</span>
        </div>
        <div className='TextDescSer'>
          <span className='NameSer'>{t('NameSerT')}</span>
          <span className='DescrSer'>{t('DescrSerT')}</span>
        </div>
      </div>
    </div>
  );
};

export default Home;
