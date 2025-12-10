import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const gradients = [
  'from-pink-400 via-purple-400 to-indigo-400',
  'from-green-400 via-blue-400 to-purple-400',
  'from-yellow-400 via-orange-400 to-red-400',
  'from-cyan-400 via-blue-400 to-purple-400',
  'from-rose-400 via-pink-400 to-purple-400',
  'from-emerald-400 via-teal-400 to-cyan-400',
];

const backgroundColors = [
  'bg-pink-50',
  'bg-blue-50',
  'bg-yellow-50',
  'bg-purple-50',
  'bg-green-50',
  'bg-orange-50',
];

function AlbumCard({ album, onDelete, index = 0 }) {
  const navigate = useNavigate();
  const gradientClass = gradients[index % gradients.length];
  const bgColorClass = backgroundColors[index % backgroundColors.length];

  return (
    <div className={`bg-gradient-to-br ${gradientClass} p-1 rounded-3xl shadow-2xl hover:shadow-purple-500/50 transform hover:-translate-y-3 hover:scale-105 transition-all duration-300`}>
      <div className={`${bgColorClass} backdrop-blur-sm rounded-3xl p-8`}>
        <div className="mb-8">
          <h3 className="text-3xl font-black text-gray-800 mb-4">{album.title}</h3>
          <p className="text-gray-600 font-semibold text-lg">📅 Event Date: {album.eventDate}</p>
          <p className="text-gray-500 text-base">✨ Created: {album.createdAt}</p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => navigate(`/album/${album.id}`)}
            className="flex-1 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-lg rounded-xl hover:scale-105 transition-all shadow-lg"
          >
            👁️ View Album
          </button>
          {onDelete && (
            <button
              onClick={() => onDelete(album.id)}
              className="px-6 py-4 bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold text-lg rounded-xl hover:scale-105 transition-all shadow-lg"
            >
              🗑️ Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

AlbumCard.propTypes = {
  album: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    eventDate: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func,
  index: PropTypes.number,
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
