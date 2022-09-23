import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <section className="dropdown">
      <button className="dropbtn">MENY</button>
      <nav className="dropdown-content">
        <Link to="/LogIn">Logga in</Link>
        <Link to="/Home">Startsida</Link>
        <Link to="/Basket">Varukorg</Link>
        <Link to="/CreateUser">Skapa användare</Link>
      </nav>
    </section>
  );
};

export default Navbar;
