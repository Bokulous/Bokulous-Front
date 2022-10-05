import '../styles/Profile.css';
import { useState } from 'react';

const Profile = ({ loggedInUser, setLoggedInUser }) => {
  const [showEditUser, setShowEditUser] = useState(false);
  const [emailEdit, setEmailEdit] = useState('');
  const [usernameEdit, setUsernameEdit] = useState('');
  const [passwordEdit, setPasswordEdit] = useState('');
  const currentPassword = loggedInUser.Password;

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === 'email') {
      setEmailEdit(value);
    }
    if (id === 'username') {
      setUsernameEdit(value);
    }
    if (id === 'old-password' && value === currentPassword) {
      if (id === 'password') {
        setPasswordEdit(value);
      }
    }
  };

  //handleclick
  const showEdit = () => {
    setShowEditUser(true);
  };

  const EditUser = async () => {
    let userInput = {
      Mail: email,
      Username: username,
      Password: password,
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
        body: JSON.stringify(userInput),
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

  const ProfileInfo = (
    <div>
      <img
        src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
        className="profile-img"
      />
      <ul className="ul-profile">
        <li>Användarnamn: {loggedInUser.username}</li>
        <li>Email: {loggedInUser.mail}</li>
        <li>Aktiv:{loggedInUser.isActive ? 'Ja' : 'Nej'}</li>
        <li>Blockad: {loggedInUser.isBlocked ? 'Ja' : 'Nej'}</li>
        <li>Admin-behörigheter: {loggedInUser.isAdmin ? 'Ja' : 'Nej'}</li>
        <li>Säljar-behörigheter: {loggedInUser.isSeller ? 'Ja' : 'Nej'}</li>
        <button onClick={showEdit} className="edit-btn">
          Redigera profilen
        </button>
      </ul>
      <h3>Dina tidigare beställningar</h3>
      {loggedInUser?.previous_Orders?.map((order) => (
        <p>{order}</p>
      ))}
      <h3>Dina sålda böcker</h3>
      {loggedInUser?.previous_Books_Sold?.map((soldBook) => (
        <p>{soldBook}</p>
      ))}
    </div>
  );

  const EditEmailForm = (
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
            className="form__input"
            type="password"
            onChange={(e) => handleInputChange(e)}
            id="password"
            placeholder="Nytt lösenord"
          />
        </div>
      </div>
      <div className="submit-btn">
        <button type="submit" className="btn" onClick={() => EditUser}>
          Uppdatera dina uppgifter
        </button>
      </div>
    </div>
  );

  return (
    <section className="profile-container">
      <h2>Din profil</h2>
      {!showEditUser ? ProfileInfo : EditUserForm}
    </section>
  );
};

export default Profile;
