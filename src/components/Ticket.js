import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import '../stylesheets/Ticket.css';

const Ticket = ({ travel, passengers }) => {
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  const navigate = useNavigate();

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
          <span>{language === 'ua' ? travel.fromUA : travel.fromEN}</span>
            <span>{language === 'ua' ? travel.fromLocationUA : travel.fromLocationEN}</span>
          </div>
          <div className='ToTicket'>
          <span>{language === 'ua' ? travel.toUA : travel.toEN}</span>
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
