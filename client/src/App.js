import React from 'react';
import { BrowserRouter, Route, Routes, Navigate, Link } from 'react-router-dom';


import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Closet from './components/Closet';
import ProtectedRoute from './components/ProtectedRoute';



function App() {


    return (
        <div className="wrapper">
          
                <BrowserRouter>
                <Link to='/'>Logo</Link>
                 <Routes>
                    <Route path="/" exact element={<Home />} />
                    <Route path="/signup" exact element={<SignUp />} />
                    <Route path="/login" exact element={<Login />} />
                    <Route path="/closet" element={
                      <ProtectedRoute>
                        <Closet />
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