import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import {Route ,Routes } from 'react-router-dom'
import React from 'react';
import Header from './components/Header'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import Landingpage from './pages/Landingpage';
function App() {
  

  return (
    <>
    <Header/>

    <Routes>
      <Route path='/' element={<Landingpage/>} />
       
     
    </Routes>
    </>
  );
}

export default App;
