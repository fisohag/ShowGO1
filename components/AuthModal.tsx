
import React, { useState } from 'react';
import { X, Mail, Lock, User as UserIcon, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from './Button';

const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, login, signup } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [isLoading, setIsLoading] = useState(false);
  
  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (mode === 'login') {
        await login(email);
      } else {
        await signup(name, email);
      }
      // Reset form
      setName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-dark-bg/80 backdrop-blur-sm transition-opacity" 
        onClick={closeAuthModal}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-dark-card border border-dark-border rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
        {/* Header Gradient Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-purple via-neon-cyan to-neon-purple" />
        
        <button 
          onClick={closeAuthModal}
          className="absolute top-4 right-4 text-text-secondary hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">
              {mode === 'login' ? 'Welcome Back' : 'Join ShowGo'}
            </h2>
            <p className="text-text-secondary text-sm">
              {mode === 'login' 
                ? 'Enter your credentials to access your account' 
                : 'Create an account to save events and get recommendations'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div className="space-y-1">
                <label className="text-xs font-medium text-text-secondary uppercase ml-1">Full Name</label>
                <div className="relative group">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-text-secondary group-focus-within:text-neon-purple transition-colors" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-dark-surface border border-dark-border rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple transition-all"
                    placeholder="John Doe"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-medium text-text-secondary uppercase ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-text-secondary group-focus-within:text-neon-purple transition-colors" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-dark-surface border border-dark-border rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple transition-all"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-text-secondary uppercase ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-text-secondary group-focus-within:text-neon-purple transition-colors" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-dark-surface border border-dark-border rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <Button 
              variant="primary" 
              className="w-full mt-6 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  {mode === 'login' ? 'Sign In' : 'Create Account'}
                  <ArrowRight size={18} />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-text-secondary">
              {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
              <button 
                onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                className="text-neon-purple hover:text-neon-cyan font-medium transition-colors"
              >
                {mode === 'login' ? 'Sign Up' : 'Log In'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
