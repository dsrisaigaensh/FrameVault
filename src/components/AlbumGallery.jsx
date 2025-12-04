import PropTypes from 'prop-types';
import { useState } from 'react';

function AlbumGallery({ photos, onDeletePhoto }) {
  const [hoveredBtn, setHoveredBtn] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handleDelete = (photoId, event) => {
    event.stopPropagation(); // Prevent opening the lightbox
    if (window.confirm('Are you sure you want to delete this photo?')) {
      onDeletePhoto(photoId);
    }
  };

  const openLightbox = (photo) => {
    setSelectedPhoto(photo);
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
    }
  };

  if (!photos || photos.length === 0) {
    return (
      <div style={styles.empty}>
        <p>No photos in this album yet.</p>
      </div>
    );
  }

  return (
    <>
      <div style={styles.gallery}>
        {photos.map((photo) => (
          <div 
            key={photo.id} 
            style={styles.photoCard}
            onClick={() => openLightbox(photo)}
          >
            <div style={styles.imageContainer}>
              <img
                src={photo.url}
                alt={photo.caption || 'Photo'}
                style={styles.image}
              />
              <button
                style={{
                  ...styles.deleteBtn,
                  ...(hoveredBtn === photo.id ? styles.deleteBtnHover : {}),
                }}
                onMouseEnter={() => setHoveredBtn(photo.id)}
                onMouseLeave={() => setHoveredBtn(null)}
                onClick={(e) => handleDelete(photo.id, e)}
                title="Delete photo"
              >
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
              </button>
            </div>
            {photo.caption && <p style={styles.caption}>{photo.caption}</p>}
          </div>
        ))}
      </div>

      {selectedPhoto && (
        <div 
          style={styles.lightbox} 
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
        >
          <div style={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <button 
              style={styles.closeBtn} 
              onClick={closeLightbox}
              aria-label="Close"
            >
              ✕
            </button>
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.caption || 'Photo'}
              style={styles.lightboxImage}
            />
            {selectedPhoto.caption && (
              <p style={styles.lightboxCaption}>{selectedPhoto.caption}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

const styles = {
  gallery: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '1.5rem',
    marginTop: '2rem',
  },
  photoCard: {
    backgroundColor: '#fff',
    border: '1px solid #e5e7eb',
    borderRadius: '0.75rem',
    overflow: 'hidden',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    cursor: 'pointer',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    display: 'block',
  },
  deleteBtn: {
    position: 'absolute',
    top: '0.75rem',
    right: '0.75rem',
    backgroundColor: '#fff',
    color: '#dc2626',
    border: '2px solid #dc2626',
    borderRadius: '50%',
    width: '44px',
    height: '44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '1.3rem',
    lineHeight: 1,
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)',
  },
  deleteBtnHover: {
    backgroundColor: '#dc2626',
    color: '#fff',
    transform: 'scale(1.05)',
    boxShadow: '0 4px 14px rgba(220, 38, 38, 0.3)',
  },
  caption: {
    padding: '0.75rem',
    fontSize: '0.9rem',
    color: '#4b5563',
    margin: 0,
  },
  empty: {
    textAlign: 'center',
    padding: '3rem',
    color: '#9ca3af',
    fontSize: '1.1rem',
  },
  lightbox: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '2rem',
    animation: 'fadeIn 0.3s ease',
  },
  lightboxContent: {
    position: 'relative',
    maxWidth: '90vw',
    maxHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  lightboxImage: {
    maxWidth: '100%',
    maxHeight: '80vh',
    objectFit: 'contain',
    borderRadius: '0.5rem',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
  },
  lightboxCaption: {
    color: '#fff',
    fontSize: '1.1rem',
    marginTop: '1.5rem',
    textAlign: 'center',
    maxWidth: '600px',
  },
  closeBtn: {
    position: 'absolute',
    top: '-3rem',
    right: 0,
    backgroundColor: 'transparent',
    color: '#fff',
    border: '2px solid rgba(255, 255, 255, 0.8)',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    fontSize: '1.5rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
    lineHeight: 1,
  },
};

AlbumGallery.propTypes = {
  photos: PropTypes.array.isRequired,
  onDeletePhoto: PropTypes.func.isRequired,
};

export default AlbumGallery;
