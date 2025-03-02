import { useState } from 'react';
import LanguageSelector from '~/components/LanguageSelector';

export default function AI() {
  const [language, setLanguage] = useState('javascript');
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) return;
    
    setIsLoading(true);
    
    // Simulate AI recommendations (in a real app, this would call an API)
    setTimeout(() => {
      const fakeRecommendations = [
        `Enhanced ${language.charAt(0).toUpperCase() + language.slice(1)} Vehicle Controls`,
        `Advanced ${language.charAt(0).toUpperCase() + language.slice(1)} Weather System`,
        `Realistic ${language.charAt(0).toUpperCase() + language.slice(1)} Economy Framework`,
        `Custom ${language.charAt(0).toUpperCase() + language.slice(1)} UI Elements`,
        `${language.charAt(0).toUpperCase() + language.slice(1)} Performance Optimizer`
      ];
      
      setRecommendations(fakeRecommendations);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">AI Mod Recommendations</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Get Personalized Recommendations</h2>
        <p className="text-gray-600 mb-6">
          Describe what kind of mod you're looking for, and our AI will suggest the best options for you.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">
              Preferred Language
            </label>
            <LanguageSelector onSelect={setLanguage} selected={language} />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="query">
              What are you looking for?
            </label>
            <textarea
              id="query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              rows={4}
              placeholder="E.g., I need a mod that adds realistic weather effects to my server..."
              required
            />
          </div>
          
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Generating Recommendations...' : 'Get Recommendations'}
            </button>
          </div>
        </form>
      </div>
      
      {recommendations.length > 0 && (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Recommended Mods</h2>
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="p-4 border rounded hover:bg-gray-50 transition cursor-pointer">
                <h3 className="font-medium">{rec}</h3>
                <p className="text-gray-600 text-sm mt-1">
                  This mod is compatible with your requirements and has high user ratings.
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
