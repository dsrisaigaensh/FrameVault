import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/api';

function Login() {
  const [email, setEmail] = useState('demo@framevault.test');
  const [password, setPassword] = useState('demo');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const user = await loginUser(email, password);
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="glass-effect w-full max-w-xl p-10 rounded-3xl shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-black mb-3">
            <span className="text-6xl animate-pulse-slow">📸</span>
            <br />
            <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent drop-shadow-lg">
              FrameVault
            </span>
          </h1>
          <p className="text-xl text-white/90 font-semibold">Login to manage your albums</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-white font-bold mb-2 text-lg">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white/20 backdrop-blur-md border-2 border-white/40 rounded-xl text-white placeholder-white/60 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-300 transition-all text-lg"
              required
            />
          </div>

          <div>
            <label className="block text-white font-bold mb-2 text-lg">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white/20 backdrop-blur-md border-2 border-white/40 rounded-xl text-white placeholder-white/60 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-300 transition-all text-lg"
              required
            />
          </div>

          {error && (
            <p className="bg-red-500/20 border-2 border-red-400 text-white px-4 py-3 rounded-xl text-center font-semibold">
              {error}
            </p>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-bold text-xl rounded-xl hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed border-2 border-white/40"
          >
            {loading ? '🔄 Logging in...' : '🚀 Login'}
          </button>
        </form>

        <div className="mt-6 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-md border-2 border-white/30 rounded-xl p-4">
          <p className="text-white font-bold mb-2 text-center">🎮 Demo credentials:</p>
          <p className="text-white/90 text-sm text-center">Email: demo@framevault.test</p>
          <p className="text-white/90 text-sm text-center">Password: demo</p>
        </div>

        <div className="mt-6 text-center">
          <p className="text-white/90 text-lg">
            Don&apos;t have an account?{' '}
            <span 
              className="text-yellow-300 font-bold cursor-pointer hover:text-yellow-200 hover:underline transition-all"
              onClick={() => navigate('/signup')}
            >
              Sign up here
            </span>
          </p>
        </div>
        
        <div className="mt-6 text-center">
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-white/20 backdrop-blur-md border-2 border-white/40 rounded-xl text-white font-semibold hover:bg-white/30 hover:scale-105 transition-all duration-300 shadow-lg"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
