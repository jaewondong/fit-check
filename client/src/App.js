import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Closet from './components/Closet';
import BestFits from './components/BestFits';
import ProtectedRoute from './components/ProtectedRoute';
import ProtectedRouteGuest from './components/ProtectedRouteGuest';
import Guest from './components/Guest';
import Score from './components/Score';
import Footer from './components/Footer';

import './App.css';



function App() {

    return (
        <div className="App">
          
                <BrowserRouter>
                <Header />
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
                    <Route path="/guest" exact element={<Guest />} />
                    <Route path="/guest/score" element = {
                      <ProtectedRouteGuest>
                        <Score />
                      </ProtectedRouteGuest>
                    } />
                    <Route path="*" element={<Navigate to="/" replace />} />
                 </Routes>
                  <Footer/>
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