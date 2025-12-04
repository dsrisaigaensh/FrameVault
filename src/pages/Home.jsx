import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.logo}>📸 FrameVault</h1>
          <div style={styles.authButtons}>
            <button style={styles.loginBtn} onClick={() => navigate('/login')}>
              Login
            </button>
            <button style={styles.signupBtn} onClick={() => navigate('/signup')}>
              Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h2 style={styles.heroTitle}>
            Your Memories, Beautifully Organized
          </h2>
          <p style={styles.heroSubtitle}>
            FrameVault is the perfect platform to store, organize, and share your special moments. 
            Create beautiful photo albums for weddings, birthdays, travel, and all life&apos;s precious events.
          </p>
          <button style={styles.ctaButton} onClick={() => navigate('/signup')}>
            Get Started Free
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section style={styles.features}>
        <h3 style={styles.featuresTitle}>Why Choose FrameVault?</h3>
        <div style={styles.featuresGrid}>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>📁</div>
            <h4 style={styles.featureTitle}>Organize Albums</h4>
            <p style={styles.featureText}>
              Create unlimited albums to organize your photos by events, dates, or themes.
            </p>
          </div>

          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>🔗</div>
            <h4 style={styles.featureTitle}>Easy Sharing</h4>
            <p style={styles.featureText}>
              Generate shareable links to let friends and family view your albums instantly.
            </p>
          </div>

          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>🖼️</div>
            <h4 style={styles.featureTitle}>Beautiful Gallery</h4>
            <p style={styles.featureText}>
              Display your photos in an elegant, responsive gallery that looks great everywhere.
            </p>
          </div>

          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>🔒</div>
            <h4 style={styles.featureTitle}>Secure & Private</h4>
            <p style={styles.featureText}>
              Your photos are safe with us. Control who can view your albums with secure sharing.
            </p>
          </div>

          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>📅</div>
            <h4 style={styles.featureTitle}>Event-Based Organization</h4>
            <p style={styles.featureText}>
              Tag albums with event dates and keep your memories organized chronologically for easy browsing.
            </p>
          </div>

          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>💬</div>
            <h4 style={styles.featureTitle}>Photo Captions</h4>
            <p style={styles.featureText}>
              Add meaningful captions to your photos to tell the story behind each special moment.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section style={styles.about}>
        <div style={styles.aboutContent}>
          <h3 style={styles.aboutTitle}>About FrameVault</h3>
          <p style={styles.aboutText}>
            FrameVault was created with one goal in mind: to make photo sharing and organization 
            simple and beautiful. Whether you&apos;re a professional photographer managing client galleries 
            or someone who loves capturing life&apos;s moments, FrameVault provides the tools you need 
            to showcase your memories in style.
          </p>
          <p style={styles.aboutText}>
            With intuitive album creation, drag-and-drop uploads, and instant sharing capabilities, 
            preserving and sharing your favorite moments has never been easier. Join thousands of 
            users who trust FrameVault to keep their memories safe and accessible.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p style={styles.footerText}>
          © 2025 FrameVault. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#e0f2fe',
  },
  header: {
    backgroundColor: '#fff',
    borderBottom: '1px solid #e5e7eb',
    padding: '1rem 0',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  headerContent: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 1.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: '1.75rem',
    fontWeight: 'bold',
    color: '#1f2937',
    margin: 0,
  },
  authButtons: {
    display: 'flex',
    gap: '1rem',
  },
  loginBtn: {
    padding: '0.625rem 1.5rem',
    backgroundColor: 'transparent',
    color: '#2563eb',
    border: '2px solid #2563eb',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'all 0.2s',
  },
  signupBtn: {
    padding: '0.625rem 1.5rem',
    backgroundColor: '#2563eb',
    color: '#fff',
    border: '2px solid #2563eb',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'all 0.2s',
  },
  hero: {
    backgroundColor: '#e0f2fe',
    padding: '6rem 1.5rem',
    textAlign: 'center',
  },
  heroContent: {
    maxWidth: '900px',
    margin: '0 auto',
  },
  heroTitle: {
    fontSize: '3.5rem',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '1.5rem',
    lineHeight: 1.2,
  },
  heroSubtitle: {
    fontSize: '1.35rem',
    color: '#4b5563',
    marginBottom: '2.5rem',
    lineHeight: 1.6,
  },
  ctaButton: {
    padding: '1rem 2.5rem',
    backgroundColor: '#2563eb',
    color: '#fff',
    border: 'none',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    fontSize: '1.2rem',
    fontWeight: '600',
    boxShadow: '0 4px 6px rgba(37, 99, 235, 0.3)',
    transition: 'all 0.2s',
  },
  features: {
    padding: '5rem 1.5rem',
    backgroundColor: '#e0f2fe',
  },
  featuresTitle: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: '3rem',
  },
  featuresGrid: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2rem',
  },
  featureCard: {
    backgroundColor: '#f9fafb',
    padding: '2.5rem',
    borderRadius: '1rem',
    textAlign: 'center',
    border: '1px solid #e5e7eb',
    transition: 'all 0.2s',
  },
  featureIcon: {
    fontSize: '3.5rem',
    marginBottom: '1.5rem',
  },
  featureTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '1rem',
  },
  featureText: {
    fontSize: '1.05rem',
    color: '#6b7280',
    lineHeight: 1.6,
  },
  about: {
    padding: '5rem 1.5rem',
    backgroundColor: '#e0f2fe',
  },
  aboutContent: {
    maxWidth: '900px',
    margin: '0 auto',
  },
  aboutTitle: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '2rem',
    textAlign: 'center',
  },
  aboutText: {
    fontSize: '1.15rem',
    color: '#4b5563',
    lineHeight: 1.8,
    marginBottom: '1.5rem',
    textAlign: 'center',
  },
  footer: {
    backgroundColor: '#1f2937',
    padding: '2rem 1.5rem',
    marginTop: 'auto',
  },
  footerText: {
    fontSize: '1rem',
    color: '#9ca3af',
    textAlign: 'center',
    margin: 0,
  },
};

export default Home;
