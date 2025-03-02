import { useState, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '~/context/AuthContext';
import { supabase } from '~/lib/supabase';

interface UserProfile {
  id: string;
  username: string;
  email: string;
  profile_picture: string | null;
  bio: string | null;
  theme: string;
}

export default function Profile() {
  const { user, loading } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [theme, setTheme] = useState('light');
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState<{ text: string; success: boolean } | null>(null);
  const navigate = useNavigate();

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
          setUsername(data.username || '');
          setBio(data.bio || '');
          setTheme(data.theme || 'light');
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('users')
        .update({
          username,
          bio,
          theme
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      setMessage({ success: true, text: 'Profile updated successfully!' });
      
      // Update local profile state
      if (profile) {
        setProfile({
          ...profile,
          username,
          bio,
          theme
        });
      }
    } catch (error: any) {
      setMessage({ success: false, text: error.message || 'Failed to update profile' });
    }
  };

  if (loading || isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Edit Profile</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={user?.email || ''}
              className="w-full px-4 py-2 border rounded bg-gray-100"
              disabled
            />
            <p className="text-sm text-gray-500 mt-1">Email cannot be changed</p>
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="bio">
              Bio
            </label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              rows={4}
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Theme</label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="light"
                  checked={theme === 'light'}
                  onChange={() => setTheme('light')}
                  className="form-radio"
                />
                <span className="ml-2">Light</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="dark"
                  checked={theme === 'dark'}
                  onChange={() => setTheme('dark')}
                  className="form-radio"
                />
                <span className="ml-2">Dark</span>
              </label>
            </div>
          </div>
          
          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
            >
              Save Changes
            </button>
          </div>
          
          {message && (
            <p className={`mt-4 ${message.success ? "text-green-600" : "text-red-600"}`}>
              {message.text}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
