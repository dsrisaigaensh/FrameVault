import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import AlbumGallery from '../components/AlbumGallery';
import PhotoUploader from '../components/PhotoUploader';
import { getAlbumById, getPhotosByAlbum, createPhoto, createShare, deletePhoto } from '../api/api';

function AlbumView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [album, setAlbum] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shareLink, setShareLink] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.id) {
      navigate('/login');
      return;
    }

    const fetchAlbumData = async () => {
      try {
        const albumData = await getAlbumById(id);
        const photosData = await getPhotosByAlbum(id);
        setAlbum(albumData);
        setPhotos(photosData);
      } catch (error) {
        console.error('Failed to fetch album:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbumData();
  }, [id, navigate]);

  const handlePhotoAdded = async (photoData) => {
    const created = await createPhoto(photoData);
    setPhotos([...photos, created]);
  };

  const handleDeletePhoto = async (photoId) => {
    try {
      await deletePhoto(photoId);
      setPhotos(photos.filter(photo => photo.id !== photoId));
    } catch (err) {
      console.error('Failed to delete photo:', err);
      alert('Failed to delete photo. Please try again.');
    }
  };

  const handleGenerateShareLink = async () => {
    const token = Math.random().toString(36).substring(2, 15);
    const shareData = {
      albumId: parseInt(id),
      token: token,
      createdAt: new Date().toISOString().split('T')[0],
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0],
    };

    try {
      await createShare(shareData);
      const link = `${window.location.origin}/s/${token}`;
      setShareLink(link);
    } catch (err) {
      console.error('Failed to generate share link:', err);
      alert('Failed to generate share link');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink);
    alert('Link copied to clipboard!');
  };

  if (loading) {
    return (
      <div>
        <Header />
        <div style={styles.container}>
          <p style={styles.loading}>Loading album...</p>
        </div>
      </div>
    );
  }

  if (!album) {
    return (
      <div>
        <Header />
        <div style={styles.container}>
          <p style={styles.error}>Album not found</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div style={styles.container}>
        <div style={styles.header}>
          <button style={styles.backBtn} onClick={() => navigate('/dashboard')}>
            ← Back to Dashboard
          </button>
        </div>

        <div style={styles.albumInfo}>
          <h2 style={styles.title}>{album.title}</h2>
          <p style={styles.date}>Event Date: {album.eventDate}</p>
          <p style={styles.photoCount}>{photos.length} photos</p>
        </div>

        <div style={styles.shareSection}>
          <button style={styles.shareBtn} onClick={handleGenerateShareLink}>
            Generate Share Link
          </button>
          {shareLink && (
            <div style={styles.shareLinkBox}>
              <input
                type="text"
                value={shareLink}
                readOnly
                style={styles.shareLinkInput}
              />
              <button style={styles.copyBtn} onClick={copyToClipboard}>
                Copy
              </button>
            </div>
          )}
        </div>

        <PhotoUploader albumId={id} onPhotoAdded={handlePhotoAdded} />

        <AlbumGallery photos={photos} onDeletePhoto={handleDeletePhoto} />
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 1.5rem',
  },
  header: {
    marginBottom: '2rem',
  },
  backBtn: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#f3f4f6',
    color: '#374151',
    border: '1px solid #d1d5db',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    fontSize: '1.05rem',
    fontWeight: '500',
  },
  albumInfo: {
    backgroundColor: '#fff',
    border: '1px solid #e5e7eb',
    borderRadius: '0.75rem',
    padding: '2.5rem',
    marginBottom: '2.5rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '0.75rem',
  },
  date: {
    fontSize: '1.1rem',
    color: '#6b7280',
    marginBottom: '0.5rem',
  },
  photoCount: {
    fontSize: '1.05rem',
    color: '#9ca3af',
    margin: 0,
  },
  shareSection: {
    marginBottom: '2.5rem',
  },
  shareBtn: {
    padding: '0.875rem 1.75rem',
    backgroundColor: '#059669',
    color: '#fff',
    border: 'none',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    fontSize: '1.1rem',
    fontWeight: '500',
  },
  shareLinkBox: {
    display: 'flex',
    gap: '0.75rem',
    marginTop: '1.25rem',
    padding: '1.25rem',
    backgroundColor: '#f0fdf4',
    border: '1px solid #86efac',
    borderRadius: '0.5rem',
  },
  shareLinkInput: {
    flex: 1,
    padding: '0.75rem',
    border: '1px solid #d1d5db',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    backgroundColor: '#fff',
  },
  copyBtn: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#059669',
    color: '#fff',
    border: 'none',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500',
  },
  loading: {
    textAlign: 'center',
    fontSize: '1.4rem',
    color: '#6b7280',
    padding: '3rem',
  },
  error: {
    textAlign: 'center',
    fontSize: '1.4rem',
    color: '#dc2626',
    padding: '3rem',
  },
};

export default AlbumView;
