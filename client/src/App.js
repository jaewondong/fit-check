import React from 'react';
import { BrowserRouter, Route, Routes, Navigate, Link } from 'react-router-dom';


import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Closet from './components/Closet';
import BestFits from './components/BestFits';
import ProtectedRoute from './components/ProtectedRoute';

import logo from './assets/images/logo1.png';



function App() {


    return (
        <div className="app">
          
                <BrowserRouter>
                <Link to="/">
                  <img src={logo} className="logo" alt="logo"/>
                </Link>
                 <Routes>
                    <Route path="/" exact element={<Home />} />
                    <Route path="/signup" exact element={<SignUp />} />
                    <Route path="/login" exact element={<Login />} />
                    <Route path="/closet" element={
                      <ProtectedRoute>
                        <Closet />
                      </ProtectedRoute>
                    } />
                     <Route path="/closet/bestFits" element={
                      <ProtectedRoute>
                        <BestFits />
                      </ProtectedRoute>
                    } />
                    <Route path="*" element={<Navigate to="/" replace />}
                    />
                 </Routes>
                </BrowserRouter>     
        </div>
    )
}

export default App;

/* <Route path="/closet" element={
                      <ProtectedRoute>
                        <Closet />
                      </ProtectedRoute>
                    } />*/