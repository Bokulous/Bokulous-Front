import '../styles/LogIn.css';
import { useState, useEffect } from 'react';

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
    let response = await fetch('https://localhost:44367/api/Users/Login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(item),
    });
    if (response.status === 200) {
      let data = await response.json();
      setLoggedInUser(data);
      setLogInSuccess(true);
    }
  }
  // Påbörjade metoder till glömt lösen/användarnamn. Lägger dessa i en annan ticket

  // async function forgotUsername(){
  //   let response = await fetch('https://localhost:44367/api/Users/ForgotUsername', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Accept: 'application/json',
  //       'Access-Control-Allow-Origin': '*',
  //     },
  // }

  // async function forgotPassword(){
  //   let response = await fetch('https://localhost:44367/api/Users/ForgotPassword', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Accept: 'application/json',
  //       'Access-Control-Allow-Origin': '*',
  //     },
  // }

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
      <button className="forgot-btn">Glömt användarnamnet?</button>
      <button className="forgot-btn">Glömt lösenordet?</button>
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
