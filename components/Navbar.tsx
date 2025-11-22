
import React, { useState, useEffect } from 'react';
import { Music } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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

          {/* Navigation */}
          <div className="flex items-center">
            <button
              onClick={scrollToEvents}
              className="text-text-secondary hover:text-neon-purple px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 uppercase tracking-wider"
            >
              Events
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
