import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, NavLink, Routes, Route, Navigate } from 'react-router-dom';
import Landingpage from './components/Landingpage';
import Header from './components/Header';
import Navbar from './components/NavBar';
import CreateUser from './components/CreateUser';
import LogIn from './components/LogIn';
import StatsForAdmin from './components/StatsForAdmin';
import Profile from './components/Profile';
import Cart from './components/Cart';
import { v4 as uuid } from 'uuid';
import ForgotPassword from './components/ForgotPassword';
import ForgotUsername from './components/ForgotUsername';
import Search from './components/Search/Search';
import Checkout from './components/Checkout';
import GetBooksAdmin from './components/Admin/Books/GetBooksAdmin';
import AddBook from './components/BookHandler/AddBook';
import DeleteBook from './components/BookHandler/DeleteBook';
import UpdateBook from './components/BookHandler/UpdateBook';
import PurgeBook from './components/Admin/Books/PurgeBook';
import GetCategories from './components/Admin/Categories/GetCategories';
import AddCategory from './components/Admin/Categories/AddCategory';
import DeleteCategory from './components/Admin/Categories/DeleteCategory';
import UpdateCategory from './components/Admin/Categories/UpdateCategory';
import GetUserBooks from './components/BookHandler/GetUserBooks';
import GetUsers from './components/Admin/Users/GetUsers';
import BlockUser from './components/Admin/Users/BlockUser';
import InactivateUser from './components/Admin/Users/InactivateUser';
import PromoteUser from './components/Admin/Users/PromoteUser';
import ChangePassAdmin from './components/Admin/Users/ChangePassAdmin';

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
             <Route path="/ForgotPassword" element={<ForgotPassword />} />
             <Route path="/ForgotUsername" element={<ForgotUsername />} />
            <Route
              path="/GetBooksAdmin"
              element={
                <GetBooksAdmin
                  loggedInUser={loggedInUser}
                  setLoggedInUser={setLoggedInUser}
                />
              }
            />
            <Route
              path="/AddBook"
              element={
                <AddBook
                  loggedInUser={loggedInUser}
                  setLoggedInUser={setLoggedInUser}
                />
              }
            />
            <Route
              path="/DeleteBook"
              element={
                <DeleteBook
                  loggedInUser={loggedInUser}
                  setLoggedInUser={setLoggedInUser}
                />
              }
            />
            <Route
              path="/PurgeBook"
              element={
                <PurgeBook
                  loggedInUser={loggedInUser}
                  setLoggedInUser={setLoggedInUser}
                />
              }
            />
            <Route
              path="/UpdateBook"
              element={
                <UpdateBook
                  loggedInUser={loggedInUser}
                  setLoggedInUser={setLoggedInUser}
                />
              }
            />
            <Route
              path="/GetCategories"
              element={
                <GetCategories
                  loggedInUser={loggedInUser}
                  setLoggedInUser={setLoggedInUser}
                />
              }
            />
            <Route
              path="/AddCategory"
              element={
                <AddCategory
                  loggedInUser={loggedInUser}
                  setLoggedInUser={setLoggedInUser}
                />
              }
            />
            <Route
              path="/DeleteCategory"
              element={
                <DeleteCategory
                  loggedInUser={loggedInUser}
                  setLoggedInUser={setLoggedInUser}
                />
              }
            />
            <Route
              path="/UpdateCategory"
              element={
                <UpdateCategory
                  loggedInUser={loggedInUser}
                  setLoggedInUser={setLoggedInUser}
                />
              }
            />
            <Route
              path="/GetUserBooks"
              element={
                <GetUserBooks
                  loggedInUser={loggedInUser}
                  setLoggedInUser={setLoggedInUser}
                />
              }
            />
            <Route
              path="/GetUsers"
              element={
                <GetUsers
                  loggedInUser={loggedInUser}
                  setLoggedInUser={setLoggedInUser}
                />
              }
            />
            <Route
              path="/BlockUser"
              element={
                <BlockUser
                  loggedInUser={loggedInUser}
                  setLoggedInUser={setLoggedInUser}
                />
              }
            />
            <Route
              path="/InactivateUser"
              element={
                <InactivateUser
                  loggedInUser={loggedInUser}
                  setLoggedInUser={setLoggedInUser}
                />
              }
            />
            <Route
              path="/PromoteUser"
              element={
                <PromoteUser
                  loggedInUser={loggedInUser}
                  setLoggedInUser={setLoggedInUser}
                />
              }
            />
            <Route
              path="/ChangePassAdmin"
              element={
                <ChangePassAdmin
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
