
import React, { useState, useEffect } from 'react';
import { Menu, X, User as UserIcon, Music, LogOut } from 'lucide-react';
import Button from './Button';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onNavigate: (view: 'home' | 'profile') => void;
  currentView: 'home' | 'profile';
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentView }) => {
  const { user, openAuthModal, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#', action: () => onNavigate('home') },
    { name: 'Browse Events', href: '#events', action: () => onNavigate('home') },
    { name: 'Create Event', href: '#', action: () => {} },
    { name: 'About', href: '#', action: () => {} },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-[70px] ${isScrolled ? 'glass-nav border-b border-dark-border' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          
          {/* Logo */}
          <div 
            className="flex-shrink-0 flex items-center gap-2 cursor-pointer group"
            onClick={() => onNavigate('home')}
          >
            <Music className="h-8 w-8 text-neon-purple group-hover:text-neon-cyan transition-colors duration-300" />
            <span className="text-2xl font-bold text-white tracking-tight">
              Show<span className="text-neon-purple group-hover:text-neon-cyan transition-colors duration-300">Go</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    // If it's an anchor link to a section on home, handle smooth scroll if already on home
                    if (link.href.startsWith('#') && link.href.length > 1) {
                        // Allow default behavior for hash links if on home, else switch home first
                        if (currentView !== 'home') {
                            e.preventDefault();
                            link.action();
                            setTimeout(() => {
                                const el = document.querySelector(link.href);
                                if(el) el.scrollIntoView({behavior: 'smooth'});
                            }, 100);
                        } else {
                            // already on home, let default anchor behavior work
                        }
                    } else {
                         e.preventDefault();
                         link.action();
                    }
                  }}
                  className="text-text-secondary hover:text-neon-purple px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Right Side Icons & CTA */}
          <div className="hidden md:flex items-center gap-6">
            
            {user ? (
              <div className="relative">
                <button 
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="flex items-center gap-3 focus:outline-none"
                >
                    <span className="text-sm font-medium text-white hidden lg:block">{user.name}</span>
                    <div className="h-9 w-9 rounded-full border border-neon-purple p-0.5 overflow-hidden">
                        <img src={user.avatar} alt={user.name} className="h-full w-full rounded-full object-cover" />
                    </div>
                </button>

                {/* Dropdown */}
                {isProfileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-dark-card border border-dark-border rounded-lg shadow-xl py-1 animate-fade-in">
                        <button 
                            onClick={() => {
                                onNavigate('profile');
                                setIsProfileMenuOpen(false);
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-text-secondary hover:bg-dark-surface hover:text-white"
                        >
                            Profile
                        </button>
                        <button 
                            onClick={() => {
                                logout();
                                setIsProfileMenuOpen(false);
                                onNavigate('home');
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-text-secondary hover:bg-dark-surface hover:text-neon-purple"
                        >
                            Sign Out
                        </button>
                    </div>
                )}
              </div>
            ) : (
                <>
                    <button 
                        onClick={openAuthModal}
                        className="text-text-primary hover:text-neon-purple font-medium text-sm transition-colors"
                    >
                        Log In
                    </button>
                    <Button variant="primary" className="h-[36px] text-sm px-4" onClick={openAuthModal}>
                        Sign Up
                    </Button>
                </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-text-primary hover:text-neon-purple p-2"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden absolute top-[70px] left-0 w-full glass-nav border-b border-dark-border transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block text-text-secondary hover:text-neon-purple hover:bg-dark-surface/50 px-3 py-3 rounded-md text-base font-medium transition-colors"
              onClick={(e) => {
                  e.preventDefault();
                  link.action();
                  setIsMobileMenuOpen(false);
              }}
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4 flex flex-col gap-4 border-t border-dark-border mt-4">
            {user ? (
                 <div className="space-y-3 px-3">
                    <div className="flex items-center gap-3" onClick={() => {
                        onNavigate('profile');
                        setIsMobileMenuOpen(false);
                    }}>
                        <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full" />
                        <span className="text-white font-medium">{user.name}</span>
                    </div>
                    <button 
                        onClick={() => {
                            logout();
                            setIsMobileMenuOpen(false);
                            onNavigate('home');
                        }}
                        className="text-text-secondary hover:text-neon-purple flex items-center gap-2 text-sm"
                    >
                        <LogOut size={16} /> Sign Out
                    </button>
                 </div>
            ) : (
                <div className="flex flex-col gap-3 px-3">
                    <button onClick={() => { openAuthModal(); setIsMobileMenuOpen(false); }} className="text-left text-white font-medium">Log In</button>
                    <Button variant="primary" className="justify-center" onClick={() => { openAuthModal(); setIsMobileMenuOpen(false); }}>Sign Up</Button>
                </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
