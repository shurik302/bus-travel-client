import React, { useState, useEffect } from 'react';
import Picking from '../components/Picking';
import MapComponent from '../components/MapComponent'; // Импортируем компонент карты
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Map() {
  const { t, i18n } = useTranslation();
  const [from, setFrom] = useState({ value: 3, label: t('Kyiv') });
  const [to, setTo] = useState({ value: 4, label: t('Warsaw') });
  const [startDate, setStartDate] = useState(new Date());
  const [passengers, setPassengers] = useState(1);
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Если вам нужно что-то делать с locale, добавьте код сюда
  }, [i18n.language]);

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const response = await axios.get('https://bus-travel-4dba9713d4f4.herokuapp.com/api/cities');
      setCities(response.data);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const handlePassengersChange = (event) => {
    let value = parseInt(event.target.value, 10);
    if (isNaN(value) || value < 1) value = 1;
    if (value > 120) value = 120;
    setPassengers(value);
  };

  const cityOptions = cities.map(city => ({
    value: city.id,
    label: i18n.language === 'ua' ? city.ukrainian : city.name // Изменено city.value на city.name
  }));

  const handleSearch = () => {
    console.log('Search parameters:', {
      from: from.value,
      to: to.value,
      startDate: startDate,
      passengers: passengers
    });
    navigate('/search', {
      state: {
        from: from.value,
        to: to.value,
        startDate: startDate.toISOString(),
        passengers: passengers
      }
    });
  };

  const [selectedCities, setSelectedCities] = useState([]);
  const handleCityClick = (city) => {
    setSelectedCities(prevCities => {
      if (prevCities.length < 2) {
        return [...prevCities, city];
      } else {
        return [city];
      }
    });
  };

  const swapCities = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  useEffect(() => {
    if (selectedCities.length === 2) {
      setFrom({ value: selectedCities[0].id, label: selectedCities[0].ukrainian });
      setTo({ value: selectedCities[1].id, label: selectedCities[1].ukrainian });
    }
  }, [selectedCities]);

  return (
    <div className='Map'>
      <div className='MainContent'>
        <div className='Picking'>
          <Picking
            from={from}
            to={to}
            startDate={startDate}
            passengers={passengers}
            setFrom={setFrom}
            setTo={setTo}
            setStartDate={setStartDate}
            setPassengers={setPassengers}
            cityOptions={cityOptions}
            handlePassengersChange={handlePassengersChange}
            handleSearch={handleSearch}
            swapCities={swapCities}
          />
        </div>
        <div className='Map'>
          <div className="map-container" style={{ height: '600px', width: '100%' }}>
            <MapComponent onCityClick={handleCityClick} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Map;
