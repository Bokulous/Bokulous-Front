import { useState } from "react";
import config from '../config.js';

const ForgotPassword = ({  }) => {
    const [ForgotPasswordSuccess, setForgotPasswordSuccess] = useState(false);
    const [mail, setMail] = useState("");

    const handleSubmit = (event) => {
      event.preventDefault();
    };


    
    async function forgotPassword(){
        let action = "/api/Users/ForgotPassword"
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
            setForgotPasswordSuccess(true);
        }
    }

    const forgotPasswordForm = (
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
          <input type="submit" onClick={forgotPassword} />
        </div>
      </form>
    </div>
    );

  return (
    <section className="login-container">
      <h2>Hej</h2>
      <div className="login-form">
        <div className="title">Skriv in din mail</div>
        {ForgotPasswordSuccess ? (
          <div>Ett mail har skickats med ditt nya lösenord.</div>
        ) : (
          forgotPasswordForm
        )}
      </div>
    </section>
  );
};

export default ForgotPassword;