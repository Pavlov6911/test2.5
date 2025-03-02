import { Link } from 'react-router-dom';
import { useAuth } from '~/context/AuthContext';

export default function Navbar() {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      window.location.href = '/';
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">FiveM Mod Marketplace</Link>
        
        <div className="flex space-x-4">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/mods" className="hover:text-gray-300">Mods</Link>
          <Link to="/ai" className="hover:text-gray-300">AI</Link>
          
          {user ? (
            <>
              <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
              <Link to="/profile" className="hover:text-gray-300">Profile</Link>
              <Link to="/submit" className="hover:text-gray-300">Submit Mod</Link>
              <button onClick={handleSignOut} className="hover:text-gray-300">Sign Out</button>
            </>
          ) : (
            <Link to="/login" className="hover:text-gray-300">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
