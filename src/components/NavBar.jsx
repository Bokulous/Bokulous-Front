import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = ({ loggedInUser, setLoggedInUser }) => {
  const LogOut = () => {
    setLoggedInUser(null);
    //TODO skicka till startsidan?
  };

  return (
    <section className="dropdown">
      <button className="dropbtn">MENY</button>
      <nav className="dropdown-content">
        {loggedInUser ? (
          <button className="logout-btn" onClick={LogOut}>
            Logga ut
          </button>
        ) : (
          <Link to="/LogIn">Logga in</Link>
        )}

        <Link to="/Home">Startsida</Link>
        <Link to="/Search">Sök</Link>

        {loggedInUser ? (
          <Link to="/Basket">Varukorg</Link>
        ) : (
          <Link to="/LogIn">Varukorg, inlogg krävs</Link>
        )}

        {loggedInUser ? (
          <Link to="/Profile">Profil</Link>
        ) : (
          <Link to="/CreateUser">Skapa användare</Link>
        )}

        {loggedInUser && loggedInUser.isAdmin ? (
          <Link to="/StatsForAdmin">Statistik för Admin</Link>
        ) : (
          <Link to="/LogIn">Statistik för Admin</Link>
        )}
      </nav>
    </section>
  );
};

export default Navbar;
