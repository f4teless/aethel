'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/landing/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const nameParts1 = ['Void', 'Syntax', 'Hex', 'Data', 'Null', 'Quantum', 'Glitch', 'Recursia', 'Binary', 'Vector', 'Chrono', 'Cipher', 'Byte'];
const nameParts2 = ['Walker', 'Scribe', 'Mancer', 'Shift', 'Runner', 'Heart', 'Blade', 'Forge', 'Savant', 'Weaver', 'Storm', 'Wraith', 'Mind'];
const classes = ['Array Knight', 'Dynamic Mage', 'Graph Assassin', 'Greedy Ronin', 'Bit Sage'];

function seededRandom(seed: number) {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function generateName(seed: number) {
  const i = Math.floor(seededRandom(seed) * nameParts1.length);
  const j = Math.floor(seededRandom(seed + 1) * nameParts2.length);
  return nameParts1[i] + nameParts2[j];
}

function generateRandomClass(seed: number) {
  const idx = Math.floor(seededRandom(seed + 2) * classes.length);
  return classes[idx];
}

function generateLeaderboard(count: number, scoreFn: (i: number) => number, classType: 'Varies' | string, offset: number = 0) {
  return Array.from({ length: count }, (_, i) => ({
    name: generateName(i + offset),
    class: classType === 'Varies' ? generateRandomClass(i + offset) : classType,
    score: scoreFn(i),
  }));
}

const leaderboards = {
  pvp: generateLeaderboard(120, i => 3200 - i * 15 - Math.floor(seededRandom(i) * 10), 'Varies'),
  class: {
    'array-knight': generateLeaderboard(75, i => 820 - i * 9 - Math.floor(seededRandom(i) * 5), 'Array Knight', 1000),
    'dynamic-mage': generateLeaderboard(55, i => 850 - i * 10 - Math.floor(seededRandom(i) * 5), 'Dynamic Mage', 2000),
    'graph-assassin': generateLeaderboard(60, i => 840 - i * 11 - Math.floor(seededRandom(i) * 5), 'Graph Assassin', 3000),
    'greedy-ronin': generateLeaderboard(68, i => 810 - i * 8 - Math.floor(seededRandom(i) * 5), 'Greedy Ronin', 4000),
    'bit-sage': generateLeaderboard(45, i => 880 - i * 12 - Math.floor(seededRandom(i) * 5), 'Bit Sage', 5000),
  }
};

type ActiveTab = 'pvp' | 'class';
type ActiveClassTab = 'array-knight' | 'dynamic-mage' | 'graph-assassin' | 'greedy-ronin' | 'bit-sage';

export default function LeaderboardPage() {
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
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="container mx-auto px-4 sm:px-6 py-16 md:py-24 text-foreground">
      <header className="text-center max-w-4xl mx-auto mb-12">
        <h1 className="font-cinzel text-4xl md:text-6xl font-bold drop-shadow-lg">Hall of Honor</h1>
        <p className="font-cormorant italic text-xl md:text-2xl text-muted-foreground mt-4">The Chronicler's official ledger of Aethel's most powerful Architects. Updated every cycle.</p>
      </header>

      <div className="bg-background/40 backdrop-blur-md rounded-lg border border-border p-4 sm:p-6 shadow-2xl">
        {/* Top Navigation Tabs */}
        <nav className="flex items-center space-x-6 border-b border-border mb-4">
          <button
            onClick={() => changeTab('pvp')}
            className={`py-3 font-cinzel text-lg tracking-wider transition border-b-2 cursor-pointer ${
              activeTab === 'pvp' ? 'text-foreground border-primary' : 'text-muted-foreground border-transparent'
            }`}
          >
            PvP Arena
          </button>

          <button
            onClick={() => changeTab('class')}
            className={`py-3 font-cinzel text-lg tracking-wider transition border-b-2 cursor-pointer ${
              activeTab === 'class' ? 'text-foreground border-primary' : 'text-muted-foreground border-transparent'
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
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80 text-muted-foreground'
                }`}
              >
                {cls.name}
              </button>
            ))}
          </nav>
        )}

        <div className="overflow-hidden">
          <div className="grid grid-cols-12 gap-4 px-4 py-2 text-sm font-cinzel tracking-wider text-muted-foreground border-b border-border">
            <div className="col-span-1">Rank</div>
            <div className="col-span-5">Architect</div>
            <div className="col-span-3 hidden sm:block">Class</div>
            <div className="col-span-3 text-right">{activeTab === 'pvp' ? 'Combat Rating' : 'Corruptions Purged'}</div>
          </div>

          <div className="space-y-2 mt-2 animate-fade-in">
            {paginatedData.map((player, i) => {
              const rank = (currentPage - 1) * itemsPerPage + i + 1;
              return (
                <div key={`${player.name}-${rank}`} className="grid grid-cols-12 gap-4 items-center bg-card/50 p-3 rounded-md border border-transparent hover:border-border transition-all text-base">
                  <div className={`col-span-1 font-cinzel text-xl ${
                    rank === 1 ? 'text-yellow-400' :
                    rank === 2 ? 'text-slate-300' :
                    rank === 3 ? 'text-amber-500' : ''
                  }`}>
                    {rank}
                  </div>
                  <div className="col-span-5 font-bold truncate text-foreground">{player.name}</div>
                  <div className="col-span-3 hidden sm:block text-muted-foreground">{player.class}</div>
                  <div className={`col-span-3 text-right font-mono text-lg ${
                    activeTab === 'pvp' ? 'text-primary' : 'text-chart-2'
                  }`}>
                    {player.score}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-between items-center mt-6 text-sm">
            <Button 
              onClick={previousPage} 
              disabled={currentPage === 1} 
              variant="outline"
            >
              Previous
            </Button>
            <span className="text-muted-foreground">Page {currentPage} of {totalPages}</span>
            <Button 
              onClick={nextPage} 
              disabled={currentPage === totalPages} 
              variant="outline"
            >
              Next
            </Button>
        </div>
      </div>

      <Card className="mt-12 border-primary">
        <CardHeader>
          <CardTitle>Your Position</CardTitle>
          <CardDescription>Here's how you stack up against the competition.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-around text-center">
            <div>
              <p className="text-3xl font-bold text-primary">#1,284</p>
              <p className="text-sm text-muted-foreground">Global PvP Rank</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">#98</p>
              <p className="text-sm text-muted-foreground">Dynamic Mage Rank</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">🔥 7</p>
              <p className="text-sm text-muted-foreground">Day Streak</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    </div>
  );
}
