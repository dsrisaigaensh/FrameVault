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
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.logo}>📸 FrameVault</h1>
        <p style={styles.subtitle}>Login to manage your albums</p>

        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div style={styles.demoInfo}>
          <p style={styles.demoText}>Demo credentials:</p>
          <p style={styles.demoCredentials}>Email: demo@framevault.test</p>
          <p style={styles.demoCredentials}>Password: demo</p>
        </div>

        <div style={styles.signupLink}>
          <p style={styles.signupText}>
            Don&apos;t have an account?{' '}
            <span 
              style={styles.link} 
              onClick={() => navigate('/signup')}
            >
              Sign up here
            </span>
          </p>
        </div>
        
        <div style={styles.homeLink}>
          <button 
            style={styles.homeButton}
            onClick={() => navigate('/')}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e0f2fe',
    padding: '1rem',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '1rem',
    padding: '2.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '500px',
  },
  logo: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#2563eb',
    textAlign: 'center',
    marginBottom: '0.5rem',
  },
  subtitle: {
    textAlign: 'center',
    color: '#6b7280',
    marginBottom: '2rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    fontSize: '0.9rem',
    fontWeight: '500',
    color: '#374151',
  },
  input: {
    padding: '0.75rem',
    border: '1px solid #d1d5db',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    outline: 'none',
  },
  button: {
    padding: '0.875rem',
    backgroundColor: '#2563eb',
    color: '#fff',
    border: 'none',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
  error: {
    color: '#dc2626',
    fontSize: '0.9rem',
    textAlign: 'center',
    margin: 0,
  },
  demoInfo: {
    marginTop: '2rem',
    padding: '1rem',
    backgroundColor: '#f9fafb',
    borderRadius: '0.5rem',
    border: '1px solid #e5e7eb',
  },
  demoText: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#4b5563',
    marginBottom: '0.5rem',
  },
  demoCredentials: {
    fontSize: '0.8rem',
    color: '#6b7280',
    margin: '0.25rem 0',
  },
  signupLink: {
    marginTop: '1.5rem',
    textAlign: 'center',
  },
  signupText: {
    fontSize: '0.9rem',
    color: '#6b7280',
  },
  link: {
    color: '#2563eb',
    fontWeight: '600',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  homeLink: {
    marginTop: '1rem',
    textAlign: 'center',
  },
  homeButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#f3f4f6',
    color: '#4b5563',
    border: '1px solid #d1d5db',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    fontSize: '0.95rem',
    fontWeight: '500',
  },
};

export default Login;
