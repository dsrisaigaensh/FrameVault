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
      <div className="min-h-screen">
        <Header />
        <div className="max-w-7xl mx-auto px-6 py-12 text-center">
          <p className="text-3xl text-white font-bold animate-pulse">🔄 Loading albums...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-5xl font-black text-white drop-shadow-2xl">📚 My Albums</h2>
          <button 
            onClick={() => setShowModal(true)}
            className="px-8 py-4 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white font-bold text-xl rounded-2xl hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-green-500/50 border-2 border-white/40"
          >
            ✨ + Create Album
          </button>
        </div>

        {albums.length === 0 ? (
          <div className="glass-effect p-16 rounded-3xl text-center">
            <p className="text-3xl text-white/90 font-bold">📸 No albums yet. Create your first album!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {albums.map((album, index) => (
              <AlbumCard
                key={album.id}
                album={album}
                onDelete={handleDeleteAlbum}
                index={index}
              />
            ))}
          </div>
        )}

        {showModal && (
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6"
            onClick={() => setShowModal(false)}
          >
            <div 
              className="glass-effect w-full max-w-md p-10 rounded-3xl shadow-2xl animate-float"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-4xl font-black text-center mb-8">
                <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                  ✨ Create New Album
                </span>
              </h3>
              <form onSubmit={handleCreateAlbum} className="space-y-6">
                <div>
                  <label className="block text-white font-bold mb-2 text-lg">Album Title</label>
                  <input
                    type="text"
                    value={newAlbum.title}
                    onChange={(e) =>
                      setNewAlbum({ ...newAlbum, title: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white/20 backdrop-blur-md border-2 border-white/40 rounded-xl text-white placeholder-white/60 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-300 transition-all text-lg"
                    required
                    placeholder="Enter album title"
                  />
                </div>

                <div>
                  <label className="block text-white font-bold mb-2 text-lg">Event Date</label>
                  <input
                    type="date"
                    value={newAlbum.eventDate}
                    onChange={(e) =>
                      setNewAlbum({ ...newAlbum, eventDate: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white/20 backdrop-blur-md border-2 border-white/40 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-300 transition-all text-lg"
                    required
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 py-3 bg-white/20 backdrop-blur-md text-white font-bold text-lg rounded-xl hover:bg-white/30 transition-all border-2 border-white/40"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-bold text-lg rounded-xl hover:scale-105 transition-all shadow-xl border-2 border-white/40"
                  >
                    🚀 Create
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

export default Dashboard;
