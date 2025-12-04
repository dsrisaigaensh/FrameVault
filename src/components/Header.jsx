import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <h1 style={styles.logo} onClick={() => navigate('/dashboard')}>
          📸 FrameVault
        </h1>
        {user.name && (
          <div style={styles.userSection}>
            <span style={styles.userName}>{user.name}</span>
            <button style={styles.logoutBtn} onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

const styles = {
  header: {
    backgroundColor: '#bfdbfe',
    borderBottom: '1px solid #e5e7eb',
    padding: '1rem 0',
    marginBottom: '2rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 1.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#1f2937',
    cursor: 'pointer',
    margin: 0,
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  userName: {
    color: '#4b5563',
    fontSize: '0.95rem',
  },
  logoutBtn: {
    padding: '0.5rem 1rem',
    backgroundColor: '#ef4444',
    color: '#fff',
    border: 'none',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
};

export default Header;
