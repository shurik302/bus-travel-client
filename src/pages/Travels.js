import React, { useEffect, useState, useRef } from 'react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import '../stylesheets/Travels.css';
import SadSmile from '../images/sad_smile.png';
import axios from 'axios';

const getCityNameById = (id, language, cities) => {
  const city = cities.find(city => city.id === id);
  return city ? (language === 'ua' ? city.ukrainian : city.value) : '';
};

function Travels() {
  const { t, i18n } = useTranslation();
  const now = moment();
  const [trips, setTrips] = useState([]);
  const [cities, setCities] = useState([]);
  const routeRef = useRef(null);
  const routeSymbolRef = useRef(null);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get('https://bus-travel-4dba9713d4f4.herokuapp.com/api/cities');
        setCities(response.data);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    const fetchTrips = async () => {
      try {
        const response = await axios.get('https://bus-travel-4dba9713d4f4.herokuapp.com/api/tickets');
        setTrips(response.data);
      } catch (error) {
        console.error('Error fetching trips:', error);
      }
    };

    fetchCities();
    fetchTrips();
  }, []);

  const isTripActive = (trip) => {
    const tripArrivalDateTime = moment(trip.date_arrival).add(2, 'hours');
    return now.isBefore(tripArrivalDateTime);
  };

  const activeTrips = trips.filter(isTripActive).sort((a, b) => {
    return moment(a.date_departure) - moment(b.date_departure);
  });

  const groupTripsByDate = (trips) => {
    return trips.reduce((groupedTrips, trip) => {
      const date = trip.date_departure;
      if (!groupedTrips[date]) {
        groupedTrips[date] = [];
      }
      groupedTrips[date].push(trip);
      return groupedTrips;
    }, {});
  };

  const groupedTrips = groupTripsByDate(activeTrips);

  useEffect(() => {
    if (routeRef.current && routeSymbolRef.current) {
      const height = routeRef.current.clientHeight;
      routeSymbolRef.current.style.height = `${height}px`;
    }
  }, [groupedTrips]);

  return (
    <div className='Travels'>
      <div className='Welcome'><span>{t('WelcomeTravel')}</span></div>
      <div className='FutureTravels FutureTravelsPage'>
        <div className='Information'><span>{t('InformationTravels')}</span></div>
        <div className='UserTravels'>
          {Object.keys(groupedTrips).length > 0 ? (
            <div className='HaveTravels'>
              {Object.keys(groupedTrips).map((date, index) => (
                <div key={index}>
                  <div className='Date'><span className='DateInfo'>{t('DateInfo')}</span>{date}</div>
                  {groupedTrips[date].map((trip, tripIndex) => (
                    <div key={tripIndex} className='TripContainer'>
                      <div className='TripTravels'>
                        <div className='MainInfoTravels'>
                          <div className='TimeTravels'>
                            <div className='TimeDepTravels'>
                              <span>{trip.departure}</span>
                            </div>
                            <div className='TimeArrTravels'>
                              <span>{trip.arrival}</span>
                            </div>
                          </div>
                          <div className='RouteSymbolTravels' ref={routeSymbolRef}>
                            <div className='Line'></div>
                            <div className='Circle top'>
                              <div className='InnerCircle'>
                                <div className='SmallCircle'></div>
                              </div>
                            </div>
                            <div className='Circle bottom'>
                              <div className='InnerCircle'>
                                <div className='SmallCircle'></div>
                              </div>
                            </div>
                          </div>
                          <div className='RouteTravels' ref={routeRef}>
                            <div className='FromTravels'>
                              <div className='PlaceTravels'>
                                <span>{getCityNameById(trip.from, i18n.language, cities)}</span>
                                <span>{trip.fromLocation}</span>
                              </div>
                            </div>
                            <div className='ToTravels'>
                              <div className='PlaceTravels'>
                                <span>{getCityNameById(trip.to, i18n.language, cities)}</span>
                                <span>{trip.toLocation}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='AdditionalInfoTravels'>
                          <span>{t('Baggage')}: {trip.baggage.smallBaggage} кг, {trip.baggage.largeBaggage} кг</span>
                          <span>{t('Passengers')}: {trip.passengers}</span>
                          <span>{t('Price')}: {trip.priceUA} грн</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div className='DontHaveTravels'>
              <div className='SadSmile'><img src={SadSmile} alt='Sad smile' /></div>
              <div className='InfoHaveNotTravels'><span>{t('InfoHaveNotTravels')}</span></div>
              <div className='ProposeBuyTicket'><span>{t('ProposeBuyTicket')}</span></div>
              <a href='/map' className='ButtonBuyTickets'><span>{t('BuyTickets')}</span></a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Travels;
