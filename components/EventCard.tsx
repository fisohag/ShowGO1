import React from 'react';
import { MapPin, Calendar, Edit2, Trash2 } from 'lucide-react';
import { Event } from '../types';
import Button from './Button';

interface EventCardProps {
  event: Event;
  style?: React.CSSProperties;
  onViewDetails?: (event: Event) => void;
  onEdit?: (event: Event) => void;
  onDelete?: (eventId: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({ 
  event, 
  style, 
  onViewDetails,
  onEdit,
  onDelete
}) => {
  
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
        
        {/* Admin/Creator Actions - Overlay */}
        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {onEdit && (
            <button 
              onClick={(e) => { e.stopPropagation(); onEdit(event); }}
              className="p-2 bg-dark-surface/80 backdrop-blur-sm rounded-full text-white hover:text-neon-cyan hover:bg-dark-surface border border-dark-border transition-all shadow-lg"
              title="Edit Event"
            >
              <Edit2 size={16} />
            </button>
          )}
          {onDelete && (
            <button 
              onClick={(e) => { e.stopPropagation(); onDelete(event.id); }}
              className="p-2 bg-dark-surface/80 backdrop-blur-sm rounded-full text-red-400 hover:text-red-300 hover:bg-dark-surface border border-dark-border transition-all shadow-lg"
              title="Delete Event"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 p-5 flex flex-col min-w-0">
        
        {/* Header info */}
        <div className="space-y-2 mb-3">
            <div className="flex justify-between items-start">
             <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-dark-surface text-neon-purple border border-dark-border">
                {event.category}
            </span>
             <span className="text-white font-bold text-sm">{event.price}</span>
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
                View Details
            </Button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;