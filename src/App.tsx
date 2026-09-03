import { lazy, Suspense } from "react";
import { ThemeProvider } from "./components/theme-provider";
import { Navigation } from "./components/navigation";
import { Footer } from "./components/footer";
import { Hero } from "./sections/hero";
import { Ticker } from "./components/ticker";
import { ScrollProgress } from "./components/scroll-progress";

const AnimationEffects = lazy(() => import("./sections/animation-effects"));
const GradientGallery = lazy(() => import("./sections/gradient-gallery"));
const FontShowcase = lazy(() => import("./sections/font-showcase"));

const SectionLoader = () => (
  <div className="flex items-center justify-center py-32">
    <div className="flex items-center gap-3">
      <span className="h-2 w-2 animate-blink bg-ocean" />
      <span className="rule-label">Loading specimens</span>
    </div>
  </div>
);

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
        <ScrollProgress />
        <Navigation />

        <main>
          <Hero />
          <Ticker />
          <Suspense fallback={<SectionLoader />}>
            <AnimationEffects />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <GradientGallery />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <FontShowcase />
          </Suspense>
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
