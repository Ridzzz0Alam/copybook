import { memo } from "react";

const ITEMS = [
  "ANIMATION PRIMITIVES",
  "GRADIENT SPECIMENS",
  "TYPE CATALOGUE",
  "COPY / PASTE READY",
  "MIT LICENSED",
  "ZERO DEPENDENCIES TO ADD",
];

/**
 * Edge-to-edge marquee band. Duplicated once so the -50% translate loops seamlessly.
 */
export const Ticker = memo(function Ticker() {
  return (
    <div className="w-full overflow-hidden border-y border-ink bg-ocean text-white select-none">
      <div className="flex w-max animate-ticker">
        {[0, 1].map((pass) => (
          <div key={pass} className="flex shrink-0" aria-hidden={pass === 1}>
            {ITEMS.map((item) => (
              <span
                key={`${pass}-${item}`}
                className="flex items-center gap-6 whitespace-nowrap px-6 py-2 font-mono text-[11px] uppercase tracking-[0.2em]"
              >
                {item}
                <span className="text-mist">✳</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
});
