import { Github } from "lucide-react";

const columns = [
  {
    title: "Archive",
    links: [
      { label: "Motion", href: "#animations" },
      { label: "Gradients", href: "#gradients" },
      { label: "Typefaces", href: "#fonts" },
    ],
  },
  {
    title: "Stack",
    links: [
      { label: "React 19", href: "https://react.dev" },
      { label: "Tailwind CSS v4", href: "https://tailwindcss.com" },
      { label: "Motion", href: "https://motion.dev" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-foreground/25">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-12 py-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <div className="flex items-baseline gap-2.5">
              <span className="inline-block h-3.5 w-3.5 translate-y-px bg-ocean" />
              <span className="font-display text-2xl font-bold uppercase tracking-[-0.02em]">
                Copybook
              </span>
            </div>
            <p className="mt-5 max-w-sm font-editorial text-xl leading-snug text-muted-foreground">
              An open reference for people who build interfaces. Every specimen
              is documented and free to use.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title} className="lg:col-span-3">
              <div className="rule-label mb-4">{col.title}</div>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="underline-sweep text-sm"
                      {...(link.href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Oversized wordmark as a base rule */}
        <div
          aria-hidden
          className="select-none overflow-hidden border-t border-foreground/25 pt-6 text-center font-display text-[clamp(3.5rem,17vw,14rem)] font-bold leading-[0.8] tracking-[-0.05em] text-foreground/[0.07]"
        >
          COPYBOOK
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-foreground/25 py-6 sm:flex-row">
          <p className="rule-label">© {year} Copybook MIT Licensed</p>
          <div className="flex items-center gap-2">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex h-9 w-9 items-center justify-center border border-foreground/25 transition-colors hover:bg-foreground hover:text-background"
            >
              <Github className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
