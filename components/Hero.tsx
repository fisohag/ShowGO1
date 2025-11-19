import React from 'react';
import Button from './Button';

const SoundWave: React.FC = () => {
  // Generate 7 bars with different delays for random effect
  const bars = [0, 1, 2, 3, 4, 5, 6];
  
  return (
    <div className="flex items-center justify-center gap-[8px] h-[120px]">
      {bars.map((i) => (
        <div
          key={i}
          className={`w-[6px] rounded-full animate-sound-wave ${i % 2 === 0 ? 'bg-neon-purple' : 'bg-neon-cyan'}`}
          style={{
            animationDelay: `${i * 0.15}s`,
            height: '20%' // Start height handled by keyframes, but setting base
          }}
        />
      ))}
    </div>
  );
};

const Hero: React.FC = () => {
  return (
    <section className="relative w-full min-h-[650px] flex items-center justify-center overflow-hidden pt-[70px]">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-dark-bg">
        {/* Gradient Orb 1 */}
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-neon-purple/20 rounded-full blur-[120px]" />
        {/* Gradient Orb 2 */}
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-neon-cyan/10 rounded-full blur-[120px]" />
        
        {/* Grid Overlay (Optional Texture) */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* Text Content */}
        <div className="flex-1 text-center lg:text-left space-y-8 max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight tracking-tight animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-cyan">Music Events</span>
          </h1>
          
          <p className="text-lg md:text-xl text-text-secondary max-w-lg mx-auto lg:mx-0 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Join thousands of music lovers finding live performances, underground gigs, and massive festivals near you.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <Button variant="primary">
              Join the Movement
            </Button>
            <Button variant="secondary">
              Browse Events
            </Button>
          </div>
        </div>

        {/* Visual Content / Sound Wave */}
        <div className="flex-1 w-full flex items-center justify-center lg:justify-end animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-dark-card/50 rounded-2xl border border-dark-border backdrop-blur-sm flex items-center justify-center shadow-2xl shadow-neon-purple/10">
                <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/5 to-transparent rounded-2xl" />
                <SoundWave />
                
                {/* Floating decorative badges */}
                <div className="absolute -top-6 -right-6 bg-dark-surface border border-dark-border px-4 py-2 rounded-lg shadow-xl animate-bounce" style={{ animationDuration: '3s' }}>
                    <span className="text-neon-cyan text-sm font-bold">Live Now</span>
                </div>
                 <div className="absolute -bottom-4 -left-4 bg-dark-surface border border-dark-border px-4 py-2 rounded-lg shadow-xl animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                    <span className="text-neon-purple text-sm font-bold">15k+ Events</span>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;