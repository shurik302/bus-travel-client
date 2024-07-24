import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../stylesheets/Routes.css';
import axios from 'axios';

function Routes() {
  const { t, i18n } = useTranslation();
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/cities');
        setCities(response.data);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    fetchCities();
  }, []);

  return (
    <div className='RoutesPage'>
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
