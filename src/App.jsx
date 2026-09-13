
import React, { Suspense } from 'react';
import Header from './components/Header';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Footer from './components/Footer';
import HarassmentLaws from './pages/HarassmentLaws';
import StatisticsPage from './pages/StatisticsPage';
import StoriesPage from './pages/StoriesPage';
import ContactUs from './pages/ContactUs';
import SafetyToolkit from './pages/SafetyToolkit';
import LegalAssistant from './pages/LegalAssistant';
import SupportDirectory from './pages/SupportDirectory';
import DigitalSafety from './pages/DigitalSafety';
import QuickCamouflage from './components/QuickCamouflage';

const StoryDetail = React.lazy(() => import('./pages/StoryDetail'));

function App() {
  

  return (
    <>
    <Header/>
   
    <Routes>
      <Route path='/' element={<Homepage />} />
      <Route path='/safety-toolkit' element={<SafetyToolkit />} />
      <Route path='/legal-assistant' element={<LegalAssistant />} />
      <Route path='/support-directory' element={<SupportDirectory />} />
      <Route path='/digital-safety' element={<DigitalSafety />} />
      <Route path='/statistics' element={<StatisticsPage />} />
      <Route path='/laws' element={<HarassmentLaws />} />
      <Route path='/survivorStories' element={<StoriesPage />} />
      <Route path='/contact' element={<ContactUs />} />
      <Route path='/story/:id' element={
        <Suspense fallback={<div>Loading...</div>}>
          <StoryDetail />
        </Suspense>
      } />
    </Routes>
    <Footer/>
    <QuickCamouflage />
    </>
  );
}

export default App;
