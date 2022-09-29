import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landingpage from './components/Landingpage';
import Header from './components/Header';
import Navbar from './components/NavBar';
import Basket from './components/Basket';
import CreateUser from './components/CreateUser';
import LogIn from './components/LogIn';
import StatsForAdmin from './components/StatsForAdmin';
import Profile from './components/Profile';
import Cart from './components/Cart';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);

    const addCartItem = (newTeamMember) => {
      let obj = { ...cartItems}
      setTeamMembers([...cartItems, obj])
    }
    const removeCartItem = (removedCartItem) => {
      const filteredCartItems = cartItems.filter(f => f.id != removedCartItem.id )
      setTeamMembers(filteredCartItems)
    }

  return (
    <Router>
      <div className="App">
        <Header />
        <Navbar loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />

        <main>
          <Routes>
            <Route
              path="/LogIn"
              element={
                <LogIn
                  loggedInUser={loggedInUser}
                  setLoggedInUser={setLoggedInUser}
                />
              }
            />
            <Route
              path="/Home"
              element={
                <Landingpage
                  loggedInUser={loggedInUser}
                  setLoggedInUser={setLoggedInUser}
                  addCartItem={addCartItem}
                />
              }
            />
            <Route
              path="/Cart"
              element={
                <Cart
                  loggedInUser={loggedInUser}
                  setLoggedInUser={setLoggedInUser}
                  cartItems={cartItems}
                  removeCartItem={removeCartItem}
                />
              }
            />
            <Route path="/CreateUser" element={<CreateUser />} />
            <Route path="/StatsForAdmin" element={<StatsForAdmin />} />
            <Route
              path="/Profile"
              element={
                <Profile
                  loggedInUser={loggedInUser}
                  setLoggedInUser={setLoggedInUser}
                />
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
