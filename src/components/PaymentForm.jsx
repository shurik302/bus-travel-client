// PaymentForm.js
import React, { useState } from 'react';
import axios from 'axios';

const PaymentForm = () => {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('UAH');
  const [orderDesc, setOrderDesc] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/payment/create-payment', {
        amount,
        currency,
        order_id: `order_${Date.now()}`,
        order_desc: orderDesc,
      });

      window.location.href = response.data.url;
    } catch (error) {
      console.error('Error creating payment:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        required
      />
      <input
        type="text"
        value={orderDesc}
        onChange={(e) => setOrderDesc(e.target.value)}
        placeholder="Order Description"
        required
      />
      <button type="submit">Pay</button>
    </form>
  );
};

export default PaymentForm;
