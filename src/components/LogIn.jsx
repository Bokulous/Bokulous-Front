import '../styles/LogIn.css';
import config from '../config.js';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, NavLink, Routes, Route, useNavigate, Link } from 'react-router-dom';
import ForgotPassword from './ForgotPassword';
import ForgotUsername from './ForgotUsername';

const LogIn = ({ loggedInUser, setLoggedInUser }) => {
  const [logInSuccess, setLogInSuccess] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    //Prevent page reload
    console.log(event, username);
    event.preventDefault();
  };

  async function login() {
    let item = { username, password };
    let action = "/api/Users/Login"
    let response = await fetch(config.apiSettings.address + ":" + config.apiSettings.port + action, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
         Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(item),
    });
   
    if (response.status >= 200 && response.status < 300) {
      let data = await response.json();
      setLoggedInUser(data);
      setLogInSuccess(true);
    }
  }

  const LogInForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Användarnamn</label>
          <input
            type="text"
            name="username"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label>Lösenord</label>
          <input
            type="password"
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="button-container">
          <input type="submit" onClick={login} />
        </div>
      </form>
      <button className="forgot-btn"><Link to='/ForgotUsername'>Glömt användarnamn</Link></button>
      <button className="forgot-btn"><Link to='/ForgotPassword'>Glömt lösenord</Link></button>
    </div>
  );

  return (
    <section className="login-container">
      <h2>Här loggar man in!</h2>
      <div className="login-form">
        <div className="title">Logga in med användarnamn och lösenord!</div>
        {logInSuccess && loggedInUser ? (
          <div>{loggedInUser?.username} är inloggad.</div>
        ) : (
          LogInForm
        )}
      </div>
    </section>
  );
};

export default LogIn;
