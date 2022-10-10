import { useState } from "react";
import config from '../config.js';

const ForgotUsername = ({  }) => {
    const [ForgotUsernameSuccess, setForgotUsernameSuccess] = useState(false);
    const [mail, setMail] = useState("");

    const handleSubmit = (event) => {
      event.preventDefault();
    };


    
    async function forgotUsername(){
        let action = "/api/Users/ForgotUsername"
        let response = await fetch(config.apiSettings.address + ":" + config.apiSettings.port + action, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
             Accept: 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify({Mail: mail}),
        });
        if (response.status === 200) {
            setForgotUsernameSuccess(true);
        }
    }

    const forgotUsernameForm = (
      <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Email</label>
          <input
            type="text"
            id="email"
            onChange={(e) => setMail(e.target.value)}
          />
        </div>
        <div className="button-container">
          <input type="submit" onClick={forgotUsername} />
        </div>
      </form>
    </div>
    );

  return (
    <section className="login-container">
      <h2>Hej</h2>
      <div className="login-form">
        <div className="title">Skriv in din mail</div>
        {ForgotUsernameSuccess ? (
          <div>Ett mail har skickats med ditt nya användarnamn.</div>
        ) : (
          forgotUsernameForm
        )}
      </div>
    </section>
  );
};

export default ForgotUsername;