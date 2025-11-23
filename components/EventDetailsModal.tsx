import React from 'react';
import { X, Calendar, MapPin, Clock, Tag } from 'lucide-react';
import { Event } from '../types';
import Button from './Button';

interface EventDetailsModalProps {
  event: Event;
  onClose: () => void;
}

const EventDetailsModal: React.FC<EventDetailsModalProps> = ({ event, onClose }) => {
  if (!event) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity" 
        onClick={onClose}
      />

      <div className="relative w-full max-w-4xl bg-dark-card border border-dark-border rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
        >
          <X size={20} />
        </button>

        {/* Image Side */}
        <div className="w-full md:w-1/2 h-64 md:h-auto relative">
          <img 
            src={event.image} 
            alt={event.eventName} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-transparent to-transparent md:bg-gradient-to-r" />
          
          <div className="absolute bottom-4 left-4 right-4 md:hidden">
             <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-neon-purple text-white mb-2 shadow-lg">
                {event.category}
              </span>
              <h2 className="text-2xl font-bold text-white leading-tight shadow-black drop-shadow-lg">{event.eventName}</h2>
          </div>
        </div>

        {/* Content Side */}
        <div className="w-full md:w-1/2 p-8 overflow-y-auto custom-scrollbar bg-dark-card flex flex-col">
            
          <div className="hidden md:block mb-6">
              <div className="flex justify-between items-start mb-2">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-neon-purple/20 text-neon-purple border border-neon-purple/50">
                    {event.category}
                </span>
                <span className="text-xl font-bold text-neon-cyan">{event.price}</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">{event.eventName}</h2>
          </div>

          <div className="space-y-6 mb-8">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-dark-surface/50 border border-dark-border">
                <Calendar className="w-6 h-6 text-neon-purple flex-shrink-0 mt-1" />
                <div>
                    <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wide">Date</h3>
                    <p className="text-white font-medium">{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-dark-surface/50 border border-dark-border">
                <Clock className="w-6 h-6 text-neon-cyan flex-shrink-0 mt-1" />
                <div>
                    <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wide">Time</h3>
                    <p className="text-white font-medium">{event.time}</p>
                </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-dark-surface/50 border border-dark-border">
                <MapPin className="w-6 h-6 text-pink-500 flex-shrink-0 mt-1" />
                <div>
                    <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wide">Location</h3>
                    <p className="text-white font-medium">{event.venue}</p>
                    <p className="text-text-secondary text-sm">{event.location}</p>
                </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-2">About Event</h3>
            <p className="text-text-secondary leading-relaxed">
                {event.description}
            </p>
          </div>

          <div className="mt-auto pt-6 border-t border-dark-border flex gap-4">
             <Button variant="ghost" onClick={onClose} className="flex-1">
                Close
             </Button>
             <Button className="flex-1 shadow-lg shadow-neon-purple/20">
                Get Tickets
             </Button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EventDetailsModal;