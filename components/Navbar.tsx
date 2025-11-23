
import React, { useState, useEffect } from 'react';
import { Music, Plus, LogIn, User as UserIcon, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from './Button';

interface NavbarProps {
  onCreateEvent: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onCreateEvent }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, openAuthModal, logout } = useAuth();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToEvents = () => {
    const eventsSection = document.getElementById('events');
    if (eventsSection) {
      eventsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-[70px] ${isScrolled ? 'glass-nav border-b border-dark-border' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          
          {/* Logo */}
          <div 
            className="flex-shrink-0 flex items-center gap-2 cursor-pointer group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <Music className="h-8 w-8 text-neon-purple group-hover:text-neon-cyan transition-colors duration-300" />
            <span className="text-2xl font-bold text-white tracking-tight">
              Show<span className="text-neon-purple group-hover:text-neon-cyan transition-colors duration-300">Go</span>
            </span>
          </div>

          {/* Center Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={scrollToEvents}
              className="text-text-secondary hover:text-neon-purple px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 uppercase tracking-wider"
            >
              Events
            </button>
            <button
              onClick={onCreateEvent}
              className="flex items-center gap-2 text-text-secondary hover:text-neon-cyan px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 uppercase tracking-wider"
            >
              <Plus size={16} />
              Create Event
            </button>
          </div>

          {/* Right Side - Auth */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center gap-3 focus:outline-none"
                >
                  <span className="hidden md:block text-sm text-white font-medium">{user.name}</span>
                  <div className="w-10 h-10 rounded-full border border-neon-purple/50 overflow-hidden">
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  </div>
                </button>

                {/* Dropdown */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-dark-card border border-dark-border rounded-lg shadow-xl py-1 animate-fade-in">
                    <div className="px-4 py-2 border-b border-dark-border/50 md:hidden">
                       <p className="text-white text-sm font-semibold">{user.name}</p>
                       <p className="text-text-secondary text-xs truncate">{user.email}</p>
                    </div>
                    <button 
                      onClick={() => {
                        // Ideally navigate to profile, but for now strictly logout/close
                        setIsProfileMenuOpen(false);
                      }} 
                      className="block w-full text-left px-4 py-2 text-sm text-text-secondary hover:bg-dark-surface hover:text-white transition-colors"
                    >
                      Profile
                    </button>
                    <button 
                      onClick={() => {
                        logout();
                        setIsProfileMenuOpen(false);
                      }} 
                      className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-dark-surface hover:text-red-300 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button 
                    onClick={openAuthModal}
                    className="text-white hover:text-neon-purple text-sm font-medium transition-colors"
                >
                    Sign In
                </button>
                <Button 
                    variant="primary" 
                    onClick={openAuthModal}
                    className="h-[36px] px-4 text-sm"
                >
                    Join Now
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
