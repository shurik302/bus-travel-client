import React from 'react';
import { useTranslation } from 'react-i18next';
import '../stylesheets/Rules.css';

function Rules() {
  const { t } = useTranslation();
  return (
    <div className='Rules'>
      <div className='MainPart'>
        <span className='Heading'>
          {t('Heading_Rules_1')}
        </span>
        <div className='Subheading'>
          {t('Subheading_Rules_1')}
        </div>
        <div className='Text_subheading'>
          <p>{t('Text_subheading1_Rules_1')}</p>
          <p>{t('Text_subheading1_Rules_2')}</p>
          <p>{t('Text_subheading1_Rules_3')}</p>
        </div>
        <div className='Subheading'>
          {t('Subheading_Rules_2')}
        </div>
        <div className='Text_subheading'>
          <p>{t('Text_subheading2_Rules_1')}</p>
          <p>{t('Text_subheading2_Rules_2')}</p>
          <p>{t('Text_subheading2_Rules_3')}</p>
          <p>{t('Text_subheading2_Rules_4')}</p>
          <p>{t('Text_subheading2_Rules_5')}</p>
        </div>
        <div className='Subheading'>
          {t('Subheading_Rules_3')}
        </div>
        <div className='Text_subheading'>
          <p>{t('Text_subheading3_Rules_1')}</p>
          <p>{t('Text_subheading3_Rules_2')}</p>
          <p>{t('Text_subheading3_Rules_3')}</p>
          <p>{t('Text_subheading3_Rules_4')}</p>
          <p>{t('Text_subheading3_Rules_5')}</p>
        </div>
        <div className='Subheading'>
          {t('Subheading_Rules_4')}
        </div>
        <div className='Text_subheading'>
          <p>{t('Text_subheading4_Rules_1')}</p>
          <p>{t('Text_subheading4_Rules_2')}</p>
          <p>{t('Text_subheading4_Rules_3')}</p>
        </div>
        <div className='Subheading'>
          {t('Subheading_Rules_5')}
        </div>
        <div className='Text_subheading'>
          <p>{t('Text_subheading5_Rules_1')}</p>
          <p>{t('Text_subheading5_Rules_2')}</p>
          <p>{t('Text_subheading5_Rules_3')}</p>
        </div>
        <div className='Subheading'>
          {t('Subheading_Rules_6')}
        </div>
        <div className='Text_subheading'>
          <p>{t('Text_subheading6_Rules_1')}</p>
          <p>{t('Text_subheading6_Rules_2')}</p>
        </div>
      </div>
    </div>
  );
}

export default Rules;
