
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { MOCK_EVENTS } from '../constants';
import EventCard from './EventCard';
import Button from './Button';
import { LogOut, Heart, MapPin } from 'lucide-react';

const Profile: React.FC = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  const savedEvents = MOCK_EVENTS.filter(event => user.savedEventIds.includes(event.id));

  return (
    <div className="pt-[70px] min-h-screen bg-dark-bg pb-20">
      {/* Profile Header */}
      <div className="relative h-[250px] bg-gradient-to-b from-dark-surface to-dark-bg border-b border-dark-border">
        <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-[-50%] left-[-10%] w-[500px] h-[500px] bg-neon-purple/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-[-50%] right-[-10%] w-[500px] h-[500px] bg-neon-cyan/10 rounded-full blur-[100px]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end pb-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6 w-full">
            <div className="w-24 h-24 rounded-full border-2 border-neon-purple p-1 bg-dark-card shadow-xl">
                <img 
                    src={user.avatar} 
                    alt={user.name}
                    className="w-full h-full rounded-full object-cover"
                />
            </div>
            
            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl font-bold text-white mb-1">{user.name}</h1>
              <p className="text-text-secondary flex items-center justify-center md:justify-start gap-2">
                {user.email}
              </p>
              <div className="flex items-center justify-center md:justify-start gap-4 mt-3">
                <div className="flex items-center gap-1 text-sm text-text-primary">
                    <Heart size={14} className="text-neon-purple" />
                    <span>{user.savedEventIds.length} Saved Events</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-text-primary">
                    <MapPin size={14} className="text-neon-cyan" />
                    <span>New York, USA</span>
                </div>
              </div>
            </div>

            <div className="mb-2">
                <Button variant="secondary" onClick={logout} className="flex items-center gap-2 text-sm h-[40px]">
                    <LogOut size={16} />
                    Sign Out
                </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Saved Events Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Heart className="text-neon-purple fill-neon-purple" />
            Your Saved Events
        </h2>

        {savedEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {savedEvents.map((event, index) => (
              <EventCard 
                key={event.id} 
                event={event} 
                style={{ 
                    animation: `fadeIn 0.5s ease-out forwards`, 
                    animationDelay: `${index * 0.1}s`,
                    opacity: 0 
                }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-dark-border rounded-xl bg-dark-surface/30">
            <Heart className="h-12 w-12 text-dark-border mx-auto mb-4" />
            <h3 className="text-xl text-white font-semibold mb-2">No saved events yet</h3>
            <p className="text-text-secondary mb-6 max-w-md mx-auto">
                Start exploring and save events you're interested in to build your personal calendar.
            </p>
            <a href="#events" className="text-neon-cyan hover:underline">
                Browse Events
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
