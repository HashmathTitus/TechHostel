import React, { useState } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import * as Yup from 'yup';
import '../css/payment.css';

const Formtable = ({ handleSubmit, handleOnChange, handleclose, rest }) => {
  const [errors, setErrors] = useState({});

  const schema = Yup.object().shape({
    name: Yup.string()
    .matches(/^[A-Za-z]+$/, 'Name must contain only letters')
    .required('Name is required'),
    nic: Yup.string()
      .required("NIC is required")
      .test(
          "is-valid-nic",
          "NIC should match one of the formats",
          value => {
              // Regular expressions for NIC formats
              const regex1 = /^\d{9}[vVxX]?$/;
              const regex2 = /^\d{12}$/;
  
              // Check if the value matches at least one of the patterns
              return regex1.test(value) || regex2.test(value);
          }
      ),
    issue: Yup.string().required('Issue is required'),
    amount: Yup.number().required('Amount is required'),
  });

  const validateField = async (name, value) => {
    try {
      await schema.validateAt(name, { [name]: value });
      setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    } catch (error) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: error.message }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    handleOnChange(e);

    // Validate field on change
    validateField(name, value);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const formData = rest;
    try {
      await schema.validate(formData, { abortEarly: false });
      handleSubmit(formData);
    } catch (error) {
      const validationErrors = {};
      error.inner.forEach((err) => {
        validationErrors[err.path] = err.message;
      });
      setErrors(validationErrors);
    }
  };

  return (
    <div className="addContainer">
      <form onSubmit={handleSubmitForm}>
        <div className="close-btn" onClick={handleclose}>
          <IoCloseSharp />
        </div>
        <label htmlFor="name">Name : </label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={handleChange}
          value={rest.name}
        />
        {errors.name && <div className="error">{errors.name}</div>}

        <label htmlFor="mobile">NIC : </label>
        <input
          type="text"
          id="mobile"
          name="nic"
          onChange={handleChange}
          value={rest.nic}
        />
        {errors.nic && <div className="error">{errors.nic}</div>}

        <label htmlFor="issue">Issue : </label>
        <input
          type="text"
          id="issue"
          name="issue"
          onChange={handleChange}
          value={rest.issue}
        />
        {errors.issue && <div className="error">{errors.issue}</div>}

        <label htmlFor="amount">Amount : </label>
        <input
          type="number"
          id="amount"
          name="amount"
          onChange={handleChange}
          value={rest.amount}
        />
        {errors.amount && <div className="error">{errors.amount}</div>}

        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Formtable;
