import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import AnimatedGradientText from '~/components/AnimatedGradientText';
import Navbar from '~/components/Navbar';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [stats, setStats] = useState({
    developers: 0,
    scripts: 0,
    downloads: 0,
    servers: 0
  });
  
  // Parallax effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacitySection1 = useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 1, 0]);
  const opacitySection2 = useTransform(scrollYProgress, [0.2, 0.3, 0.5, 0.6], [0, 1, 1, 0]);
  const opacitySection3 = useTransform(scrollYProgress, [0.5, 0.6, 0.8, 0.9], [0, 1, 1, 0]);
  const opacitySection4 = useTransform(scrollYProgress, [0.8, 0.9], [0, 1]);
  
  // Handle mouse movement for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Animate stats on scroll
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange(value => {
      if (value > 0.3 && value < 0.5) {
        const interval = setInterval(() => {
          setStats(prev => ({
            developers: Math.min(prev.developers + 500, 15000),
            scripts: Math.min(prev.scripts + 800, 25000),
            downloads: Math.min(prev.downloads + 50000, 1500000),
            servers: Math.min(prev.servers + 2000, 50000)
          }));
          
          if (
            stats.developers >= 15000 &&
            stats.scripts >= 25000 &&
            stats.downloads >= 1500000 &&
            stats.servers >= 50000
          ) {
            clearInterval(interval);
          }
        }, 50);
        
        return () => clearInterval(interval);
      }
    });
    
    return () => unsubscribe();
  }, [scrollYProgress, stats]);
  
  // Matrix-style character animation for hero text
  const [displayText, setDisplayText] = useState("");
  const fullText = "SCRIPTVAULT";
  
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.substring(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 150);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div ref={containerRef} className="relative overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section with Video Background */}
      <section className="relative h-screen overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
          <div 
            className="absolute inset-0 z-0 bg-gradient-to-b from-blue-900/30 via-purple-900/30 to-black"
            style={{
              backgroundImage: `url("https://placehold.co/1920x1080/0f172a/1e293b?text=City+Background")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'brightness(0.7)'
            }}
          ></div>
          
          {/* Particle Effects */}
          <div className="absolute inset-0 z-20">
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-blue-500 rounded-full"
                initial={{ 
                  x: Math.random() * window.innerWidth, 
                  y: Math.random() * window.innerHeight,
                  opacity: Math.random() * 0.5 + 0.3
                }}
                animate={{ 
                  y: [null, Math.random() * window.innerHeight],
                  opacity: [null, Math.random() * 0.5 + 0.3]
                }}
                transition={{ 
                  duration: Math.random() * 10 + 10, 
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                style={{
                  boxShadow: '0 0 10px 2px rgba(59, 130, 246, 0.7)'
                }}
              />
            ))}
          </div>
          
          {/* Interactive cursor trail */}
          <motion.div
            className="absolute w-40 h-40 rounded-full pointer-events-none z-30"
            style={{ 
              x: mousePosition.x - 80, 
              y: mousePosition.y - 80,
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(30, 64, 175, 0) 70%)'
            }}
            transition={{ duration: 0.1 }}
          />
        </div>
        
        {/* Hero Content */}
        <div className="relative z-30 flex flex-col items-center justify-center h-full text-white px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="text-center"
          >
            <motion.div
              className="mb-6 text-6xl md:text-8xl font-extrabold tracking-wider"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <span className="font-mono text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                {displayText}
              </span>
              <motion.span 
                className="inline-block w-1 h-12 md:h-16 bg-purple-500 ml-1"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
              />
            </motion.div>
            
            <motion.p
              className="text-xl md:text-2xl text-gray-300 mb-12 font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              The Future of FiveM Development
            </motion.p>
            
            {/* Interactive Login Portal */}
            <motion.div
              className="flex flex-col md:flex-row justify-center gap-6 mt-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2 }}
            >
              <motion.div 
                className="backdrop-blur-md bg-white/10 p-6 rounded-xl border border-white/20 shadow-xl w-full md:w-64"
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 0 20px 5px rgba(139, 92, 246, 0.3)",
                  borderColor: "rgba(139, 92, 246, 0.5)"
                }}
              >
                <h3 className="text-xl font-semibold mb-4 text-center">Quick Login</h3>
                <div className="space-y-4">
                  <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center gap-2 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                    </svg>
                    Discord Login
                  </button>
                  <button className="w-full py-2 px-4 bg-gray-700 hover:bg-gray-800 rounded-lg flex items-center justify-center gap-2 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    GitHub Login
                  </button>
                  <Link 
                    to="/login"
                    className="w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Email Login
                  </Link>
                </div>
              </motion.div>
              
              <motion.div 
                className="backdrop-blur-md bg-white/10 p-6 rounded-xl border border-white/20 shadow-xl w-full md:w-64"
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 0 20px 5px rgba(236, 72, 153, 0.3)",
                  borderColor: "rgba(236, 72, 153, 0.5)"
                }}
              >
                <h3 className="text-xl font-semibold mb-4 text-center">New Registration</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <input 
                      type="email" 
                      placeholder="Email Address" 
                      className="w-full py-2 px-4 bg-black/30 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <input 
                      type="password" 
                      placeholder="Password" 
                      className="w-full py-2 px-4 bg-black/30 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <Link
                    to="/login"
                    className="w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg flex items-center justify-center transition-colors"
                  >
                    Create Account
                  </Link>
                  <div className="text-xs text-center text-gray-400">
                    Includes 2FA & Secure Sessions
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
          
          {/* Scroll Indicator */}
          <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 3, repeat: Infinity, repeatType: "reverse" }}
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </div>
      </section>
      
      {/* Market Statistics Section */}
      <motion.section 
        className="relative min-h-screen bg-gradient-to-b from-black to-gray-900 flex items-center py-20"
        style={{ opacity: opacitySection2 }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              <span className="relative">
                Market Statistics
                <motion.span 
                  className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                  viewport={{ once: true }}
                />
              </span>
            </h2>
            <p className="text-xl text-gray-400">Real-time data from our thriving marketplace</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: "Active Developers", value: stats.developers.toLocaleString(), icon: "👨‍💻", color: "from-blue-500 to-blue-700" },
              { label: "Scripts Available", value: stats.scripts.toLocaleString(), icon: "📜", color: "from-purple-500 to-purple-700" },
              { label: "Total Downloads", value: stats.downloads.toLocaleString(), icon: "⬇️", color: "from-pink-500 to-pink-700" },
              { label: "Active Servers", value: stats.servers.toLocaleString(), icon: "🖥️", color: "from-green-500 to-green-700" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="backdrop-blur-md bg-white/5 rounded-xl p-6 border border-white/10 shadow-xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 0 20px 5px rgba(139, 92, 246, 0.2)",
                }}
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
                <div className="mt-4 w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div 
                    className={`h-full rounded-full bg-gradient-to-r ${stat.color}`}
                    initial={{ width: "0%" }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    viewport={{ once: true }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Live Activity Ticker */}
          <motion.div
            className="mt-16 backdrop-blur-md bg-white/5 rounded-xl p-4 border border-white/10 overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="text-center text-gray-400 mb-2">Live Marketplace Activity</div>
            <div className="relative h-8 overflow-hidden">
              <motion.div
                className="whitespace-nowrap"
                animate={{ x: [0, -1000] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="inline-block mx-8 text-white">
                    <span className="text-green-500">Purchase:</span> Advanced Police System • 
                    <span className="text-blue-500 ml-2">Download:</span> Custom HUD Package • 
                    <span className="text-purple-500 ml-2">New Release:</span> Economy Manager Pro • 
                    <span className="text-pink-500 ml-2">Rating:</span> ⭐⭐⭐⭐⭐ Vehicle Pack Deluxe
                  </span>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>
      
      {/* Premium Scripts Showcase */}
      <motion.section 
        className="relative min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center py-20"
        style={{ opacity: opacitySection3 }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              <span className="relative">
                Premium Scripts
                <motion.span 
                  className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                  viewport={{ once: true }}
                />
              </span>
            </h2>
            <p className="text-xl text-gray-400">Discover top-quality scripts from our marketplace</p>
          </motion.div>
          
          {/* 3D Carousel */}
          <div className="relative h-[500px] mb-16">
            <div className="absolute inset-0 flex items-center justify-center">
              {[
                { 
                  title: "Advanced Police System", 
                  price: "$49.99", 
                  rating: 4.9, 
                  downloads: 15420,
                  image: "https://placehold.co/600x400/2563eb/FFFFFF/png?text=Police+System",
                  author: "CopScript",
                  description: "Complete police management system with advanced dispatch, MDT, and realistic procedures."
                },
                { 
                  title: "Economy Manager Pro", 
                  price: "$39.99", 
                  rating: 4.8, 
                  downloads: 12350,
                  image: "https://placehold.co/600x400/10b981/FFFFFF/png?text=Economy+Manager",
                  author: "MoneyMaker",
                  description: "Comprehensive economy system with banking, jobs, businesses, and dynamic market."
                },
                { 
                  title: "Custom HUD Package", 
                  price: "$24.99", 
                  rating: 4.7, 
                  downloads: 18760,
                  image: "https://placehold.co/600x400/8b5cf6/FFFFFF/png?text=HUD+Package",
                  author: "UIDesigner",
                  description: "Fully customizable HUD with status indicators, minimap enhancements, and notifications."
                },
                { 
                  title: "Vehicle Pack Deluxe", 
                  price: "$59.99", 
                  rating: 5.0, 
                  downloads: 9840,
                  image: "https://placehold.co/600x400/ef4444/FFFFFF/png?text=Vehicle+Pack",
                  author: "CarModder",
                  description: "Premium collection of 50+ high-quality vehicles with custom handling and textures."
                },
                { 
                  title: "Roleplay Framework", 
                  price: "$79.99", 
                  rating: 4.9, 
                  downloads: 7650,
                  image: "https://placehold.co/600x400/f59e0b/FFFFFF/png?text=RP+Framework",
                  author: "RPMaster",
                  description: "Complete roleplay framework with character creation, jobs, inventory, and more."
                }
              ].map((script, index) => {
                const angle = (index / 5) * Math.PI * 2;
                const radius = 250;
                const x = Math.sin(angle) * radius;
                const z = Math.cos(angle) * radius;
                const scale = 0.8 + (z + radius) / (radius * 2) * 0.4;
                
                return (
                  <motion.div
                    key={index}
                    className="absolute w-72 h-96 bg-gray-800 rounded-xl overflow-hidden shadow-2xl"
                    style={{
                      x,
                      z,
                      scale,
                      zIndex: Math.round(z + 1000),
                    }}
                    animate={{
                      x: Math.sin(angle + scrollYProgress.get() * Math.PI * 2) * radius,
                      z: Math.cos(angle + scrollYProgress.get() * Math.PI * 2) * radius,
                      scale: 0.8 + (Math.cos(angle + scrollYProgress.get() * Math.PI * 2) * radius + radius) / (radius * 2) * 0.4,
                    }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ scale: scale * 1.1, zIndex: 2000 }}
                  >
                    <img src={script.image} alt={script.title} className="w-full h-40 object-cover" />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-white mb-1">{script.title}</h3>
                      <p className="text-sm text-gray-400 mb-2">by {script.author}</p>
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <span className="text-yellow-500 mr-1">★</span>
                          <span className="text-white">{script.rating}</span>
                        </div>
                        <div className="text-gray-400 text-sm">{script.downloads.toLocaleString()} downloads</div>
                      </div>
                      <p className="text-sm text-gray-300 mb-3 line-clamp-2">{script.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-white">{script.price}</span>
                        <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                          View Details
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
          
          <div className="text-center">
            <Link
              to="/mods"
              className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-colors"
            >
              Browse All Scripts
            </Link>
          </div>
        </div>
      </motion.section>
      
      {/* Feature Highlights */}
      <motion.section 
        className="relative min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 flex items-center py-20"
        style={{ opacity: opacitySection4 }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              <span className="relative">
                Why ScriptVault?
                <motion.span 
                  className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-green-500"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                  viewport={{ once: true }}
                />
              </span>
            </h2>
            <p className="text-xl text-gray-400">The premium marketplace for FiveM developers</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: "Secure Transactions",
                description: "Our escrow system ensures safe transactions with instant delivery and money-back guarantees.",
                icon: "🔒",
                color: "from-blue-500 to-blue-700"
              },
              {
                title: "AI-Powered Tools",
                description: "Leverage our AI for script analysis, compatibility checks, and price recommendations.",
                icon: "🤖",
                color: "from-purple-500 to-purple-700"
              },
              {
                title: "Community Features",
                description: "Connect with other developers through forums, live support, and collaboration tools.",
                icon: "👥",
                color: "from-pink-500 to-pink-700"
              },
              {
                title: "Premium Quality",
                description: "Every script undergoes rigorous quality checks to ensure the highest standards.",
                icon: "⭐",
                color: "from-yellow-500 to-yellow-700"
              },
              {
                title: "Professional Tools",
                description: "Access developer tools, analytics, and marketing features to boost your sales.",
                icon: "🛠️",
                color: "from-green-500 to-green-700"
              },
              {
                title: "24/7 Support",
                description: "Our dedicated support team is available around the clock to assist you.",
                icon: "🔧",
                color: "from-red-500 to-red-700"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="backdrop-blur-md bg-white/5 rounded-xl p-6 border border-white/10 shadow-xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: `0 0 20px 5px rgba(139, 92, 246, 0.2)`,
                }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
                <div className="mt-4 w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div 
                    className={`h-full rounded-full bg-gradient-to-r ${feature.color}`}
                    initial={{ width: "0%" }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 1.5, delay: 0.5 + index * 0.1 }}
                    viewport={{ once: true }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* How It Works */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              <span className="relative">
                How It Works
                <motion.span 
                  className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-blue-500"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                  viewport={{ once: true }}
                />
              </span>
            </h2>
          </motion.div>
          
          <div className="relative mb-16">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-700 transform -translate-y-1/2 z-0"></div>
            <div className="relative z-10 flex flex-col md:flex-row justify-between">
              {[
                { step: 1, title: "Create Account", icon: "👤" },
                { step: 2, title: "Browse Scripts", icon: "🔍" },
                { step: 3, title: "Secure Purchase", icon: "💳" },
                { step: 4, title: "Instant Download", icon: "⬇️" },
                { step: 5, title: "Start Creating", icon: "🚀" }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center mb-8 md:mb-0"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <motion.div 
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl mb-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {step.icon}
                  </motion.div>
                  <div className="text-center">
                    <div className="text-sm text-purple-400 mb-1">Step {step.step}</div>
                    <div className="text-white font-medium">{step.title}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Call to Action */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">Ready to join the future of FiveM development?</h3>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.button
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-medium transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Join Developer Community
              </motion.button>
              <Link
                to="/login"
                className="px-8 py-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white rounded-lg font-medium transition-colors"
              >
                Create Account
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">ScriptVault</h3>
              <p className="text-gray-400 mb-4">The premium marketplace for FiveM developers and server owners.</p>
              <div className="flex space-x-4">
                <motion.a href="#" className="text-gray-400 hover:text-white" whileHover={{ scale: 1.2 }}>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </motion.a>
                <motion.a href="#" className="text-gray-400 hover:text-white" whileHover={{ scale: 1.2 }}>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </motion.a>
                <motion.a href="#" className="text-gray-400 hover:text-white" whileHover={{ scale: 1.2 }}>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </motion.a>
                <motion.a href="#" className="text-gray-400 hover:text-white" whileHover={{ scale: 1.2 }}>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2z" clipRule="evenodd" />
                  </svg>
                </motion.a>
                <motion.a href="#" className="text-gray-400 hover:text-white" whileHover={{ scale: 1.2 }}>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </motion.a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">API Reference</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Developer Guide</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Tutorials</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
              <p className="text-gray-400 mb-4">Get the latest updates and news</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="bg-gray-800 text-white px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-500 w-full"
                />
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-r-lg transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} ScriptVault. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
