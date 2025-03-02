import { Link } from "@remix-run/react";
import { useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LanguageSelector } from "./LanguageSelector";

interface NavbarProps {
  theme: string;
  toggleTheme: () => void;
}

export function Navbar({ theme, toggleTheme }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-background border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and left side nav */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold">
              RMHub
            </Link>
            <div className="hidden md:flex items-center space-x-4 ml-8">
              <Link to="/mods" className="hover:text-primary">Browse Mods</Link>
              <Link to="/submit" className="hover:text-primary">Submit a Mod</Link>
            </div>
          </div>

          {/* Right side nav */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSelector />
            <Link to="/ai" className="text-primary hover:text-primary/90">
              Ask AI
            </Link>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md hover:bg-accent"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <Link to="/login" className="hover:text-primary">Login</Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md hover:bg-accent"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              <Link to="/mods" className="block hover:text-primary">Browse Mods</Link>
              <Link to="/submit" className="block hover:text-primary">Submit a Mod</Link>
              <Link to="/ai" className="block text-primary hover:text-primary/90">Ask AI</Link>
              <Link to="/login" className="block hover:text-primary">Login</Link>
              <div className="flex items-center space-x-4">
                <LanguageSelector />
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-md hover:bg-accent"
                >
                  {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
