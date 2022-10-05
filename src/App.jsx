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
import Search from './components/Search/Search';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

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
                />
              }
            />
            <Route
              path="/Basket"
              element={
                <Basket
                  loggedInUser={loggedInUser}
                  setLoggedInUser={setLoggedInUser}
                />
              }
            />
            <Route path="/CreateUser" element={<CreateUser />} />
            <Route path="/StatsForAdmin" element={<StatsForAdmin />} />
            <Route path="/Search" element={<Search />} />
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
