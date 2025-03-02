import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import DashboardPage from './pages/DashboardPage';
import Profile from './pages/Profile';
import Mods from './pages/Mods';
import Submit from './pages/Submit';
import AI from './pages/AI';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/mods" element={<Mods />} />
          <Route path="/submit" element={<Submit />} />
          <Route path="/ai" element={<AI />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
