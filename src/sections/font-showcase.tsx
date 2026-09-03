import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Copy,
  Check,
  Type,
  Search,
  Filter,
  Sparkles,
  Download,
} from "lucide-react";
import { SpecimenCard } from "../components/specimen-card";
import { SectionHeader } from "../components/section-header";

interface Font {
  id: string;
  name: string;
  family: string;
  category: "serif" | "sans-serif" | "display" | "monospace" | "handwriting";
  weights: number[];
  previewText: string;
  description: string;
}

const fonts: Font[] = [
  // Serif Fonts (10)
  {
    id: "playfair-display",
    name: "Playfair Display",
    family: "Playfair Display",
    category: "serif",
    weights: [400, 500, 600, 700, 800, 900],
    previewText: "Elegant & Timeless",
    description: "High contrast transitional serif with classic elegance",
  },
  {
    id: "merriweather",
    name: "Merriweather",
    family: "Merriweather",
    category: "serif",
    weights: [300, 400, 700, 900],
    previewText: "Readable & Warm",
    description: "Designed for screen readability with warm character",
  },
  {
    id: "lora",
    name: "Lora",
    family: "Lora",
    category: "serif",
    weights: [400, 500, 600, 700],
    previewText: "Calligraphic Flow",
    description: "Modern serif with calligraphic roots and high readability",
  },
  {
    id: "libre-baskerville",
    name: "Libre Baskerville",
    family: "Libre Baskerville",
    category: "serif",
    weights: [400, 700],
    previewText: "Classic Beauty",
    description: "Optimized for body text with American Type Founders heritage",
  },
  {
    id: "cormorant-garamond",
    name: "Cormorant Garamond",
    family: "Cormorant Garamond",
    category: "serif",
    weights: [300, 400, 500, 600, 700],
    previewText: "Renaissance Grace",
    description: "Contemporary Garamond revival with delicate letterforms",
  },
  {
    id: "pt-serif",
    name: "PT Serif",
    family: "PT Serif",
    category: "serif",
    weights: [400, 700],
    previewText: "Universal Serif",
    description: "Transitional serif designed for multilingual publications",
  },
  {
    id: "source-serif-pro",
    name: "Source Serif Pro",
    family: "Source Serif Pro",
    category: "serif",
    weights: [200, 300, 400, 600, 700, 900],
    previewText: "Open Source",
    description: "Adobe's open-source serif companion to Source Sans",
  },
  {
    id: "crimson-text",
    name: "Crimson Text",
    family: "Crimson Text",
    category: "serif",
    weights: [400, 600, 700],
    previewText: "Book Typography",
    description: "Inspired by old-style book typefaces like Garamond",
  },
  {
    id: "eb-garamond",
    name: "EB Garamond",
    family: "EB Garamond",
    category: "serif",
    weights: [400, 500, 600, 700, 800],
    previewText: "Timeless Classic",
    description: "Revival of Claude Garamond's 16th-century typeface",
  },
  {
    id: "frank-ruhl-libre",
    name: "Frank Ruhl Libre",
    family: "Frank Ruhl Libre",
    category: "serif",
    weights: [300, 400, 500, 700, 900],
    previewText: "Hebrew Heritage",
    description: "Open-source version of classic Frank Ruhl Hebrew typeface",
  },
  // Sans-serif Fonts (15)
  {
    id: "inter",
    name: "Inter",
    family: "Inter",
    category: "sans-serif",
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    previewText: "Modern UI Font",
    description: "Designed specifically for computer screens and interfaces",
  },
  {
    id: "roboto",
    name: "Roboto",
    family: "Roboto",
    category: "sans-serif",
    weights: [100, 300, 400, 500, 700, 900],
    previewText: "Google's Choice",
    description: "Material Design's signature geometric sans-serif",
  },
  {
    id: "open-sans",
    name: "Open Sans",
    family: "Open Sans",
    category: "sans-serif",
    weights: [300, 400, 500, 600, 700, 800],
    previewText: "Humanist & Friendly",
    description: "Neutral and versatile with excellent legibility",
  },
  {
    id: "montserrat",
    name: "Montserrat",
    family: "Montserrat",
    category: "sans-serif",
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    previewText: "Urban Typography",
    description: "Inspired by Buenos Aires neighborhood signage",
  },
  {
    id: "poppins",
    name: "Poppins",
    family: "Poppins",
    category: "sans-serif",
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    previewText: "Geometric Round",
    description: "Geometric sans-serif with pure, rounded forms",
  },
  {
    id: "nunito",
    name: "Nunito",
    family: "Nunito",
    category: "sans-serif",
    weights: [200, 300, 400, 500, 600, 700, 800, 900],
    previewText: "Rounded Friendly",
    description: "Well-balanced rounded terminal sans-serif",
  },
  {
    id: "work-sans",
    name: "Work Sans",
    family: "Work Sans",
    category: "sans-serif",
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    previewText: "Optimised for UI",
    description: "Based on early Grotesques, optimized for screens",
  },
  {
    id: "dm-sans",
    name: "DM Sans",
    family: "DM Sans",
    category: "sans-serif",
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    previewText: "Contemporary",
    description: "Low-contrast geometric sans by Colophon Foundry",
  },
  {
    id: "source-sans-pro",
    name: "Source Sans Pro",
    family: "Source Sans Pro",
    category: "sans-serif",
    weights: [200, 300, 400, 600, 700, 900],
    previewText: "Adobe Original",
    description: "Adobe's first open-source typeface family",
  },
  {
    id: "ibm-plex-sans",
    name: "IBM Plex Sans",
    family: "IBM Plex Sans",
    category: "sans-serif",
    weights: [100, 200, 300, 400, 500, 600, 700],
    previewText: "Corporate Bold",
    description: "IBM's open-source typeface designed for brand identity",
  },
  {
    id: "karla",
    name: "Karla",
    family: "Karla",
    category: "sans-serif",
    weights: [200, 300, 400, 500, 600, 700, 800],
    previewText: "Grotesque Warmth",
    description: "Warm and friendly grotesque sans-serif",
  },
  {
    id: "heebo",
    name: "Heebo",
    family: "Heebo",
    category: "sans-serif",
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    previewText: "Hebrew & Latin",
    description: "Designed for Hebrew and Latin scripts together",
  },
  {
    id: "barlow",
    name: "Barlow",
    family: "Barlow",
    category: "sans-serif",
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    previewText: "Industrial Californian",
    description: "Inspired by California car license plates and signage",
  },
  {
    id: "rubik",
    name: "Rubik",
    family: "Rubik",
    category: "sans-serif",
    weights: [300, 400, 500, 600, 700, 800, 900],
    previewText: "Slightly Rounded",
    description: "5-weight family with slightly rounded corners",
  },
  {
    id: "oxygen",
    name: "Oxygen",
    family: "Oxygen",
    category: "sans-serif",
    weights: [300, 400, 700],
    previewText: "KDE Project",
    description: "Created for the KDE desktop environment",
  },
  // Display Fonts (10)
  {
    id: "bebas-neue",
    name: "Bebas Neue",
    family: "Bebas Neue",
    category: "display",
    weights: [400],
    previewText: "BOLD IMPACT",
    description: "All-caps display font perfect for headlines",
  },
  {
    id: "oswald",
    name: "Oswald",
    family: "Oswald",
    category: "display",
    weights: [200, 300, 400, 500, 600, 700],
    previewText: "Condensed Power",
    description: "Reimagined gothic alternate with condensed forms",
  },
  {
    id: "archivo-black",
    name: "Archivo Black",
    family: "Archivo Black",
    category: "display",
    weights: [400],
    previewText: "HEAVY WEIGHT",
    description: "Bold sans-serif from the Archivo family",
  },
  {
    id: "righteous",
    name: "Righteous",
    family: "Righteous",
    category: "display",
    weights: [400],
    previewText: "Geometric Display",
    description: "Condensed geometric sans-serif with high impact",
  },
  {
    id: "black-ops-one",
    name: "Black Ops One",
    family: "Black Ops One",
    category: "display",
    weights: [400],
    previewText: "MILITARY STYLE",
    description: "Stencil-style display font with military aesthetic",
  },
  {
    id: "bangers",
    name: "Bangers",
    family: "Bangers",
    category: "display",
    weights: [400],
    previewText: "COMIC ACTION!",
    description: "Comic book style display font with explosive energy",
  },
  {
    id: "fredericka-the-great",
    name: "Fredericka the Great",
    family: "Fredericka the Great",
    category: "display",
    weights: [400],
    previewText: "Sketch Style",
    description: "Outlined sketch style with vintage charm",
  },
  {
    id: "chewy",
    name: "Chewy",
    family: "Chewy",
    category: "display",
    weights: [400],
    previewText: "Playful Fun",
    description: "Bouncy, playful display font for fun designs",
  },
  {
    id: "luckiest-guy",
    name: "Luckiest Guy",
    family: "Luckiest Guy",
    category: "display",
    weights: [400],
    previewText: "CARTOON STYLE",
    description: "Heavy comic display font with 3D-like weight",
  },
  {
    id: "unica-one",
    name: "Unica One",
    family: "Unica One",
    category: "display",
    weights: [400],
    previewText: "MODERN CONDENSED",
    description: "Condensed uppercase display with clean lines",
  },
  // Monospace Fonts (5)
  {
    id: "fira-code",
    name: "Fira Code",
    family: "Fira Code",
    category: "monospace",
    weights: [300, 400, 500, 600, 700],
    previewText: "const code = true;",
    description: "Monospaced font with programming ligatures",
  },
  {
    id: "jetbrains-mono",
    name: "JetBrains Mono",
    family: "JetBrains Mono",
    category: "monospace",
    weights: [100, 200, 300, 400, 500, 600, 700, 800],
    previewText: "function dev() {}",
    description: "Typeface for developers with increased readability",
  },
  {
    id: "source-code-pro",
    name: "Source Code Pro",
    family: "Source Code Pro",
    category: "monospace",
    weights: [200, 300, 400, 500, 600, 700, 900],
    previewText: "git commit -m",
    description: "Adobe's open-source monospaced companion",
  },
  {
    id: "roboto-mono",
    name: "Roboto Mono",
    family: "Roboto Mono",
    category: "monospace",
    weights: [100, 200, 300, 400, 500, 600, 700],
    previewText: "npm install font",
    description: "Monospaced version of Google's Roboto family",
  },
  {
    id: "space-mono",
    name: "Space Mono",
    family: "Space Mono",
    category: "monospace",
    weights: [400, 700],
    previewText: "console.log(2024);",
    description: "Fixed-width family designed for display use",
  },
  // Handwriting Fonts (10)
  {
    id: "dancing-script",
    name: "Dancing Script",
    family: "Dancing Script",
    category: "handwriting",
    weights: [400, 500, 600, 700],
    previewText: "Elegant Flow",
    description: "Lively casual script with bouncy baseline",
  },
  {
    id: "pacifico",
    name: "Pacifico",
    family: "Pacifico",
    category: "handwriting",
    weights: [400],
    previewText: "Surfer Style",
    description: "Brush script inspired by 1950s American surf culture",
  },
  {
    id: "satisfy",
    name: "Satisfy",
    family: "Satisfy",
    category: "handwriting",
    weights: [400],
    previewText: "Cursive Charm",
    description: "Casual cursive script with contemporary feel",
  },
  {
    id: "great-vibes",
    name: "Great Vibes",
    family: "Great Vibes",
    category: "handwriting",
    weights: [400],
    previewText: "Formal Script",
    description: "Beautiful flowing script with elaborate capital letters",
  },
  {
    id: "caveat",
    name: "Caveat",
    family: "Caveat",
    category: "handwriting",
    weights: [400, 500, 600, 700],
    previewText: "Handwritten Note",
    description: "Handwriting style perfect for annotations",
  },
  {
    id: "sacramento",
    name: "Sacramento",
    family: "Sacramento",
    category: "handwriting",
    weights: [400],
    previewText: "Monoline Script",
    description: "1950s-60s hand-lettered script style",
  },
  {
    id: "allura",
    name: "Allura",
    family: "Allura",
    category: "handwriting",
    weights: [400],
    previewText: "Calligraphic",
    description: "Clean and highly legible script typeface",
  },
  {
    id: "alex-brush",
    name: "Alex Brush",
    family: "Alex Brush",
    category: "handwriting",
    weights: [400],
    previewText: "Brush Script",
    description: "Elegant brush script with thick and thin strokes",
  },
  {
    id: "parisienne",
    name: "Parisienne",
    family: "Parisienne",
    category: "handwriting",
    weights: [400],
    previewText: "French Chic",
    description: "Stylish French script with calligraphic flourishes",
  },
  {
    id: "tangerine",
    name: "Tangerine",
    family: "Tangerine",
    category: "handwriting",
    weights: [400, 700],
    previewText: "Thin & Elegant",
    description:
      "Delicate calligraphic style inspired by italic chancery hands",
  },
];

interface Category {
  id: string;
  name: string;
  count: number;
}

const CategoryIcon = ({ category }: { category: string }) => {
  switch (category) {
    case "all":
      return <Type className="w-4 h-4" />;
    case "serif":
      return <span className="font-serif text-lg">S</span>;
    case "sans-serif":
      return <span className="font-sans text-lg font-bold">Aa</span>;
    case "display":
      return <Sparkles className="w-4 h-4" />;
    case "monospace":
      return <span className="font-mono text-lg">&lt;/&gt;</span>;
    case "handwriting":
      return <span className="italic text-lg">Hand</span>;
    default:
      return <Type className="w-4 h-4" />;
  }
};

const categories: Category[] = [
  { id: "all", name: "All Fonts", count: 50 },
  { id: "serif", name: "Serif", count: 10 },
  { id: "sans-serif", name: "Sans-serif", count: 15 },
  { id: "display", name: "Display", count: 10 },
  { id: "monospace", name: "Monospace", count: 5 },
  { id: "handwriting", name: "Handwriting", count: 10 },
];

const generateFontImport = (font: Font) => {
  const weights = font.weights.join(",");
  return `@import url('https://fonts.googleapis.com/css2?family=${font.family.replace(/\s+/g, "+")}:wght@${weights}&display=swap');`;
};

const generateCSSVariable = (font: Font) => {
  return `font-family: '${font.family}', ${font.category === "serif" ? "serif" : font.category === "monospace" ? "monospace" : "sans-serif"};`;
};

export default function FontShowcase() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedFont, setSelectedFont] = useState<Font | null>(null);
  const [loadedFonts, setLoadedFonts] = useState<Set<string>>(new Set());

  const filteredFonts = fonts.filter((font) => {
    const matchesCategory =
      activeCategory === "all" || font.category === activeCategory;
    const matchesSearch =
      font.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      font.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    const loadFont = async (font: Font) => {
      if (loadedFonts.has(font.id)) return;

      const link = document.createElement("link");
      link.href = `https://fonts.googleapis.com/css2?family=${font.family.replace(/\s+/g, "+")}:wght@${font.weights.join(",")}&display=swap`;
      link.rel = "stylesheet";
      document.head.appendChild(link);

      setLoadedFonts((prev) => new Set(prev).add(font.id));
    };

    filteredFonts.forEach(loadFont);
  }, [filteredFonts, loadedFonts]);

  const handleCopy = async (font: Font, type: "import" | "css") => {
    const text =
      type === "import" ? generateFontImport(font) : generateCSSVariable(font);
    await navigator.clipboard.writeText(text);
    setCopiedId(`${font.id}-${type}`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Classification tints, all drawn from the Deep Ocean scale so the
  // filter row reads as one family rather than five unrelated hues.
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "serif":
        return "bg-ocean-deep/20 text-ocean-deep dark:text-ocean-soft border-ocean-deep/40";
      case "sans-serif":
        return "bg-ocean/20 text-ocean-deep dark:text-ocean border-ocean/40";
      case "display":
        return "bg-ocean-soft/20 text-ocean-deep dark:text-ocean-soft border-ocean-soft/40";
      case "monospace":
        return "bg-foreground/10 text-foreground border-foreground/25";
      case "handwriting":
        return "bg-mist-deep/20 text-mist-deep dark:text-mist border-mist-deep/40";
      default:
        return "bg-foreground/10 text-muted-foreground border-foreground/20";
    }
  };

  return (
    <section id="fonts" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 rule-grid opacity-40" />
      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
        <SectionHeader
          index="03 / Typefaces"
          title="A working type library."
          lede="Fifty Google fonts filed by classification, with live previews and the import line ready to copy."
          meta="50 families"
        />
        <div className="mt-16" />

        {/* Search & Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-12 space-y-6"
        >
          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search fonts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-none bg-card border border-border
                      focus:outline-none focus:ring-2 focus:ring-ocean/50
                      placeholder:text-muted-foreground transition-all"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => {
              const isActive = activeCategory === category.id;

              return (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
                          transition-all duration-300 border ${
                            isActive
                              ? "bg-ocean text-ink border-ocean shadow-lg shadow-ocean/25"
                              : "bg-card text-foreground border-border hover:border-ocean/50 hover:bg-ocean/10"
                          }`}
                >
                  <CategoryIcon category={category.id} />
                  <span>{category.name}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs ${
                      isActive ? "bg-ink/20" : "bg-muted"
                    }`}
                  >
                    {category.count}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Font Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredFonts.map((font, index) => (
              <motion.div
                key={font.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.03, duration: 0.3 }}
                onClick={() => setSelectedFont(font)}
                className="cursor-pointer"
              >
                <SpecimenCard className="h-full group">
                  <div className="p-5 space-y-4">
                    {/* Preview Area */}
                    <div className="relative h-24 rounded-none bg-gradient-to-br from-muted/50 to-muted flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 dot-pattern opacity-30" />
                      <span
                        className="relative text-2xl md:text-3xl text-center px-4 text-foreground"
                        style={{ fontFamily: font.family }}
                      >
                        {font.previewText}
                      </span>

                      {/* Category Badge */}
                      <span
                        className={`absolute top-2 right-2 px-2 py-1 rounded-full text-[10px] font-medium border ${getCategoryColor(font.category)}`}
                      >
                        {font.category}
                      </span>
                    </div>

                    {/* Font Info */}
                    <div className="space-y-2">
                      <h3 className="font-display font-semibold text-lg group-hover:text-ocean transition-colors">
                        {font.name}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {font.description}
                      </p>
                    </div>

                    {/* Weights */}
                    <div className="flex flex-wrap gap-1">
                      {font.weights.slice(0, 5).map((weight) => (
                        <span
                          key={weight}
                          className="px-2 py-0.5 rounded text-[10px] bg-muted text-muted-foreground"
                        >
                          {weight}
                        </span>
                      ))}
                      {font.weights.length > 5 && (
                        <span className="px-2 py-0.5 rounded text-[10px] bg-muted text-muted-foreground">
                          +{font.weights.length - 5}
                        </span>
                      )}
                    </div>

                    {/* Copy Actions */}
                    <div className="flex gap-2 pt-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy(font, "import");
                        }}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg
                                bg-ocean/10 hover:bg-ocean/20 text-ocean-deep dark:text-ocean
                                border border-ocean/20 transition-colors text-xs font-medium"
                      >
                        {copiedId === `${font.id}-import` ? (
                          <Check className="w-3.5 h-3.5" />
                        ) : (
                          <Download className="w-3.5 h-3.5" />
                        )}
                        <span>
                          {copiedId === `${font.id}-import`
                            ? "Copied!"
                            : "Import"}
                        </span>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy(font, "css");
                        }}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg
                                bg-muted hover:bg-muted/80 text-foreground
                                border border-border transition-colors text-xs font-medium"
                      >
                        {copiedId === `${font.id}-css` ? (
                          <Check className="w-3.5 h-3.5" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                        <span>
                          {copiedId === `${font.id}-css` ? "Copied!" : "CSS"}
                        </span>
                      </motion.button>
                    </div>
                  </div>
                </SpecimenCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredFonts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Filter className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              No fonts found matching your criteria
            </p>
          </motion.div>
        )}

        {/* Font Detail Modal */}
        <AnimatePresence>
          {selectedFont && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60 backdrop-blur-sm"
              onClick={() => setSelectedFont(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-none
                        bg-card border border-border shadow-2xl"
              >
                {/* Modal Header */}
                <div
                  className="sticky top-0 z-10 flex items-center justify-between p-6
                             bg-card/95 backdrop-blur border-b border-border"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(selectedFont.category)}`}
                    >
                      {selectedFont.category}
                    </div>
                    <h3 className="text-2xl font-display font-bold">
                      {selectedFont.name}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedFont(null)}
                    className="p-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    <span className="sr-only">Close</span>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-6 space-y-8">
                  {/* Large Preview */}
                  <div className="p-8 rounded-none bg-gradient-to-br from-muted/50 to-muted text-center">
                    <p
                      className="text-4xl md:text-5xl lg:text-6xl text-foreground mb-4"
                      style={{ fontFamily: selectedFont.family }}
                    >
                      The quick brown fox
                    </p>
                    <p
                      className="text-xl md:text-2xl text-muted-foreground"
                      style={{ fontFamily: selectedFont.family }}
                    >
                      jumps over the lazy dog
                    </p>
                  </div>

                  {/* Description */}
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      About this font
                    </h4>
                    <p className="text-foreground">
                      {selectedFont.description}
                    </p>
                  </div>

                  {/* Available Weights */}
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                      Available Weights
                    </h4>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                      {selectedFont.weights.map((weight) => (
                        <div
                          key={weight}
                          className="p-3 rounded-lg bg-muted text-center"
                          style={{
                            fontFamily: selectedFont.family,
                            fontWeight: weight,
                          }}
                        >
                          <span className="text-lg">Aa</span>
                          <span className="block text-xs text-muted-foreground mt-1">
                            {weight}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Code Snippets */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                      How to use
                    </h4>

                    {/* Import Code */}
                    <div className="space-y-2">
                      <label className="text-xs text-muted-foreground">
                        HTML Import
                      </label>
                      <div className="relative">
                        <pre className="p-4 rounded-lg bg-ink text-paper text-sm overflow-x-auto">
                          <code>{`<link href="https://fonts.googleapis.com/css2?family=${selectedFont.family.replace(/\s+/g, "+")}:wght@${selectedFont.weights.join(",")}&display=swap" rel="stylesheet">`}</code>
                        </pre>
                        <button
                          onClick={() => handleCopy(selectedFont, "import")}
                          className="absolute top-2 right-2 p-2 rounded-lg bg-paper/10 hover:bg-paper/20 transition-colors"
                        >
                          {copiedId === `${selectedFont.id}-import` ? (
                            <Check className="w-4 h-4 text-green-400" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* CSS Code */}
                    <div className="space-y-2">
                      <label className="text-xs text-muted-foreground">
                        CSS Usage
                      </label>
                      <div className="relative">
                        <pre className="p-4 rounded-lg bg-ink text-paper text-sm overflow-x-auto">
                          <code>{`font-family: '${selectedFont.family}', ${selectedFont.category === "serif" ? "serif" : selectedFont.category === "monospace" ? "monospace" : "sans-serif"};`}</code>
                        </pre>
                        <button
                          onClick={() => handleCopy(selectedFont, "css")}
                          className="absolute top-2 right-2 p-2 rounded-lg bg-paper/10 hover:bg-paper/20 transition-colors"
                        >
                          {copiedId === `${selectedFont.id}-css` ? (
                            <Check className="w-4 h-4 text-green-400" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
