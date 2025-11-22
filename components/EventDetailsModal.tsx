
import React from 'react';
import { X, MapPin, Calendar, Clock, Tag } from 'lucide-react';
import { Event } from '../types';
import Button from './Button';

interface EventDetailsModalProps {
  event: Event;
  onClose: () => void;
}

const EventDetailsModal: React.FC<EventDetailsModalProps> = ({ event, onClose }) => {
  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const dateObj = new Date(event.date);
  const formattedDate = dateObj.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in"
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" />

      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-dark-card border border-dark-border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/40 hover:bg-black/60 rounded-full text-white transition-colors backdrop-blur-md"
        >
          <X size={20} />
        </button>

        {/* Image Header */}
        <div className="h-[250px] w-full relative shrink-0">
          <img 
            src={event.image} 
            alt={event.eventName} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-card to-transparent" />
          
          <div className="absolute bottom-4 left-6">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-neon-purple text-white mb-2 shadow-lg shadow-neon-purple/20">
                {event.category}
            </span>
            <h2 className="text-3xl font-bold text-white text-shadow-lg">{event.eventName}</h2>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-neon-purple mt-0.5" />
                <div>
                  <p className="text-sm text-text-secondary font-medium uppercase tracking-wide">Date</p>
                  <p className="text-white">{formattedDate}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-neon-purple mt-0.5" />
                <div>
                  <p className="text-sm text-text-secondary font-medium uppercase tracking-wide">Time</p>
                  <p className="text-white">{event.time}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                 <Tag className="w-5 h-5 text-neon-purple mt-0.5" />
                 <div>
                    <p className="text-sm text-text-secondary font-medium uppercase tracking-wide">Price</p>
                    <p className="text-white font-semibold">{event.price}</p>
                 </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-neon-cyan mt-0.5" />
                <div>
                  <p className="text-sm text-text-secondary font-medium uppercase tracking-wide">Location</p>
                  <p className="text-white font-semibold">{event.venue}</p>
                  <p className="text-text-secondary">{event.location}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2 mb-8">
            <h3 className="text-lg font-semibold text-white">About Event</h3>
            <p className="text-text-secondary leading-relaxed">
              {event.description}
            </p>
          </div>

          <div className="flex justify-end pt-4 border-t border-dark-border">
            <Button variant="secondary" onClick={onClose} className="w-full sm:w-auto">
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsModal;
