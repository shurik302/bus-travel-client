// Ticket.js
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import '../stylesheets/Ticket.css';
import axios from 'axios';

const getCityNameById = (id, language, cities) => {
  const city = cities.find(city => city.id === id);
  return city ? (language === 'ua' ? city.ukrainian : city.value) : '';
};

const Ticket = ({ travel, passengers }) => {
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  const navigate = useNavigate();
  const [cities, setCities] = useState([]);

  const getAccessToken = () => {
    return localStorage.getItem('accessToken');
  };

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const token = getAccessToken();
        if (!token) {
          throw new Error('No token found');
        }
        const response = await axios.get('https://bus-travel-4dba9713d4f4.herokuapp.com/api/cities', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCities(response.data);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    fetchCities();
  }, []);

  const handleBuyTicket = () => {
    navigate('/buy-ticket', {
      state: { travel, passengers, language }
    });
  };

  const formatPrice = (price, currency) => {
    return new Intl.NumberFormat(language, { style: 'currency', currency: currency }).format(price);
  };

  return (
    <div className='ticket'>
      <div className='MainInfoTicket'>
        <div className='FromToTicket'>
          <div className='FromTicket'>
            <span>{getCityNameById(travel.from, language, cities)}</span>
            <span>{language === 'ua' ? travel.fromLocationUA : travel.fromLocationEN}</span>
          </div>
          <div className='ToTicket'>
            <span>{getCityNameById(travel.to, language, cities)}</span>
            <span>{language === 'ua' ? travel.toLocationUA : travel.toLocationEN}</span>
          </div>
        </div>
        <div className='ProgressSymbol'>
          <div className='Line'></div>
          <div className='Circle left'>
            <div className='InnerCircle'>
              <div className='SmallCircle'></div>
            </div>
          </div>
          <div className='Circle right'>
            <div className='InnerCircle'>
              <div className='SmallCircle'></div>
            </div>
          </div>
        </div>
        <div className='TimeTicket'>
          <div className='DepartureTicket'><span>{travel.departure}</span></div>
          <div className='ArrivalTicket'><span>{travel.arrival}</span></div>
        </div>
        <div className='AddInfoTicket'>
          <div className='DurationTicket'><span>{travel.duration} {t('hours')}</span></div>
          <div className='PassengersTicket'><span>{t('Passengers')}: {travel.passengers}</span></div>
        </div>
      </div>
      <div className='PriceInfoTicket'>
        <div className='PriceTicket'>
          <span>
            {i18n.language === 'ua' ? formatPrice(travel.priceUA, 'UAH') : formatPrice(travel.priceEN, 'EUR')}
          </span>
        </div>
        <button onClick={handleBuyTicket} className='BuyTicket'>
          <span className='BuyTicketText'>{t('BuyTicketText')}</span>
        </button>
      </div>
    </div>
  );
};

export default Ticket;
