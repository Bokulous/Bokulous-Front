import '../styles/Profile.css';
import { useState } from 'react';
import config from '../config.js';

const EditProfile = ({
  loggedInUser,
  setLoggedInUser,
  showEditUser,
  setShowEditUser,
}) => {
  const [emailEdit, setEmailEdit] = useState(loggedInUser.mail);
  const [usernameEdit, setUsernameEdit] = useState(loggedInUser.username);
  const [passwordConfirm, setPasswordConfirm] = useState('');
  //var passwordInputCorrect = false;
  // var currentPassword = loggedInUser.password;

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    // if (id === 'password' && value === loggedInUser.password) {
    //   passwordInputCorrect = true;
    // }
    // if (passwordInputCorrect) {

    //   passwordInputCorrect = false;
    // }

    if (id === 'email') {
      setEmailEdit(value.length ? value : loggedInUser.mail);
    }
    if (id === 'username') {
      setUsernameEdit(value.length ? value : loggedInUser.username);
    }

    if (id === 'password') {
      setPasswordConfirm(value);
    }
  };

  const EditUser = async () => {
    let userEditInput = {
      Id: loggedInUser.id,
      Mail: emailEdit,
      Username: usernameEdit,
      Password: passwordConfirm,
    };
    let action = '/api/Users/EditProfile';
    let response = await fetch(
      config.apiSettings.address + ':' + config.apiSettings.port + action,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(userEditInput),
      }
    );
    console.log(response);
    if (response.status >= 200 && response.status < 300) {
      let data = await response.json();
      console.log(data);
      setLoggedInUser(data);
      setShowEditUser(false);
    }
  };

  const EditUserForm = (
    <div className="create-form">
      <div className="create-form-body">
        <div className="mail">
          <label className="form__label" forname="mail">
            Ny email{' '}
          </label>
          <br />
          <input
            type="text"
            onChange={(e) => handleInputChange(e)}
            id="email"
            className="form__input"
            placeholder="Email"
          />
        </div>
        <div className="username">
          <label className="form__label" forname="username">
            Nytt användarnamn{' '}
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
            Bekräfta med lösenordet{' '}
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
        <button type="submit" className="btn" onClick={() => EditUser(false)}>
          Uppdatera dina uppgifter
        </button>
      </div>
    </div>
  );

  return (
    <section className="profile-container">
      <h2>Redigera Email eller Användarnamn</h2>
      {EditUserForm}
    </section>
  );
};

export default EditProfile;
