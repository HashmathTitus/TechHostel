
import React, { useState, useEffect } from "react";
import axios from "axios";
import '../css/register.css';
import Navbar4 from "../components/Navbar4";
import Footer from "../components/Footer";

const PaymentVerification = () => {
  const [formData, setFormData] = useState({
    studentName: "",
    nicNumber: "",
    accountNumber: "",
    bank: "",
    amount: "",
    date: "",
  });

  const [studentInfo, setStudentInfo] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const fetchStudentInfo = async () => {
        try {
          const response = await axios.get('/api/student/profile', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setStudentInfo(response.data.user);
        } catch (error) {
          console.error('Error fetching student info:', error);
          setError('Error fetching student info');
        }
      };
      fetchStudentInfo();
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validation for alphabetic characters in name and bank
    if ((name === "studentName" || name === "bank") && !/^[a-zA-Z\s]*$/.test(value)) {
      return;
    }

    // Validation for numeric characters in NIC and account number
    if ((name === "nicNumber" || name === "accountNumber") && !/^\d*$/.test(value)) {
      return;
    }

    // Validation for positive numbers in amount
    if (name === "amount" && !/^\d*\.?\d+$/.test(value)) {
      return;
    }

    // Validation for future date
    if (name === "date") {
      const selectedDate = new Date(value);
      const currentDate = new Date();
      if (selectedDate > currentDate) {
        return;
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/payment/verify", formData);
      console.log(response.data);
      if (response.data.success) {
        window.alert("Payment details added successfully!");
      }
      setFormData({
        studentName: "",
        nicNumber: "",
        accountNumber: "",
        bank: "",
        amount: "",
        date: "",
      });
    } catch (error) {
      console.error("Error submitting payment details:", error);
      // Handle error message
    }
  };

  return (
    <>
      <Navbar4 /><br/><br/>
      <div className="container">
        <form onSubmit={handleSubmit} className="payment-form">
          {studentInfo && (
            <>
              <label>
                Student Name:
                <input
                  type="text"
                  name="studentName"
                  value={studentInfo.name}
                  onChange={handleChange}
                  required
                  readOnly
                />
              </label><br/>
              <label>
                NIC Number:
                <input
                  type="text"
                  name="nicNumber"
                  value={studentInfo.nic}
                  onChange={handleChange}
                  maxLength="10"
                  required
                  readOnly
                />
              </label>
            </>
          )}
          <label>
            Account Number:
            <input
              type="text"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              maxLength="12"
              required
            />
          </label>
          <label>
            Bank:
            <input
              type="text"
              name="bank"
              value={formData.bank}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Amount:
            <input
              type="text"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Date:
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      <Footer />
    </>
  );
};

export default PaymentVerification;
