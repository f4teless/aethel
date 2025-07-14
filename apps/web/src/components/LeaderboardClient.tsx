"use client";

import { useState } from "react";

type LeaderboardEntry = {
  name: string;
  class: string;
  score: number;
};

type ActiveTab = 'pvp' | 'class';
type ActiveClassTab = 'array-knight' | 'dynamic-mage' | 'graph-assassin' | 'greedy-ronin' | 'bit-sage';

type Leaderboards = {
  pvp: LeaderboardEntry[];
  class: {
    'array-knight': LeaderboardEntry[];
    'dynamic-mage': LeaderboardEntry[];
    'graph-assassin': LeaderboardEntry[];
    'greedy-ronin': LeaderboardEntry[];
    'bit-sage': LeaderboardEntry[];
  };
};

interface LeaderboardClientProps {
  leaderboards: Leaderboards;
}

const LeaderboardClient = ({ leaderboards }: LeaderboardClientProps) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('pvp');
  const [activeClassTab, setActiveClassTab] = useState<ActiveClassTab>('array-knight');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 15;

  const activeLeaderboardData = activeTab === 'pvp' 
    ? leaderboards.pvp 
    : leaderboards.class[activeClassTab];

  const totalPages = Math.ceil(activeLeaderboardData.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedData = activeLeaderboardData.slice(start, end);

  const changeTab = (tab: ActiveTab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const changeClassTab = (classTab: ActiveClassTab) => {
    setActiveClassTab(classTab);
    setCurrentPage(1);
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-16 md:py-24 text-white">
      <header className="text-center max-w-4xl mx-auto mb-12">
        <h1 className="font-cinzel text-4xl md:text-6xl font-bold drop-shadow-lg">The Global Rankings</h1>
        <p className="font-cormorant italic text-xl md:text-2xl text-white/80 mt-4">The Chronicler's official ledger of the most powerful Architects in Aethel. Updated every cycle.</p>
      </header>

      <div className="bg-black/40 backdrop-blur-md rounded-lg border border-white/10 p-4 sm:p-6 shadow-2xl">
        {/* Top Navigation Tabs */}
        <nav className="flex items-center space-x-6 border-b border-white/10 mb-4">
          <button
            onClick={() => changeTab('pvp')}
            className={`py-3 font-cinzel text-lg tracking-wider transition border-b-2 cursor-pointer ${
              activeTab === 'pvp' ? 'text-white border-white' : 'text-white/60 border-transparent'
            }`}
          >
            PvP Arena
          </button>

          <button
            onClick={() => changeTab('class')}
            className={`py-3 font-cinzel text-lg tracking-wider transition border-b-2 cursor-pointer ${
              activeTab === 'class' ? 'text-white border-white' : 'text-white/60 border-transparent'
            }`}
          >
            Class Mastery
          </button>
        </nav>

        {/* Class Sub-Tabs */}
        {activeTab === 'class' && (
          <nav className="flex items-center gap-x-4 gap-y-2 flex-wrap mb-6 text-sm">
            {[
              { id: 'array-knight', name: 'Array Knight' },
              { id: 'dynamic-mage', name: 'Dynamic Mage' },
              { id: 'graph-assassin', name: 'Graph Assassin' },
              { id: 'greedy-ronin', name: 'Greedy Ronin' },
              { id: 'bit-sage', name: 'Bit Sage' }
            ].map((cls) => (
              <button
                key={cls.id}
                onClick={() => changeClassTab(cls.id as ActiveClassTab)}
                className={`px-3 py-1 rounded-full transition cursor-pointer ${
                  activeClassTab === cls.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                {cls.name}
              </button>
            ))}
          </nav>
        )}

        <div className="overflow-x-auto">
          <div className="grid grid-cols-12 gap-4 px-4 py-2 text-sm font-cinzel tracking-wider text-white/70 border-b border-white/10">
            <div className="col-span-1">Rank</div>
            <div className="col-span-5">Architect</div>
            <div className="col-span-3 hidden sm:block">Class</div>
            <div className="col-span-3 text-right">{activeTab === 'pvp' ? 'Combat Rating' : 'Corruptions Purged'}</div>
          </div>

          <div className="space-y-2 mt-2 animate-fade-in">
            {paginatedData.map((player, i) => {
              const rank = (currentPage - 1) * itemsPerPage + i + 1;
              return (
                <div key={`${player.name}-${rank}`} className="grid grid-cols-12 gap-4 items-center bg-white/5 p-3 rounded-md border border-transparent hover:border-white/20 transition-all text-base">
                  <div className={`col-span-1 font-cinzel text-xl ${
                    rank === 1 ? 'text-yellow-400' : 
                    rank === 2 ? 'text-slate-300' : 
                    rank === 3 ? 'text-amber-500' : ''
                  }`}>
                    {rank}
                  </div>
                  <div className="col-span-5 font-bold truncate">{player.name}</div>
                  <div className="col-span-3 hidden sm:block text-slate-300">{player.class}</div>
                  <div className={`col-span-3 text-right font-mono text-lg ${
                    activeTab === 'pvp' ? 'text-blue-400' : 'text-green-400'
                  }`}>
                    {player.score}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-between items-center mt-6 text-sm">
          <button 
            onClick={previousPage} 
            disabled={currentPage === 1} 
            className="px-4 py-2 rounded bg-white/10 disabled:opacity-50 hover:bg-white/20 transition cursor-pointer"
          >
            Previous
          </button>
          <span className="text-white/70">Page {currentPage} of {totalPages}</span>
          <button 
            onClick={nextPage} 
            disabled={currentPage === totalPages} 
            className="px-4 py-2 rounded bg-white/10 disabled:opacity-50 hover:bg-white/20 transition cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
};

export default LeaderboardClient; 