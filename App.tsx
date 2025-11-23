import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import EventGrid from './components/EventGrid';
import Footer from './components/Footer';
import EventDetailsModal from './components/EventDetailsModal';
import CreateEventModal from './components/CreateEventModal';
import AuthModal from './components/AuthModal';
import ConfirmModal from './components/ConfirmModal';
import { AuthProvider } from './context/AuthContext';
import { MOCK_EVENTS } from './constants';
import { Event } from './types';

const AppContent: React.FC = () => {
  const [events, setEvents] = useState<Event[]>(MOCK_EVENTS);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  
  // Create/Edit State
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | undefined>(undefined);

  // Delete State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);

  // -- Handlers --

  const openCreateModal = () => {
    setEditingEvent(undefined); // Ensure we are in create mode
    setIsEventModalOpen(true);
  };

  const openEditModal = (event: Event) => {
    setEditingEvent(event);
    setIsEventModalOpen(true);
  };

  const confirmDelete = (eventId: string) => {
    setEventToDelete(eventId);
    setIsDeleteModalOpen(true);
  };

  const handleCreateOrUpdateEvent = (eventData: Event | Omit<Event, 'id'>) => {
    if ('id' in eventData) {
        // Update existing
        setEvents(events.map(e => e.id === eventData.id ? eventData as Event : e));
    } else {
        // Create new
        const newEvent: Event = {
            ...eventData,
            id: Date.now().toString(),
        };
        setEvents([newEvent, ...events]);
    }
  };

  const handleDeleteEvent = () => {
    if (eventToDelete) {
        setEvents(events.filter(e => e.id !== eventToDelete));
        setEventToDelete(null);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg flex flex-col">
      <Navbar onCreateEvent={openCreateModal} />
      
      <main className="flex-grow">
        <Hero />
        <EventGrid 
            events={events} 
            onViewDetails={setSelectedEvent}
            onEdit={openEditModal}
            onDelete={confirmDelete}
        />
      </main>
      
      <Footer />
      
      {/* Global Modals */}
      <AuthModal />
      
      {selectedEvent && (
        <EventDetailsModal 
          event={selectedEvent} 
          onClose={() => setSelectedEvent(null)} 
        />
      )}

      {isEventModalOpen && (
        <CreateEventModal
          onClose={() => setIsEventModalOpen(false)}
          onSubmit={handleCreateOrUpdateEvent}
          initialData={editingEvent}
        />
      )}

      <ConfirmModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteEvent}
        title="Delete Event?"
        message="Are you sure you want to remove this event? This action cannot be undone."
      />
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