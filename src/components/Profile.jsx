import '../styles/Profile.css';
import { useState } from 'react';
import config from '../config.js';
import EditProfile from './EditProfile';
import EditPassword from './EditPassword';

const Profile = ({ loggedInUser, setLoggedInUser }) => {
  const [showEditUser, setShowEditUser] = useState(false);
  const [showEditPassword, setShowEditPassword] = useState(false);

  //handleclick
  const showEdit = () => {
    setShowEditUser(true);
  };

  //handleclick
  const showEditPass = () => {
    setShowEditPassword(true);
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
        <li>Säljare: {loggedInUser.isSeller ? 'Ja' : 'Nej'}</li>
        <li>Admin: {loggedInUser.isAdmin ? 'Ja' : 'Nej'}</li>
      </ul>
      <button onClick={showEdit} className="edit-btn">
        Redigera profilen
      </button>
      <button onClick={showEditPass} className="edit-btn">
        Byt lösenord
      </button>
      {/* <h3>Dina tidigare beställningar</h3>
      {loggedInUser?.previous_Orders?.map((order) => (
        <p>{order}</p>
      ))}
      <h3>Dina sålda böcker</h3>
      {loggedInUser?.previous_Books_Sold?.map((soldBook) => (
        <p>{soldBook}</p>
      ))} */}
    </div>
  );

  return (
    <section className="profile-container">
      <h2>Din profil</h2>
      {!showEditUser ? (
        ProfileInfo
      ) : (
        <EditProfile
          loggedInUser={loggedInUser}
          setLoggedInUser={setLoggedInUser}
          showEditUser={showEditUser}
          setShowEditUser={setShowEditUser}
        />
      )}
      {!showEditPassword ? (
        <span></span>
      ) : (
        <EditPassword
          loggedInUser={loggedInUser}
          setLoggedInUser={setLoggedInUser}
          showEditPassword={showEditPassword}
          setShowEditPassword={setShowEditPassword}
        />
      )}
    </section>
  );
};

export default Profile;
