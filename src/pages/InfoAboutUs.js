import React from 'react'
import { useTranslation } from 'react-i18next';
import '../stylesheets/InfoAboutUs.css'

function InfoAboutUs() {
  const { t } = useTranslation();
  return (
    <div className='InfoAboutUs'>
      <div className='MainPartIAU'>
        <div className='WelcomeAbout'>
          <h2 className='WhoWe'>{t('WhoWe')}</h2>
          <h1 className='WeAre'>{t('WeAre')}</h1>
        </div>

        <div className='TextPartAbout'>
          <div className='TitlePart'>
            <div className='NameTitlePart'>
              <span className=''>
                {t('NameTitlePartF')}
              </span>
            </div>
            <div className='TextTitlePart'>
              <span className=''>
                {t('TextTitlePartF')}
              </span>
            </div>
          </div>
          <div className='TitlePart'>
            <div className='NameTitlePart'>
              <span className=''>
                {t('NameTitlePartS')}
              </span>
            </div>
            <div className='TextTitlePart'>
              <span className=''>
                {t('TextTitlePartS')}
              </span>
            </div>
          </div>
          <div className='TitlePart'>
            <div className='NameTitlePart'>
              <span className=''>
                {t('NameTitlePartT')}
              </span>
            </div>
            <div className='TextTitlePart'>
              <span className=''>
                {t('TextTitlePartT')}
              </span>
            </div>
          </div>
          <div className='TitlePart'>
            <div className='NameTitlePart'>
              <span className=''>
                {t('NameTitlePartTh')}
              </span>
            </div>
            <div className='TextTitlePart'>
              <span className=''>
                {t('TextTitlePartTh')}
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default InfoAboutUs