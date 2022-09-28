import { Link } from 'react-router-dom';
//import '../styles/Navbar.css';

const Profile = ({ loggedInUser, setLoggedInUser }) => {
  return (
    <section className="profile-container">
      <h2>Din profil</h2>
    </section>
  );
};
// om det finns en loggedInUser så visas profilalternativet i menyn.
// lista upp användarens info genom loggedInUser.username osv...
// alternativ att CRUD sina uppgifter, koppla till editprofile-endpoint
export default Profile;
