import '../styles/Profile.css';
import { useState } from 'react';
import config from '../config.js';

const EditPassword = ({
  loggedInUser,
  setLoggedInUser,
  showEditPassword,
  setShowEditPassword,
}) => {
  const [passwordEdit, setPasswordEdit] = useState('');
  const [passwordOldEdit, setPasswordOldEdit] = useState('');

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === 'old-password') {
      setPasswordOldEdit(value);
    }
    if (id === 'password') {
      setPasswordEdit(value);
    }
  };

  const ChangePassword = async () => {
    let userEditInput = {
      Id: loggedInUser.id,
      Password: passwordEdit,
    };
    let action = '/api/Users/ChangePassword';
    let response = await fetch(
      config.apiSettings.address + ':' + config.apiSettings.port + action,
      {
        method: 'PUT',
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
      setLoggedInUser({ ...loggedInUser, password: passwordEdit });
      setShowEditPassword(false);
    }
  };

  const EditPasswordForm = (
    <div className="create-form">
      <div className="create-form-body">
        <div className="password">
          <label className="form__label" forname="password">
            Nuvarande lösenord{' '}
          </label>
          <br />
          <input
            className="form__input"
            type="password"
            onChange={(e) => handleInputChange(e)}
            id="old-password"
            placeholder="Gammalt lösenord"
          />
        </div>
        <div className="password">
          <label className="form__label" forname="password">
            Nytt lösenord, minst 6 tecken{' '}
          </label>
          <br />
          <input
            disabled={!(passwordOldEdit === loggedInUser.password)}
            className="form__input"
            type="password"
            onChange={(e) => handleInputChange(e)}
            id="password"
            placeholder="Nytt lösenord"
          />
        </div>
      </div>
      <div className="submit-btn">
        <button
          disabled={
            !(passwordOldEdit === loggedInUser.password) ||
            passwordEdit.length < 6
          }
          type="submit"
          className="btn"
          onClick={ChangePassword}
        >
          Uppdatera lösenord
        </button>
      </div>
    </div>
  );

  return (
    <section className="profile-container">
      <h2>Byt lösenord</h2>
      {EditPasswordForm}
    </section>
  );
};

export default EditPassword;
