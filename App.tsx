
import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import EventGrid from './components/EventGrid';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import Profile from './components/Profile';

// Internal component to use AuthContext
const AppContent: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'profile'>('home');

  return (
    <div className="min-h-screen bg-dark-bg flex flex-col">
      <Navbar onNavigate={setCurrentView} currentView={currentView} />
      
      <main className="flex-grow">
        {currentView === 'home' ? (
          <>
            <Hero />
            <EventGrid />
          </>
        ) : (
          <Profile />
        )}
      </main>
      
      <Footer />
      <AuthModal />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
