import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Container,
  Typography
} from '@mui/material';
import '../stylesheets/TicketManagement.css';

const TicketManagement = () => {
  const [tickets, setTickets] = useState([]);

  const getAccessToken = () => {
    return localStorage.getItem('accessToken');
  };

  const fetchTickets = useCallback(async () => {
    try {
      const token = getAccessToken();
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.get('https://bus-travel-4dba9713d4f4.herokuapp.com/api/tickets', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTickets(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error('Unauthorized. Redirecting to login.');
      } else {
        console.error('Error fetching tickets:', error);
      }
    }
  }, []);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  const toggleTicketStatus = async (id) => {
    try {
      const token = getAccessToken();
      if (!token) {
        throw new Error('No token found');
      }

      await axios.put(`http://localhost:5000/api/tickets/toggle/${id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchTickets(); // Refresh tickets after updating status
    } catch (error) {
      console.error('Error toggling ticket status:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Управління квитками</Typography>
      <TableContainer width="100%" component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Від</TableCell>
              <TableCell>До</TableCell>
              <TableCell>Тип</TableCell>
              <TableCell>Кількість пасажирів</TableCell>
              <TableCell>Ціна (EN)</TableCell>
              <TableCell>Ціна (UA)</TableCell>
              <TableCell>Дата відправлення</TableCell>
              <TableCell>Час відправлення</TableCell>
              <TableCell>Тривалість</TableCell>
              <TableCell>Дата прибуття</TableCell>
              <TableCell>Час прибуття</TableCell>
              <TableCell>Багаж</TableCell>
              <TableCell>Електронна пошта</TableCell>
              <TableCell>Статус</TableCell>
              <TableCell>Дії</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets.map(ticket => (
              <TableRow key={ticket._id}>
                <TableCell>{ticket.from}</TableCell>
                <TableCell>{ticket.to}</TableCell>
                <TableCell>{ticket.typeUA}</TableCell>
                <TableCell>{ticket.passengers}</TableCell>
                <TableCell>{ticket.priceEN}</TableCell>
                <TableCell>{ticket.priceUA}</TableCell>
                <TableCell>{new Date(ticket.date_departure).toLocaleDateString()}</TableCell>
                <TableCell>{ticket.departure}</TableCell>
                <TableCell>{ticket.duration}</TableCell>
                <TableCell>{new Date(ticket.date_arrival).toLocaleDateString()}</TableCell>
                <TableCell>{ticket.arrival}</TableCell>
                <TableCell>{ticket.baggage ? `${ticket.baggage.smallBaggage} / ${ticket.baggage.largeBaggage}` : 'N/A'}</TableCell>
                <TableCell>{ticket.email}</TableCell>
                <TableCell>{ticket.isActive ? 'Активний' : 'Неактивний'}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color={ticket.isActive ? "secondary" : "primary"}
                    onClick={() => toggleTicketStatus(ticket._id)}
                    style={{ marginRight: '10px' }}
                  >
                    {ticket.isActive ? 'Зробити неактивним' : 'Зробити активним'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default TicketManagement;
