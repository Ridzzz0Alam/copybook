impimport { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { Copy, Check, Play, Code2, Sparkles, MousePointer2, MousePointerClick, Repeat, Loader2 } from 'lucide-react';
import { SpecimenCard } from '../components/specimen-card';
import { SectionHeader } from '../components/section-header';


interface AnimationDemo {
 id: string;
 name: string;
 description: string;
 category: 'Hover' | 'Click' | 'Continuous' | 'Micro-interaction' | 'Loading' | 'Text';
 difficulty: 'Easy' | 'Medium' | 'Advanced';
 component: React.ReactNode;
 code: string;
 dependencies: string[];
}


// Animation Components
const animations = {
 // 1. Apple Button
 AppleButton: () => (
   <motion.button className="relative px-8 py-4 bg-white text-black font-semibold rounded-full overflow-hidden group" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
     <motion.div className="absolute inset-0 bg-gradient-to-r from-[#3B82F6] via-[#E2E8F0] to-[#93C5FD] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
     <span className="relative z-10 flex items-center gap-2"><Sparkles className="w-4 h-4" />Apple Style</span>
   </motion.button>
 ),


 // 2. Linear Spotlight
 LinearSpotlight: () => {
   const ref = useRef<HTMLDivElement>(null);
   const handleMouseMove = (e: React.MouseEvent) => {
     if (!ref.current) return;
     const rect = ref.current.getBoundingClientRect();
     ref.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
     ref.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
   };
   return (
     <motion.div ref={ref} onMouseMove={handleMouseMove} className="relative w-64 h-40 rounded-none bg-gradient-to-br from-[#1a1a2e] to-[#16213e] p-6 overflow-hidden group cursor-pointer" whileHover={{ y: -4 }}>
       <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(59, 130, 246, 0.15), transparent 40%)' }} />
       <div className="relative z-10"><h3 className="text-white font-bold text-lg">Linear Style</h3><p className="text-gray-400 text-sm mt-2">Hover to see spotlight</p></div>
     </motion.div>
   );
 },


 // 3. Stripe Magnetic
 StripeMagnetic: () => {
   const ref = useRef<HTMLButtonElement>(null);
   const [pos, setPos] = useState({ x: 0, y: 0 });
   const handleMouseMove = (e: React.MouseEvent) => {
     if (!ref.current) return;
     const rect = ref.current.getBoundingClientRect();
     setPos({ x: (e.clientX - rect.left - rect.width / 2) * 0.3, y: (e.clientY - rect.top - rect.height / 2) * 0.3 });
   };
   return (
     <motion.button ref={ref} className="px-8 py-4 bg-[#3B82F6] text-black font-bold rounded-lg" onMouseMove={handleMouseMove} onMouseLeave={() => setPos({ x: 0, y: 0 })} animate={{ x: pos.x, y: pos.y }} transition={{ type: "spring", stiffness: 150, damping: 15 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Magnetic</motion.button>
   );
 },


 // 4. Vercel Border
 VercelBorder: () => (
   <motion.div className="relative p-[2px] rounded-none bg-gradient-to-r from-[#E2E8F0] via-[#3B82F6] to-[#E2E8F0]" whileHover={{ scale: 1.02 }}>
     <div className="bg-black rounded-none p-6"><h3 className="text-white font-bold">Vercel Style</h3><p className="text-gray-400 text-sm mt-2">Animated border</p></div>
   </motion.div>
 ),


 // 5. Airbnb Heart
 AirbnbHeart: () => {
   const [liked, setLiked] = useState(false);
   return (
     <motion.button className="relative w-12 h-12 flex items-center justify-center" onClick={() => setLiked(!liked)} whileTap={{ scale: 0.9 }}>
       <motion.svg viewBox="0 0 24 24" className="w-8 h-8" fill={liked ? '#FF385C' : 'none'} stroke={liked ? '#FF385C' : 'currentColor'} strokeWidth="2">
         <motion.path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" animate={liked ? { scale: [1, 1.3, 1] } : {}} />
       </motion.svg>
       <AnimatePresence>{liked && <motion.div className="absolute inset-0 rounded-full border-2 border-[#FF385C]" initial={{ scale: 0.5, opacity: 1 }} animate={{ scale: 2, opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} />}</AnimatePresence>
     </motion.button>
   );
 },


 // 6. Skeleton Shimmer
 SkeletonShimmer: () => (
   <div className="w-64 space-y-3">
     {[1, 2, 3].map((i) => (
       <div key={i} className="h-4 bg-gray-800 rounded relative overflow-hidden" style={{ width: i === 3 ? '100%' : `${100 - i * 20}%` }}>
         <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#E2E8F0]/30 to-transparent" animate={{ x: ['-100%', '100%'] }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear", delay: i * 0.2 }} />
       </div>
     ))}
   </div>
 ),


 // 7. Switch Toggle
 SwitchToggle: () => {
   const [isOn, setIsOn] = useState(false);
   return (
     <motion.button className={`w-14 h-8 rounded-full p-1 ${isOn ? 'bg-[#3B82F6]' : 'bg-gray-600'}`} onClick={() => setIsOn(!isOn)}>
       <motion.div className="w-6 h-6 bg-white rounded-full shadow-md" animate={{ x: isOn ? 24 : 0 }} transition={{ type: "spring", stiffness: 500, damping: 30 }} />
     </motion.button>
   );
 },


 // 8. Notification Badge
 NotificationBadge: () => {
   const [count, setCount] = useState(3);
   return (
     <motion.button className="relative p-3 bg-gray-800 rounded-full text-2xl" onClick={() => setCount(0)} whileTap={{ scale: 0.95 }}>🔔
       <AnimatePresence>{count > 0 && <motion.span className="absolute -top-1 -right-1 bg-[#3B82F6] text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>{count}</motion.span>}</AnimatePresence>
     </motion.button>
   );
 },


 // 9. Progress Bar
 ProgressBar: () => {
   const [progress, setProgress] = useState(0);
   return (
     <div className="w-64">
       <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
         <motion.div className="h-full bg-gradient-to-r from-[#3B82F6] to-[#E2E8F0]" animate={{ width: `${progress}%` }} transition={{ type: "spring", stiffness: 50 }} />
       </div>
       <motion.button className="mt-4 px-4 py-2 bg-[#3B82F6] text-black rounded-lg text-sm" onClick={() => setProgress(Math.min(100, progress + 20))} whileTap={{ scale: 0.95 }}>Add Progress</motion.button>
     </div>
   );
 },


 // 10. Morphing Shape
 MorphingShape: () => (
   <motion.div className="w-32 h-32 bg-gradient-to-br from-[#3B82F6] to-[#E2E8F0]" animate={{ borderRadius: ['20%', '50%', '20%'], rotate: [0, 180, 360], scale: [1, 1.1, 1] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
 ),


 // 11. Floating Label
 FloatingLabel: () => {
   const [focused, setFocused] = useState(false);
   const [value, setValue] = useState('');
   return (
     <div className="relative w-64">
       <motion.label className="absolute left-3 text-gray-400 pointer-events-none" animate={{ y: focused || value ? -24 : 12, scale: focused || value ? 0.85 : 1, color: focused ? '#3B82F6' : '#9CA3AF' }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>Email Address</motion.label>
       <input type="text" value={value} onChange={(e) => setValue(e.target.value)} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} className="w-full px-3 py-3 bg-gray-800 border-2 border-gray-700 rounded-lg focus:border-[#3B82F6] focus:outline-none transition-colors" />
     </div>
   );
 },


 // 12. Card Stack
 CardStack: () => {
   const cards = [{ color: 'bg-[#3B82F6]', text: '1' }, { color: 'bg-[#E2E8F0]', text: '2' }, { color: 'bg-[#93C5FD]', text: '3' }];
   return (
     <div className="relative w-48 h-32">
       {cards.map((card, i) => (
         <motion.div key={i} className={`absolute w-full h-full ${card.color} rounded-none flex items-center justify-center text-black font-bold shadow-lg`} style={{ zIndex: cards.length - i }} initial={{ y: i * 10, x: i * 10 }} whileHover={{ y: i * 10 - 20, rotate: (i - 1) * 5 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>{card.text}</motion.div>
       ))}
     </div>
   );
 },


 // 13. Bounce Button
 BounceButton: () => (
   <motion.button className="px-8 py-4 bg-[#3B82F6] text-black font-bold rounded-none" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>Bounce</motion.button>
 ),


 // 14. Shake Error
 ShakeError: () => {
   const [shake, setShake] = useState(false);
   return (
     <motion.button className="px-8 py-4 bg-red-500 text-white font-bold rounded-none" onClick={() => { setShake(true); setTimeout(() => setShake(false), 500); }} animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}} transition={{ duration: 0.4 }}>Shake on Error</motion.button>
   );
 },


 // 15. Pulse Ring
 PulseRing: () => (
   <div className="relative flex items-center justify-center w-20 h-20">
     <div className="w-4 h-4 bg-[#3B82F6] rounded-full" />
     <motion.div className="absolute inset-0 rounded-full border-2 border-[#3B82F6]" animate={{ scale: [1, 2], opacity: [1, 0] }} transition={{ duration: 1.5, repeat: Infinity }} />
   </div>
 ),


 // 16. Flip Card
 FlipCard: () => {
   const [flipped, setFlipped] = useState(false);
   return (
     <div className="relative w-32 h-40 cursor-pointer" style={{ perspective: '1000px' }} onClick={() => setFlipped(!flipped)}>
       <motion.div className="w-full h-full relative" style={{ transformStyle: 'preserve-3d' }} animate={{ rotateY: flipped ? 180 : 0 }} transition={{ duration: 0.6 }}>
         <div className="absolute inset-0 bg-[#3B82F6] rounded-none flex items-center justify-center text-black font-bold backface-hidden" style={{ backfaceVisibility: 'hidden' }}>Front</div>
         <div className="absolute inset-0 bg-[#E2E8F0] rounded-none flex items-center justify-center text-black font-bold" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>Back</div>
       </motion.div>
     </div>
   );
 },


 // 17. Hamburger Menu
 HamburgerMenu: () => {
   const [isOpen, setIsOpen] = useState(false);
   return (
     <button className="w-10 h-10 flex flex-col items-center justify-center gap-1.5" onClick={() => setIsOpen(!isOpen)}>
       <motion.span className="w-6 h-0.5 bg-white block" animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 8 : 0 }} />
       <motion.span className="w-6 h-0.5 bg-white block" animate={{ opacity: isOpen ? 0 : 1 }} />
       <motion.span className="w-6 h-0.5 bg-white block" animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -8 : 0 }} />
     </button>
   );
 },


 // 18. Dots Loading
 DotsLoading: () => (
   <div className="flex gap-2">
     {[0, 1, 2].map((i) => (
       <motion.div key={i} className="w-3 h-3 bg-[#3B82F6] rounded-full" animate={{ y: [0, -10, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }} />
     ))}
   </div>
 ),


 // 19. Circle Loading
 CircleLoading: () => (
   <motion.div className="w-12 h-12 border-4 border-gray-800 border-t-[#3B82F6] rounded-full" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
 ),


 // 20. Typewriter
 Typewriter: () => {
   const text = "Hello World";
   return (
     <div className="text-2xl font-bold">
       {text.split('').map((char, i) => (
         <motion.span key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 }}>{char}</motion.span>
       ))}
       <motion.span className="inline-block w-0.5 h-6 bg-[#3B82F6] ml-1" animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }} />
     </div>
   );
 },


 // 21. Scroll Indicator
 ScrollIndicator: () => (
   <motion.div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2" animate={{ y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
     <motion.div className="w-1 h-2 bg-[#3B82F6] rounded-full" animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
   </motion.div>
 ),


 // 22. Glitch Text
 GlitchText: () => (
   <motion.h2 className="text-3xl font-bold text-white relative" whileHover={{ x: [0, -2, 2, -2, 2, 0] }} transition={{ duration: 0.3 }}>GLITCH</motion.h2>
 ),


 // 23. Social Share
 SocialShare: () => {
   const [open, setOpen] = useState(false);
   const icons = ['X', 'f', 'in'];
   return (
     <div className="relative">
       <motion.button className="w-12 h-12 bg-[#3B82F6] rounded-full flex items-center justify-center text-black" onClick={() => setOpen(!open)} whileTap={{ scale: 0.9 }}>+</motion.button>
       {icons.map((icon, i) => (
         <motion.button key={i} className="absolute w-10 h-10 bg-[#E2E8F0] rounded-full flex items-center justify-center text-sm font-bold text-black" initial={{ scale: 0, x: 0, y: 0 }} animate={{ scale: open ? 1 : 0, x: open ? (i - 1) * 50 : 0, y: open ? -60 : 0 }} transition={{ delay: i * 0.1 }}>{icon}</motion.button>
       ))}
     </div>
   );
 },


 // 24. Accordion
 Accordion: () => {
   const [open, setOpen] = useState(false);
   return (
     <div className="w-64 border border-[#E2E8F0]/30 rounded-lg overflow-hidden">
       <button className="w-full p-4 bg-[#3B82F6]/10 flex justify-between items-center" onClick={() => setOpen(!open)}>
         <span>Click to Expand</span>
         <motion.span animate={{ rotate: open ? 180 : 0 }} className="text-[#3B82F6]">▼</motion.span>
       </button>
       <AnimatePresence>
         {open && (
           <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
             <div className="p-4 text-sm text-muted-foreground">This is the expandable content area with smooth animation.</div>
           </motion.div>
         )}
       </AnimatePresence>
     </div>
   );
 },


 // 25. Image Reveal
 ImageReveal: () => (
   <motion.div className="w-32 h-32 bg-gradient-to-br from-[#3B82F6] to-[#E2E8F0] rounded-none overflow-hidden relative" whileHover="hover">
     <motion.div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-bold" variants={{ hover: { opacity: 0 } }} initial={{ opacity: 1 }}>Hover Me</motion.div>
   </motion.div>
 ),


 // 26. Gradient Text
 GradientText: () => (
   <motion.h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#3B82F6] via-[#E2E8F0] to-[#93C5FD]" animate={{ backgroundPosition: ['0%', '100%', '0%'] }} transition={{ duration: 3, repeat: Infinity }} style={{ backgroundSize: '200% 100%' }}>Gradient</motion.h2>
 ),


 // 27. Tooltip
 Tooltip: () => {
   const [show, setShow] = useState(false);
   return (
     <div className="relative">
       <button className="px-4 py-2 bg-[#3B82F6]/10 rounded-lg text-[#3B82F6]" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>Hover Me</button>
       <AnimatePresence>
         {show && <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-[#3B82F6] text-black text-xs rounded whitespace-nowrap">Tooltip!</motion.div>}
       </AnimatePresence>
     </div>
   );
 },


 // 28. Checkbox
 Checkbox: () => {
   const [checked, setChecked] = useState(false);
   return (
     <motion.button className="w-6 h-6 border-2 border-gray-600 rounded flex items-center justify-center" onClick={() => setChecked(!checked)} animate={{ backgroundColor: checked ? '#3B82F6' : 'transparent', borderColor: checked ? '#3B82F6' : '#4B5563' }}>
       <motion.svg viewBox="0 0 24 24" className="w-4 h-4 text-black" initial={{ scale: 0 }} animate={{ scale: checked ? 1 : 0 }}><path fill="none" stroke="currentColor" strokeWidth="3" d="M5 13l4 4L19 7" /></motion.svg>
     </motion.button>
   );
 },


 // 29. Radio Button
 RadioButton: () => {
   const [selected, setSelected] = useState(0);
   return (
     <div className="flex gap-4">
       {[0, 1, 2].map((i) => (
         <motion.button key={i} className="w-6 h-6 rounded-full border-2 border-gray-600 flex items-center justify-center" onClick={() => setSelected(i)} animate={{ borderColor: selected === i ? '#3B82F6' : '#4B5563' }}>
           <motion.div className="w-3 h-3 bg-[#3B82F6] rounded-full" initial={{ scale: 0 }} animate={{ scale: selected === i ? 1 : 0 }} />
         </motion.button>
       ))}
     </div>
   );
 },


 // 30. Range Slider
 RangeSlider: () => {
   const [value, setValue] = useState(50);
   return (
     <div className="w-48">
       <input type="range" min="0" max="100" value={value} onChange={(e) => setValue(Number(e.target.value))} className="w-full accent-[#3B82F6]" />
       <motion.div className="h-2 bg-[#3B82F6] rounded-full mt-2" animate={{ width: `${value}%` }} />
     </div>
   );
 },


 // 31. Star Rating
 StarRating: () => {
   const [rating, setRating] = useState(0);
   return (
     <div className="flex gap-1">
       {[1, 2, 3, 4, 5].map((i) => (
         <motion.button key={i} onClick={() => setRating(i)} whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.2 }} className="text-2xl text-[#3B82F6]">{i <= rating ? '★' : '☆'}</motion.button>
       ))}
     </div>
   );
 },


 // 32. Drag Card
 DragCard: () => (
   <motion.div className="w-24 h-24 bg-[#3B82F6] rounded-none cursor-grab active:cursor-grabbing flex items-center justify-center text-black font-bold" drag dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }} dragElastic={0.2} whileDrag={{ scale: 1.1 }}>Drag</motion.div>
 ),


 // 33. Reorder List
 ReorderList: () => {
   const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3']);
   return (
     <div className="space-y-2">
       {items.map((item, i) => (
         <motion.div key={item} className="p-3 bg-[#3B82F6]/10 border border-[#3B82F6]/30 rounded-lg cursor-move text-[#3B82F6]" layoutId={item} drag="y" dragConstraints={{ top: 0, bottom: 0 }} onDragEnd={(_, info) => { if (info.offset.y > 50) { const newItems = [...items]; const temp = newItems[i]; newItems[i] = newItems[(i + 1) % items.length]; newItems[(i + 1) % items.length] = temp; setItems(newItems); } }}>{item}</motion.div>
       ))}
     </div>
   );
 },


 // 34. Count Up
 CountUp: () => {
   const [count, setCount] = useState(0);
   return (
     <div className="text-center">
       <motion.div className="text-5xl font-bold text-[#3B82F6]" key={count} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>{count}</motion.div>
       <button className="mt-4 px-4 py-2 bg-[#3B82F6]/10 border border-[#3B82F6]/30 rounded-lg text-sm text-[#3B82F6]" onClick={() => setCount(count + 1)}>Increment</button>
     </div>
   );
 },


 // 35. Confetti
 Confetti: () => {
   const [explode, setExplode] = useState(false);
   return (
     <div className="relative">
       <button className="px-6 py-3 bg-[#3B82F6] text-black rounded-lg font-bold" onClick={() => { setExplode(true); setTimeout(() => setExplode(false), 1000); }}>Celebrate!</button>
       <AnimatePresence>
         {explode && [0, 1, 2, 3, 4, 5].map((i) => (
           <motion.div key={i} className="absolute w-3 h-3 rounded-sm" style={{ backgroundColor: ['#3B82F6', '#E2E8F0', '#93C5FD', '#FFA500', '#FF8C00', '#DAA520'][i], left: '50%', top: '50%' }} initial={{ scale: 0, x: '-50%', y: '-50%' }} animate={{ scale: [0, 1, 0], x: `${Math.cos(i * Math.PI / 3) * 100}px`, y: `${Math.sin(i * Math.PI / 3) * 100}px` }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} />
         ))}
       </AnimatePresence>
     </div>
   );
 },


 // 36. Breathing
 Breathing: () => (
   <motion.div className="w-20 h-20 bg-[#3B82F6] rounded-full" animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
 ),


 // 37. Wave
 Wave: () => (
   <div className="flex gap-1 h-16 items-end">
     {[0, 1, 2, 3, 4].map((i) => (
       <motion.div key={i} className="w-3 bg-[#3B82F6] rounded-full" animate={{ height: [20, 60, 20] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }} />
     ))}
   </div>
 ),


 // 38. Orbit
 Orbit: () => (
   <div className="relative w-24 h-24">
     <div className="absolute inset-0 border-2 border-[#E2E8F0]/30 rounded-full" />
     <motion.div className="absolute w-4 h-4 bg-[#3B82F6] rounded-full" style={{ top: '50%', left: '50%', marginLeft: '-8px', marginTop: '-8px' }} animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>
       <div className="w-4 h-4 bg-[#3B82F6] rounded-full" style={{ transform: 'translateX(40px)' }} />
     </motion.div>
   </div>
 ),


 // 39. Liquid Button
 LiquidButton: () => (
   <motion.button className="relative px-8 py-4 bg-[#3B82F6] text-black font-bold rounded-none overflow-hidden" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
     <motion.div className="absolute inset-0 bg-white/30" initial={{ x: '-100%' }} whileHover={{ x: '100%' }} transition={{ duration: 0.5 }} />
     <span className="relative z-10">Liquid Fill</span>
   </motion.button>
 ),


 // 40. Underline Link
 UnderlineLink: () => (
   <motion.a href="#" className="relative text-lg font-medium text-[#3B82F6]" whileHover="hover">
     Hover for underline
     <motion.span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#3B82F6]" initial={{ scaleX: 0 }} variants={{ hover: { scaleX: 1 } }} transition={{ duration: 0.3 }} style={{ originX: 0 }} />
   </motion.a>
 ),


 // 41. Spotlight Button
 SpotlightButton: () => {
   const ref = useRef<HTMLButtonElement>(null);
   const [pos, setPos] = useState({ x: 0, y: 0 });
   return (
     <motion.button ref={ref} className="relative px-8 py-4 bg-[#3B82F6]/10 border border-[#3B82F6]/30 text-[#3B82F6] font-bold rounded-none overflow-hidden" onMouseMove={(e) => { if (!ref.current) return; const rect = ref.current.getBoundingClientRect(); setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top }); }}>
       <motion.div className="absolute w-20 h-20 bg-[#3B82F6]/30 rounded-full blur-xl" animate={{ x: pos.x - 40, y: pos.y - 40 }} transition={{ type: "spring", damping: 30 }} />
       <span className="relative z-10">Spotlight</span>
     </motion.button>
   );
 },


 // 42. Neon Text
 NeonText: () => (
   <motion.h2 className="text-4xl font-bold text-[#3B82F6]" style={{ textShadow: '0 0 10px #3B82F6, 0 0 20px #3B82F6, 0 0 30px #3B82F6' }} animate={{ textShadow: ['0 0 10px #3B82F6, 0 0 20px #3B82F6', '0 0 20px #3B82F6, 0 0 40px #3B82F6', '0 0 10px #3B82F6, 0 0 20px #3B82F6'] }} transition={{ duration: 1.5, repeat: Infinity }}>NEON</motion.h2>
 ),


 // 43. Fade Carousel
 FadeCarousel: () => {
   const [index, setIndex] = useState(0);
   const colors = ['bg-[#3B82F6]', 'bg-[#E2E8F0]', 'bg-[#93C5FD]'];
   return (
     <div className="relative w-32 h-32">
       <AnimatePresence mode="wait">
         <motion.div key={index} className={`absolute inset-0 ${colors[index]} rounded-none flex items-center justify-center text-black font-bold`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>{index + 1}</motion.div>
       </AnimatePresence>
       <button className="absolute -right-8 top-1/2 -translate-y-1/2 text-[#3B82F6]" onClick={() => setIndex((index + 1) % colors.length)}>→</button>
     </div>
   );
 },


 // 44. Slide Carousel
 SlideCarousel: () => {
   const [index, setIndex] = useState(0);
   const colors = ['bg-[#3B82F6]', 'bg-[#E2E8F0]', 'bg-[#93C5FD]'];
   return (
     <div className="relative w-32 h-32 overflow-hidden rounded-none">
       <motion.div className="flex" animate={{ x: -index * 128 }} transition={{ type: "spring", stiffness: 300, damping: 30 }}>
         {colors.map((color, i) => (
           <div key={i} className={`w-32 h-32 ${color} flex-shrink-0 flex items-center justify-center text-black font-bold`}>{i + 1}</div>
         ))}
       </motion.div>
       <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-[#3B82F6] w-6 h-6 rounded-full" onClick={() => setIndex((index + 1) % colors.length)}>→</button>
     </div>
   );
 },


 // 45. Zoom Image
 ZoomImage: () => (
   <motion.div className="w-32 h-32 bg-gradient-to-br from-[#3B82F6] to-[#E2E8F0] rounded-none overflow-hidden" whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
     <div className="w-full h-full flex items-center justify-center text-black font-bold">Hover to Zoom</div>
   </motion.div>
 ),


 // 46. Rotate Icon
 RotateIcon: () => (
   <motion.div className="w-12 h-12 bg-[#3B82F6] rounded-lg flex items-center justify-center text-black" animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>↻</motion.div>
 ),


 // 47. Blur Reveal
 BlurReveal: () => (
   <motion.div className="w-32 h-20 bg-[#3B82F6] rounded-none flex items-center justify-center text-black font-bold" initial={{ filter: 'blur(10px)', opacity: 0 }} whileInView={{ filter: 'blur(0px)', opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>Blur Reveal</motion.div>
 ),


 // 48. Parallax Text
 ParallaxText: () => (
   <motion.div className="text-[#3B82F6]" animate={{ y: [0, -20, 0] }} transition={{ duration: 2, repeat: Infinity }}>Parallax</motion.div>
 ),


 // 49. Stagger Grid
 StaggerGrid: () => (
   <div className="grid grid-cols-3 gap-2">
     {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
       <motion.div key={i} className="w-10 h-10 bg-[#3B82F6] rounded" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: i * 0.05 }} viewport={{ once: true }} />
     ))}
   </div>
 ),


 // 50. Color Transition
 ColorTransition: () => (
   <motion.div className="w-24 h-24 rounded-none" animate={{ backgroundColor: ['#3B82F6', '#E2E8F0', '#93C5FD', '#3B82F6'] }} transition={{ duration: 4, repeat: Infinity }} />
 ),


 // 51. Path Drawing
 PathDrawing: () => (
   <motion.svg viewBox="0 0 100 100" className="w-24 h-24">
     <motion.circle cx="50" cy="50" r="40" fill="none" stroke="#3B82F6" strokeWidth="4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, repeat: Infinity }} />
   </motion.svg>
 ),


 // 52. Perspective Card
 PerspectiveCard: () => (
   <motion.div className="w-32 h-40 bg-[#3B82F6] rounded-none" style={{ perspective: '1000px', rotateY: 0 }} whileHover={{ rotateY: 15, rotateX: -10 }} transition={{ type: "spring", stiffness: 300 }} />
 ),


 // 53. Elastic Snap
 ElasticSnap: () => (
   <motion.button className="px-6 py-3 bg-[#3B82F6] text-black rounded-lg font-bold" drag dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} dragElastic={1} onDragEnd={(_, info) => { if (Math.abs(info.offset.x) > 100) { /* snap action */ } }}>Drag & Snap</motion.button>
 ),


 // 54. Text Reveal
 TextReveal: () => {
   const text = "Hello";
   return (
     <div className="text-3xl font-bold flex text-[#3B82F6]">
       {text.split('').map((char, i) => (
         <motion.span key={i} initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}>{char}</motion.span>
       ))}
     </div>
   );
 },


 // 55. Mask Reveal
 MaskReveal: () => (
   <div className="relative w-32 h-32 rounded-none overflow-hidden">
     <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6] to-[#E2E8F0]" />
     <motion.div className="absolute inset-0 bg-black" initial={{ x: 0 }} whileHover={{ x: '100%' }} transition={{ duration: 0.5 }} />
   </div>
 ),


 // 56. Glow Card
 GlowCard: () => (
   <motion.div className="relative w-32 h-40 bg-[#3B82F6]/10 border border-[#3B82F6]/30 rounded-none p-4" whileHover={{ boxShadow: '0 0 30px rgba(59, 130, 246, 0.5)' }} transition={{ duration: 0.3 }}>
     <span className="text-[#3B82F6] font-bold">Hover for Glow</span>
   </motion.div>
 ),


 // 57. Focus Mode
 FocusMode: () => {
   const [focused, setFocused] = useState(false);
   return (
     <div className="relative">
       <input type="text" placeholder="Focus me" className="px-4 py-2 bg-[#3B82F6]/10 rounded-lg border-2 border-transparent focus:border-[#3B82F6] outline-none transition-all text-[#3B82F6] placeholder-[#3B82F6]/50" onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
       {focused && <motion.div className="fixed inset-0 bg-black/50 -z-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setFocused(false)} />}
     </div>
   );
 },


 // 58. Cursor Follow
 CursorFollow: () => {
   const [pos, setPos] = useState({ x: 0, y: 0 });
   return (
     <div className="relative w-48 h-32 bg-[#3B82F6]/10 border border-[#3B82F6]/30 rounded-none overflow-hidden" onMouseMove={(e) => { const rect = e.currentTarget.getBoundingClientRect(); setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top }); }}>
       <motion.div className="absolute w-8 h-8 bg-[#3B82F6]/50 rounded-full blur-md" animate={{ x: pos.x - 16, y: pos.y - 16 }} transition={{ type: "spring", damping: 30 }} />
     </div>
   );
 },


 // 59. Magnetic Text
 MagneticText: () => {
   const ref = useRef<HTMLSpanElement>(null);
   const [pos, setPos] = useState({ x: 0, y: 0 });
   return (
     <motion.span ref={ref} className="text-2xl font-bold cursor-pointer inline-block text-[#3B82F6]" onMouseMove={(e) => { if (!ref.current) return; const rect = ref.current.getBoundingClientRect(); setPos({ x: (e.clientX - rect.left - rect.width / 2) * 0.2, y: (e.clientY - rect.top - rect.height / 2) * 0.2 }); }} onMouseLeave={() => setPos({ x: 0, y: 0 })} animate={{ x: pos.x, y: pos.y }} transition={{ type: "spring", stiffness: 150 }}>Magnetic</motion.span>
   );
 },


 // 60. Scroll Progress
 ScrollProgress: () => (
   <div className="w-full max-w-xs">
     <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
       <motion.div className="h-full bg-[#3B82F6]" initial={{ width: '0%' }} whileInView={{ width: '100%' }} transition={{ duration: 1.5 }} viewport={{ once: true }} />
     </div>
   </div>
 ),
};


// Animation Data
const animationDemos: AnimationDemo[] = [
 { id: '1', name: 'Apple Button', description: 'Gradient reveal on hover', category: 'Hover', difficulty: 'Easy', component: <animations.AppleButton />, dependencies: ['framer-motion'], code: `<motion.button className="relative px-8 py-4 bg-white text-black font-semibold rounded-full overflow-hidden group" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>\n  <motion.div className="absolute inset-0 bg-gradient-to-r from-[#3B82F6] via-[#E2E8F0] to-[#93C5FD] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />\n  <span className="relative z-10">Button</span>\n</motion.button>` },
 { id: '2', name: 'Linear Spotlight', description: 'Mouse-following spotlight', category: 'Hover', difficulty: 'Advanced', component: <animations.LinearSpotlight />, dependencies: ['framer-motion'], code: `const handleMouseMove = (e) => {\n  const rect = e.currentTarget.getBoundingClientRect();\n  e.currentTarget.style.setProperty('--mouse-x', e.clientX - rect.left);\n};\n\n<motion.div onMouseMove={handleMouseMove} className="relative group">\n  <div className="absolute inset-0 opacity-0 group-hover:opacity-100"\n    style={{ background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(59, 130, 246, 0.15), transparent 40%)' }} />\n</motion.div>` },
 { id: '3', name: 'Stripe Magnetic', description: 'Cursor-following physics', category: 'Hover', difficulty: 'Medium', component: <animations.StripeMagnetic />, dependencies: ['framer-motion'], code: `const [pos, setPos] = useState({ x: 0, y: 0 });\n\nconst handleMouseMove = (e) => {\n  const rect = e.currentTarget.getBoundingClientRect();\n  setPos({\n    x: (e.clientX - rect.left - rect.width / 2) * 0.3,\n    y: (e.clientY - rect.top - rect.height / 2) * 0.3\n  });\n};\n\n<motion.button\n  onMouseMove={handleMouseMove}\n  onMouseLeave={() => setPos({ x: 0, y: 0 })}\n  animate={{ x: pos.x, y: pos.y }}\n  transition={{ type: "spring", stiffness: 150 }}\n>\n  Magnetic\n</motion.button>` },
 { id: '4', name: 'Vercel Border', description: 'Animated gradient border', category: 'Hover', difficulty: 'Easy', component: <animations.VercelBorder />, dependencies: ['framer-motion'], code: `<motion.div className="relative p-[2px] rounded-none bg-gradient-to-r from-[#E2E8F0] via-[#3B82F6] to-[#E2E8F0]" whileHover={{ scale: 1.02 }}>\n  <div className="bg-black rounded-none p-6">Content</div>\n</motion.div>` },
 { id: '5', name: 'Airbnb Heart', description: 'Click ripple effect', category: 'Click', difficulty: 'Medium', component: <animations.AirbnbHeart />, dependencies: ['framer-motion'], code: `const [liked, setLiked] = useState(false);\n\n<motion.button onClick={() => setLiked(!liked)} whileTap={{ scale: 0.9 }}>\n  <motion.svg animate={liked ? { scale: [1, 1.3, 1] } : {}}>\n    <path d="M12 21.35l-1.45-1.32C5.4 15.36..." />\n  </motion.svg>\n  <AnimatePresence>\n    {liked && (\n      <motion.div\n        initial={{ scale: 0.5, opacity: 1 }}\n        animate={{ scale: 2, opacity: 0 }}\n        exit={{ opacity: 0 }}\n      />\n    )}\n  </AnimatePresence>\n</motion.button>` },
 { id: '6', name: 'Skeleton Loading', description: 'Shimmer loading effect', category: 'Loading', difficulty: 'Easy', component: <animations.SkeletonShimmer />, dependencies: ['framer-motion'], code: `<div className="h-4 bg-gray-800 rounded relative overflow-hidden">\n  <motion.div\n    className="absolute inset-0 bg-gradient-to-r from-transparent via-[#E2E8F0]/30 to-transparent"\n    animate={{ x: ['-100%', '100%'] }}\n    transition={{ repeat: Infinity, duration: 1.5 }}\n  />\n</div>` },
 { id: '7', name: 'Switch Toggle', description: 'iOS-style switch', category: 'Click', difficulty: 'Easy', component: <animations.SwitchToggle />, dependencies: ['framer-motion'], code: `const [isOn, setIsOn] = useState(false);\n\n<motion.button\n  className={\`w-14 h-8 rounded-full p-1 \${isOn ? 'bg-[#3B82F6]' : 'bg-gray-600'}\`}\n  onClick={() => setIsOn(!isOn)}\n>\n  <motion.div\n    className="w-6 h-6 bg-white rounded-full"\n    animate={{ x: isOn ? 24 : 0 }}\n    transition={{ type: "spring", stiffness: 500 }}\n  />\n</motion.button>` },
 { id: '8', name: 'Notification Badge', description: 'Badge entrance animation', category: 'Micro-interaction', difficulty: 'Easy', component: <animations.NotificationBadge />, dependencies: ['framer-motion'], code: `<motion.button>\n  🔔\n  <AnimatePresence>\n    {count > 0 && (\n      <motion.span\n        initial={{ scale: 0 }}\n        animate={{ scale: 1 }}\n        exit={{ scale: 0 }}\n        className="absolute -top-1 -right-1 bg-[#3B82F6] rounded-full"\n      >\n        {count}\n      </motion.span>\n    )}\n  </AnimatePresence>\n</motion.button>` },
 { id: '9', name: 'Progress Bar', description: 'Spring physics progress', category: 'Continuous', difficulty: 'Easy', component: <animations.ProgressBar />, dependencies: ['framer-motion'], code: `<div className="h-2 bg-gray-800 rounded-full overflow-hidden">\n  <motion.div\n    className="h-full bg-gradient-to-r from-[#3B82F6] to-[#E2E8F0]"\n    animate={{ width: \`\${progress}%\` }}\n    transition={{ type: "spring", stiffness: 50 }}\n  />\n</div>` },
 { id: '10', name: 'Morphing Shape', description: 'Organic shape morph', category: 'Continuous', difficulty: 'Easy', component: <animations.MorphingShape />, dependencies: ['framer-motion'], code: `<motion.div\n  animate={{\n    borderRadius: ['20%', '50%', '20%'],\n    rotate: [0, 180, 360],\n    scale: [1, 1.1, 1]\n  }}\n  transition={{ duration: 4, repeat: Infinity }}\n/>` },
 { id: '11', name: 'Floating Label', description: 'Material Design label', category: 'Micro-interaction', difficulty: 'Medium', component: <animations.FloatingLabel />, dependencies: ['framer-motion'], code: `<motion.label\n  animate={{\n    y: focused || value ? -24 : 12,\n    scale: focused || value ? 0.85 : 1\n  }}\n  transition={{ type: "spring", stiffness: 300 }}\n>\n  Label\n</motion.label>` },
 { id: '12', name: 'Card Stack', description: 'Interactive card stack', category: 'Hover', difficulty: 'Medium', component: <animations.CardStack />, dependencies: ['framer-motion'], code: `{cards.map((card, i) => (\n  <motion.div\n    style={{ zIndex: cards.length - i }}\n    initial={{ y: i * 10 }}\n    whileHover={{ y: i * 10 - 20 }}\n    transition={{ type: "spring", stiffness: 300 }}\n  />\n))}` },
 { id: '13', name: 'Bounce Button', description: 'Spring bounce effect', category: 'Hover', difficulty: 'Easy', component: <animations.BounceButton />, dependencies: ['framer-motion'], code: `<motion.button\n  whileHover={{ scale: 1.1 }}\n  whileTap={{ scale: 0.9 }}\n  transition={{ type: "spring", stiffness: 400, damping: 10 }}\n>\n  Bounce\n</motion.button>` },
 { id: '14', name: 'Shake Error', description: 'Error shake animation', category: 'Click', difficulty: 'Easy', component: <animations.ShakeError />, dependencies: ['framer-motion'], code: `<motion.button\n  animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}\n  transition={{ duration: 0.4 }}\n>\n  Shake\n</motion.button>` },
 { id: '15', name: 'Pulse Ring', description: 'Pulsing notification', category: 'Continuous', difficulty: 'Easy', component: <animations.PulseRing />, dependencies: ['framer-motion'], code: `<motion.div\n  className="absolute inset-0 rounded-full border-2 border-[#3B82F6]"\n  animate={{ scale: [1, 2], opacity: [1, 0] }}\n  transition={{ duration: 1.5, repeat: Infinity }}\n/>` },
 { id: '16', name: 'Flip Card', description: '3D card flip', category: 'Click', difficulty: 'Medium', component: <animations.FlipCard />, dependencies: ['framer-motion'], code: `<motion.div\n  style={{ transformStyle: 'preserve-3d' }}\n  animate={{ rotateY: flipped ? 180 : 0 }}\n  transition={{ duration: 0.6 }}\n>\n  <div style={{ backfaceVisibility: 'hidden' }}>Front</div>\n  <div style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>Back</div>\n</motion.div>` },
 { id: '17', name: 'Hamburger Menu', description: 'Menu icon animation', category: 'Click', difficulty: 'Easy', component: <animations.HamburgerMenu />, dependencies: ['framer-motion'], code: `<motion.span\n  animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 8 : 0 }}\n/>\n<motion.span animate={{ opacity: isOpen ? 0 : 1 }} />\n<motion.span\n  animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -8 : 0 }}\n/>` },
 { id: '18', name: 'Dots Loading', description: 'Bouncing dots loader', category: 'Loading', difficulty: 'Easy', component: <animations.DotsLoading />, dependencies: ['framer-motion'], code: `{[0, 1, 2].map((i) => (\n  <motion.div\n    animate={{ y: [0, -10, 0] }}\n    transition={{ repeat: Infinity, delay: i * 0.2 }}\n  />\n))}` },
 { id: '19', name: 'Circle Loading', description: 'Spinning loader', category: 'Loading', difficulty: 'Easy', component: <animations.CircleLoading />, dependencies: ['framer-motion'], code: `<motion.div\n  className="border-4 border-gray-800 border-t-[#3B82F6] rounded-full"\n  animate={{ rotate: 360 }}\n  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}\n/>` },
 { id: '20', name: 'Typewriter', description: 'Character-by-character reveal', category: 'Text', difficulty: 'Medium', component: <animations.Typewriter />, dependencies: ['framer-motion'], code: `{text.split('').map((char, i) => (\n  <motion.span\n    initial={{ opacity: 0 }}\n    animate={{ opacity: 1 }}\n    transition={{ delay: i * 0.1 }}\n  >\n    {char}\n  </motion.span>\n))}` },
 { id: '21', name: 'Scroll Indicator', description: 'Bouncing scroll cue', category: 'Continuous', difficulty: 'Easy', component: <animations.ScrollIndicator />, dependencies: ['framer-motion'], code: `<motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>\n  <motion.div animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }} />\n</motion.div>` },
 { id: '22', name: 'Glitch Text', description: 'Glitch effect on hover', category: 'Hover', difficulty: 'Easy', component: <animations.GlitchText />, dependencies: ['framer-motion'], code: `<motion.h2\n  whileHover={{ x: [0, -2, 2, -2, 2, 0] }}\n  transition={{ duration: 0.3 }}\n>\n  GLITCH\n</motion.h2>` },
 { id: '23', name: 'Social Share', description: 'Expanding share buttons', category: 'Click', difficulty: 'Medium', component: <animations.SocialShare />, dependencies: ['framer-motion'], code: `{icons.map((icon, i) => (\n  <motion.button\n    initial={{ scale: 0 }}\n    animate={{\n      scale: open ? 1 : 0,\n      x: open ? (i - 1) * 50 : 0\n    }}\n    transition={{ delay: i * 0.1 }}\n  />\n))}` },
 { id: '24', name: 'Accordion', description: 'Expandable content', category: 'Click', difficulty: 'Easy', component: <animations.Accordion />, dependencies: ['framer-motion'], code: `<AnimatePresence>\n  {open && (\n    <motion.div\n      initial={{ height: 0 }}\n      animate={{ height: 'auto' }}\n      exit={{ height: 0 }}\n    >\n      Content\n    </motion.div>\n  )}\n</AnimatePresence>` },
 { id: '25', name: 'Image Reveal', description: 'Hover reveal effect', category: 'Hover', difficulty: 'Easy', component: <animations.ImageReveal />, dependencies: ['framer-motion'], code: `<motion.div whileHover="hover">\n  <motion.div\n    variants={{ hover: { opacity: 0 } }}\n    className="absolute inset-0 bg-black/50"\n  />\n</motion.div>` },
 { id: '26', name: 'Gradient Text', description: 'Animated gradient text', category: 'Continuous', difficulty: 'Easy', component: <animations.GradientText />, dependencies: ['framer-motion'], code: `<motion.h2\n  animate={{ backgroundPosition: ['0%', '100%', '0%'] }}\n  transition={{ duration: 3, repeat: Infinity }}\n  style={{ backgroundSize: '200% 100%' }}\n>\n  Gradient\n</motion.h2>` },
 { id: '27', name: 'Tooltip', description: 'Hover tooltip', category: 'Hover', difficulty: 'Easy', component: <animations.Tooltip />, dependencies: ['framer-motion'], code: `<AnimatePresence>\n  {show && (\n    <motion.div\n      initial={{ opacity: 0, y: 5 }}\n      animate={{ opacity: 1, y: 0 }}\n      exit={{ opacity: 0, y: 5 }}\n    >\n      Tooltip!\n    </motion.div>\n  )}\n</AnimatePresence>` },
 { id: '28', name: 'Checkbox', description: 'Animated checkbox', category: 'Click', difficulty: 'Easy', component: <animations.Checkbox />, dependencies: ['framer-motion'], code: `<motion.button\n  animate={{\n    backgroundColor: checked ? '#3B82F6' : 'transparent'\n  }}\n>\n  <motion.svg initial={{ scale: 0 }} animate={{ scale: checked ? 1 : 0 }}>\n    <path d="M5 13l4 4L19 7" />\n  </motion.svg>\n</motion.button>` },
 { id: '29', name: 'Radio Button', description: 'Animated radio buttons', category: 'Click', difficulty: 'Easy', component: <animations.RadioButton />, dependencies: ['framer-motion'], code: `<motion.button>\n  <motion.div\n    className="bg-[#3B82F6] rounded-full"\n    initial={{ scale: 0 }}\n    animate={{ scale: selected ? 1 : 0 }}\n  />\n</motion.button>` },
 { id: '30', name: 'Range Slider', description: 'Animated range input', category: 'Micro-interaction', difficulty: 'Easy', component: <animations.RangeSlider />, dependencies: ['framer-motion'], code: `<motion.div\n  animate={{ width: \`\${value}%\` }}\n/>` },
 { id: '31', name: 'Star Rating', description: 'Interactive star rating', category: 'Click', difficulty: 'Easy', component: <animations.StarRating />, dependencies: ['framer-motion'], code: `{[1, 2, 3, 4, 5].map((i) => (\n  <motion.button\n    whileTap={{ scale: 0.9 }}\n    whileHover={{ scale: 1.2 }}\n  >\n    {i <= rating ? '★' : '☆'}\n  </motion.button>\n))}` },
 { id: '32', name: 'Drag Card', description: 'Draggable card', category: 'Hover', difficulty: 'Easy', component: <animations.DragCard />, dependencies: ['framer-motion'], code: `<motion.div\n  drag\n  dragConstraints={{ left: -100, right: 100 }}\n  dragElastic={0.2}\n  whileDrag={{ scale: 1.1 }}\n/>` },
 { id: '33', name: 'Reorder List', description: 'Sortable list items', category: 'Hover', difficulty: 'Advanced', component: <animations.ReorderList />, dependencies: ['framer-motion'], code: `<motion.div\n  layoutId={item}\n  drag="y"\n  dragConstraints={{ top: 0, bottom: 0 }}\n>\n  {item}\n</motion.div>` },
 { id: '34', name: 'Count Up', description: 'Animated counter', category: 'Click', difficulty: 'Easy', component: <animations.CountUp />, dependencies: ['framer-motion'], code: `<motion.div\n  key={count}\n  initial={{ opacity: 0, y: 20 }}\n  animate={{ opacity: 1, y: 0 }}\n>\n  {count}\n</motion.div>` },
 { id: '35', name: 'Confetti', description: 'Celebration effect', category: 'Click', difficulty: 'Medium', component: <animations.Confetti />, dependencies: ['framer-motion'], code: `<AnimatePresence>\n  {[0, 1, 2, 3, 4, 5].map((i) => (\n    <motion.div\n      key={i}\n      initial={{ scale: 0 }}\n      animate={{\n        scale: [0, 1, 0],\n        x: Math.cos(i * Math.PI / 3) * 100,\n        y: Math.sin(i * Math.PI / 3) * 100\n      }}\n    />\n  ))}\n</AnimatePresence>` },
 { id: '36', name: 'Breathing', description: 'Breathing animation', category: 'Continuous', difficulty: 'Easy', component: <animations.Breathing />, dependencies: ['framer-motion'], code: `<motion.div\n  animate={{\n    scale: [1, 1.2, 1],\n    opacity: [0.7, 1, 0.7]\n  }}\n  transition={{ duration: 4, repeat: Infinity }}\n/>` },
 { id: '37', name: 'Wave', description: 'Audio wave animation', category: 'Continuous', difficulty: 'Easy', component: <animations.Wave />, dependencies: ['framer-motion'], code: `{[0, 1, 2, 3, 4].map((i) => (\n  <motion.div\n    animate={{ height: [20, 60, 20] }}\n    transition={{ repeat: Infinity, delay: i * 0.1 }}\n  />\n))}` },
 { id: '38', name: 'Orbit', description: 'Orbiting element', category: 'Continuous', difficulty: 'Easy', component: <animations.Orbit />, dependencies: ['framer-motion'], code: `<motion.div\n  animate={{ rotate: 360 }}\n  transition={{ duration: 3, repeat: Infinity }}\n>\n  <div style={{ transform: 'translateX(40px)' }} />\n</motion.div>` },
 { id: '39', name: 'Liquid Button', description: 'Liquid fill effect', category: 'Hover', difficulty: 'Easy', component: <animations.LiquidButton />, dependencies: ['framer-motion'], code: `<motion.button whileHover="hover">\n  <motion.div\n    initial={{ x: '-100%' }}\n    variants={{ hover: { x: '100%' } }}\n  />\n</motion.button>` },
 { id: '40', name: 'Underline Link', description: 'Animated underline', category: 'Hover', difficulty: 'Easy', component: <animations.UnderlineLink />, dependencies: ['framer-motion'], code: `<motion.a whileHover="hover">\n  <motion.span\n    initial={{ scaleX: 0 }}\n    variants={{ hover: { scaleX: 1 } }}\n  />\n</motion.a>` },
 { id: '41', name: 'Spotlight Button', description: 'Cursor spotlight', category: 'Hover', difficulty: 'Medium', component: <animations.SpotlightButton />, dependencies: ['framer-motion'], code: `<motion.button onMouseMove={(e) => setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })}>\n  <motion.div\n    animate={{ x: pos.x - 40, y: pos.y - 40 }}\n    transition={{ type: "spring", damping: 30 }}\n  />\n</motion.button>` },
 { id: '42', name: 'Neon Text', description: 'Neon glow effect', category: 'Continuous', difficulty: 'Easy', component: <animations.NeonText />, dependencies: ['framer-motion'], code: `<motion.h2\n  animate={{\n    textShadow: [\n      '0 0 10px #3B82F6',\n      '0 0 20px #3B82F6',\n      '0 0 10px #3B82F6'\n    ]\n  }}\n  transition={{ duration: 1.5, repeat: Infinity }}\n>\n  NEON\n</motion.h2>` },
 { id: '43', name: 'Fade Carousel', description: 'Fade transition carousel', category: 'Click', difficulty: 'Medium', component: <animations.FadeCarousel />, dependencies: ['framer-motion'], code: `<AnimatePresence mode="wait">\n  <motion.div\n    key={index}\n    initial={{ opacity: 0 }}\n    animate={{ opacity: 1 }}\n    exit={{ opacity: 0 }}\n  />\n</AnimatePresence>` },
 { id: '44', name: 'Slide Carousel', description: 'Slide transition carousel', category: 'Click', difficulty: 'Medium', component: <animations.SlideCarousel />, dependencies: ['framer-motion'], code: `<motion.div\n  animate={{ x: -index * 128 }}\n  transition={{ type: "spring", stiffness: 300 }}\n>\n  {items.map(item => <div key={item} />)}\n</motion.div>` },
 { id: '45', name: 'Zoom Image', description: 'Hover zoom effect', category: 'Hover', difficulty: 'Easy', component: <animations.ZoomImage />, dependencies: ['framer-motion'], code: `<motion.div\n  whileHover={{ scale: 1.1 }}\n  transition={{ duration: 0.3 }}\n/>` },
 { id: '46', name: 'Rotate Icon', description: 'Continuous rotation', category: 'Continuous', difficulty: 'Easy', component: <animations.RotateIcon />, dependencies: ['framer-motion'], code: `<motion.div\n  animate={{ rotate: 360 }}\n  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}\n>\n  ↻\n</motion.div>` },
 { id: '47', name: 'Blur Reveal', description: 'Blur to clear reveal', category: 'Continuous', difficulty: 'Easy', component: <animations.BlurReveal />, dependencies: ['framer-motion'], code: `<motion.div\n  initial={{ filter: 'blur(10px)', opacity: 0 }}\n  whileInView={{ filter: 'blur(0px)', opacity: 1 }}\n  viewport={{ once: true }}\n/>` },
 { id: '48', name: 'Parallax Text', description: 'Scroll parallax', category: 'Continuous', difficulty: 'Medium', component: <animations.ParallaxText />, dependencies: ['framer-motion'], code: `<motion.div animate={{ y: scrollY * 0.5 }}>\n  Parallax\n</motion.div>` },
 { id: '49', name: 'Stagger Grid', description: 'Staggered entrance', category: 'Continuous', difficulty: 'Easy', component: <animations.StaggerGrid />, dependencies: ['framer-motion'], code: `{items.map((item, i) => (\n  <motion.div\n    initial={{ scale: 0 }}\n    whileInView={{ scale: 1 }}\n    transition={{ delay: i * 0.05 }}\n  />\n))}` },
 { id: '50', name: 'Color Transition', description: 'Cycling colors', category: 'Continuous', difficulty: 'Easy', component: <animations.ColorTransition />, dependencies: ['framer-motion'], code: `<motion.div\n  animate={{\n    backgroundColor: ['#3B82F6', '#E2E8F0', '#93C5FD']\n  }}\n  transition={{ duration: 4, repeat: Infinity }}\n/>` },
 { id: '51', name: 'Path Drawing', description: 'SVG path animation', category: 'Continuous', difficulty: 'Easy', component: <animations.PathDrawing />, dependencies: ['framer-motion'], code: `<motion.circle\n  initial={{ pathLength: 0 }}\n  animate={{ pathLength: 1 }}\n  transition={{ duration: 2, repeat: Infinity }}\n/>` },
 { id: '52', name: 'Perspective Card', description: '3D perspective effect', category: 'Hover', difficulty: 'Easy', component: <animations.PerspectiveCard />, dependencies: ['framer-motion'], code: `<motion.div\n  style={{ perspective: '1000px' }}\n  whileHover={{ rotateY: 15, rotateX: -10 }}\n/>` },
 { id: '53', name: 'Elastic Snap', description: 'Elastic drag snap', category: 'Hover', difficulty: 'Medium', component: <animations.ElasticSnap />, dependencies: ['framer-motion'], code: `<motion.button\n  drag\n  dragConstraints={{ left: 0, right: 0 }}\n  dragElastic={1}\n>\n  Drag\n</motion.button>` },
 { id: '54', name: 'Text Reveal', description: 'Letter-by-letter reveal', category: 'Continuous', difficulty: 'Easy', component: <animations.TextReveal />, dependencies: ['framer-motion'], code: `{text.split('').map((char, i) => (\n  <motion.span\n    initial={{ y: 50, opacity: 0 }}\n    whileInView={{ y: 0, opacity: 1 }}\n    transition={{ delay: i * 0.1 }}\n  >\n    {char}\n  </motion.span>\n))}` },
 { id: '55', name: 'Mask Reveal', description: 'Sliding mask reveal', category: 'Hover', difficulty: 'Easy', component: <animations.MaskReveal />, dependencies: ['framer-motion'], code: `<motion.div\n  initial={{ x: 0 }}\n  whileHover={{ x: '100%' }}\n  transition={{ duration: 0.5 }}\n/>` },
 { id: '56', name: 'Glow Card', description: 'Hover glow effect', category: 'Hover', difficulty: 'Easy', component: <animations.GlowCard />, dependencies: ['framer-motion'], code: `<motion.div\n  whileHover={{\n    boxShadow: '0 0 30px rgba(59, 130, 246, 0.5)'\n  }}\n/>` },
 { id: '57', name: 'Focus Mode', description: 'Focus mode overlay', category: 'Click', difficulty: 'Medium', component: <animations.FocusMode />, dependencies: ['framer-motion'], code: `<AnimatePresence>\n  {focused && (\n    <motion.div\n      initial={{ opacity: 0 }}\n      animate={{ opacity: 1 }}\n      exit={{ opacity: 0 }}\n      className="fixed inset-0 bg-black/50"\n    />\n  )}\n</AnimatePresence>` },
 { id: '58', name: 'Cursor Follow', description: 'Following spotlight', category: 'Hover', difficulty: 'Medium', component: <animations.CursorFollow />, dependencies: ['framer-motion'], code: `<motion.div\n  animate={{ x: pos.x - 16, y: pos.y - 16 }}\n  transition={{ type: "spring", damping: 30 }}\n/>` },
 { id: '59', name: 'Magnetic Text', description: 'Magnetic text effect', category: 'Hover', difficulty: 'Medium', component: <animations.MagneticText />, dependencies: ['framer-motion'], code: `<motion.span\n  animate={{ x: pos.x, y: pos.y }}\n  transition={{ type: "spring", stiffness: 150 }}\n>\n  Magnetic\n</motion.span>` },
 { id: '60', name: 'Scroll Progress', description: 'Progress indicator', category: 'Continuous', difficulty: 'Easy', component: <animations.ScrollProgress />, dependencies: ['framer-motion'], code: `<motion.div\n  initial={{ width: '0%' }}\n  whileInView={{ width: '100%' }}\n  viewport={{ once: true }}\n/>` },
];


function AnimationCard({ demo, index }: { demo: AnimationDemo; index: number }) {
 const [showCode, setShowCode] = useState(false);
 const [copied, setCopied] = useState(false);


 const copyCode = async () => {
   await navigator.clipboard.writeText(demo.code);
   setCopied(true);
   setTimeout(() => setCopied(false), 2000);
 };


 return (
   <motion.div
     initial={{ opacity: 0, y: 30 }}
     whileInView={{ opacity: 1, y: 0 }}
     transition={{ duration: 0.5, delay: index * 0.03 }}
     viewport={{ once: true }}
   >
     <SpecimenCard className="h-full overflow-hidden">
       <div className="p-4 border-b border-border/50">
         <div className="flex items-start justify-between mb-2">
           <div>
             <div className="flex items-center gap-2 mb-1">
               <span className="inline-flex shrink-0 items-center gap-1 border border-foreground/30 px-1.5 py-0.5 font-mono text-[9px] font-medium uppercase tracking-[0.14em] whitespace-nowrap">
                 {demo.category === 'Hover' ? <MousePointer2 className="w-3 h-3" /> : demo.category === 'Click' ? <MousePointerClick className="w-3 h-3" /> : demo.category === 'Loading' ? <Loader2 className="w-3 h-3" /> : demo.category === 'Text' ? <Code2 className="w-3 h-3" /> : <Repeat className="w-3 h-3" />}
                 {demo.category}
               </span>
               <span className={`shrink-0 px-1.5 py-0.5 font-mono text-[9px] font-medium uppercase tracking-[0.14em] whitespace-nowrap ${demo.difficulty === 'Easy' ? 'bg-foreground/10 text-muted-foreground' : demo.difficulty === 'Medium' ? 'bg-ocean-soft text-ink' : 'bg-ocean text-white'}`}>{demo.difficulty}</span>
             </div>
             <h3 className="font-display text-lg font-bold">{demo.name}</h3>
           </div>
           <div className="flex items-center gap-1">
             <motion.button onClick={() => setShowCode(!showCode)} className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>{showCode ? <Play className="w-4 h-4" /> : <Code2 className="w-4 h-4" />}</motion.button>
             <motion.button onClick={copyCode} className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>{copied ? <Check className="w-4 h-4 text-[#3B82F6]" /> : <Copy className="w-4 h-4" />}</motion.button>
           </div>
         </div>
         <p className="text-sm text-muted-foreground">{demo.description}</p>
       </div>
       <div className="p-6 min-h-[160px] flex items-center justify-center bg-secondary/10">
         {showCode ? (
           <div className="w-full">
             <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground"><span>Dependencies:</span>{demo.dependencies.map(dep => <span key={dep} className="px-2 py-0.5 bg-secondary rounded text-foreground">{dep}</span>)}</div>
             <pre className="text-xs font-mono text-foreground overflow-x-auto bg-background/50 p-3 rounded-lg"><code>{demo.code}</code></pre>
           </div>
         ) : demo.component}
       </div>
     </SpecimenCard>
   </motion.div>
 );
}


export default function AnimationEffects() {
 return (
   <section id="animations" className="relative py-24 sm:py-32">
     <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
       <SectionHeader
         index="01 / Motion"
         title="Interaction, frame by frame."
         lede="Production-ready motion primitives — hover states, click feedback, loaders and text effects. Open any specimen to read its source."
         meta="60 specimens"
       />
       <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
         {animationDemos.map((demo, index) => (<AnimationCard key={demo.id} demo={demo} index={index} />))}
       </div>
     </div>
   </section>
 );
}


ort { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { Copy, Check, Play, Code2, Sparkles, MousePointer2, MousePointerClick, Repeat, Loader2 } from 'lucide-react';
import { SpecimenCard } from '../components/specimen-card';
import { SectionHeader } from '../components/section-header';


interface AnimationDemo {
 id: string;
 name: string;
 description: string;
 category: 'Hover' | 'Click' | 'Continuous' | 'Micro-interaction' | 'Loading' | 'Text';
 difficulty: 'Easy' | 'Medium' | 'Advanced';
 component: React.ReactNode;
 code: string;
 dependencies: string[];
}


// Animation Components
const animations = {
 // 1. Apple Button
 AppleButton: () => (
   <motion.button className="relative px-8 py-4 bg-white text-black font-semibold rounded-full overflow-hidden group" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
     <motion.div className="absolute inset-0 bg-gradient-to-r from-[#3B82F6] via-[#E2E8F0] to-[#93C5FD] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
     <span className="relative z-10 flex items-center gap-2"><Sparkles className="w-4 h-4" />Apple Style</span>
   </motion.button>
 ),


 // 2. Linear Spotlight
 LinearSpotlight: () => {
   const ref = useRef<HTMLDivElement>(null);
   const handleMouseMove = (e: React.MouseEvent) => {
     if (!ref.current) return;
     const rect = ref.current.getBoundingClientRect();
     ref.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
     ref.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
   };
   return (
     <motion.div ref={ref} onMouseMove={handleMouseMove} className="relative w-64 h-40 rounded-none bg-gradient-to-br from-[#1a1a2e] to-[#16213e] p-6 overflow-hidden group cursor-pointer" whileHover={{ y: -4 }}>
       <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(59, 130, 246, 0.15), transparent 40%)' }} />
       <div className="relative z-10"><h3 className="text-white font-bold text-lg">Linear Style</h3><p className="text-gray-400 text-sm mt-2">Hover to see spotlight</p></div>
     </motion.div>
   );
 },


 // 3. Stripe Magnetic
 StripeMagnetic: () => {
   const ref = useRef<HTMLButtonElement>(null);
   const [pos, setPos] = useState({ x: 0, y: 0 });
   const handleMouseMove = (e: React.MouseEvent) => {
     if (!ref.current) return;
     const rect = ref.current.getBoundingClientRect();
     setPos({ x: (e.clientX - rect.left - rect.width / 2) * 0.3, y: (e.clientY - rect.top - rect.height / 2) * 0.3 });
   };
   return (
     <motion.button ref={ref} className="px-8 py-4 bg-[#3B82F6] text-black font-bold rounded-lg" onMouseMove={handleMouseMove} onMouseLeave={() => setPos({ x: 0, y: 0 })} animate={{ x: pos.x, y: pos.y }} transition={{ type: "spring", stiffness: 150, damping: 15 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Magnetic</motion.button>
   );
 },


 // 4. Vercel Border
 VercelBorder: () => (
   <motion.div className="relative p-[2px] rounded-none bg-gradient-to-r from-[#E2E8F0] via-[#3B82F6] to-[#E2E8F0]" whileHover={{ scale: 1.02 }}>
     <div className="bg-black rounded-none p-6"><h3 className="text-white font-bold">Vercel Style</h3><p className="text-gray-400 text-sm mt-2">Animated border</p></div>
   </motion.div>
 ),


 // 5. Airbnb Heart
 AirbnbHeart: () => {
   const [liked, setLiked] = useState(false);
   return (
     <motion.button className="relative w-12 h-12 flex items-center justify-center" onClick={() => setLiked(!liked)} whileTap={{ scale: 0.9 }}>
       <motion.svg viewBox="0 0 24 24" className="w-8 h-8" fill={liked ? '#FF385C' : 'none'} stroke={liked ? '#FF385C' : 'currentColor'} strokeWidth="2">
         <motion.path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" animate={liked ? { scale: [1, 1.3, 1] } : {}} />
       </motion.svg>
       <AnimatePresence>{liked && <motion.div className="absolute inset-0 rounded-full border-2 border-[#FF385C]" initial={{ scale: 0.5, opacity: 1 }} animate={{ scale: 2, opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} />}</AnimatePresence>
     </motion.button>
   );
 },


 // 6. Skeleton Shimmer
 SkeletonShimmer: () => (
   <div className="w-64 space-y-3">
     {[1, 2, 3].map((i) => (
       <div key={i} className="h-4 bg-gray-800 rounded relative overflow-hidden" style={{ width: i === 3 ? '100%' : `${100 - i * 20}%` }}>
         <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#E2E8F0]/30 to-transparent" animate={{ x: ['-100%', '100%'] }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear", delay: i * 0.2 }} />
       </div>
     ))}
   </div>
 ),


 // 7. Switch Toggle
 SwitchToggle: () => {
   const [isOn, setIsOn] = useState(false);
   return (
     <motion.button className={`w-14 h-8 rounded-full p-1 ${isOn ? 'bg-[#3B82F6]' : 'bg-gray-600'}`} onClick={() => setIsOn(!isOn)}>
       <motion.div className="w-6 h-6 bg-white rounded-full shadow-md" animate={{ x: isOn ? 24 : 0 }} transition={{ type: "spring", stiffness: 500, damping: 30 }} />
     </motion.button>
   );
 },


 // 8. Notification Badge
 NotificationBadge: () => {
   const [count, setCount] = useState(3);
   return (
     <motion.button className="relative p-3 bg-gray-800 rounded-full text-2xl" onClick={() => setCount(0)} whileTap={{ scale: 0.95 }}>🔔
       <AnimatePresence>{count > 0 && <motion.span className="absolute -top-1 -right-1 bg-[#3B82F6] text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>{count}</motion.span>}</AnimatePresence>
     </motion.button>
   );
 },


 // 9. Progress Bar
 ProgressBar: () => {
   const [progress, setProgress] = useState(0);
   return (
     <div className="w-64">
       <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
         <motion.div className="h-full bg-gradient-to-r from-[#3B82F6] to-[#E2E8F0]" animate={{ width: `${progress}%` }} transition={{ type: "spring", stiffness: 50 }} />
       </div>
       <motion.button className="mt-4 px-4 py-2 bg-[#3B82F6] text-black rounded-lg text-sm" onClick={() => setProgress(Math.min(100, progress + 20))} whileTap={{ scale: 0.95 }}>Add Progress</motion.button>
     </div>
   );
 },


 // 10. Morphing Shape
 MorphingShape: () => (
   <motion.div className="w-32 h-32 bg-gradient-to-br from-[#3B82F6] to-[#E2E8F0]" animate={{ borderRadius: ['20%', '50%', '20%'], rotate: [0, 180, 360], scale: [1, 1.1, 1] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
 ),


 // 11. Floating Label
 FloatingLabel: () => {
   const [focused, setFocused] = useState(false);
   const [value, setValue] = useState('');
   return (
     <div className="relative w-64">
       <motion.label className="absolute left-3 text-gray-400 pointer-events-none" animate={{ y: focused || value ? -24 : 12, scale: focused || value ? 0.85 : 1, color: focused ? '#3B82F6' : '#9CA3AF' }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>Email Address</motion.label>
       <input type="text" value={value} onChange={(e) => setValue(e.target.value)} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} className="w-full px-3 py-3 bg-gray-800 border-2 border-gray-700 rounded-lg focus:border-[#3B82F6] focus:outline-none transition-colors" />
     </div>
   );
 },


 // 12. Card Stack
 CardStack: () => {
   const cards = [{ color: 'bg-[#3B82F6]', text: '1' }, { color: 'bg-[#E2E8F0]', text: '2' }, { color: 'bg-[#93C5FD]', text: '3' }];
   return (
     <div className="relative w-48 h-32">
       {cards.map((card, i) => (
         <motion.div key={i} className={`absolute w-full h-full ${card.color} rounded-none flex items-center justify-center text-black font-bold shadow-lg`} style={{ zIndex: cards.length - i }} initial={{ y: i * 10, x: i * 10 }} whileHover={{ y: i * 10 - 20, rotate: (i - 1) * 5 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>{card.text}</motion.div>
       ))}
     </div>
   );
 },


 // 13. Bounce Button
 BounceButton: () => (
   <motion.button className="px-8 py-4 bg-[#3B82F6] text-black font-bold rounded-none" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>Bounce</motion.button>
 ),


 // 14. Shake Error
 ShakeError: () => {
   const [shake, setShake] = useState(false);
   return (
     <motion.button className="px-8 py-4 bg-red-500 text-white font-bold rounded-none" onClick={() => { setShake(true); setTimeout(() => setShake(false), 500); }} animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}} transition={{ duration: 0.4 }}>Shake on Error</motion.button>
   );
 },


 // 15. Pulse Ring
 PulseRing: () => (
   <div className="relative flex items-center justify-center w-20 h-20">
     <div className="w-4 h-4 bg-[#3B82F6] rounded-full" />
     <motion.div className="absolute inset-0 rounded-full border-2 border-[#3B82F6]" animate={{ scale: [1, 2], opacity: [1, 0] }} transition={{ duration: 1.5, repeat: Infinity }} />
   </div>
 ),


 // 16. Flip Card
 FlipCard: () => {
   const [flipped, setFlipped] = useState(false);
   return (
     <div className="relative w-32 h-40 cursor-pointer" style={{ perspective: '1000px' }} onClick={() => setFlipped(!flipped)}>
       <motion.div className="w-full h-full relative" style={{ transformStyle: 'preserve-3d' }} animate={{ rotateY: flipped ? 180 : 0 }} transition={{ duration: 0.6 }}>
         <div className="absolute inset-0 bg-[#3B82F6] rounded-none flex items-center justify-center text-black font-bold backface-hidden" style={{ backfaceVisibility: 'hidden' }}>Front</div>
         <div className="absolute inset-0 bg-[#E2E8F0] rounded-none flex items-center justify-center text-black font-bold" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>Back</div>
       </motion.div>
     </div>
   );
 },


 // 17. Hamburger Menu
 HamburgerMenu: () => {
   const [isOpen, setIsOpen] = useState(false);
   return (
     <button className="w-10 h-10 flex flex-col items-center justify-center gap-1.5" onClick={() => setIsOpen(!isOpen)}>
       <motion.span className="w-6 h-0.5 bg-white block" animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 8 : 0 }} />
       <motion.span className="w-6 h-0.5 bg-white block" animate={{ opacity: isOpen ? 0 : 1 }} />
       <motion.span className="w-6 h-0.5 bg-white block" animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -8 : 0 }} />
     </button>
   );
 },


 // 18. Dots Loading
 DotsLoading: () => (
   <div className="flex gap-2">
     {[0, 1, 2].map((i) => (
       <motion.div key={i} className="w-3 h-3 bg-[#3B82F6] rounded-full" animate={{ y: [0, -10, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }} />
     ))}
   </div>
 ),


 // 19. Circle Loading
 CircleLoading: () => (
   <motion.div className="w-12 h-12 border-4 border-gray-800 border-t-[#3B82F6] rounded-full" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
 ),


 // 20. Typewriter
 Typewriter: () => {
   const text = "Hello World";
   return (
     <div className="text-2xl font-bold">
       {text.split('').map((char, i) => (
         <motion.span key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 }}>{char}</motion.span>
       ))}
       <motion.span className="inline-block w-0.5 h-6 bg-[#3B82F6] ml-1" animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }} />
     </div>
   );
 },


 // 21. Scroll Indicator
 ScrollIndicator: () => (
   <motion.div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2" animate={{ y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
     <motion.div className="w-1 h-2 bg-[#3B82F6] rounded-full" animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
   </motion.div>
 ),


 // 22. Glitch Text
 GlitchText: () => (
   <motion.h2 className="text-3xl font-bold text-white relative" whileHover={{ x: [0, -2, 2, -2, 2, 0] }} transition={{ duration: 0.3 }}>GLITCH</motion.h2>
 ),


 // 23. Social Share
 SocialShare: () => {
   const [open, setOpen] = useState(false);
   const icons = ['X', 'f', 'in'];
   return (
     <div className="relative">
       <motion.button className="w-12 h-12 bg-[#3B82F6] rounded-full flex items-center justify-center text-black" onClick={() => setOpen(!open)} whileTap={{ scale: 0.9 }}>+</motion.button>
       {icons.map((icon, i) => (
         <motion.button key={i} className="absolute w-10 h-10 bg-[#E2E8F0] rounded-full flex items-center justify-center text-sm font-bold text-black" initial={{ scale: 0, x: 0, y: 0 }} animate={{ scale: open ? 1 : 0, x: open ? (i - 1) * 50 : 0, y: open ? -60 : 0 }} transition={{ delay: i * 0.1 }}>{icon}</motion.button>
       ))}
     </div>
   );
 },


 // 24. Accordion
 Accordion: () => {
   const [open, setOpen] = useState(false);
   return (
     <div className="w-64 border border-[#E2E8F0]/30 rounded-lg overflow-hidden">
       <button className="w-full p-4 bg-[#3B82F6]/10 flex justify-between items-center" onClick={() => setOpen(!open)}>
         <span>Click to Expand</span>
         <motion.span animate={{ rotate: open ? 180 : 0 }} className="text-[#3B82F6]">▼</motion.span>
       </button>
       <AnimatePresence>
         {open && (
           <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
             <div className="p-4 text-sm text-muted-foreground">This is the expandable content area with smooth animation.</div>
           </motion.div>
         )}
       </AnimatePresence>
     </div>
   );
 },


 // 25. Image Reveal
 ImageReveal: () => (
   <motion.div className="w-32 h-32 bg-gradient-to-br from-[#3B82F6] to-[#E2E8F0] rounded-none overflow-hidden relative" whileHover="hover">
     <motion.div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-bold" variants={{ hover: { opacity: 0 } }} initial={{ opacity: 1 }}>Hover Me</motion.div>
   </motion.div>
 ),


 // 26. Gradient Text
 GradientText: () => (
   <motion.h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#3B82F6] via-[#E2E8F0] to-[#93C5FD]" animate={{ backgroundPosition: ['0%', '100%', '0%'] }} transition={{ duration: 3, repeat: Infinity }} style={{ backgroundSize: '200% 100%' }}>Gradient</motion.h2>
 ),


 // 27. Tooltip
 Tooltip: () => {
   const [show, setShow] = useState(false);
   return (
     <div className="relative">
       <button className="px-4 py-2 bg-[#3B82F6]/10 rounded-lg text-[#3B82F6]" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>Hover Me</button>
       <AnimatePresence>
         {show && <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-[#3B82F6] text-black text-xs rounded whitespace-nowrap">Tooltip!</motion.div>}
       </AnimatePresence>
     </div>
   );
 },


 // 28. Checkbox
 Checkbox: () => {
   const [checked, setChecked] = useState(false);
   return (
     <motion.button className="w-6 h-6 border-2 border-gray-600 rounded flex items-center justify-center" onClick={() => setChecked(!checked)} animate={{ backgroundColor: checked ? '#3B82F6' : 'transparent', borderColor: checked ? '#3B82F6' : '#4B5563' }}>
       <motion.svg viewBox="0 0 24 24" className="w-4 h-4 text-black" initial={{ scale: 0 }} animate={{ scale: checked ? 1 : 0 }}><path fill="none" stroke="currentColor" strokeWidth="3" d="M5 13l4 4L19 7" /></motion.svg>
     </motion.button>
   );
 },


 // 29. Radio Button
 RadioButton: () => {
   const [selected, setSelected] = useState(0);
   return (
     <div className="flex gap-4">
       {[0, 1, 2].map((i) => (
         <motion.button key={i} className="w-6 h-6 rounded-full border-2 border-gray-600 flex items-center justify-center" onClick={() => setSelected(i)} animate={{ borderColor: selected === i ? '#3B82F6' : '#4B5563' }}>
           <motion.div className="w-3 h-3 bg-[#3B82F6] rounded-full" initial={{ scale: 0 }} animate={{ scale: selected === i ? 1 : 0 }} />
         </motion.button>
       ))}
     </div>
   );
 },


 // 30. Range Slider
 RangeSlider: () => {
   const [value, setValue] = useState(50);
   return (
     <div className="w-48">
       <input type="range" min="0" max="100" value={value} onChange={(e) => setValue(Number(e.target.value))} className="w-full accent-[#3B82F6]" />
       <motion.div className="h-2 bg-[#3B82F6] rounded-full mt-2" animate={{ width: `${value}%` }} />
     </div>
   );
 },


 // 31. Star Rating
 StarRating: () => {
   const [rating, setRating] = useState(0);
   return (
     <div className="flex gap-1">
       {[1, 2, 3, 4, 5].map((i) => (
         <motion.button key={i} onClick={() => setRating(i)} whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.2 }} className="text-2xl text-[#3B82F6]">{i <= rating ? '★' : '☆'}</motion.button>
       ))}
     </div>
   );
 },


 // 32. Drag Card
 DragCard: () => (
   <motion.div className="w-24 h-24 bg-[#3B82F6] rounded-none cursor-grab active:cursor-grabbing flex items-center justify-center text-black font-bold" drag dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }} dragElastic={0.2} whileDrag={{ scale: 1.1 }}>Drag</motion.div>
 ),


 // 33. Reorder List
 ReorderList: () => {
   const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3']);
   return (
     <div className="space-y-2">
       {items.map((item, i) => (
         <motion.div key={item} className="p-3 bg-[#3B82F6]/10 border border-[#3B82F6]/30 rounded-lg cursor-move text-[#3B82F6]" layoutId={item} drag="y" dragConstraints={{ top: 0, bottom: 0 }} onDragEnd={(_, info) => { if (info.offset.y > 50) { const newItems = [...items]; const temp = newItems[i]; newItems[i] = newItems[(i + 1) % items.length]; newItems[(i + 1) % items.length] = temp; setItems(newItems); } }}>{item}</motion.div>
       ))}
     </div>
   );
 },


 // 34. Count Up
 CountUp: () => {
   const [count, setCount] = useState(0);
   return (
     <div className="text-center">
       <motion.div className="text-5xl font-bold text-[#3B82F6]" key={count} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>{count}</motion.div>
       <button className="mt-4 px-4 py-2 bg-[#3B82F6]/10 border border-[#3B82F6]/30 rounded-lg text-sm text-[#3B82F6]" onClick={() => setCount(count + 1)}>Increment</button>
     </div>
   );
 },


 // 35. Confetti
 Confetti: () => {
   const [explode, setExplode] = useState(false);
   return (
     <div className="relative">
       <button className="px-6 py-3 bg-[#3B82F6] text-black rounded-lg font-bold" onClick={() => { setExplode(true); setTimeout(() => setExplode(false), 1000); }}>Celebrate!</button>
       <AnimatePresence>
         {explode && [0, 1, 2, 3, 4, 5].map((i) => (
           <motion.div key={i} className="absolute w-3 h-3 rounded-sm" style={{ backgroundColor: ['#3B82F6', '#E2E8F0', '#93C5FD', '#FFA500', '#FF8C00', '#DAA520'][i], left: '50%', top: '50%' }} initial={{ scale: 0, x: '-50%', y: '-50%' }} animate={{ scale: [0, 1, 0], x: `${Math.cos(i * Math.PI / 3) * 100}px`, y: `${Math.sin(i * Math.PI / 3) * 100}px` }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} />
         ))}
       </AnimatePresence>
     </div>
   );
 },


 // 36. Breathing
 Breathing: () => (
   <motion.div className="w-20 h-20 bg-[#3B82F6] rounded-full" animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
 ),


 // 37. Wave
 Wave: () => (
   <div className="flex gap-1 h-16 items-end">
     {[0, 1, 2, 3, 4].map((i) => (
       <motion.div key={i} className="w-3 bg-[#3B82F6] rounded-full" animate={{ height: [20, 60, 20] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }} />
     ))}
   </div>
 ),


 // 38. Orbit
 Orbit: () => (
   <div className="relative w-24 h-24">
     <div className="absolute inset-0 border-2 border-[#E2E8F0]/30 rounded-full" />
     <motion.div className="absolute w-4 h-4 bg-[#3B82F6] rounded-full" style={{ top: '50%', left: '50%', marginLeft: '-8px', marginTop: '-8px' }} animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>
       <div className="w-4 h-4 bg-[#3B82F6] rounded-full" style={{ transform: 'translateX(40px)' }} />
     </motion.div>
   </div>
 ),


 // 39. Liquid Button
 LiquidButton: () => (
   <motion.button className="relative px-8 py-4 bg-[#3B82F6] text-black font-bold rounded-none overflow-hidden" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
     <motion.div className="absolute inset-0 bg-white/30" initial={{ x: '-100%' }} whileHover={{ x: '100%' }} transition={{ duration: 0.5 }} />
     <span className="relative z-10">Liquid Fill</span>
   </motion.button>
 ),


 // 40. Underline Link
 UnderlineLink: () => (
   <motion.a href="#" className="relative text-lg font-medium text-[#3B82F6]" whileHover="hover">
     Hover for underline
     <motion.span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#3B82F6]" initial={{ scaleX: 0 }} variants={{ hover: { scaleX: 1 } }} transition={{ duration: 0.3 }} style={{ originX: 0 }} />
   </motion.a>
 ),


 // 41. Spotlight Button
 SpotlightButton: () => {
   const ref = useRef<HTMLButtonElement>(null);
   const [pos, setPos] = useState({ x: 0, y: 0 });
   return (
     <motion.button ref={ref} className="relative px-8 py-4 bg-[#3B82F6]/10 border border-[#3B82F6]/30 text-[#3B82F6] font-bold rounded-none overflow-hidden" onMouseMove={(e) => { if (!ref.current) return; const rect = ref.current.getBoundingClientRect(); setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top }); }}>
       <motion.div className="absolute w-20 h-20 bg-[#3B82F6]/30 rounded-full blur-xl" animate={{ x: pos.x - 40, y: pos.y - 40 }} transition={{ type: "spring", damping: 30 }} />
       <span className="relative z-10">Spotlight</span>
     </motion.button>
   );
 },


 // 42. Neon Text
 NeonText: () => (
   <motion.h2 className="text-4xl font-bold text-[#3B82F6]" style={{ textShadow: '0 0 10px #3B82F6, 0 0 20px #3B82F6, 0 0 30px #3B82F6' }} animate={{ textShadow: ['0 0 10px #3B82F6, 0 0 20px #3B82F6', '0 0 20px #3B82F6, 0 0 40px #3B82F6', '0 0 10px #3B82F6, 0 0 20px #3B82F6'] }} transition={{ duration: 1.5, repeat: Infinity }}>NEON</motion.h2>
 ),


 // 43. Fade Carousel
 FadeCarousel: () => {
   const [index, setIndex] = useState(0);
   const colors = ['bg-[#3B82F6]', 'bg-[#E2E8F0]', 'bg-[#93C5FD]'];
   return (
     <div className="relative w-32 h-32">
       <AnimatePresence mode="wait">
         <motion.div key={index} className={`absolute inset-0 ${colors[index]} rounded-none flex items-center justify-center text-black font-bold`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>{index + 1}</motion.div>
       </AnimatePresence>
       <button className="absolute -right-8 top-1/2 -translate-y-1/2 text-[#3B82F6]" onClick={() => setIndex((index + 1) % colors.length)}>→</button>
     </div>
   );
 },


 // 44. Slide Carousel
 SlideCarousel: () => {
   const [index, setIndex] = useState(0);
   const colors = ['bg-[#3B82F6]', 'bg-[#E2E8F0]', 'bg-[#93C5FD]'];
   return (
     <div className="relative w-32 h-32 overflow-hidden rounded-none">
       <motion.div className="flex" animate={{ x: -index * 128 }} transition={{ type: "spring", stiffness: 300, damping: 30 }}>
         {colors.map((color, i) => (
           <div key={i} className={`w-32 h-32 ${color} flex-shrink-0 flex items-center justify-center text-black font-bold`}>{i + 1}</div>
         ))}
       </motion.div>
       <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-[#3B82F6] w-6 h-6 rounded-full" onClick={() => setIndex((index + 1) % colors.length)}>→</button>
     </div>
   );
 },


 // 45. Zoom Image
 ZoomImage: () => (
   <motion.div className="w-32 h-32 bg-gradient-to-br from-[#3B82F6] to-[#E2E8F0] rounded-none overflow-hidden" whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
     <div className="w-full h-full flex items-center justify-center text-black font-bold">Hover to Zoom</div>
   </motion.div>
 ),


 // 46. Rotate Icon
 RotateIcon: () => (
   <motion.div className="w-12 h-12 bg-[#3B82F6] rounded-lg flex items-center justify-center text-black" animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>↻</motion.div>
 ),


 // 47. Blur Reveal
 BlurReveal: () => (
   <motion.div className="w-32 h-20 bg-[#3B82F6] rounded-none flex items-center justify-center text-black font-bold" initial={{ filter: 'blur(10px)', opacity: 0 }} whileInView={{ filter: 'blur(0px)', opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>Blur Reveal</motion.div>
 ),


 // 48. Parallax Text
 ParallaxText: () => (
   <motion.div className="text-[#3B82F6]" animate={{ y: [0, -20, 0] }} transition={{ duration: 2, repeat: Infinity }}>Parallax</motion.div>
 ),


 // 49. Stagger Grid
 StaggerGrid: () => (
   <div className="grid grid-cols-3 gap-2">
     {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
       <motion.div key={i} className="w-10 h-10 bg-[#3B82F6] rounded" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: i * 0.05 }} viewport={{ once: true }} />
     ))}
   </div>
 ),


 // 50. Color Transition
 ColorTransition: () => (
   <motion.div className="w-24 h-24 rounded-none" animate={{ backgroundColor: ['#3B82F6', '#E2E8F0', '#93C5FD', '#3B82F6'] }} transition={{ duration: 4, repeat: Infinity }} />
 ),


 // 51. Path Drawing
 PathDrawing: () => (
   <motion.svg viewBox="0 0 100 100" className="w-24 h-24">
     <motion.circle cx="50" cy="50" r="40" fill="none" stroke="#3B82F6" strokeWidth="4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, repeat: Infinity }} />
   </motion.svg>
 ),


 // 52. Perspective Card
 PerspectiveCard: () => (
   <motion.div className="w-32 h-40 bg-[#3B82F6] rounded-none" style={{ perspective: '1000px', rotateY: 0 }} whileHover={{ rotateY: 15, rotateX: -10 }} transition={{ type: "spring", stiffness: 300 }} />
 ),


 // 53. Elastic Snap
 ElasticSnap: () => (
   <motion.button className="px-6 py-3 bg-[#3B82F6] text-black rounded-lg font-bold" drag dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} dragElastic={1} onDragEnd={(_, info) => { if (Math.abs(info.offset.x) > 100) { /* snap action */ } }}>Drag & Snap</motion.button>
 ),


 // 54. Text Reveal
 TextReveal: () => {
   const text = "Hello";
   return (
     <div className="text-3xl font-bold flex text-[#3B82F6]">
       {text.split('').map((char, i) => (
         <motion.span key={i} initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}>{char}</motion.span>
       ))}
     </div>
   );
 },


 // 55. Mask Reveal
 MaskReveal: () => (
   <div className="relative w-32 h-32 rounded-none overflow-hidden">
     <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6] to-[#E2E8F0]" />
     <motion.div className="absolute inset-0 bg-black" initial={{ x: 0 }} whileHover={{ x: '100%' }} transition={{ duration: 0.5 }} />
   </div>
 ),


 // 56. Glow Card
 GlowCard: () => (
   <motion.div className="relative w-32 h-40 bg-[#3B82F6]/10 border border-[#3B82F6]/30 rounded-none p-4" whileHover={{ boxShadow: '0 0 30px rgba(59, 130, 246, 0.5)' }} transition={{ duration: 0.3 }}>
     <span className="text-[#3B82F6] font-bold">Hover for Glow</span>
   </motion.div>
 ),


 // 57. Focus Mode
 FocusMode: () => {
   const [focused, setFocused] = useState(false);
   return (
     <div className="relative">
       <input type="text" placeholder="Focus me" className="px-4 py-2 bg-[#3B82F6]/10 rounded-lg border-2 border-transparent focus:border-[#3B82F6] outline-none transition-all text-[#3B82F6] placeholder-[#3B82F6]/50" onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
       {focused && <motion.div className="fixed inset-0 bg-black/50 -z-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setFocused(false)} />}
     </div>
   );
 },


 // 58. Cursor Follow
 CursorFollow: () => {
   const [pos, setPos] = useState({ x: 0, y: 0 });
   return (
     <div className="relative w-48 h-32 bg-[#3B82F6]/10 border border-[#3B82F6]/30 rounded-none overflow-hidden" onMouseMove={(e) => { const rect = e.currentTarget.getBoundingClientRect(); setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top }); }}>
       <motion.div className="absolute w-8 h-8 bg-[#3B82F6]/50 rounded-full blur-md" animate={{ x: pos.x - 16, y: pos.y - 16 }} transition={{ type: "spring", damping: 30 }} />
     </div>
   );
 },


 // 59. Magnetic Text
 MagneticText: () => {
   const ref = useRef<HTMLSpanElement>(null);
   const [pos, setPos] = useState({ x: 0, y: 0 });
   return (
     <motion.span ref={ref} className="text-2xl font-bold cursor-pointer inline-block text-[#3B82F6]" onMouseMove={(e) => { if (!ref.current) return; const rect = ref.current.getBoundingClientRect(); setPos({ x: (e.clientX - rect.left - rect.width / 2) * 0.2, y: (e.clientY - rect.top - rect.height / 2) * 0.2 }); }} onMouseLeave={() => setPos({ x: 0, y: 0 })} animate={{ x: pos.x, y: pos.y }} transition={{ type: "spring", stiffness: 150 }}>Magnetic</motion.span>
   );
 },


 // 60. Scroll Progress
 ScrollProgress: () => (
   <div className="w-full max-w-xs">
     <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
       <motion.div className="h-full bg-[#3B82F6]" initial={{ width: '0%' }} whileInView={{ width: '100%' }} transition={{ duration: 1.5 }} viewport={{ once: true }} />
     </div>
   </div>
 ),
};


// Animation Data
const animationDemos: AnimationDemo[] = [
 { id: '1', name: 'Apple Button', description: 'Gradient reveal on hover', category: 'Hover', difficulty: 'Easy', component: <animations.AppleButton />, dependencies: ['framer-motion'], code: `<motion.button className="relative px-8 py-4 bg-white text-black font-semibold rounded-full overflow-hidden group" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>\n  <motion.div className="absolute inset-0 bg-gradient-to-r from-[#3B82F6] via-[#E2E8F0] to-[#93C5FD] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />\n  <span className="relative z-10">Button</span>\n</motion.button>` },
 { id: '2', name: 'Linear Spotlight', description: 'Mouse-following spotlight', category: 'Hover', difficulty: 'Advanced', component: <animations.LinearSpotlight />, dependencies: ['framer-motion'], code: `const handleMouseMove = (e) => {\n  const rect = e.currentTarget.getBoundingClientRect();\n  e.currentTarget.style.setProperty('--mouse-x', e.clientX - rect.left);\n};\n\n<motion.div onMouseMove={handleMouseMove} className="relative group">\n  <div className="absolute inset-0 opacity-0 group-hover:opacity-100"\n    style={{ background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(59, 130, 246, 0.15), transparent 40%)' }} />\n</motion.div>` },
 { id: '3', name: 'Stripe Magnetic', description: 'Cursor-following physics', category: 'Hover', difficulty: 'Medium', component: <animations.StripeMagnetic />, dependencies: ['framer-motion'], code: `const [pos, setPos] = useState({ x: 0, y: 0 });\n\nconst handleMouseMove = (e) => {\n  const rect = e.currentTarget.getBoundingClientRect();\n  setPos({\n    x: (e.clientX - rect.left - rect.width / 2) * 0.3,\n    y: (e.clientY - rect.top - rect.height / 2) * 0.3\n  });\n};\n\n<motion.button\n  onMouseMove={handleMouseMove}\n  onMouseLeave={() => setPos({ x: 0, y: 0 })}\n  animate={{ x: pos.x, y: pos.y }}\n  transition={{ type: "spring", stiffness: 150 }}\n>\n  Magnetic\n</motion.button>` },
 { id: '4', name: 'Vercel Border', description: 'Animated gradient border', category: 'Hover', difficulty: 'Easy', component: <animations.VercelBorder />, dependencies: ['framer-motion'], code: `<motion.div className="relative p-[2px] rounded-none bg-gradient-to-r from-[#E2E8F0] via-[#3B82F6] to-[#E2E8F0]" whileHover={{ scale: 1.02 }}>\n  <div className="bg-black rounded-none p-6">Content</div>\n</motion.div>` },
 { id: '5', name: 'Airbnb Heart', description: 'Click ripple effect', category: 'Click', difficulty: 'Medium', component: <animations.AirbnbHeart />, dependencies: ['framer-motion'], code: `const [liked, setLiked] = useState(false);\n\n<motion.button onClick={() => setLiked(!liked)} whileTap={{ scale: 0.9 }}>\n  <motion.svg animate={liked ? { scale: [1, 1.3, 1] } : {}}>\n    <path d="M12 21.35l-1.45-1.32C5.4 15.36..." />\n  </motion.svg>\n  <AnimatePresence>\n    {liked && (\n      <motion.div\n        initial={{ scale: 0.5, opacity: 1 }}\n        animate={{ scale: 2, opacity: 0 }}\n        exit={{ opacity: 0 }}\n      />\n    )}\n  </AnimatePresence>\n</motion.button>` },
 { id: '6', name: 'Skeleton Loading', description: 'Shimmer loading effect', category: 'Loading', difficulty: 'Easy', component: <animations.SkeletonShimmer />, dependencies: ['framer-motion'], code: `<div className="h-4 bg-gray-800 rounded relative overflow-hidden">\n  <motion.div\n    className="absolute inset-0 bg-gradient-to-r from-transparent via-[#E2E8F0]/30 to-transparent"\n    animate={{ x: ['-100%', '100%'] }}\n    transition={{ repeat: Infinity, duration: 1.5 }}\n  />\n</div>` },
 { id: '7', name: 'Switch Toggle', description: 'iOS-style switch', category: 'Click', difficulty: 'Easy', component: <animations.SwitchToggle />, dependencies: ['framer-motion'], code: `const [isOn, setIsOn] = useState(false);\n\n<motion.button\n  className={\`w-14 h-8 rounded-full p-1 \${isOn ? 'bg-[#3B82F6]' : 'bg-gray-600'}\`}\n  onClick={() => setIsOn(!isOn)}\n>\n  <motion.div\n    className="w-6 h-6 bg-white rounded-full"\n    animate={{ x: isOn ? 24 : 0 }}\n    transition={{ type: "spring", stiffness: 500 }}\n  />\n</motion.button>` },
 { id: '8', name: 'Notification Badge', description: 'Badge entrance animation', category: 'Micro-interaction', difficulty: 'Easy', component: <animations.NotificationBadge />, dependencies: ['framer-motion'], code: `<motion.button>\n  🔔\n  <AnimatePresence>\n    {count > 0 && (\n      <motion.span\n        initial={{ scale: 0 }}\n        animate={{ scale: 1 }}\n        exit={{ scale: 0 }}\n        className="absolute -top-1 -right-1 bg-[#3B82F6] rounded-full"\n      >\n        {count}\n      </motion.span>\n    )}\n  </AnimatePresence>\n</motion.button>` },
 { id: '9', name: 'Progress Bar', description: 'Spring physics progress', category: 'Continuous', difficulty: 'Easy', component: <animations.ProgressBar />, dependencies: ['framer-motion'], code: `<div className="h-2 bg-gray-800 rounded-full overflow-hidden">\n  <motion.div\n    className="h-full bg-gradient-to-r from-[#3B82F6] to-[#E2E8F0]"\n    animate={{ width: \`\${progress}%\` }}\n    transition={{ type: "spring", stiffness: 50 }}\n  />\n</div>` },
 { id: '10', name: 'Morphing Shape', description: 'Organic shape morph', category: 'Continuous', difficulty: 'Easy', component: <animations.MorphingShape />, dependencies: ['framer-motion'], code: `<motion.div\n  animate={{\n    borderRadius: ['20%', '50%', '20%'],\n    rotate: [0, 180, 360],\n    scale: [1, 1.1, 1]\n  }}\n  transition={{ duration: 4, repeat: Infinity }}\n/>` },
 { id: '11', name: 'Floating Label', description: 'Material Design label', category: 'Micro-interaction', difficulty: 'Medium', component: <animations.FloatingLabel />, dependencies: ['framer-motion'], code: `<motion.label\n  animate={{\n    y: focused || value ? -24 : 12,\n    scale: focused || value ? 0.85 : 1\n  }}\n  transition={{ type: "spring", stiffness: 300 }}\n>\n  Label\n</motion.label>` },
 { id: '12', name: 'Card Stack', description: 'Interactive card stack', category: 'Hover', difficulty: 'Medium', component: <animations.CardStack />, dependencies: ['framer-motion'], code: `{cards.map((card, i) => (\n  <motion.div\n    style={{ zIndex: cards.length - i }}\n    initial={{ y: i * 10 }}\n    whileHover={{ y: i * 10 - 20 }}\n    transition={{ type: "spring", stiffness: 300 }}\n  />\n))}` },
 { id: '13', name: 'Bounce Button', description: 'Spring bounce effect', category: 'Hover', difficulty: 'Easy', component: <animations.BounceButton />, dependencies: ['framer-motion'], code: `<motion.button\n  whileHover={{ scale: 1.1 }}\n  whileTap={{ scale: 0.9 }}\n  transition={{ type: "spring", stiffness: 400, damping: 10 }}\n>\n  Bounce\n</motion.button>` },
 { id: '14', name: 'Shake Error', description: 'Error shake animation', category: 'Click', difficulty: 'Easy', component: <animations.ShakeError />, dependencies: ['framer-motion'], code: `<motion.button\n  animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}\n  transition={{ duration: 0.4 }}\n>\n  Shake\n</motion.button>` },
 { id: '15', name: 'Pulse Ring', description: 'Pulsing notification', category: 'Continuous', difficulty: 'Easy', component: <animations.PulseRing />, dependencies: ['framer-motion'], code: `<motion.div\n  className="absolute inset-0 rounded-full border-2 border-[#3B82F6]"\n  animate={{ scale: [1, 2], opacity: [1, 0] }}\n  transition={{ duration: 1.5, repeat: Infinity }}\n/>` },
 { id: '16', name: 'Flip Card', description: '3D card flip', category: 'Click', difficulty: 'Medium', component: <animations.FlipCard />, dependencies: ['framer-motion'], code: `<motion.div\n  style={{ transformStyle: 'preserve-3d' }}\n  animate={{ rotateY: flipped ? 180 : 0 }}\n  transition={{ duration: 0.6 }}\n>\n  <div style={{ backfaceVisibility: 'hidden' }}>Front</div>\n  <div style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>Back</div>\n</motion.div>` },
 { id: '17', name: 'Hamburger Menu', description: 'Menu icon animation', category: 'Click', difficulty: 'Easy', component: <animations.HamburgerMenu />, dependencies: ['framer-motion'], code: `<motion.span\n  animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 8 : 0 }}\n/>\n<motion.span animate={{ opacity: isOpen ? 0 : 1 }} />\n<motion.span\n  animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -8 : 0 }}\n/>` },
 { id: '18', name: 'Dots Loading', description: 'Bouncing dots loader', category: 'Loading', difficulty: 'Easy', component: <animations.DotsLoading />, dependencies: ['framer-motion'], code: `{[0, 1, 2].map((i) => (\n  <motion.div\n    animate={{ y: [0, -10, 0] }}\n    transition={{ repeat: Infinity, delay: i * 0.2 }}\n  />\n))}` },
 { id: '19', name: 'Circle Loading', description: 'Spinning loader', category: 'Loading', difficulty: 'Easy', component: <animations.CircleLoading />, dependencies: ['framer-motion'], code: `<motion.div\n  className="border-4 border-gray-800 border-t-[#3B82F6] rounded-full"\n  animate={{ rotate: 360 }}\n  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}\n/>` },
 { id: '20', name: 'Typewriter', description: 'Character-by-character reveal', category: 'Text', difficulty: 'Medium', component: <animations.Typewriter />, dependencies: ['framer-motion'], code: `{text.split('').map((char, i) => (\n  <motion.span\n    initial={{ opacity: 0 }}\n    animate={{ opacity: 1 }}\n    transition={{ delay: i * 0.1 }}\n  >\n    {char}\n  </motion.span>\n))}` },
 { id: '21', name: 'Scroll Indicator', description: 'Bouncing scroll cue', category: 'Continuous', difficulty: 'Easy', component: <animations.ScrollIndicator />, dependencies: ['framer-motion'], code: `<motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>\n  <motion.div animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }} />\n</motion.div>` },
 { id: '22', name: 'Glitch Text', description: 'Glitch effect on hover', category: 'Hover', difficulty: 'Easy', component: <animations.GlitchText />, dependencies: ['framer-motion'], code: `<motion.h2\n  whileHover={{ x: [0, -2, 2, -2, 2, 0] }}\n  transition={{ duration: 0.3 }}\n>\n  GLITCH\n</motion.h2>` },
 { id: '23', name: 'Social Share', description: 'Expanding share buttons', category: 'Click', difficulty: 'Medium', component: <animations.SocialShare />, dependencies: ['framer-motion'], code: `{icons.map((icon, i) => (\n  <motion.button\n    initial={{ scale: 0 }}\n    animate={{\n      scale: open ? 1 : 0,\n      x: open ? (i - 1) * 50 : 0\n    }}\n    transition={{ delay: i * 0.1 }}\n  />\n))}` },
 { id: '24', name: 'Accordion', description: 'Expandable content', category: 'Click', difficulty: 'Easy', component: <animations.Accordion />, dependencies: ['framer-motion'], code: `<AnimatePresence>\n  {open && (\n    <motion.div\n      initial={{ height: 0 }}\n      animate={{ height: 'auto' }}\n      exit={{ height: 0 }}\n    >\n      Content\n    </motion.div>\n  )}\n</AnimatePresence>` },
 { id: '25', name: 'Image Reveal', description: 'Hover reveal effect', category: 'Hover', difficulty: 'Easy', component: <animations.ImageReveal />, dependencies: ['framer-motion'], code: `<motion.div whileHover="hover">\n  <motion.div\n    variants={{ hover: { opacity: 0 } }}\n    className="absolute inset-0 bg-black/50"\n  />\n</motion.div>` },
 { id: '26', name: 'Gradient Text', description: 'Animated gradient text', category: 'Continuous', difficulty: 'Easy', component: <animations.GradientText />, dependencies: ['framer-motion'], code: `<motion.h2\n  animate={{ backgroundPosition: ['0%', '100%', '0%'] }}\n  transition={{ duration: 3, repeat: Infinity }}\n  style={{ backgroundSize: '200% 100%' }}\n>\n  Gradient\n</motion.h2>` },
 { id: '27', name: 'Tooltip', description: 'Hover tooltip', category: 'Hover', difficulty: 'Easy', component: <animations.Tooltip />, dependencies: ['framer-motion'], code: `<AnimatePresence>\n  {show && (\n    <motion.div\n      initial={{ opacity: 0, y: 5 }}\n      animate={{ opacity: 1, y: 0 }}\n      exit={{ opacity: 0, y: 5 }}\n    >\n      Tooltip!\n    </motion.div>\n  )}\n</AnimatePresence>` },
 { id: '28', name: 'Checkbox', description: 'Animated checkbox', category: 'Click', difficulty: 'Easy', component: <animations.Checkbox />, dependencies: ['framer-motion'], code: `<motion.button\n  animate={{\n    backgroundColor: checked ? '#3B82F6' : 'transparent'\n  }}\n>\n  <motion.svg initial={{ scale: 0 }} animate={{ scale: checked ? 1 : 0 }}>\n    <path d="M5 13l4 4L19 7" />\n  </motion.svg>\n</motion.button>` },
 { id: '29', name: 'Radio Button', description: 'Animated radio buttons', category: 'Click', difficulty: 'Easy', component: <animations.RadioButton />, dependencies: ['framer-motion'], code: `<motion.button>\n  <motion.div\n    className="bg-[#3B82F6] rounded-full"\n    initial={{ scale: 0 }}\n    animate={{ scale: selected ? 1 : 0 }}\n  />\n</motion.button>` },
 { id: '30', name: 'Range Slider', description: 'Animated range input', category: 'Micro-interaction', difficulty: 'Easy', component: <animations.RangeSlider />, dependencies: ['framer-motion'], code: `<motion.div\n  animate={{ width: \`\${value}%\` }}\n/>` },
 { id: '31', name: 'Star Rating', description: 'Interactive star rating', category: 'Click', difficulty: 'Easy', component: <animations.StarRating />, dependencies: ['framer-motion'], code: `{[1, 2, 3, 4, 5].map((i) => (\n  <motion.button\n    whileTap={{ scale: 0.9 }}\n    whileHover={{ scale: 1.2 }}\n  >\n    {i <= rating ? '★' : '☆'}\n  </motion.button>\n))}` },
 { id: '32', name: 'Drag Card', description: 'Draggable card', category: 'Hover', difficulty: 'Easy', component: <animations.DragCard />, dependencies: ['framer-motion'], code: `<motion.div\n  drag\n  dragConstraints={{ left: -100, right: 100 }}\n  dragElastic={0.2}\n  whileDrag={{ scale: 1.1 }}\n/>` },
 { id: '33', name: 'Reorder List', description: 'Sortable list items', category: 'Hover', difficulty: 'Advanced', component: <animations.ReorderList />, dependencies: ['framer-motion'], code: `<motion.div\n  layoutId={item}\n  drag="y"\n  dragConstraints={{ top: 0, bottom: 0 }}\n>\n  {item}\n</motion.div>` },
 { id: '34', name: 'Count Up', description: 'Animated counter', category: 'Click', difficulty: 'Easy', component: <animations.CountUp />, dependencies: ['framer-motion'], code: `<motion.div\n  key={count}\n  initial={{ opacity: 0, y: 20 }}\n  animate={{ opacity: 1, y: 0 }}\n>\n  {count}\n</motion.div>` },
 { id: '35', name: 'Confetti', description: 'Celebration effect', category: 'Click', difficulty: 'Medium', component: <animations.Confetti />, dependencies: ['framer-motion'], code: `<AnimatePresence>\n  {[0, 1, 2, 3, 4, 5].map((i) => (\n    <motion.div\n      key={i}\n      initial={{ scale: 0 }}\n      animate={{\n        scale: [0, 1, 0],\n        x: Math.cos(i * Math.PI / 3) * 100,\n        y: Math.sin(i * Math.PI / 3) * 100\n      }}\n    />\n  ))}\n</AnimatePresence>` },
 { id: '36', name: 'Breathing', description: 'Breathing animation', category: 'Continuous', difficulty: 'Easy', component: <animations.Breathing />, dependencies: ['framer-motion'], code: `<motion.div\n  animate={{\n    scale: [1, 1.2, 1],\n    opacity: [0.7, 1, 0.7]\n  }}\n  transition={{ duration: 4, repeat: Infinity }}\n/>` },
 { id: '37', name: 'Wave', description: 'Audio wave animation', category: 'Continuous', difficulty: 'Easy', component: <animations.Wave />, dependencies: ['framer-motion'], code: `{[0, 1, 2, 3, 4].map((i) => (\n  <motion.div\n    animate={{ height: [20, 60, 20] }}\n    transition={{ repeat: Infinity, delay: i * 0.1 }}\n  />\n))}` },
 { id: '38', name: 'Orbit', description: 'Orbiting element', category: 'Continuous', difficulty: 'Easy', component: <animations.Orbit />, dependencies: ['framer-motion'], code: `<motion.div\n  animate={{ rotate: 360 }}\n  transition={{ duration: 3, repeat: Infinity }}\n>\n  <div style={{ transform: 'translateX(40px)' }} />\n</motion.div>` },
 { id: '39', name: 'Liquid Button', description: 'Liquid fill effect', category: 'Hover', difficulty: 'Easy', component: <animations.LiquidButton />, dependencies: ['framer-motion'], code: `<motion.button whileHover="hover">\n  <motion.div\n    initial={{ x: '-100%' }}\n    variants={{ hover: { x: '100%' } }}\n  />\n</motion.button>` },
 { id: '40', name: 'Underline Link', description: 'Animated underline', category: 'Hover', difficulty: 'Easy', component: <animations.UnderlineLink />, dependencies: ['framer-motion'], code: `<motion.a whileHover="hover">\n  <motion.span\n    initial={{ scaleX: 0 }}\n    variants={{ hover: { scaleX: 1 } }}\n  />\n</motion.a>` },
 { id: '41', name: 'Spotlight Button', description: 'Cursor spotlight', category: 'Hover', difficulty: 'Medium', component: <animations.SpotlightButton />, dependencies: ['framer-motion'], code: `<motion.button onMouseMove={(e) => setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })}>\n  <motion.div\n    animate={{ x: pos.x - 40, y: pos.y - 40 }}\n    transition={{ type: "spring", damping: 30 }}\n  />\n</motion.button>` },
 { id: '42', name: 'Neon Text', description: 'Neon glow effect', category: 'Continuous', difficulty: 'Easy', component: <animations.NeonText />, dependencies: ['framer-motion'], code: `<motion.h2\n  animate={{\n    textShadow: [\n      '0 0 10px #3B82F6',\n      '0 0 20px #3B82F6',\n      '0 0 10px #3B82F6'\n    ]\n  }}\n  transition={{ duration: 1.5, repeat: Infinity }}\n>\n  NEON\n</motion.h2>` },
 { id: '43', name: 'Fade Carousel', description: 'Fade transition carousel', category: 'Click', difficulty: 'Medium', component: <animations.FadeCarousel />, dependencies: ['framer-motion'], code: `<AnimatePresence mode="wait">\n  <motion.div\n    key={index}\n    initial={{ opacity: 0 }}\n    animate={{ opacity: 1 }}\n    exit={{ opacity: 0 }}\n  />\n</AnimatePresence>` },
 { id: '44', name: 'Slide Carousel', description: 'Slide transition carousel', category: 'Click', difficulty: 'Medium', component: <animations.SlideCarousel />, dependencies: ['framer-motion'], code: `<motion.div\n  animate={{ x: -index * 128 }}\n  transition={{ type: "spring", stiffness: 300 }}\n>\n  {items.map(item => <div key={item} />)}\n</motion.div>` },
 { id: '45', name: 'Zoom Image', description: 'Hover zoom effect', category: 'Hover', difficulty: 'Easy', component: <animations.ZoomImage />, dependencies: ['framer-motion'], code: `<motion.div\n  whileHover={{ scale: 1.1 }}\n  transition={{ duration: 0.3 }}\n/>` },
 { id: '46', name: 'Rotate Icon', description: 'Continuous rotation', category: 'Continuous', difficulty: 'Easy', component: <animations.RotateIcon />, dependencies: ['framer-motion'], code: `<motion.div\n  animate={{ rotate: 360 }}\n  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}\n>\n  ↻\n</motion.div>` },
 { id: '47', name: 'Blur Reveal', description: 'Blur to clear reveal', category: 'Continuous', difficulty: 'Easy', component: <animations.BlurReveal />, dependencies: ['framer-motion'], code: `<motion.div\n  initial={{ filter: 'blur(10px)', opacity: 0 }}\n  whileInView={{ filter: 'blur(0px)', opacity: 1 }}\n  viewport={{ once: true }}\n/>` },
 { id: '48', name: 'Parallax Text', description: 'Scroll parallax', category: 'Continuous', difficulty: 'Medium', component: <animations.ParallaxText />, dependencies: ['framer-motion'], code: `<motion.div animate={{ y: scrollY * 0.5 }}>\n  Parallax\n</motion.div>` },
 { id: '49', name: 'Stagger Grid', description: 'Staggered entrance', category: 'Continuous', difficulty: 'Easy', component: <animations.StaggerGrid />, dependencies: ['framer-motion'], code: `{items.map((item, i) => (\n  <motion.div\n    initial={{ scale: 0 }}\n    whileInView={{ scale: 1 }}\n    transition={{ delay: i * 0.05 }}\n  />\n))}` },
 { id: '50', name: 'Color Transition', description: 'Cycling colors', category: 'Continuous', difficulty: 'Easy', component: <animations.ColorTransition />, dependencies: ['framer-motion'], code: `<motion.div\n  animate={{\n    backgroundColor: ['#3B82F6', '#E2E8F0', '#93C5FD']\n  }}\n  transition={{ duration: 4, repeat: Infinity }}\n/>` },
 { id: '51', name: 'Path Drawing', description: 'SVG path animation', category: 'Continuous', difficulty: 'Easy', component: <animations.PathDrawing />, dependencies: ['framer-motion'], code: `<motion.circle\n  initial={{ pathLength: 0 }}\n  animate={{ pathLength: 1 }}\n  transition={{ duration: 2, repeat: Infinity }}\n/>` },
 { id: '52', name: 'Perspective Card', description: '3D perspective effect', category: 'Hover', difficulty: 'Easy', component: <animations.PerspectiveCard />, dependencies: ['framer-motion'], code: `<motion.div\n  style={{ perspective: '1000px' }}\n  whileHover={{ rotateY: 15, rotateX: -10 }}\n/>` },
 { id: '53', name: 'Elastic Snap', description: 'Elastic drag snap', category: 'Hover', difficulty: 'Medium', component: <animations.ElasticSnap />, dependencies: ['framer-motion'], code: `<motion.button\n  drag\n  dragConstraints={{ left: 0, right: 0 }}\n  dragElastic={1}\n>\n  Drag\n</motion.button>` },
 { id: '54', name: 'Text Reveal', description: 'Letter-by-letter reveal', category: 'Continuous', difficulty: 'Easy', component: <animations.TextReveal />, dependencies: ['framer-motion'], code: `{text.split('').map((char, i) => (\n  <motion.span\n    initial={{ y: 50, opacity: 0 }}\n    whileInView={{ y: 0, opacity: 1 }}\n    transition={{ delay: i * 0.1 }}\n  >\n    {char}\n  </motion.span>\n))}` },
 { id: '55', name: 'Mask Reveal', description: 'Sliding mask reveal', category: 'Hover', difficulty: 'Easy', component: <animations.MaskReveal />, dependencies: ['framer-motion'], code: `<motion.div\n  initial={{ x: 0 }}\n  whileHover={{ x: '100%' }}\n  transition={{ duration: 0.5 }}\n/>` },
 { id: '56', name: 'Glow Card', description: 'Hover glow effect', category: 'Hover', difficulty: 'Easy', component: <animations.GlowCard />, dependencies: ['framer-motion'], code: `<motion.div\n  whileHover={{\n    boxShadow: '0 0 30px rgba(59, 130, 246, 0.5)'\n  }}\n/>` },
 { id: '57', name: 'Focus Mode', description: 'Focus mode overlay', category: 'Click', difficulty: 'Medium', component: <animations.FocusMode />, dependencies: ['framer-motion'], code: `<AnimatePresence>\n  {focused && (\n    <motion.div\n      initial={{ opacity: 0 }}\n      animate={{ opacity: 1 }}\n      exit={{ opacity: 0 }}\n      className="fixed inset-0 bg-black/50"\n    />\n  )}\n</AnimatePresence>` },
 { id: '58', name: 'Cursor Follow', description: 'Following spotlight', category: 'Hover', difficulty: 'Medium', component: <animations.CursorFollow />, dependencies: ['framer-motion'], code: `<motion.div\n  animate={{ x: pos.x - 16, y: pos.y - 16 }}\n  transition={{ type: "spring", damping: 30 }}\n/>` },
 { id: '59', name: 'Magnetic Text', description: 'Magnetic text effect', category: 'Hover', difficulty: 'Medium', component: <animations.MagneticText />, dependencies: ['framer-motion'], code: `<motion.span\n  animate={{ x: pos.x, y: pos.y }}\n  transition={{ type: "spring", stiffness: 150 }}\n>\n  Magnetic\n</motion.span>` },
 { id: '60', name: 'Scroll Progress', description: 'Progress indicator', category: 'Continuous', difficulty: 'Easy', component: <animations.ScrollProgress />, dependencies: ['framer-motion'], code: `<motion.div\n  initial={{ width: '0%' }}\n  whileInView={{ width: '100%' }}\n  viewport={{ once: true }}\n/>` },
];


function AnimationCard({ demo, index }: { demo: AnimationDemo; index: number }) {
 const [showCode, setShowCode] = useState(false);
 const [copied, setCopied] = useState(false);


 const copyCode = async () => {
   await navigator.clipboard.writeText(demo.code);
   setCopied(true);
   setTimeout(() => setCopied(false), 2000);
 };


 return (
   <motion.div
     initial={{ opacity: 0, y: 30 }}
     whileInView={{ opacity: 1, y: 0 }}
     transition={{ duration: 0.5, delay: index * 0.03 }}
     viewport={{ once: true }}
   >
     <SpecimenCard className="h-full overflow-hidden">
       <div className="p-4 border-b border-border/50">
         <div className="flex items-start justify-between mb-2">
           <div>
             <div className="flex items-center gap-2 mb-1">
               <span className="inline-flex shrink-0 items-center gap-1 border border-foreground/30 px-1.5 py-0.5 font-mono text-[9px] font-medium uppercase tracking-[0.14em] whitespace-nowrap">
                 {demo.category === 'Hover' ? <MousePointer2 className="w-3 h-3" /> : demo.category === 'Click' ? <MousePointerClick className="w-3 h-3" /> : demo.category === 'Loading' ? <Loader2 className="w-3 h-3" /> : demo.category === 'Text' ? <Code2 className="w-3 h-3" /> : <Repeat className="w-3 h-3" />}
                 {demo.category}
               </span>
               <span className={`shrink-0 px-1.5 py-0.5 font-mono text-[9px] font-medium uppercase tracking-[0.14em] whitespace-nowrap ${demo.difficulty === 'Easy' ? 'bg-foreground/10 text-muted-foreground' : demo.difficulty === 'Medium' ? 'bg-ocean-soft text-ink' : 'bg-ocean text-white'}`}>{demo.difficulty}</span>
             </div>
             <h3 className="font-display text-lg font-bold">{demo.name}</h3>
           </div>
           <div className="flex items-center gap-1">
             <motion.button onClick={() => setShowCode(!showCode)} className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>{showCode ? <Play className="w-4 h-4" /> : <Code2 className="w-4 h-4" />}</motion.button>
             <motion.button onClick={copyCode} className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>{copied ? <Check className="w-4 h-4 text-[#3B82F6]" /> : <Copy className="w-4 h-4" />}</motion.button>
           </div>
         </div>
         <p className="text-sm text-muted-foreground">{demo.description}</p>
       </div>
       <div className="p-6 min-h-[160px] flex items-center justify-center bg-secondary/10">
         {showCode ? (
           <div className="w-full">
             <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground"><span>Dependencies:</span>{demo.dependencies.map(dep => <span key={dep} className="px-2 py-0.5 bg-secondary rounded text-foreground">{dep}</span>)}</div>
             <pre className="text-xs font-mono text-foreground overflow-x-auto bg-background/50 p-3 rounded-lg"><code>{demo.code}</code></pre>
           </div>
         ) : demo.component}
       </div>
     </SpecimenCard>
   </motion.div>
 );
}


export default function AnimationEffects() {
 return (
   <section id="animations" className="relative py-24 sm:py-32">
     <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
       <SectionHeader
         index="01 / Motion"
         title="Interaction, frame by frame."
         lede="Production-ready motion primitives — hover states, click feedback, loaders and text effects. Open any specimen to read its source."
         meta="60 specimens"
       />
       <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
         {animationDemos.map((demo, index) => (<AnimationCard key={demo.id} demo={demo} index={index} />))}
       </div>
     </div>
   </section>
 );
}
