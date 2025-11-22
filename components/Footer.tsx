
import React from 'react';
import { Music } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-surface border-t border-dark-border py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Logo & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <Music className="h-6 w-6 text-neon-purple" />
              <span className="text-xl font-bold text-white">ShowGo</span>
            </div>
            <div className="text-sm text-dark-border">
              &copy; 2024 ShowGo Inc.
            </div>
          </div>

          {/* Developer Credit */}
          <div className="flex flex-col items-center justify-center">
             <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-neon-purple mb-2 shadow-[0_0_15px_rgba(168,85,247,0.3)] group cursor-pointer">
                {/* Placeholder image - replace with your specific URL if needed */}
                <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
                    alt="fisohag2025" 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
             </div>
             <p className="text-xs text-text-secondary font-medium tracking-wide">
                Developed by <span className="text-neon-cyan font-bold">fisohag2025</span>
             </p>
          </div>
          
          {/* Links */}
          <div className="flex gap-8 text-sm text-text-secondary">
            <a href="#" className="hover:text-neon-cyan transition-colors">Privacy</a>
            <a href="#" className="hover:text-neon-cyan transition-colors">Terms</a>
            <a href="#" className="hover:text-neon-cyan transition-colors">Support</a>
          </div>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
