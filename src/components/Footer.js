import React, { useState } from 'react';
import '../stylesheets/Footer.css';
import LogoBig from '../images/logo_big.png';
import { useTranslation } from 'react-i18next';

function Footer() {
  const { t } = useTranslation();
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <div className='Footer'>
      <div className='UpFooter'>
        <div className='LeftFoooter'>
          <div className='LogoFooter'>
            <a href='/'>
              <img src={LogoBig} alt='Logo' />
            </a>
          </div>
        </div>
        <div className='MiddleFooter'>
          <div className={`NameSectionFooter ${openMenu === 'middle' ? 'active' : ''}`} onClick={() => toggleMenu('middle')}>
            <span>{t('MiddleColumnNameFooter')}</span>
            <i className={`fa-solid fa-chevron-down ${openMenu === 'middle' ? 'open' : ''}`}></i>
          </div>
          <div className={`LinksFooter ${openMenu === 'middle' ? 'open' : ''}`}>
            <a href="/map">{t('F_Link')}</a>
            <a href="/travels">{t('S_Link')}</a>
            <a href="/routes">{t('T_Link')}</a>
            <a href="/help">{t('Th_Link')}</a>
          </div>
        </div>
        <div className='MiddleRightFooter'>
          <div className={`NameSectionFooter ${openMenu === 'middleRight' ? 'active' : ''}`} onClick={() => toggleMenu('middleRight')}>
            <span>{t('MiddleRightColumnNameFooter')}</span>
            <i className={`fa-solid fa-chevron-down ${openMenu === 'middleRight' ? 'open' : ''}`}></i>
          </div>
          <div className={`LinksFooter ${openMenu === 'middleRight' ? 'open' : ''}`}>
            <a href="/help">{t('F_Link_S')}</a>
            <a href="/info-about-us">{t('S_Link_S')}</a>
            <a href="/rules">{t('T_Link_S')}</a>
            <a href="/help">{t('Th_Link_S')}</a>
          </div>
        </div>
        <div className='RightFooter'>
          <div className={`NameSectionFooter ${openMenu === 'right' ? 'active' : ''}`} onClick={() => toggleMenu('right')}>
            <span>{t('RightColumnNameFooter')}</span>
            <i className={`fa-solid fa-chevron-down ${openMenu === 'right' ? 'open' : ''}`}></i>
          </div>
          <div className={`LinksFooter ${openMenu === 'right' ? 'open' : ''}`}>
            <a href='mailto:bustravelhelp@gmail.com'> bustravelhelp@gmail.com</a>
            <a href="tel:+380991111111">+380991111111</a>
          </div>
          <div className='SocialMedia'>
            <a href=''><i className="fa-brands fa-instagram"></i></a>
            <a href=''><i className="fa-brands fa-telegram"></i></a>
            <a href=''><i className="fa-brands fa-facebook"></i></a>
            <a href=''><i className="fa-brands fa-twitter"></i></a>
            <a href=''><i className="fa-brands fa-tiktok"></i></a>
          </div>
        </div>
      </div>
      <div className='DownFooter'>
        <div className='DLeftPartFooter'>
          <a href='/info-about-us'><span>{t('Main_info')}</span></a>
          <span>|</span>
          <a href='/rules'><span>{t('Passenger_rights_rules')}</span></a>
          <span>|</span>
          <a href='/privacy-policy'><span>{t('Privacy_policy')}</span></a>
        </div>
        <div className='DRightPartFooter'>
          <span>Travel Bus</span>
          <i className="fa-solid fa-copyright"></i>
        </div>
      </div>
    </div>
  );
}

export default Footer;
