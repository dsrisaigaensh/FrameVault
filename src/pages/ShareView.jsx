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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin text-6xl mb-4">⏳</div>
          <p className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Loading shared album...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="glass-effect p-12 rounded-3xl border-4 border-red-300/50 max-w-lg text-center shadow-2xl">
          <div className="text-6xl mb-4">😢</div>
          <h2 className="text-4xl font-black mb-4 bg-gradient-to-r from-red-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
            Oops!
          </h2>
          <p className="text-xl text-white/90 font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="glass-effect border-b border-white/30 py-6 text-center shadow-xl">
        <h1 className="text-5xl font-black mb-2 flex items-center justify-center gap-2">
          <span className="text-6xl animate-pulse-slow">📸</span>
          <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent drop-shadow-lg">
            FrameVault
          </span>
        </h1>
        <p className="text-xl text-white/90 font-semibold">Shared Album</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="glass-effect rounded-3xl p-10 mb-10 border-4 border-white/40 shadow-2xl text-center hover:shadow-purple-500/30 transition-all duration-300 animate-float">
          <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent drop-shadow-lg">
            {album.title}
          </h2>
          <p className="text-2xl text-white/90 mb-2 flex items-center justify-center gap-2">
            <span>📅</span> Event Date: <span className="font-bold text-yellow-300">{album.eventDate}</span>
          </p>
          <p className="text-xl text-white/80 flex items-center justify-center gap-2">
            <span>📸</span> {photos.length} photos
          </p>
        </div>

        <AlbumGallery photos={photos} showDelete={false} showDownload={true} />
      </div>
    </div>
  );
}

export default ShareView;
