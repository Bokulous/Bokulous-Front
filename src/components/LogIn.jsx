import '../styles/LogIn.css';
import { useState, useEffect } from 'react';

const LogIn = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
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
    console.log(item);
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
      console.log(data);
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
    </div>
  );

  return (
    <section className="login-container">
      <h2>Här loggar man in!</h2>
      <div className="login-form">
        <div className="title">Logga in med användarnamn och lösenord!</div>
        {logInSuccess ? (
          <div>{loggedInUser.username} är inloggad.</div>
        ) : (
          LogInForm
        )}
      </div>
    </section>
  );
};

export default LogIn;
