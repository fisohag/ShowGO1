
import React from 'react';
import { MapPin, Calendar } from 'lucide-react';
import { Event } from '../types';
import Button from './Button';

interface EventCardProps {
  event: Event;
  style?: React.CSSProperties;
  onViewDetails?: (event: Event) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, style, onViewDetails }) => {
  
  const formatDate = (dateStr: string, timeStr: string) => {
    const date = new Date(dateStr);
    const formattedDate = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    return { date: formattedDate, time: timeStr };
  };

  const { date, time } = formatDate(event.date, event.time);

  return (
    <div 
      className="group relative flex flex-col bg-dark-card border border-dark-border rounded-xl overflow-hidden hover:border-neon-purple/40 hover:shadow-[0_8px_32px_rgba(168,85,247,0.15)] transition-all duration-300 ease-out hover:-translate-y-1 h-full w-full"
      style={style}
    >
      {/* Image Section */}
      <div className="w-full h-[200px] relative overflow-hidden flex-shrink-0">
        <img 
          src={event.image} 
          alt={event.eventName} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
      </div>

      {/* Content Section */}
      <div className="flex-1 p-5 flex flex-col min-w-0">
        
        {/* Header info */}
        <div className="space-y-2 mb-3">
             <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-dark-surface text-neon-purple border border-dark-border">
                {event.category}
            </span>
         
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

        {/* Description */}
        <p className="text-sm text-text-secondary line-clamp-2 mb-4 leading-relaxed flex-grow">
            {event.description}
        </p>
            
        {/* Action Footer */}
        <div className="pt-4 border-t border-dark-border/30 mt-auto flex items-center justify-end">
            <Button 
                variant="ghost" 
                className="text-xs h-9 px-4 w-full sm:w-auto"
                onClick={() => onViewDetails?.(event)}
            >
                View Events
            </Button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
