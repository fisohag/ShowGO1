
import React from 'react';
import { MapPin, Calendar, Heart, Ticket } from 'lucide-react';
import { Event } from '../types';
import Button from './Button';
import { useAuth } from '../context/AuthContext';

interface EventCardProps {
  event: Event;
  style?: React.CSSProperties;
}

const EventCard: React.FC<EventCardProps> = ({ event, style }) => {
  const { user, toggleSavedEvent } = useAuth();
  
  const formatDate = (dateStr: string, timeStr: string) => {
    const date = new Date(dateStr);
    const formattedDate = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    return { date: formattedDate, time: timeStr };
  };

  const { date, time } = formatDate(event.date, event.time);

  // Check if saved
  const isSaved = user?.savedEventIds.includes(event.id);

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleSavedEvent(event.id);
  };

  return (
    <div 
      className="group relative flex flex-row bg-dark-card border border-dark-border rounded-xl overflow-hidden hover:border-neon-purple/40 hover:shadow-[0_8px_32px_rgba(168,85,247,0.15)] transition-all duration-300 ease-out hover:-translate-y-1 h-auto sm:h-[220px]"
      style={style}
    >
      {/* Image Section - Left */}
      <div className="w-[120px] sm:w-[160px] flex-shrink-0 relative overflow-hidden">
        <img 
          src={event.image} 
          alt={event.eventName} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
        
        {/* Mobile Save Button (Overlay) */}
        <button 
            onClick={handleSave}
            className={`absolute top-2 left-2 sm:hidden p-1.5 rounded-full backdrop-blur-md border transition-all duration-200 ${isSaved ? 'bg-neon-purple/20 border-neon-purple text-neon-purple' : 'bg-black/30 border-transparent text-white hover:bg-black/50'}`}
        >
            <Heart size={14} className={isSaved ? 'fill-current' : ''} />
        </button>
      </div>

      {/* Content Section - Right */}
      <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
        
        {/* Header info */}
        <div className="space-y-1 relative">
            <div className="flex justify-between items-start">
                 <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-dark-surface text-neon-purple border border-dark-border mb-2">
                    {event.category}
                </span>
                
                {/* Desktop Save Button */}
                <button 
                    onClick={handleSave}
                    className={`hidden sm:flex items-center justify-center p-2 rounded-full transition-all duration-300 ${isSaved ? 'text-neon-purple' : 'text-text-secondary hover:text-neon-purple hover:bg-dark-surface'}`}
                >
                    <Heart size={18} className={isSaved ? 'fill-current' : ''} />
                </button>
            </div>
         
          <h3 className="text-lg font-bold text-white truncate pr-2 group-hover:text-neon-purple transition-colors">
            {event.eventName}
          </h3>
          
          <div className="flex items-center gap-2 text-xs text-text-secondary">
            <Calendar className="w-3 h-3 text-neon-purple" />
            <span>{date} <span className="text-dark-border mx-1">•</span> <span className="text-neon-purple font-semibold">{time}</span></span>
          </div>
          
          <div className="flex items-center gap-2 text-xs text-text-secondary truncate">
            <MapPin className="w-3 h-3 text-gray-500" />
            <span className="truncate">{event.venue}, {event.location}</span>
          </div>
        </div>

        {/* Description & Action */}
        <div className="mt-3 flex-1 flex flex-col justify-end">
            <p className="text-sm text-text-secondary line-clamp-2 mb-3 leading-relaxed hidden sm:block">
                {event.description}
            </p>
            
            <div className="flex items-center justify-between pt-3 border-t border-dark-border/30 mt-1">
                <div className="flex items-center gap-1.5 text-white font-bold">
                    <Ticket size={14} className="text-neon-cyan" />
                    <span>{event.price}</span>
                </div>
                <Button variant="ghost" className="text-xs h-8 px-3 py-0">
                    Get Tickets
                </Button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
