import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="glass-effect sticky top-0 z-50 border-b border-white/30">
        <div className="w-full px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white flex items-center gap-2 drop-shadow-lg">
            <span className="text-4xl animate-pulse-slow">📸</span>
            <span className="gradient-text bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
              FrameVault
            </span>
          </h1>
          <div className="flex gap-4">
            <button 
              onClick={() => navigate('/login')}
              className="px-6 py-2.5 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 text-white border-2 border-white/40 rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              Login
            </button>
            <button 
              onClick={() => navigate('/signup')}
              className="px-6 py-2.5 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white border-2 border-white/40 rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-40 px-6 min-h-[85vh] flex items-center">
        <div className="max-w-6xl mx-auto text-center w-full">
          <h2 className="text-8xl md:text-9xl font-black mb-12 leading-tight flex flex-col items-center">
            <span className="inline-block animate-float text-white drop-shadow-2xl">
              Your Memories,
            </span>
            <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent drop-shadow-lg whitespace-nowrap">
              Beautifully Organized
            </span>
          </h2>
          <p className="text-3xl text-white/90 mb-16 leading-relaxed max-w-4xl mx-auto drop-shadow-lg font-medium">
            FrameVault is the perfect platform to store, organize, and share your special moments. 
            Create beautiful photo albums for weddings, birthdays, travel, and all life&apos;s precious events.
          </p>
          <button 
            onClick={() => navigate('/signup')}
            className="px-16 py-6 text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white rounded-3xl hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-pink-500/50 border-4 border-white/30 backdrop-blur-sm"
          >
            🚀 Get Started Free
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <h3 className="text-5xl font-black text-center mb-16 text-white drop-shadow-2xl">
          ✨ Why Choose FrameVault? ✨
        </h3>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="glass-effect p-8 rounded-3xl card-hover group">
            <div className="text-6xl mb-4 group-hover:scale-125 transition-transform duration-300">📁</div>
            <h4 className="text-2xl font-bold text-white mb-3">Organize Albums</h4>
            <p className="text-white/80 text-lg leading-relaxed">
              Create unlimited albums to organize your photos by events, dates, or themes.
            </p>
          </div>

          <div className="glass-effect p-8 rounded-3xl card-hover group bg-gradient-to-br from-pink-500/20 to-purple-500/20">
            <div className="text-6xl mb-4 group-hover:scale-125 transition-transform duration-300">🔗</div>
            <h4 className="text-2xl font-bold text-white mb-3">Easy Sharing</h4>
            <p className="text-white/80 text-lg leading-relaxed">
              Generate shareable links to let friends and family view your albums instantly.
            </p>
          </div>

          <div className="glass-effect p-8 rounded-3xl card-hover group bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
            <div className="text-6xl mb-4 group-hover:scale-125 transition-transform duration-300">🖼️</div>
            <h4 className="text-2xl font-bold text-white mb-3">Beautiful Gallery</h4>
            <p className="text-white/80 text-lg leading-relaxed">
              Display your photos in an elegant, responsive gallery that looks great everywhere.
            </p>
          </div>

          <div className="glass-effect p-8 rounded-3xl card-hover group bg-gradient-to-br from-purple-500/20 to-indigo-500/20">
            <div className="text-6xl mb-4 group-hover:scale-125 transition-transform duration-300">🔒</div>
            <h4 className="text-2xl font-bold text-white mb-3">Secure & Private</h4>
            <p className="text-white/80 text-lg leading-relaxed">
              Your photos are safe with us. Control who can view your albums with secure sharing.
            </p>
          </div>

          <div className="glass-effect p-8 rounded-3xl card-hover group bg-gradient-to-br from-orange-500/20 to-yellow-500/20">
            <div className="text-6xl mb-4 group-hover:scale-125 transition-transform duration-300">📅</div>
            <h4 className="text-2xl font-bold text-white mb-3">Event-Based Organization</h4>
            <p className="text-white/80 text-lg leading-relaxed">
              Tag albums with event dates and keep your memories organized chronologically for easy browsing.
            </p>
          </div>

          <div className="glass-effect p-8 rounded-3xl card-hover group bg-gradient-to-br from-green-500/20 to-emerald-500/20">
            <div className="text-6xl mb-4 group-hover:scale-125 transition-transform duration-300">💬</div>
            <h4 className="text-2xl font-bold text-white mb-3">Photo Captions</h4>
            <p className="text-white/80 text-lg leading-relaxed">
              Add meaningful captions to your photos to tell the story behind each special moment.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto glass-effect p-16 rounded-3xl">
          <h3 className="text-6xl font-black text-center mb-12 text-white drop-shadow-lg">
            🎨 About FrameVault
          </h3>
          <p className="text-2xl text-white/90 mb-8 leading-relaxed">
            FrameVault was created with one goal in mind: to make photo sharing and organization 
            simple and beautiful. Whether you&apos;re a professional photographer managing client galleries 
            or someone who loves capturing life&apos;s moments, FrameVault provides the tools you need 
            to showcase your memories in style.
          </p>
          <p className="text-2xl text-white/90 leading-relaxed">
            With intuitive album creation, drag-and-drop uploads, and instant sharing capabilities, 
            preserving and sharing your favorite moments has never been easier. Join thousands of 
            users who trust FrameVault to keep their memories safe and accessible.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass-effect border-t border-white/30 py-8">
        <p className="text-center text-white/80 text-lg font-semibold">
          © 2025 FrameVault. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default Home;
