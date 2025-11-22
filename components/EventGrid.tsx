
import React, { useState } from 'react';
import EventCard from './EventCard';
import { MOCK_EVENTS, CATEGORIES } from '../constants';
import { Event } from '../types';

interface EventGridProps {
    onViewDetails?: (event: Event) => void;
}

const EventGrid: React.FC<EventGridProps> = ({ onViewDetails }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredEvents = selectedCategory === "All" 
    ? MOCK_EVENTS 
    : MOCK_EVENTS.filter(e => e.category === selectedCategory);

  return (
    <section id="events" className="py-16 bg-dark-bg relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Upcoming Events</h2>
            <p className="text-text-secondary">Find the best live performances happening near you.</p>
          </div>
          
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-start md:justify-end">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-neon-purple text-white shadow-[0_0_10px_rgba(168,85,247,0.4)]'
                    : 'bg-dark-surface text-text-secondary hover:text-white hover:bg-dark-surface/80 border border-dark-border'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredEvents.map((event, index) => (
              <EventCard 
                key={event.id} 
                event={event} 
                onViewDetails={onViewDetails}
                style={{ 
                    animation: `fadeIn 0.5s ease-out forwards`, 
                    animationDelay: `${index * 0.1}s`,
                    opacity: 0 // Start hidden for animation
                }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-dark-border rounded-xl bg-dark-surface/30">
            <h3 className="text-xl text-white font-semibold mb-2">No events found</h3>
            <p className="text-text-secondary mb-6">Try selecting a different category or check back later.</p>
            <button onClick={() => setSelectedCategory("All")} className="text-neon-cyan hover:underline">
                View all events
            </button>
          </div>
        )}

        {/* Load More (Visual Only) */}
        {filteredEvents.length > 0 && (
             <div className="mt-16 text-center">
                <button className="text-text-secondary hover:text-neon-purple transition-colors text-sm font-medium tracking-wide uppercase border-b border-transparent hover:border-neon-purple pb-1">
                    Discover More Events
                </button>
            </div>
        )}
       
      </div>
    </section>
  );
};

export default EventGrid;
