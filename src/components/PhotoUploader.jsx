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
    <div className="glass-effect rounded-3xl p-8 mb-8 border-4 border-white/40 shadow-2xl hover:shadow-blue-500/30 transition-all duration-300">
      <h3 className="text-3xl font-black mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent flex items-center gap-2">
        <span>📤</span> Upload New Photo
      </h3>

      <div className="flex flex-col gap-5">
        <div className="relative">
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-4 py-3 bg-white/90 border-3 border-purple-300 rounded-xl text-gray-800 font-semibold text-lg cursor-pointer hover:bg-white transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-400/50 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gradient-to-r file:from-purple-500 file:to-pink-500 file:text-white file:font-bold file:cursor-pointer hover:file:scale-105"
          />
        </div>

        {preview && (
          <div className="w-full max-w-md mx-auto animate-float">
            <img 
              src={preview} 
              alt="Preview" 
              className="w-full h-64 object-cover rounded-2xl border-4 border-white/60 shadow-xl hover:scale-105 transition-all duration-300"
            />
          </div>
        )}

        <input
          type="text"
          placeholder="Add a caption (optional)"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="px-4 py-3 bg-white/90 border-3 border-blue-300 rounded-xl text-gray-800 font-semibold text-lg focus:outline-none focus:ring-4 focus:ring-blue-400/50 focus:border-blue-400 transition-all duration-300 placeholder:text-gray-400"
        />

        <button
          onClick={handleUpload}
          disabled={uploading || !preview}
          className={`px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold text-xl rounded-2xl transition-all duration-300 shadow-xl flex items-center justify-center gap-2 ${
            uploading || !preview 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:scale-105 hover:shadow-purple-500/50'
          }`}
        >
          <span>{uploading ? '⏳' : '🚀'}</span>
          {uploading ? 'Uploading...' : 'Upload Photo'}
        </button>
      </div>
    </div>
  );
}

PhotoUploader.propTypes = {
  albumId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onPhotoAdded: PropTypes.func.isRequired,
};

export default PhotoUploader;
