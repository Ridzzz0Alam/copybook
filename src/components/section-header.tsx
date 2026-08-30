import { motion } from 'framer-motion';


interface SectionHeaderProps {
 index: string;
 title: string;
 lede: string;
 meta?: string;
}


/**
* Shared editorial header: hairline rule, monospace index, oversized display title.
* Every section uses this so the numbering reads as one continuous document.
*/
export function SectionHeader({ index, title, lede, meta }: SectionHeaderProps) {
 return (
   <div className="border-t border-foreground/25 pt-6">
     <div className="flex items-baseline justify-between gap-4 mb-10">
       <span className="rule-label">{index}</span>
       {meta && <span className="rule-label">{meta}</span>}
     </div>


     <div className="grid gap-8 lg:grid-cols-12">
       <motion.h2
         initial={{ opacity: 0, y: 24 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true, margin: '-80px' }}
         transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
         className="lg:col-span-7 font-display text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-[-0.03em] leading-[0.92]"
       >
         {title}
       </motion.h2>


       <motion.p
         initial={{ opacity: 0, y: 24 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true, margin: '-80px' }}
         transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
         className="lg:col-span-5 lg:pt-3 font-editorial text-xl sm:text-2xl leading-snug text-muted-foreground"
       >
         {lede}
       </motion.p>
     </div>
   </div>
 );
}
