
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import EventGrid from './components/EventGrid';
import Footer from './components/Footer';
import EventDetailsModal from './components/EventDetailsModal';
import { Event } from './types';

const App: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  return (
    <div className="min-h-screen bg-dark-bg flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        <EventGrid />
        {/* Pass event selection handler if EventGrid supports it, otherwise update EventGrid to use context or props */}
        {/* Wait, EventGrid uses EventCard which needs onViewDetails. Passing props strictly. */}
      </main>
      
      <Footer />
      
      {/* Render modal globally when event is selected */}
      {selectedEvent && (
        <EventDetailsModal 
          event={selectedEvent} 
          onClose={() => setSelectedEvent(null)} 
        />
      )}
      
      {/* 
        Note: Since I cannot modify EventGrid in this atomic change block without file duplication, 
        I will re-render EventGrid passing the prop. 
      */}
      <div className="hidden">
        {/* This hidden div is just to ensure imports work, actual rendering below */}
      </div>
    </div>
  );
};

// Redefining App to correctly pass props to EventGrid
const AppFinal: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  // We need to modify EventGrid to accept onViewDetails or pass it down.
  // Since EventGrid.tsx wasn't modified in this specific step, let's modify App.tsx
  // to render EventGrid with the prop. (Assuming EventGrid component definition needs update too?
  // The previous EventGrid file had no props defined. I will update EventGrid as well to be safe).

  return (
    <div className="min-h-screen bg-dark-bg flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        <EventGridWrapper onViewDetails={setSelectedEvent} />
      </main>
      
      <Footer />
      
      {selectedEvent && (
        <EventDetailsModal 
          event={selectedEvent} 
          onClose={() => setSelectedEvent(null)} 
        />
      )}
    </div>
  );
};

// Wrapper to match expected signature if EventGrid wasn't updated yet, 
// but I will update EventGrid file below to accept the prop directly.
import EventGridWrapper from './components/EventGrid'; 

export default AppFinal;
