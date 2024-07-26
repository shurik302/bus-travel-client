import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const QRCodePage = () => {
  const { token } = useParams();
  const [ticketData, setTicketData] = useState(null);

  useEffect(() => {
    const fetchTicketData = async () => {
      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken) {
        console.error('No access token found in local storage');
        return;
      }

      try {
        const response = await axios.get(`https://bus-travel-4dba9713d4f4.herokuapp.com/api/qrcode/${token}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        setTicketData(response.data);
      } catch (error) {
        console.error('Error fetching ticket data:', error);
      }
    };

    fetchTicketData();
  }, [token]);

  if (!ticketData) {
    return <div>Loading...</div>;
  }

  const {
    from,
    to,
    date_departure,
    departure,
    duration,
    date_arrival,
    arrival,
    priceUA,
    priceEN,
    passengers
  } = ticketData;

  return (
    <div>
      <h1>Інформація про поїздку</h1>
      <div>
        <h2>Маршрут</h2>
        <p>Звідки: {from}</p>
        <p>Куди: {to}</p>
      </div>
      <div>
        <h2>Додаткова інформація</h2>
        <p>Дата та час відправлення: {new Date(date_departure).toLocaleString('uk-UA')} о {departure}</p>
        <p>Дата та час прибуття: {new Date(date_arrival).toLocaleString('uk-UA')} о {arrival}</p>
        <p>Тривалість: {duration}</p>
        <p>Ціна квитка: {priceUA} грн / {priceEN} $</p>
        <p>Кількість пасажирів: {passengers}</p>
      </div>
    </div>
  );
};

export default QRCodePage;
