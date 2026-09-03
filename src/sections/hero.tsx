import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { useRef } from "react";

const specimens = [
  { index: "01", label: "Motion", count: "60", href: "#animations" },
  { index: "02", label: "Gradients", count: "50", href: "#gradients" },
  { index: "03", label: "Typefaces", count: "50", href: "#fonts" },
];

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden border-b border-foreground/25"
    >
      {/* Blueprint ruling, no orbs or glow */}
      <div className="pointer-events-none absolute inset-0 rule-grid opacity-70" />
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 diagonal-hatch lg:block" />

      <motion.div
        style={{ y }}
        className="relative mx-auto flex min-h-screen max-w-[1400px] flex-col justify-between px-5 pt-28 pb-8 sm:px-8"
      >
        <div className="grid flex-1 items-center gap-12 lg:grid-cols-12">
          {/* Left: the statement, hard left-aligned */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8 flex items-center gap-3"
            >
              <span className="h-2 w-2 animate-blink bg-ocean" />
              <span className="rule-label">Vol. 01 — Open Reference</span>
            </motion.div>

            <h1 className="font-display text-[clamp(3rem,11vw,9rem)] font-semibold leading-[0.86] tracking-[-0.045em]">
              {["Design", "primitives,"].map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="block"
                >
                  {word}
                </motion.span>
              ))}
              <motion.span
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.16,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="block font-editorial italic font-normal text-ocean"
              >
                catalogued.
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-10 max-w-xl border-l-2 border-ocean pl-5 text-lg leading-relaxed text-muted-foreground"
            >
              An open reference of motion, colour and type — each specimen
              documented, inspectable and ready to lift straight into production
              code.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <a
                href="#animations"
                className="hover-nudge hard-shadow inline-flex items-center gap-3 border border-foreground bg-ocean px-7 py-3.5 font-medium text-white"
              >
                Open the archive
                <ArrowDownRight className="h-4 w-4" />
              </a>
              <a
                href="#fonts"
                className="hover-nudge inline-flex items-center gap-3 border border-foreground px-7 py-3.5 font-medium"
              >
                Browse typefaces
              </a>
            </motion.div>
          </div>

          {/* Right: index table, not stat cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="lg:col-span-4"
          >
            <div className="rule-label mb-4">Contents</div>
            <ul className="border-t border-foreground/25">
              {specimens.map((s) => (
                <li key={s.index}>
                  <a
                    href={s.href}
                    className="group flex items-center justify-between gap-4 border-b border-foreground/25 py-5 transition-colors hover:bg-foreground hover:text-background"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="font-mono text-[11px] text-muted-foreground group-hover:text-background/60">
                        {s.index}
                      </span>
                      <span className="font-display text-2xl font-semibold">
                        {s.label}
                      </span>
                    </span>
                    <span className="font-mono text-sm tabular-nums">
                      {s.count}+
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-12 flex items-center justify-between border-t border-foreground/25 pt-5"
        >
          <span className="rule-label">Scroll to read</span>
          <span className="rule-label">React · TypeScript · Tailwind v4</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
