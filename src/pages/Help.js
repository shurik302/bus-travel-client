import React from 'react'
import { useTranslation } from 'react-i18next';
import '../stylesheets/Help.css'

function Help() {
  const { t } = useTranslation();
  return (
    <div className='Help'>
      <div className='MainPart'>
        <span className='Heading'>
          {t('Heading_Help_1')}
        </span>
        <span className='Text_subheading'>
          {t('Text_subheading_Help_1_1')}
        </span>
        
        <span className='Heading'>
          {t('Heading_Help_2')}
        </span>
        <span className='Text_subheading'>
          {t('Text_subheading_Help_2_1')}
        </span>
        
        <span className='Heading'>
          {t('Heading_Help_3')}
        </span>
        <span className='Text_subheading'>
          {t('Text_subheading_Help_3_1')}
        </span>
        
        <span className='Heading'>
          {t('Heading_Help_4')}
        </span>
        <span className='Text_subheading'>
          {t('Text_subheading_Help_4_1')}
        </span>
        
        <span className='Heading'>
          {t('Heading_Help_5')}
        </span>
        <span className='Text_subheading'>
          {t('Text_subheading_Help_5_1')}
        </span>
        
        <span className='Heading'>
          {t('Heading_Help_6')}
        </span>
        <span className='Text_subheading'>
          {t('Text_subheading_Help_6_1')}
        </span>
        
        <span className='Heading'>
          {t('Heading_Help_7')}
        </span>
        <span className='Text_subheading'>
          {t('Text_subheading_Help_7_1')}
        </span>
        
        <span className='Heading'>
          {t('Heading_Help_8')}
        </span>
        <span className='Text_subheading'>
          {t('Text_subheading_Help_8_1')}
        </span>
        
        <span className='Heading'>
          {t('Heading_Help_9')}
        </span>
        <span className='Text_subheading'>
          {t('Text_subheading_Help_9_1')}
        </span>
        
        <div className='Subheading'>
          {t('Subheading_Help_Contact')}
        </div>
        <span className='Text_subheading'>
          {t('Text_subheading_Help_Contact_1')}
        </span>
      </div>
    </div>
  )
}

export default Help
