import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming you're using axios for HTTP requests
import Navbar3 from '../components/Navbar3';
import Footer from '../components/Footer';

const PaymentComponent = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    // Fetch payments from your backend
    const fetchPayments = async () => {
      try {
        const response = await axios.get('/api/payment/getpayments'); // Assuming your backend route is /api/payments
        setPayments(response.data);
      } catch (error) {
        console.error('Error fetching payments:', error);
      }
    };
    fetchPayments();
  }, []);

  const handleVerify = async (id) => {
    try {
      await axios.put(`/api/payment/verifypay/${id}`); // Assuming your backend route for verification is /api/payments/:id/verify
      // Update the status locally after successful verification
      setPayments(payments.map(payment => payment._id === id ? { ...payment, status: 'verified' } : payment));
    } catch (error) {
      console.error('Error verifying payment:', error);
    }
  };

  return (
    <>
    <Navbar3 />
    <div className='container'>
      {payments.map(payment => (
        <div key={payment._id} style={{ display: 'flex', marginBottom: '10px' }}>
          <div style={{ flex: 1 }}>
            <p>Student Name: {payment.studentName}</p>
            <p>NIC Number: {payment.nicNumber}</p>
            <p>Account Number: {payment.accountNumber}</p>
            <p>Bank: {payment.bank}</p>
            <p>Amount: {payment.amount}</p>
            <p>Date: {new Date(payment.date).toLocaleDateString()}</p>
            <p>Status: {payment.status}</p>
            {payment.status !== 'verified' ? (
              <button onClick={() => handleVerify(payment._id)}>Verify</button>
            ) : (
              <button disabled>Verified</button>
            )}
          </div>
          
        </div>
      ))}
    </div><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    <Footer />
    </>
  );
};

export default PaymentComponent;
