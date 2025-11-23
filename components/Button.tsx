import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  onClick,
  type
}) => {
  const baseStyles = "px-6 rounded-lg font-semibold transition-all duration-300 transform active:scale-95 flex items-center justify-center";
  
  const variants = {
    primary: "bg-neon-purple text-white hover:bg-neon-purpleHover hover:shadow-[0_0_20px_rgba(168,85,247,0.6)] h-[44px]",
    secondary: "bg-transparent border border-neon-purple text-white hover:bg-neon-purple/10 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] h-[44px]",
    ghost: "text-neon-purple hover:text-white hover:bg-neon-purple/80 border border-neon-purple/50 text-sm py-2 px-4 rounded-md"
  };

  return (
    <button 
      type={type}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;