import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';


interface MagneticButtonProps {
 children: React.ReactNode;
 className?: string;
 onClick?: () => void;
 href?: string;
 target?: string;
 rel?: string;
 strength?: number;
 'aria-label'?: string;
}


export function MagneticButton({
 children,
 className,
 onClick,
 href,
 target,
 rel,
 strength = 0.3,
 'aria-label': ariaLabel
}: MagneticButtonProps) {
 const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
 const [position, setPosition] = useState({ x: 0, y: 0 });


 const handleMouseMove = (e: React.MouseEvent) => {
   if (!ref.current) return;
  
   const rect = ref.current.getBoundingClientRect();
   const centerX = rect.left + rect.width / 2;
   const centerY = rect.top + rect.height / 2;
  
   const distanceX = e.clientX - centerX;
   const distanceY = e.clientY - centerY;
  
   setPosition({
     x: distanceX * strength,
     y: distanceY * strength,
   });
 };


 const handleMouseLeave = () => {
   setPosition({ x: 0, y: 0 });
 };


 const Component = href ? motion.a : motion.button;


 return (
   <Component
     ref={ref as React.RefObject<HTMLButtonElement & HTMLAnchorElement>}
     href={href}
     target={target}
     rel={rel}
     onClick={onClick}
     onMouseMove={handleMouseMove}
     onMouseLeave={handleMouseLeave}
     animate={{ x: position.x, y: position.y }}
     transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
     className={cn(
       'relative inline-flex items-center justify-center overflow-hidden',
       className
     )}
     whileTap={{ scale: 0.95 }}
     aria-label={ariaLabel}
   >
     {/* Glow effect */}
     <motion.div
       className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
       style={{
         background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(59, 130, 246, 0.3), transparent 50%)',
       }}
     />
     <span className="relative z-10">{children}</span>
   </Component>
 );
}
