import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '~/lib/supabase';

interface Mod {
  id: string;
  name: string;
  description: string;
  author_id: string;
  version: string;
  downloads: number;
  created_at: string;
  updated_at: string;
  author?: {
    username: string;
  };
}

export default function Mods() {
  const [mods, setMods] = useState<Mod[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'popular'>('newest');

  useEffect(() => {
    const fetchMods = async () => {
      try {
        let query = supabase
          .from('mods')
          .select(`
            *,
            author:users(username)
          `);
        
        if (sortBy === 'newest') {
          query = query.order('created_at', { ascending: false });
        } else if (sortBy === 'popular') {
          query = query.order('downloads', { ascending: false });
        }
        
        const { data, error } = await query;
        
        if (error) throw error;
        
        setMods(data || []);
      } catch (error) {
        console.error('Error fetching mods:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMods();
  }, [sortBy]);

  const filteredMods = mods.filter(mod => 
    mod.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mod.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Browse Mods</h1>
      
      <div className="flex flex-col md:flex-row justify-between mb-6">
        <div className="w-full md:w-1/2 mb-4 md:mb-0">
          <input
            type="text"
            placeholder="Search mods..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        
        <div className="flex space-x-4">
          <button
            onClick={() => setSortBy('newest')}
            className={`px-4 py-2 rounded ${
              sortBy === 'newest'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Newest
          </button>
          <button
            onClick={() => setSortBy('popular')}
            className={`px-4 py-2 rounded ${
              sortBy === 'popular'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Most Popular
          </button>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="text-xl">Loading mods...</div>
        </div>
      ) : filteredMods.length === 0 ? (
        <div className="bg-white shadow-md rounded-lg p-8 text-center">
          <p className="text-xl text-gray-600 mb-4">No mods found</p>
          <Link
            to="/submit"
            className="inline-block bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
          >
            Submit a Mod
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMods.map((mod) => (
            <div key={mod.id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{mod.name}</h2>
                <p className="text-gray-600 mb-4">{mod.description}</p>
                <div className="flex justify-between text-sm text-gray-500 mb-4">
                  <span>By: {mod.author?.username || 'Unknown'}</span>
                  <span>v{mod.version}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{new Date(mod.created_at).toLocaleDateString()}</span>
                  <span>{mod.downloads} downloads</span>
                </div>
              </div>
              <div className="bg-gray-100 px-6 py-3">
                <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
