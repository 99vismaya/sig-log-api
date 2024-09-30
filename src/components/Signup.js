import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    email: '',
    phone: '',
    profession: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (!storedData) {
      localStorage.setItem('userData', JSON.stringify(formData));
      alert('User registered successfully');
      navigate('/Login');
    } 
    else {
      if (storedData.name === formData.name) {
      alert('You have already create account. Please login');
      navigate('/Login');      
    }
  }
  };

  return (
    <div className="MuiPaper-root jss555 MuiPaper-elevation7 MuiPaper-rounded">
    <form className="signup-container" onSubmit={handleSubmit}>
    <h4 className="text-center">Signup</h4>
      <div className="input-field">
      <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </label>
      </div>
      <br />
      <div className="input-field">
      <label>
        Password:
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
      </label>
      </div>
      <br />
      <div className="input-field">
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </label>
      </div>
      <br />
      <div className="input-field">
      <label>
        Phone Number:
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
      </label>
      </div>
      <br />
      <div className="input-field">
      <label>
        Profession:
        <select name="profession" value={formData.profession} onChange={handleChange} required>
          <option value="">Select Profession</option>
          <option value="Developer">Developer</option>
          <option value="Designer">Designer</option>
          <option value="Manager">Manager</option>
          <option value="Other">Other</option>
        </select>
      </label>
      </div>
      <br />
      <button type="submit">Signup</button>
    </form>
    </div>
  );
};

export default Signup;