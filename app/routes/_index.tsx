import { motion } from "framer-motion";
import { AnimatedGradientText } from "~/components/AnimatedGradientText";

export default function Index() {
  return (
    <div className="max-w-6xl mx-auto">
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center py-12 md:py-24"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          <AnimatedGradientText>RMHub</AnimatedGradientText>
        </h1>
        <h2 className="text-4xl md:text-6xl font-bold mb-6">
          <AnimatedGradientText>
            Welcome to RMHub Mods
          </AnimatedGradientText>
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Discover, download, and share the best mods for your FiveM server. 
          Enhanced with AI-powered recommendations.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="/mods" 
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90"
          >
            Browse Mods
          </a>
          <a 
            href="/submit" 
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-primary/10 hover:bg-primary/20"
          >
            Submit Your Mod
          </a>
        </div>
      </motion.section>

      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12"
      >
        <div className="p-6 rounded-lg bg-card">
          <h3 className="text-xl font-semibold mb-3">
            <AnimatedGradientText>AI-Powered Discovery</AnimatedGradientText>
          </h3>
          <p className="text-card-foreground/80">
            Our advanced AI system learns your preferences to recommend the perfect mods for your server.
          </p>
        </div>
        <div className="p-6 rounded-lg bg-card">
          <h3 className="text-xl font-semibold mb-3">
            <AnimatedGradientText>Active Community</AnimatedGradientText>
          </h3>
          <p className="text-card-foreground/80">
            Join thousands of FiveM enthusiasts sharing and discussing the latest mods.
          </p>
        </div>
        <div className="p-6 rounded-lg bg-card">
          <h3 className="text-xl font-semibold mb-3">
            <AnimatedGradientText>Quality Assured</AnimatedGradientText>
          </h3>
          <p className="text-card-foreground/80">
            All mods are reviewed and tested to ensure compatibility and performance.
          </p>
        </div>
      </motion.section>

      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="py-12"
      >
        <h2 className="text-3xl font-bold text-center mb-8">
          <AnimatedGradientText>Featured Mods</AnimatedGradientText>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-lg overflow-hidden border bg-card">
              <div className="h-48 bg-accent" />
              <div className="p-4">
                <h3 className="font-semibold mb-2">Featured Mod {i}</h3>
                <p className="text-sm text-card-foreground/80">
                  A brief description of this amazing mod and its features.
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
