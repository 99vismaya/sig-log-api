import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
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
    if (storedData.name === formData.name && storedData.password === formData.password) {
      alert('Login successful');
      navigate('/Api');
    } else {
      alert('Invalid Credentials');
    }
  };

  return (
    <div className="MuiPaper-root jss555 MuiPaper-elevation7 MuiPaper-rounded login">
    <form className="login-container" onSubmit={handleSubmit}>
      <h4 className='text-center'>Login</h4>
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
      <button type="submit">Login</button>
    </form>
    </div>
  );
};

export default Login;