import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "../lib/use-theme";
import { cn } from "../lib/utils";
import {
 motion,
 useScroll,
 useMotionValueEvent,
 AnimatePresence,
} from "framer-motion";
import { useState } from "react";


const navItems = [
 { name: "Motion", href: "#animations", index: "01" },
 { name: "Gradients", href: "#gradients", index: "02" },
 { name: "Type", href: "#fonts", index: "03" },
];


export function Navigation() {
 const { resolvedTheme, setTheme } = useTheme();
 const [isScrolled, setIsScrolled] = useState(false);
 const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
 const { scrollY } = useScroll();


 useMotionValueEvent(scrollY, "change", (latest) =>
   setIsScrolled(latest > 40),
 );


 return (
   <>
     <header
       className={cn(
         "fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-300",
         isScrolled
           ? "border-foreground/20 bg-background/90 backdrop-blur-md"
           : "border-transparent bg-transparent",
       )}
     >
       <nav className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 sm:px-8">
         {/* Wordmark — a filled square counter, not an icon glyph */}
         <a href="#" className="group flex items-baseline gap-2.5">
           <span className="inline-block h-3.5 w-3.5 translate-y-px bg-ocean transition-colors group-hover:bg-ocean-deep" />
           <span className="font-display text-lg font-bold uppercase tracking-[-0.02em]">
             Copybook
           </span>
           <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:inline">
             Designer's Archive
           </span>
         </a>


         <div className="hidden items-center gap-8 md:flex">
           {navItems.map((item) => (
             <a
               key={item.name}
               href={item.href}
               className="group flex items-baseline gap-2 text-sm font-medium"
             >
               <span className="font-mono text-[10px] text-muted-foreground">
                 {item.index}
               </span>
               <span className="underline-sweep">{item.name}</span>
             </a>
           ))}
         </div>


         <div className="flex items-center gap-2">
           <button
             onClick={() =>
               setTheme(resolvedTheme === "dark" ? "light" : "dark")
             }
             aria-label="Toggle colour scheme"
             className="flex h-9 w-9 items-center justify-center border border-foreground/25 transition-colors hover:bg-foreground hover:text-background"
           >
             {resolvedTheme === "dark" ? (
               <Sun className="h-4 w-4" />
             ) : (
               <Moon className="h-4 w-4" />
             )}
           </button>


           <button
             onClick={() => setIsMobileMenuOpen((v) => !v)}
             aria-label="Toggle menu"
             aria-expanded={isMobileMenuOpen}
             className="flex h-9 w-9 items-center justify-center border border-foreground/25 transition-colors hover:bg-foreground hover:text-background md:hidden"
           >
             {isMobileMenuOpen ? (
               <X className="h-4 w-4" />
             ) : (
               <Menu className="h-4 w-4" />
             )}
           </button>
         </div>
       </nav>
     </header>


     <AnimatePresence>
       {isMobileMenuOpen && (
         <motion.div
           initial={{ opacity: 0, height: 0 }}
           animate={{ opacity: 1, height: "auto" }}
           exit={{ opacity: 0, height: 0 }}
           transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
           className="fixed top-16 left-0 right-0 z-50 overflow-hidden border-b border-foreground/20 bg-background md:hidden"
         >
           <div className="flex flex-col">
             {navItems.map((item) => (
               <a
                 key={item.name}
                 href={item.href}
                 onClick={() => setIsMobileMenuOpen(false)}
                 className="flex items-baseline gap-3 border-t border-foreground/10 px-5 py-4 first:border-t-0"
               >
                 <span className="font-mono text-[10px] text-muted-foreground">
                   {item.index}
                 </span>
                 <span className="font-display text-xl font-semibold">
                   {item.name}
                 </span>
               </a>
             ))}
           </div>
         </motion.div>
       )}
     </AnimatePresence>
   </>
 );
}
