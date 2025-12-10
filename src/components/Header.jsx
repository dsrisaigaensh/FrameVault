import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <header className="glass-effect sticky top-0 z-50 border-b border-white/30 mb-8">
      <div className="w-full px-6 py-4 flex justify-between items-center">
        <h1 
          onClick={() => navigate('/dashboard')}
          className="text-4xl font-black cursor-pointer hover:scale-110 transition-all duration-300 flex items-center gap-2"
        >
          <span className="text-5xl animate-pulse-slow">📸</span>
          <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent drop-shadow-lg">
            FrameVault
          </span>
        </h1>
        {user.name && (
          <div className="flex items-center gap-4">
            <span className="px-6 py-3 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 backdrop-blur-md border-2 border-white/40 rounded-xl text-white font-bold text-lg shadow-lg hover:scale-105 transition-all duration-300">
              👤 {user.name}
            </span>
            <button 
              onClick={handleLogout}
              className="px-6 py-3 bg-gradient-to-r from-red-500 via-pink-500 to-rose-600 text-white font-bold text-lg rounded-xl hover:scale-110 transition-all duration-300 shadow-xl hover:shadow-red-500/50 border-2 border-white/40"
            >
              🚪 Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
