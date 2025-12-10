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
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center py-20">
            <div className="inline-block animate-spin text-6xl mb-4">⏳</div>
            <p className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Loading album...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!album) {
    return (
      <div>
        <Header />
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center py-20">
            <div className="text-6xl mb-4">❌</div>
            <p className="text-2xl font-bold bg-gradient-to-r from-red-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
              Album not found
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="mb-8">
          <button 
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 bg-white/20 backdrop-blur-md border-2 border-white/40 rounded-xl text-white font-bold text-lg hover:scale-105 hover:bg-white/30 transition-all duration-300 shadow-xl flex items-center gap-2"
          >
            <span>⬅️</span> Back to Dashboard
          </button>
        </div>

        <div className="glass-effect rounded-3xl p-8 mb-8 border-4 border-white/40 shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 animate-float">
          <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent drop-shadow-lg">
            {album.title}
          </h2>
          <p className="text-xl text-white/90 mb-2 flex items-center gap-2">
            <span>📅</span> Event Date: <span className="font-bold text-yellow-300">{album.eventDate}</span>
          </p>
          <p className="text-lg text-white/80 flex items-center gap-2">
            <span>📸</span> {photos.length} photos
          </p>
        </div>

        <div className="mb-8">
          <button 
            onClick={handleGenerateShareLink}
            className="px-8 py-4 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 text-white font-bold text-xl rounded-2xl hover:scale-110 transition-all duration-300 shadow-xl hover:shadow-green-500/50 border-3 border-white/40 flex items-center gap-2"
          >
            <span>🔗</span> Generate Share Link
          </button>
          {shareLink && (
            <div className="mt-6 glass-effect p-6 rounded-2xl border-3 border-green-300/50 shadow-xl animate-float">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={shareLink}
                  readOnly
                  className="flex-1 px-4 py-3 bg-white/90 border-2 border-green-300 rounded-xl text-gray-800 font-semibold text-lg focus:outline-none focus:ring-4 focus:ring-green-400/50"
                />
                <button 
                  onClick={copyToClipboard}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 via-emerald-600 to-teal-600 text-white font-bold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg flex items-center gap-2"
                >
                  <span>📋</span> Copy
                </button>
              </div>
            </div>
          )}
        </div>

        <PhotoUploader albumId={id} onPhotoAdded={handlePhotoAdded} />

        <AlbumGallery photos={photos} onDeletePhoto={handleDeletePhoto} />
      </div>
    </div>
  );
}

export default AlbumView;
