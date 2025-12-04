import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function AlbumCard({ album, onDelete }) {
  const navigate = useNavigate();

  return (
    <div style={styles.card}>
      <div style={styles.content}>
        <h3 style={styles.title}>{album.title}</h3>
        <p style={styles.date}>Event Date: {album.eventDate}</p>
        <p style={styles.created}>Created: {album.createdAt}</p>
      </div>
      <div style={styles.actions}>
        <button
          style={styles.viewBtn}
          onClick={() => navigate(`/album/${album.id}`)}
        >
          View Album
        </button>
        {onDelete && (
          <button
            style={styles.deleteBtn}
            onClick={() => onDelete(album.id)}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: '#fff',
    border: '1px solid #e5e7eb',
    borderRadius: '0.75rem',
    padding: '2rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.2s',
    cursor: 'pointer',
  },
  content: {
    marginBottom: '1.5rem',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '0.75rem',
  },
  date: {
    color: '#6b7280',
    fontSize: '1rem',
    marginBottom: '0.5rem',
  },
  created: {
    color: '#9ca3af',
    fontSize: '0.95rem',
  },
  actions: {
    display: 'flex',
    gap: '0.75rem',
  },
  viewBtn: {
    flex: 1,
    padding: '0.75rem 1.25rem',
    backgroundColor: '#2563eb',
    color: '#fff',
    border: 'none',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500',
  },
  deleteBtn: {
    padding: '0.75rem 1.25rem',
    backgroundColor: '#dc2626',
    color: '#fff',
    border: 'none',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500',
  },
};

AlbumCard.propTypes = {
  album: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    eventDate: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func,
};

export default AlbumCard;
