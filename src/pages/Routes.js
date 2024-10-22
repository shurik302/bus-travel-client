import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../stylesheets/Routes.css';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';


function Routes() {
  const { t, i18n } = useTranslation();
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get('https://bus-travel-4dba9713d4f4.herokuapp.com/api/cities');
        setCities(response.data);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    fetchCities();
  }, []);

  return (
    <div className='RoutesPage'>
      <Helmet>
        <title>{t('titles.routes')}</title> {/* Установите заголовок страницы */}
      </Helmet>
      <div className='MainInfoPagesRoutes'>
        <div className='InformationRoutesPage'>
          <span>{t('InformationRoutesPage')}</span>
          <span>{t('AdditionalInformationRoutesPage')}</span>
        </div>
        <div className='MainContentRoutesPage'>
          <div className='NameTitleMainContentRoutesPage'>
            <span>{t('MainContentRoutesPage')}</span>
          </div>
          <div className='AllRoutesList'>
            {cities.map(city => (
              <div key={city._id} className='CityItem'>
                <span>{i18n.language === 'ua' ? city.ukrainian : city.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className='AdditionalInfoRoutesPage'>
          <span>{t('AdditionalInfoRoutesPage')}</span>
        </div>
      </div>
    </div>
  );
}

export default Routes;
