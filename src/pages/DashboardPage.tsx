import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { motion } from 'framer-motion';

interface UserProfile {
  id: string;
  username: string;
  email: string;
  profile_picture: string | null;
  bio: string | null;
}

interface ModPreview {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();

  // Sample mod data
  const featuredMods: ModPreview[] = [
    {
      id: '1',
      name: 'Police Vehicle Pack',
      description: 'High-quality police vehicles with realistic textures and handling.',
      price: 24.99,
      image: 'https://placehold.co/300x200/2563eb/FFFFFF/png?text=Police+Pack',
      category: 'Vehicles'
    },
    {
      id: '2',
      name: 'Advanced Weapon System',
      description: 'Enhanced weapon mechanics with custom animations and sounds.',
      price: 19.99,
      image: 'https://placehold.co/300x200/dc2626/FFFFFF/png?text=Weapon+System',
      category: 'Weapons'
    },
    {
      id: '3',
      name: 'Realistic Weather Effects',
      description: 'Dynamic weather system with visual and gameplay effects.',
      price: 14.99,
      image: 'https://placehold.co/300x200/0891b2/FFFFFF/png?text=Weather+Effects',
      category: 'Environment'
    },
    {
      id: '4',
      name: 'Custom Character Clothing',
      description: 'Extensive wardrobe options for character customization.',
      price: 9.99,
      image: 'https://placehold.co/300x200/7c3aed/FFFFFF/png?text=Character+Clothing',
      category: 'Customization'
    }
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  useEffect(() => {
    // Redirect if not logged in
    if (!loading && !user) {
      navigate('/login');
      return;
    }

    // Fetch user profile
    const fetchProfile = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (error) throw error;
        
        if (data) {
          setProfile(data);
        } else {
          // Create profile if it doesn't exist
          const newProfile = {
            id: user.id,
            username: user.email?.split('@')[0] || 'user',
            email: user.email || '',
            profile_picture: null,
            bio: null
          };
          
          const { error: insertError } = await supabase
            .from('users')
            .insert(newProfile);
          
          if (insertError) throw insertError;
          
          setProfile(newProfile);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user, loading, navigate]);

  if (loading || isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <motion.div 
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-64 bg-gray-800 text-white flex flex-col"
      >
        <div className="p-5 border-b border-gray-700">
          <h2 className="text-2xl font-bold">FiveM Marketplace</h2>
        </div>
        
        {profile && (
          <div className="p-5 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              {profile.profile_picture ? (
                <img 
                  src={profile.profile_picture} 
                  alt={profile.username} 
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                  <span className="text-lg font-semibold">{profile.username.charAt(0).toUpperCase()}</span>
                </div>
              )}
              <div>
                <p className="font-semibold">{profile.username}</p>
                <p className="text-sm text-gray-400">{profile.email}</p>
              </div>
            </div>
          </div>
        )}
        
        <nav className="flex-1 p-5">
          <ul className="space-y-2">
            <li>
              <button 
                onClick={() => setActiveTab('dashboard')}
                className={`w-full text-left px-4 py-2 rounded flex items-center space-x-2 ${activeTab === 'dashboard' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                <span>Dashboard</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('marketplace')}
                className={`w-full text-left px-4 py-2 rounded flex items-center space-x-2 ${activeTab === 'marketplace' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
                <span>Marketplace</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => navigate('/profile')}
                className="w-full text-left px-4 py-2 rounded flex items-center space-x-2 hover:bg-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <span>My Profile</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => navigate('/submit')}
                className="w-full text-left px-4 py-2 rounded flex items-center space-x-2 hover:bg-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                <span>Submit Mod</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => navigate('/ai')}
                className="w-full text-left px-4 py-2 rounded flex items-center space-x-2 hover:bg-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
                <span>AI Recommendations</span>
              </button>
            </li>
          </ul>
        </nav>
        
        <div className="p-5 border-t border-gray-700">
          <button 
            onClick={handleSignOut}
            className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center justify-center space-x-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm11 4a1 1 0 10-2 0v4.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L14 11.586V7z" clipRule="evenodd" />
            </svg>
            <span>Sign Out</span>
          </button>
        </div>
      </motion.div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Top Navigation */}
        <motion.div 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-md p-4"
        >
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">
              {activeTab === 'dashboard' ? 'Dashboard' : 'Marketplace'}
            </h1>
            <div className="flex space-x-4">
              <button className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </button>
              <button className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
        
        {/* Dashboard Content */}
        <div className="p-6">
          {activeTab === 'dashboard' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-blue-500 text-white mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-500">My Mods</p>
                      <p className="text-2xl font-semibold">0</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-green-500 text-white mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-500">Downloads</p>
                      <p className="text-2xl font-semibold">0</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-purple-500 text-white mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-500">Revenue</p>
                      <p className="text-2xl font-semibold">$0.00</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-gray-500 text-center py-4">No recent activity to display.</p>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => navigate('/submit')}
                      className="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 transition"
                    >
                      Submit New Mod
                    </button>
                    <button 
                      onClick={() => setActiveTab('marketplace')}
                      className="bg-green-500 text-white p-4 rounded-lg hover:bg-green-600 transition"
                    >
                      Browse Marketplace
                    </button>
                    <button 
                      onClick={() => navigate('/profile')}
                      className="bg-purple-500 text-white p-4 rounded-lg hover:bg-purple-600 transition"
                    >
                      Edit Profile
                    </button>
                    <button 
                      onClick={() => navigate('/ai')}
                      className="bg-orange-500 text-white p-4 rounded-lg hover:bg-orange-600 transition"
                    >
                      AI Recommendations
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Marketplace Content */}
          {activeTab === 'marketplace' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-4">Featured Mods</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {featuredMods.map((mod) => (
                    <motion.div 
                      key={mod.id}
                      whileHover={{ scale: 1.03 }}
                      className="bg-white rounded-lg shadow-md overflow-hidden"
                    >
                      <img src={mod.image} alt={mod.name} className="w-full h-40 object-cover" />
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-semibold">{mod.name}</h3>
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">{mod.category}</span>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">{mod.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold">${mod.price.toFixed(2)}</span>
                          <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition">
                            View Details
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4">Popular Categories</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="bg-blue-500 text-white p-4 rounded-lg text-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        <span>Vehicles</span>
                      </motion.div>
                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="bg-red-500 text-white p-4 rounded-lg text-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                        <span>Weapons</span>
                      </motion.div>
                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="bg-green-500 text-white p-4 rounded-lg text-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <span>Maps</span>
                      </motion.div>
                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="bg-purple-500 text-white p-4 rounded-lg text-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span>Characters</span>
                      </motion.div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold mb-4">Top Sellers</h2>
                  <ul className="space-y-4">
                    <li className="flex items-center space-x-3">
                      <span className="text-lg font-bold text-gray-500">1</span>
                      <div className="flex-1">
                        <p className="font-medium">Advanced Roleplay Framework</p>
                        <p className="text-sm text-gray-500">by ModMaster</p>
                      </div>
                      <span className="font-semibold">$49.99</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="text-lg font-bold text-gray-500">2</span>
                      <div className="flex-1">
                        <p className="font-medium">Custom HUD Package</p>
                        <p className="text-sm text-gray-500">by UIDesigner</p>
                      </div>
                      <span className="font-semibold">$24.99</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="text-lg font-bold text-gray-500">3</span>
                      <div className="flex-1">
                        <p className="font-medium">Economy System Pro</p>
                        <p className="text-sm text-gray-500">by GameDev</p>
                      </div>
                      <span className="font-semibold">$34.99</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
