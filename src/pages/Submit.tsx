import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '~/context/AuthContext';
import { supabase } from '~/lib/supabase';

export default function Submit() {
  const { user, loading } = useAuth();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [version, setVersion] = useState('1.0.0');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ text: string; success: boolean } | null>(null);
  const navigate = useNavigate();

  // Redirect if not logged in
  if (!loading && !user) {
    navigate('/login');
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setMessage({ success: false, text: 'You must be logged in to submit a mod' });
      return;
    }
    
    setIsSubmitting(true);
    setMessage(null);
    
    try {
      const { data, error } = await supabase
        .from('mods')
        .insert({
          name,
          description,
          version,
          author_id: user.id
        })
        .select();
      
      if (error) throw error;
      
      setMessage({ success: true, text: 'Mod submitted successfully!' });
      
      // Reset form
      setName('');
      setDescription('');
      setVersion('1.0.0');
      
      // Redirect to the mod page after a short delay
      setTimeout(() => {
        if (data && data[0]) {
          navigate('/mods');
        }
      }, 2000);
    } catch (error: any) {
      setMessage({ success: false, text: error.message || 'Failed to submit mod' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Submit a Mod</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="name">
              Mod Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              rows={6}
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="version">
              Version
            </label>
            <input
              id="version"
              type="text"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Mod'}
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
