const CommunitySimple = () => (
  <div className="min-h-screen text-white relative overflow-hidden">
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
      <div className="text-6xl mb-4 drop-shadow-lg">🏛️</div>
      <h1 className="text-5xl font-cinzel font-bold drop-shadow mb-3">
        The Grand Assembly
      </h1>
      <p className="text-xl text-white/90 font-cormorant italic max-w-xl mx-auto mb-6">
        Architects gather here to share knowledge, forge alliances, and
        discuss the mysteries of the CodeRealm.
      </p>
      <button
        disabled
        className="text-white/70 bg-transparent border border-white/20 px-6 py-2 rounded-xl font-bold font-cinzel tracking-wide cursor-not-allowed transition hover:bg-current/20 backdrop-blur"
      >
        Coming Soon
      </button>
    </div>
  </div>
);

export default CommunitySimple; 