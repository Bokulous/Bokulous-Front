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
          <Link to="/Cart">Varukorg</Link>
        ) : (
          <Link to="/LogIn">Varukorg, inlogg krävs</Link>
        )}

        {loggedInUser ? (
          <Link to="/Profile">Profil</Link>
        ) : (
          <Link to="/CreateUser">Skapa användare</Link>
        )}

        {loggedInUser && loggedInUser.isAdmin ? (
          <Link to="/GetBooksAdmin">Lista och hantera böcker</Link>
        ) : loggedInUser ? (
          <Link to="/GetUserBooks">Lista och hantera böcker</Link>
        ) : (
          <></>
        )}

        {loggedInUser && loggedInUser.isAdmin ? (
          <Link to="/GetUsers">Lista och hantera användare</Link>
        ) : (
          <></>
        )}
        
        {loggedInUser && loggedInUser.isAdmin ? (
          <Link to="/GetCategories">Lista och hantera kategorier</Link>
        ) : (
          <></>
        )}
        
        {loggedInUser && loggedInUser.isAdmin ? (
          <Link to="/StatsForAdmin">Statistik för Admin</Link>
        ) : (
          <></>
        )}
      </nav>
    </section>
  );
};

export default Navbar;
