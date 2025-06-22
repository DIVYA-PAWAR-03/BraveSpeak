import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import {Route ,Routes } from 'react-router-dom'
import React from 'react';
import Header from './components/Header'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import Landingpage from './pages/Landingpage';
import Footer from './components/Footer';
function App() {
  

  return (
    <>
    <Header/>
   
    <Routes>
      <Route path='/' element={<Landingpage/>} />
       
     
    </Routes>
    <Footer/>
    
    </>
  );
}

export default App;
