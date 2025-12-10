import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>404</h1>
        <h2 style={styles.subtitle}>Page Not Found</h2>
        <p style={styles.message}>
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <button style={styles.button} onClick={() => navigate('/')}>
          Go Home
        </button>
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
    backgroundColor: '#f9fafb',
    padding: '2rem',
  },
  content: {
    textAlign: 'center',
    backgroundColor: '#fff',
    padding: '3rem 2rem',
    borderRadius: '1rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    maxWidth: '500px',
  },
  title: {
    fontSize: '6rem',
    fontWeight: 'bold',
    color: '#2563eb',
    margin: 0,
  },
  subtitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#1f2937',
    marginTop: '1rem',
  },
  message: {
    fontSize: '1rem',
    color: '#6b7280',
    marginTop: '1rem',
  },
  button: {
    marginTop: '2rem',
    padding: '0.75rem 2rem',
    backgroundColor: '#2563eb',
    color: '#fff',
    border: 'none',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
  },
};

export default NotFound;
