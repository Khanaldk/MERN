import React, { useState } from 'react';
import axios from 'axios';

const SignupForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [errors, setErrors] = useState({});
   const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  // Validate inputs
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format.';
    }
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post("https://mern-backend-x8s2.onrender.com/user/create", formData);
      setSuccessMessage(response?.data?.message);
      setErrorMessage('');
      setFormData({ name: '', email: '' });
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Something went wrong.');
      setSuccessMessage('');
    }finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="form-title">Signup Form</h2>
        {successMessage && (
          <div className="success-message">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="error-message">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`form-input ${errors.name ? 'input-error' : ''}`}
            />
            {errors.name && <p className="error-text">{errors.name}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-input ${errors.email ? 'input-error' : ''}`}
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>

          <button type="submit" className="form-button" disabled={isLoading}>
        {isLoading ? 'signing...' : 'sign'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
