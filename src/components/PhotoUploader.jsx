import { useState } from 'react';
import PropTypes from 'prop-types';

function PhotoUploader({ albumId, onPhotoAdded }) {
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  };

  const handleUpload = async () => {
    if (!preview) {
      alert('Please select an image first');
      return;
    }

    setUploading(true);

    const photoData = {
      albumId: parseInt(albumId),
      url: preview,
      caption: caption,
      uploadedAt: new Date().toISOString().split('T')[0],
    };

    try {
      await onPhotoAdded(photoData);
      setPreview(null);
      setCaption('');
      document.getElementById('fileInput').value = '';
    } catch (err) {
      console.error('Failed to upload photo:', err);
      alert('Failed to upload photo');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Upload New Photo</h3>

      <div style={styles.uploadBox}>
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={styles.fileInput}
        />

        {preview && (
          <div style={styles.previewContainer}>
            <img src={preview} alt="Preview" style={styles.preview} />
          </div>
        )}

        <input
          type="text"
          placeholder="Add a caption (optional)"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          style={styles.captionInput}
        />

        <button
          onClick={handleUpload}
          disabled={uploading || !preview}
          style={{
            ...styles.uploadBtn,
            opacity: uploading || !preview ? 0.5 : 1,
            cursor: uploading || !preview ? 'not-allowed' : 'pointer',
          }}
        >
          {uploading ? 'Uploading...' : 'Upload Photo'}
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#f9fafb',
    border: '1px solid #e5e7eb',
    borderRadius: '0.75rem',
    padding: '2rem',
    marginBottom: '2.5rem',
  },
  title: {
    fontSize: '1.35rem',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '1.25rem',
  },
  uploadBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  fileInput: {
    padding: '0.75rem',
    border: '1px solid #d1d5db',
    borderRadius: '0.5rem',
    backgroundColor: '#fff',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  previewContainer: {
    width: '100%',
    maxWidth: '350px',
    margin: '0 auto',
  },
  preview: {
    width: '100%',
    height: '240px',
    objectFit: 'cover',
    borderRadius: '0.5rem',
    border: '2px solid #e5e7eb',
  },
  captionInput: {
    padding: '0.875rem',
    border: '1px solid #d1d5db',
    borderRadius: '0.5rem',
    fontSize: '1.05rem',
    outline: 'none',
  },
  uploadBtn: {
    padding: '0.875rem 1.75rem',
    backgroundColor: '#2563eb',
    color: '#fff',
    border: 'none',
    borderRadius: '0.5rem',
    fontSize: '1.1rem',
    fontWeight: '500',
  },
};

PhotoUploader.propTypes = {
  albumId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onPhotoAdded: PropTypes.func.isRequired,
};

export default PhotoUploader;
