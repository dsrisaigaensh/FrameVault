import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AlbumGallery from '../components/AlbumGallery';
import { getShareByToken, getAlbumById, getPhotosByAlbum } from '../api/api';

function ShareView() {
  const { token } = useParams();
  const [album, setAlbum] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSharedAlbum = async () => {
      try {
        const share = await getShareByToken(token);

        if (!share) {
          setError('Invalid or expired share link');
          setLoading(false);
          return;
        }

        const currentDate = new Date().toISOString().split('T')[0];
        if (share.expiresAt < currentDate) {
          setError('This share link has expired');
          setLoading(false);
          return;
        }

        const albumData = await getAlbumById(share.albumId);
        const photosData = await getPhotosByAlbum(share.albumId);

        setAlbum(albumData);
        setPhotos(photosData);
      } catch {
        setError('Failed to load shared album');
      } finally {
        setLoading(false);
      }
    };

    fetchSharedAlbum();
  }, [token]);

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.centerContent}>
          <p style={styles.loading}>Loading shared album...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.centerContent}>
          <div style={styles.errorBox}>
            <h2 style={styles.errorTitle}>Oops!</h2>
            <p style={styles.errorMessage}>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.logo}>📸 FrameVault</h1>
        <p style={styles.subtitle}>Shared Album</p>
      </div>

      <div style={styles.content}>
        <div style={styles.albumInfo}>
          <h2 style={styles.title}>{album.title}</h2>
          <p style={styles.date}>Event Date: {album.eventDate}</p>
          <p style={styles.photoCount}>{photos.length} photos</p>
        </div>

        <AlbumGallery photos={photos} />
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#e0f2fe',
  },
  header: {
    backgroundColor: '#bfdbfe',
    borderBottom: '1px solid #e5e7eb',
    padding: '1.5rem',
    textAlign: 'center',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  logo: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#2563eb',
    margin: '0 0 0.5rem 0',
  },
  subtitle: {
    color: '#6b7280',
    fontSize: '0.95rem',
    margin: 0,
  },
  content: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 1rem',
  },
  albumInfo: {
    backgroundColor: '#fff',
    border: '1px solid #e5e7eb',
    borderRadius: '0.75rem',
    padding: '2rem',
    marginBottom: '2rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '0.5rem',
  },
  date: {
    fontSize: '1rem',
    color: '#6b7280',
    marginBottom: '0.25rem',
  },
  photoCount: {
    fontSize: '0.95rem',
    color: '#9ca3af',
    margin: 0,
  },
  centerContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '2rem',
  },
  loading: {
    fontSize: '1.2rem',
    color: '#6b7280',
  },
  errorBox: {
    backgroundColor: '#fff',
    border: '2px solid #fca5a5',
    borderRadius: '0.75rem',
    padding: '3rem 2rem',
    textAlign: 'center',
    maxWidth: '500px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  errorTitle: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#dc2626',
    marginBottom: '1rem',
  },
  errorMessage: {
    fontSize: '1.1rem',
    color: '#6b7280',
  },
};

export default ShareView;
