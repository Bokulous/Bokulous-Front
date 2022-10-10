import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landingpage from './components/Landingpage';
import Header from './components/Header';
import Navbar from './components/NavBar';
import CreateUser from './components/CreateUser';
import LogIn from './components/LogIn';
import StatsForAdmin from './components/StatsForAdmin';
import Profile from './components/Profile';
import Cart from './components/Cart';
import { v4 as uuid } from 'uuid';
import Search from './components/Search/Search';
import Checkout from './components/Checkout';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);

    const uniqueId = uuid()

    const addCartItem = (newCartItem) => {
      let obj = { ...newCartItem, id: uniqueId}
      setCartItems([...cartItems, obj])
    }
    const removeCartItem = (removedCartItem) => {
      const filteredCartItems = cartItems.filter(f => f.id != removedCartItem.id )
      setCartItems(filteredCartItems)
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
            <Route path="/Search" element={<Search addCartItem={addCartItem} removeCartItem={removeCartItem} />} />
            <Route path="/Checkout" element={<Checkout cartItems={cartItems} />} />
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
