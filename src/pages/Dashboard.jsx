import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import AlbumCard from '../components/AlbumCard';
import { getAlbums, createAlbum, deleteAlbum } from '../api/api';

function Dashboard() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newAlbum, setNewAlbum] = useState({ title: '', eventDate: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.id) {
      navigate('/login');
      return;
    }
    fetchAlbums(user.id);
  }, [navigate]);

  const fetchAlbums = async (userId) => {
    try {
      const data = await getAlbums(userId);
      setAlbums(data);
    } catch (error) {
      console.error('Failed to fetch albums:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAlbum = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const albumData = {
      userId: user.id,
      title: newAlbum.title,
      eventDate: newAlbum.eventDate,
      createdAt: new Date().toISOString().split('T')[0],
    };

    try {
      const created = await createAlbum(albumData);
      setAlbums([...albums, created]);
      setShowModal(false);
      setNewAlbum({ title: '', eventDate: '' });
    } catch (err) {
      console.error('Failed to create album:', err);
      alert('Failed to create album');
    }
  };

  const handleDeleteAlbum = async (id) => {
    if (!window.confirm('Are you sure you want to delete this album?')) {
      return;
    }

    try {
      await deleteAlbum(id);
      setAlbums(albums.filter((album) => album.id !== id));
    } catch (err) {
      console.error('Failed to delete album:', err);
      alert('Failed to delete album');
    }
  };

  if (loading) {
    return (
      <div>
        <Header />
        <div style={styles.container}>
          <p style={styles.loading}>Loading albums...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>My Albums</h2>
          <button style={styles.createBtn} onClick={() => setShowModal(true)}>
            + Create Album
          </button>
        </div>

        {albums.length === 0 ? (
          <div style={styles.empty}>
            <p>No albums yet. Create your first album!</p>
          </div>
        ) : (
          <div style={styles.grid}>
            {albums.map((album) => (
              <AlbumCard
                key={album.id}
                album={album}
                onDelete={handleDeleteAlbum}
              />
            ))}
          </div>
        )}

        {showModal && (
          <div style={styles.modalOverlay} onClick={() => setShowModal(false)}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
              <h3 style={styles.modalTitle}>Create New Album</h3>
              <form onSubmit={handleCreateAlbum} style={styles.form}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Album Title</label>
                  <input
                    type="text"
                    value={newAlbum.title}
                    onChange={(e) =>
                      setNewAlbum({ ...newAlbum, title: e.target.value })
                    }
                    style={styles.input}
                    required
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Event Date</label>
                  <input
                    type="date"
                    value={newAlbum.eventDate}
                    onChange={(e) =>
                      setNewAlbum({ ...newAlbum, eventDate: e.target.value })
                    }
                    style={styles.input}
                    required
                  />
                </div>

                <div style={styles.modalActions}>
                  <button
                    type="button"
                    style={styles.cancelBtn}
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" style={styles.submitBtn}>
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
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
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2.5rem',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#1f2937',
  },
  createBtn: {
    padding: '0.875rem 1.75rem',
    backgroundColor: '#2563eb',
    color: '#fff',
    border: 'none',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    fontSize: '1.1rem',
    fontWeight: '500',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
    gap: '2rem',
  },
  loading: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#6b7280',
    padding: '3rem',
  },
  empty: {
    textAlign: 'center',
    padding: '4rem 2rem',
    backgroundColor: '#f9fafb',
    borderRadius: '0.75rem',
    border: '2px dashed #d1d5db',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: '0.75rem',
    padding: '2rem',
    width: '90%',
    maxWidth: '500px',
    boxShadow: '0 20px 25px rgba(0, 0, 0, 0.15)',
  },
  modalTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '1.5rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
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
  modalActions: {
    display: 'flex',
    gap: '1rem',
    marginTop: '1rem',
  },
  cancelBtn: {
    flex: 1,
    padding: '0.75rem',
    backgroundColor: '#f3f4f6',
    color: '#374151',
    border: 'none',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500',
  },
  submitBtn: {
    flex: 1,
    padding: '0.75rem',
    backgroundColor: '#2563eb',
    color: '#fff',
    border: 'none',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500',
  },
};

export default Dashboard;
