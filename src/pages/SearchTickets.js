import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../stylesheets/SearchTickets.css';
import Ticket from '../components/Ticket';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

function SearchTickets() {
  const { t } = useTranslation();
  const location = useLocation();
  const { from, to, startDate, passengers } = location.state || {};

  const [groupedTravels, setGroupedTravels] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Received search parameters:', { from, to, startDate, passengers });
  }, [from, to, startDate, passengers]);

  useEffect(() => {
    const fetchTravels = async () => {
      try {
        if (!from || !to || !startDate) {
          throw new Error('Missing search parameters');
        }

        const response = await axios.get('https://bus-travel-4dba9713d4f4.herokuapp.com/api/flights/', {
          params: { from, to, startDate }
        });

        const travels = response.data;

        console.log('Fetched travels:', travels);

        const searchStartDate = new Date(startDate);

        const filteredTravels = travels.filter(travel => {
          const travelDate = new Date(travel.date_departure);
          return travelDate >= searchStartDate && travel.fromEN === from && travel.toEN === to;
        });

        console.log('Filtered travels:', filteredTravels);

        filteredTravels.sort((a, b) => {
          const dateA = new Date(a.date_departure);
          const dateB = new Date(b.date_departure);
          return dateA - dateB;
        });

        console.log('Sorted travels:', filteredTravels);

        const grouped = filteredTravels.reduce((acc, travel) => {
          const dateKey = travel.date_departure.split('T')[0];
          if (!acc[dateKey]) {
            acc[dateKey] = [];
          }
          acc[dateKey].push(travel);
          return acc;
        }, {});

        console.log('Grouped travels:', grouped);

        setGroupedTravels(grouped);
      } catch (error) {
        setError(error.message || 'Error fetching travels');
        console.error('Error fetching travels:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTravels();
  }, [from, to, startDate]);

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('uk-UA', options);
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='SearchTickets'>
      <Helmet>
        <title>{t('titles.search')}</title>
      </Helmet>
      {isLoading ? (
        <div>{t('Loading...')}</div>
      ) : (
        Object.keys(groupedTravels).length > 0 ? (
          Object.keys(groupedTravels).map(date => (
            <div key={date} className="date-section">
              <h2>{t('Travels_on')}: {formatDate(date)}</h2>
              {groupedTravels[date].map((travel, index) => (
                <Ticket key={index} travel={travel} passengers={passengers} />
              ))}
            </div>
          ))
        ) : (
          <div>{t('No tickets found')}</div>
        )
      )}
    </div>
  );
}

export default SearchTickets;
