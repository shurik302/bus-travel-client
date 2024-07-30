import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Context } from '../';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import '../stylesheets/Account.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';


function Account() {
  const { t } = useTranslation();
  const now = moment();
  const [showAllActiveTrips, setShowAllActiveTrips] = useState(false);
  const [showAllPastTrips, setShowAllPastTrips] = useState(false);
  const [activeTrips, setActiveTrips] = useState([]);
  const [pastTrips, setPastTrips] = useState([]);
  const [isLoadingTrips, setIsLoadingTrips] = useState(true);
  const [error, setError] = useState(null);
  const { store } = useContext(Context);
  const navigate = useNavigate();

  const isTripActive = useCallback((trip) => {
    const tripArrivalDateTime = moment(trip.date_arrival).add(2, 'hours');
    return now.isBefore(tripArrivalDateTime);
  }, [now]);

  const fetchTrips = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        setError('User not authenticated');
        setIsLoadingTrips(false);
        return;
      }

      const response = await axios.get('https://bus-travel-4dba9713d4f4.herokuapp.com/api/tickets/', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const trips = response.data;
      const active = trips.filter(isTripActive).sort((a, b) => {
        return moment(a.date_departure) - moment(b.date_departure);
      });

      const past = trips.filter(trip => !isTripActive(trip)).sort((a, b) => {
        return moment(b.date_departure) - moment(a.date_departure);
      });

      setActiveTrips(active);
      setPastTrips(past);
    } catch (error) {
      setError('Error fetching trips');
      console.error('Error fetching trips:', error);
    } finally {
      setIsLoadingTrips(false);
    }
  }, [isTripActive]);

  useEffect(() => {
    store.checkAuth().then(() => {
      fetchTrips();
    }).catch(err => {
      console.error('Error during checkAuth:', err);
      setError('Error during authentication');
    });
  }, [store, fetchTrips]);

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

  const groupedActiveTrips = groupTripsByDate(activeTrips);
  const groupedPastTrips = groupTripsByDate(pastTrips);

  const renderInfoText = () => {
    if (activeTrips.length === 0 && pastTrips.length === 0) {
      return t('TicketsMessage1');
    } else if (activeTrips.length === 0) {
      return t('TicketsMessage2');
    } else if (pastTrips.length === 0) {
      return t('TicketsMessage3');
    } else {
      return t('TicketsMessage4');
    }
  };

  const handleShowAllActiveTrips = () => {
    setShowAllActiveTrips(true);
  };

  const handleShowAllPastTrips = () => {
    setShowAllPastTrips(true);
  };

  const renderTrips = (groupedTrips, showAll) => {
    const tripsArray = Object.keys(groupedTrips).reduce((acc, date) => [...acc, ...groupedTrips[date]], []);
    const tripsToShow = showAll ? tripsArray : tripsArray.slice(0, 5);

    return tripsToShow.map((trip, index) => (
      <div key={index} className='Trip'>
        <Helmet>
          <title>{t('titles.account')}</title> {/* Установите заголовок страницы */}
        </Helmet>
        <div className='MainInfo'>
          <div className='Time'>
            <div className='TimeDep'>
              <span>{trip.departure}</span>
            </div>
            <div className='TimeArr'>
              <span>{trip.arrival}</span>
            </div>
          </div>
          <div className='RouteSymbol'>
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
          <div className='Route'>
            <div className='From'>
              <div className='Place'>
                <span>{trip.from}</span>
                <span>{trip.fromLocation}</span>
              </div>
            </div>
            <div className='To'>
              <div className='Place'>
                <span>{trip.to}</span>
                <span>{trip.toLocation}</span>
              </div>
            </div>
          </div>
        </div>
        <div className='AdditionalInfo'>
          <span>{t('Baggage')}: {trip.baggage === "yes" ? t('Yes') : t('No')}</span>
          <span>{t('Passengers')}: {trip.passengers}</span>
        </div>
      </div>
    ));
  };

  const handleLogout = async () => {
    try {
      console.log('Logging out...');
      await store.logout();
      localStorage.clear();
      navigate('/');
      window.location.reload();
      console.log("Logout successful");
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (isLoadingTrips) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='Account'>
      <div className='MainContentAccount'>
        <div className='WelcomePartAccount'>
          <div className='UserWelcome'>
            <h1>{t('HiUser')} <span className='UserName'>{store.user?.email}</span>!</h1>
            <h2>{t('PastAndFutureTripsMessage')}</h2>
          </div>
          <div className='InfoPartTravel'>
            <span className='InfoTravelsUser'>
              {renderInfoText()}
            </span>
          </div>
        </div>
        <div className='FutureTravels'>
          <div className='AllTickets'>
            <div className='Travels TravelsAcc'>
              <div className='TravelsNowInfo TravelsInfo'>
                <span className='TravelsNowInfoText'>
                  {t("TravelsNowInfoText")}
                </span>
              </div>
              {activeTrips.length === 0 ? (
                <div className='ProposeBuyTicket ProposeBuyTicketAcc'>
                  <span>{t('ProposeBuyTicketAcc')}</span>
                  <a href='/map' className='ButtonBuyTickets ButtonBuyTicketsAcc'><span>{t('BuyTickets')}</span></a>
                </div>
              ) : (
                <>
                  {renderTrips(groupedActiveTrips, showAllActiveTrips)}
                  {activeTrips.length > 5 && !showAllActiveTrips && (
                    <button className='ShowAllButton' onClick={handleShowAllActiveTrips}>{t('ShowAllActiveTrips')}</button>
                  )}
                </>
              )}
            </div>
          </div>
          <div className='FutureTrip'>
            <div className='Travels TravelsAcc'>
              <div className='TravelsInfo TravelsInfoAcc'>
                <span className='TravelsNowInfoText'>
                  {t("TravelsPastInfoText")}
                </span>
              </div>
              {pastTrips.length === 0 ? (
                <div className='ProposeBuyTicket ProposeBuyTicketAcc'>
                  <span>{t('ProposeBuyTicketAcc')}</span>
                  <a href='/map' className='ButtonBuyTickets ButtonBuyTicketsAcc'><span>{t('BuyTickets')}</span></a>
                </div>
              ) : (
                <>
                  {renderTrips(groupedPastTrips, showAllPastTrips)}
                  {!showAllPastTrips && (
                    <button className='ShowAllButton' onClick={handleShowAllPastTrips}>{t('ShowAllPastTrips')}</button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        <div className='Logout'>
          <div className='NameLogout'>
            <span>{t('TextLogout1')}</span>
            <span>{t('TextLogout2')}</span>
            <span>{t('TextLogout3')}</span>
          </div>
          <div className='ButtonLogout'>
            <button className='LogOutBtn' href='/#' onClick={handleLogout}>
              <span>{t('Logout')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
