import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (password.length < 4) {
      setError('Password must be at least 4 characters long');
      setLoading(false);
      return;
    }

    try {
      // Check if user already exists
      const existingUsers = await axios.get('http://localhost:4000/users');
      const userExists = existingUsers.data.find(user => user.email === email);
      
      if (userExists) {
        setError('User with this email already exists');
        setLoading(false);
        return;
      }

      // Create new user
      const newUser = {
        name,
        email,
        password,
        createdAt: new Date().toISOString()
      };

      const response = await axios.post('http://localhost:4000/users', newUser);
      
      if (response.data) {
        // Auto-login after signup
        localStorage.setItem('user', JSON.stringify(response.data));
        navigate('/dashboard');
      }
    } catch {
      setError('Signup failed. Please try again.');
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
          <p className="text-xl text-white/90 font-semibold">Create your account</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="block text-white font-bold mb-2 text-lg">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-white/20 backdrop-blur-md border-2 border-white/40 rounded-xl text-white placeholder-white/60 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300 transition-all text-lg"
              required
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-white font-bold mb-2 text-lg">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white/20 backdrop-blur-md border-2 border-white/40 rounded-xl text-white placeholder-white/60 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-300 transition-all text-lg"
              required
              placeholder="Enter your email"
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
              placeholder="Create a password"
            />
          </div>

          <div>
            <label className="block text-white font-bold mb-2 text-lg">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white/20 backdrop-blur-md border-2 border-white/40 rounded-xl text-white placeholder-white/60 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 transition-all text-lg"
              required
              placeholder="Confirm your password"
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
            {loading ? '🔄 Creating account...' : '🚀 Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-white/90 text-lg">
            Already have an account?{' '}
            <span 
              className="text-yellow-300 font-bold cursor-pointer hover:text-yellow-200 hover:underline transition-all"
              onClick={() => navigate('/login')}
            >
              Login here
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

export default Signup;
