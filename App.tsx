
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import EventGrid from './components/EventGrid';
import Footer from './components/Footer';
import EventDetailsModal from './components/EventDetailsModal';
import CreateEventModal from './components/CreateEventModal';
import AuthModal from './components/AuthModal';
import ConfirmModal from './components/ConfirmModal';
import { AuthProvider } from './context/AuthContext';
import { Event } from './types';
import { fetchEvents, saveEvent, updateEvent, deleteEvent as apiDeleteEvent } from './api';
import { MOCK_EVENTS } from './constants';
import Button from './components/Button';
import { Database } from 'lucide-react';

const AppContent: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSeeding, setIsSeeding] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  
  // Create/Edit State
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | undefined>(undefined);

  // Delete State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);

  // -- Load Data from Google Sheet --
  const loadEvents = async () => {
    setIsLoading(true);
    try {
      // First try local storage for immediate display
      const localData = localStorage.getItem('showgo_events');
      if (localData) {
        setEvents(JSON.parse(localData));
      }

      // Then fetch fresh from API
      const remoteEvents = await fetchEvents();
      console.log("Remote Events:", remoteEvents);
      
      if (remoteEvents && remoteEvents.length > 0) {
        setEvents(remoteEvents);
        localStorage.setItem('showgo_events', JSON.stringify(remoteEvents));
      } else if (!localData) {
        setEvents([]); 
      }
    } catch (e) {
      console.error("Failed to load events", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  // -- Handlers --

  const handleSeedDatabase = async () => {
    if (confirm("This will upload 15 dummy events to your Google Sheet. Continue?")) {
        setIsSeeding(true);
        try {
            // We upload them one by one to avoid overwhelming the script if it handles concurrency poorly
            for (const event of MOCK_EVENTS) {
                await saveEvent(event);
                // Tiny delay to ensure order
                await new Promise(r => setTimeout(r, 200));
            }
            // After seeding, reload
            await new Promise(r => setTimeout(r, 2000)); // Wait for Google Sheet to process
            await loadEvents();
        } catch (e) {
            console.error(e);
        } finally {
            setIsSeeding(false);
        }
    }
  };

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

  const handleCreateOrUpdateEvent = async (eventData: Event | Omit<Event, 'id'>) => {
    let updatedEvents = [...events];
    
    if ('id' in eventData) {
        // --- Update existing ---
        const updatedEvent = eventData as Event;
        updatedEvents = events.map(e => e.id === updatedEvent.id ? updatedEvent : e);
        await updateEvent(updatedEvent);
    } else {
        // --- Create new ---
        const newEvent: Event = {
            ...eventData,
            id: Date.now().toString(),
        };
        updatedEvents = [newEvent, ...events];
        await saveEvent(newEvent);
    }

    setEvents(updatedEvents);
    localStorage.setItem('showgo_events', JSON.stringify(updatedEvents));
  };

  const handleDeleteEvent = async () => {
    if (eventToDelete) {
        const id = eventToDelete;
        const updatedEvents = events.filter(e => e.id !== id);
        
        setEvents(updatedEvents);
        localStorage.setItem('showgo_events', JSON.stringify(updatedEvents));
        setEventToDelete(null);

        await apiDeleteEvent(id);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg flex flex-col">
      <Navbar onCreateEvent={openCreateModal} />
      
      <main className="flex-grow">
        <Hero />
        
        {/* Helper Section for Empty Database */}
        {!isLoading && events.length === 0 && (
             <div className="w-full bg-dark-surface/50 border-b border-dark-border py-4">
                <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
                    <p className="text-text-secondary text-sm">Database is empty or failed to load.</p>
                    <Button 
                        variant="secondary" 
                        onClick={handleSeedDatabase} 
                        className="text-xs h-[36px] flex items-center gap-2"
                    >
                        {isSeeding ? (
                            <div className="w-4 h-4 border-2 border-neon-purple border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <Database size={14} />
                        )}
                        {isSeeding ? 'Uploading...' : 'Populate Sheet with Demo Data'}
                    </Button>
                </div>
             </div>
        )}

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neon-purple mb-4"></div>
            <p className="text-text-secondary animate-pulse">Syncing with Google Sheet...</p>
          </div>
        ) : (
          <EventGrid 
              events={events} 
              onViewDetails={setSelectedEvent}
              onEdit={openEditModal}
              onDelete={confirmDelete}
          />
        )}
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
