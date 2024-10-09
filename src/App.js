import './App.css';
import React from 'react'
import Login from './Components/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Signup from './Components/Signup';
import Account from './Components/Account';
import Deposit from './Components/Deposit';
import Withdraw from './Components/Withdraw';
import CreateBankAccount from './Components/CreateBankAccount';


function App() {
  return (
      <BrowserRouter>
        <div className="container text-center">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/home/createAccount" element={<CreateBankAccount />} />
            <Route path="/home/account" element={<Account />} />
            <Route path="/home/deposit" element={<Deposit />} />
            <Route path="/home/withdraw" element={<Withdraw />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </BrowserRouter>
  )
}

export default App