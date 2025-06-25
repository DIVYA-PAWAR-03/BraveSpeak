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
import HarassmentLaws from './pages/HarassmentLaws';
import StatisticsPage from './pages/StatisticsPage';
function App() {
  

  return (
    <>
    <Header/>
   
    <Routes>
      <Route path='/' element={<Landingpage/>} />
       <Route path='/statistics' element={<StatisticsPage/>} />
       <Route path='/laws' element={<HarassmentLaws/>} />
    </Routes>
    <Footer/>
    
    </>
  );
}

export default App;
