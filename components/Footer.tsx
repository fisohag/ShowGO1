import React from 'react';
import { Music } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-surface border-t border-dark-border py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Music className="h-6 w-6 text-neon-purple" />
            <span className="text-xl font-bold text-white">ShowGo</span>
          </div>
          
          <div className="flex gap-8 text-sm text-text-secondary">
            <a href="#" className="hover:text-neon-cyan transition-colors">Privacy</a>
            <a href="#" className="hover:text-neon-cyan transition-colors">Terms</a>
            <a href="#" className="hover:text-neon-cyan transition-colors">Support</a>
          </div>
          
          <div className="mt-4 md:mt-0 text-sm text-dark-border">
            &copy; 2024 ShowGo Inc.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;