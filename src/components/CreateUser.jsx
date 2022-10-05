import '../styles/CreateUser.css';
import { useState, useEffect } from 'react';

const CreateUser = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newUser, setNewUser] = useState(null); // använda till popup efter aktivering är genomförd?

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === 'email') {
      setEmail(value);
    }
    if (id === 'username') {
      setUsername(value);
    }
    if (id === 'password') {
      setPassword(value);
    }
  };

  async function addUserToDB() {
    let newUserInput = {
      Mail: email,
      Username: username,
      Password: password,
      isSeller: true,
    };
    let response = await fetch('https://localhost:44367/api/Users/AddUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(newUserInput),
    });
    console.log(response);
    if (response.status >= 200 && response.status < 300) {
      let data = await response.json();
      console.log(data);
      setNewUser(data);
    }

    // newUser ? (
    //   <PopUp
    //     content={
    //       <>
    //         <h4>{newUser.Username} är tillagd som användare!</h4>
    //         <p>Du kommer få ett mail med en aktiverings-länk.</p>
    //         <p>Klicka på länken för att aktivera ditt konto.</p>
    //         <br/>
    //         <p>Välkommen till Bokulous!</p>
    //       </>
    //     }
    //     handleClose={togglePopUpNewUser}
    //     />
    //           )
  }

  const CreateUserForm = (
    <div className="create-form">
      <div className="create-form-body">
        <div className="mail">
          <label className="form__label" forname="mail">
            Email{' '}
          </label>
          <br />
          <input
            type="text"
            name=""
            onChange={(e) => handleInputChange(e)}
            id="email"
            className="form__input"
            placeholder="Email"
          />
        </div>
        <div className="username">
          <label className="form__label" forname="username">
            Användarnamn{' '}
          </label>
          <br />
          <input
            className="form__input"
            type="text"
            onChange={(e) => handleInputChange(e)}
            id="username"
            placeholder="Användarnamn"
          />
        </div>
        <div className="password">
          <label className="form__label" forname="password">
            Lösenord, minst 6 tecken{' '}
          </label>
          <br />
          <input
            className="form__input"
            type="password"
            onChange={(e) => handleInputChange(e)}
            id="password"
            placeholder="Lösenord"
          />
        </div>
      </div>
      <div className="submit-btn">
        <button type="submit" className="btn" onClick={addUserToDB}>
          Skapa användare
        </button>
      </div>
    </div>
  );

  return (
    <section className="container">
      <h2>Skapa ny användare här!</h2>
      {CreateUserForm}
    </section>
  );
};

export default CreateUser;
