import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; //om vi vill använda routing
import Landingpage from './components/Landingpage';
import Header from './components/Header';
import Navbar from './components/NavBar';
import Basket from './components/Basket';
import CreateUser from './components/CreateUser';
import LogIn from './components/LogIn';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Navbar />

        <main>
          <Routes>
            <Route path="/LogIn" element={<LogIn />} />
            <Route path="/Home" element={<Landingpage />} />
            <Route path="/Basket" element={<Basket />} />
            <Route path="/CreateUser" element={<CreateUser />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
