import { type ButtonHTMLAttributes, useState, useRef } from 'react';
import { cn } from '~/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline';
}

export const Button = ({ className, variant = 'default', ...props }: ButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <button
      {...props}
      ref={buttonRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative overflow-hidden px-6 py-3 rounded-lg font-medium transition-all",
        variant === 'default' && "bg-cyan-500 text-white hover:bg-cyan-600",
        variant === 'outline' && "border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-50",
        className
      )}
    >
      {isHovered && (
        <>
          <span className="absolute inset-0 ocean-wave-1 z-10" />
          <span className="absolute inset-0 ocean-wave-2 z-10" />
          <span className="absolute inset-0 ocean-wave-3 z-10" />
        </>
      )}
      <span className="relative z-20 transition-transform duration-300 inline-block" 
            style={{ transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}>
        {props.children}
      </span>
    </button>
  );
};
