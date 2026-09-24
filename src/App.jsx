
import React, { Suspense } from 'react';
import Header from './components/Header';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';

// ─── Lazy-load every page so only the current route's JS is downloaded ───────
const Homepage        = React.lazy(() => import('./pages/Homepage'));
const SafetyToolkit   = React.lazy(() => import('./pages/SafetyToolkit'));
const LegalAssistant  = React.lazy(() => import('./pages/LegalAssistant'));
const SupportDirectory = React.lazy(() => import('./pages/SupportDirectory'));
const DigitalSafety   = React.lazy(() => import('./pages/DigitalSafety'));
const StatisticsPage  = React.lazy(() => import('./pages/StatisticsPage'));
const HarassmentLaws  = React.lazy(() => import('./pages/HarassmentLaws'));
const StoriesPage     = React.lazy(() => import('./pages/StoriesPage'));
const ContactUs       = React.lazy(() => import('./pages/ContactUs'));
const StoryDetail     = React.lazy(() => import('./pages/StoryDetail'));

// ─── Shared loading fallback ──────────────────────────────────────────────────
function PageLoader() {
  return (
    <div
      style={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '14px',
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          border: '4px solid rgba(139,92,246,0.2)',
          borderTopColor: '#7c3aed',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <p style={{ color: '#7c3aed', fontWeight: 600, fontSize: '0.9rem' }}>Loading…</p>
    </div>
  );
}

function App() {
  return (
    <>
      <Header />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path='/'                element={<Homepage />} />
          <Route path='/safety-toolkit'  element={<SafetyToolkit />} />
          <Route path='/legal-assistant' element={<LegalAssistant />} />
          <Route path='/support-directory' element={<SupportDirectory />} />
          <Route path='/digital-safety'  element={<DigitalSafety />} />
          <Route path='/statistics'      element={<StatisticsPage />} />
          <Route path='/laws'            element={<HarassmentLaws />} />
          <Route path='/survivorStories' element={<StoriesPage />} />
          <Route path='/contact'         element={<ContactUs />} />
          <Route path='/story/:id'       element={<StoryDetail />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}

export default App;
