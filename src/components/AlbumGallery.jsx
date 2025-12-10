import PropTypes from 'prop-types';
import { useState } from 'react';

function AlbumGallery({ photos, onDeletePhoto, showDelete = true, showDownload = false }) {
  const [hoveredBtn, setHoveredBtn] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handleDelete = (photoId, event) => {
    event.stopPropagation(); // Prevent opening the lightbox
    if (window.confirm('Are you sure you want to delete this photo?')) {
      onDeletePhoto(photoId);
    }
  };

  const handleDownload = async (photo, event) => {
    event.stopPropagation(); // Prevent opening the lightbox
    try {
      const response = await fetch(photo.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${photo.caption || 'photo'}-${photo.id}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download image. Please try again.');
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
      <div className="text-center py-16">
        <div className="text-6xl mb-4">📭</div>
        <p className="text-2xl font-bold bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 bg-clip-text text-transparent">
          No photos in this album yet.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {photos.map((photo, index) => {
          const gradients = [
            'from-pink-400 via-rose-400 to-red-400',
            'from-blue-400 via-cyan-400 to-teal-400',
            'from-yellow-400 via-orange-400 to-red-400',
            'from-purple-400 via-pink-400 to-rose-400',
            'from-green-400 via-emerald-400 to-teal-400',
            'from-indigo-400 via-purple-400 to-pink-400',
          ];
          const gradient = gradients[index % gradients.length];
          
          return (
            <div 
              key={photo.id} 
              className={`glass-effect rounded-2xl overflow-hidden shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer border-4 border-white/40 hover:shadow-2xl bg-gradient-to-br ${gradient} p-1`}
              onClick={() => openLightbox(photo)}
            >
              <div className="relative bg-white rounded-xl overflow-hidden">
                <img
                  src={photo.url}
                  alt={photo.caption || 'Photo'}
                  className="w-full h-56 object-cover"
                />
                {showDelete && (
                  <button
                    className={`absolute top-3 right-3 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
                      hoveredBtn === photo.id 
                        ? 'bg-red-500 text-white scale-110' 
                        : 'bg-white text-red-500 border-2 border-red-500'
                    }`}
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
                )}
                {showDownload && (
                  <button
                    className={`absolute top-3 right-3 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
                      hoveredBtn === `download-${photo.id}` 
                        ? 'bg-green-500 text-white scale-110' 
                        : 'bg-white text-green-500 border-2 border-green-500'
                    }`}
                    onMouseEnter={() => setHoveredBtn(`download-${photo.id}`)}
                    onMouseLeave={() => setHoveredBtn(null)}
                    onClick={(e) => handleDownload(photo, e)}
                    title="Download photo"
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
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                  </button>
                )}
              </div>
              {photo.caption && (
                <p className="px-4 py-3 text-sm font-semibold text-gray-700 bg-white/90 rounded-b-xl">
                  {photo.caption}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {selectedPhoto && (
        <div 
          className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-8 animate-fadeIn backdrop-blur-sm"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
        >
          <div className="relative max-w-[90vw] max-h-[90vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <button 
              className="absolute -top-12 right-0 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/60 text-white text-2xl flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all duration-300 shadow-xl"
              onClick={closeLightbox}
              aria-label="Close"
            >
              ✕
            </button>
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.caption || 'Photo'}
              className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl border-4 border-white/40"
            />
            {selectedPhoto.caption && (
              <p className="text-white text-xl font-bold mt-6 text-center max-w-2xl bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border-2 border-white/30">
                {selectedPhoto.caption}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

AlbumGallery.propTypes = {
  photos: PropTypes.array.isRequired,
  onDeletePhoto: PropTypes.func,
  showDelete: PropTypes.bool,
  showDownload: PropTypes.bool,
};

export default AlbumGallery;
