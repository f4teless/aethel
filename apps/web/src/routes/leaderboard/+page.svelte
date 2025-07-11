<script lang="ts">
  import { backgroundImage } from '$lib/stores/uiStore';
  import { onMount } from 'svelte';
  import hallOfHonor from '$lib/assets/icons/leaderboard/hall-of-honor.webp'
  import hallOfHonor1 from "$lib/assets/icons/leaderboard/hall-of-honor1.webp"

  const backgroundImages = [hallOfHonor, hallOfHonor1];

  type LeaderboardEntry = {
    name: string;
    class: string;
    score: number;
  };

  // --- STATE MANAGEMENT ---
  let activeTab: 'pvp' | 'class' = 'pvp';
  // Default to the most populated class for a good first impression
  let activeClassTab: 'array-knight' | 'dynamic-mage' | 'graph-assassin' | 'greedy-ronin' | 'bit-sage' = 'array-knight';
  let currentPage = 1;
  const itemsPerPage = 15;

  // --- RICH DEMO DATA GENERATION ---

  // Thematic name parts to create believable Architect names
  const nameParts1 = ['Void', 'Syntax', 'Hex', 'Data', 'Null', 'Quantum', 'Glitch', 'Recursia', 'Binary', 'Vector', 'Chrono', 'Cipher', 'Byte'];
  const nameParts2 = ['Walker', 'Scribe', 'Mancer', 'Shift', 'Runner', 'Heart', 'Blade', 'Forge', 'Savant', 'Weaver', 'Storm', 'Wraith', 'Mind'];
  const classes = ['Array Knight', 'Dynamic Mage', 'Graph Assassin', 'Greedy Ronin', 'Bit Sage'];
  const classEnum = {
    'array-knight': 'Array Knight',
    'dynamic-mage': 'Dynamic Mage',
    'graph-assassin': 'Graph Assassin',
    'greedy-ronin': 'Greedy Ronin',
    'bit-sage': 'Bit Sage',
  };

  const generateName = () => `${nameParts1[Math.floor(Math.random() * nameParts1.length)]}${nameParts2[Math.floor(Math.random() * nameParts2.length)]}`;
  const generateRandomClass = () => classes[Math.floor(Math.random() * classes.length)];

  // Function to generate a full leaderboard
  const generateLeaderboard = (count: number, scoreFn: (i: number) => number, classType: 'Varies' | string) => 
    Array.from({ length: count }, (_, i) => ({
      name: generateName(),
      class: classType === 'Varies' ? generateRandomClass() : classType,
      score: scoreFn(i),
    }));

  const leaderboards = {
    pvp: generateLeaderboard(120, i => 3200 - i * 15 - Math.floor(Math.random() * 10), 'Varies'),
    class: {
      'array-knight': generateLeaderboard(75, i => 820 - i * 9 - Math.floor(Math.random() * 5), 'Array Knight'),
      'dynamic-mage': generateLeaderboard(55, i => 850 - i * 10 - Math.floor(Math.random() * 5), 'Dynamic Mage'),
      'graph-assassin': generateLeaderboard(60, i => 840 - i * 11 - Math.floor(Math.random() * 5), 'Graph Assassin'),
      'greedy-ronin': generateLeaderboard(68, i => 810 - i * 8 - Math.floor(Math.random() * 5), 'Greedy Ronin'),
      'bit-sage': generateLeaderboard(45, i => 880 - i * 12 - Math.floor(Math.random() * 5), 'Bit Sage'),
    }
  };
  
  // Reactive statements using $ instead of $derived
  $: activeLeaderboardData = activeTab === 'pvp' ? leaderboards.pvp : leaderboards.class[activeClassTab];
  $: totalPages = Math.ceil(activeLeaderboardData.length / itemsPerPage);
  $: paginatedData = (() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return activeLeaderboardData.slice(start, end);
  })();

  function changeTab(tab: 'pvp' | 'class') {
    activeTab = tab;
    currentPage = 1;
  }

  function changeClassTab(classTab: keyof typeof leaderboards.class) {
    activeClassTab = classTab;
    currentPage = 1;
  }

  function previousPage() {
    if (currentPage > 1) {
      currentPage--;
    }
  }

  function nextPage() {
    if (currentPage < totalPages) {
      currentPage++;
    }
  }

  onMount(() => {
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
		const selectedImage = backgroundImages[randomIndex];
    backgroundImage.set(`url(${selectedImage})`);
  });
</script>

<div class="container mx-auto px-4 sm:px-6 py-16 md:py-24 text-white">
  
  <header class="text-center max-w-4xl mx-auto mb-12">
    <h1 class="font-cinzel text-4xl md:text-6xl font-bold drop-shadow-lg">The Global Rankings</h1>
    <p class="font-cormorantI text-xl md:text-2xl text-white/80 mt-4">The Chronicler's official ledger of the most powerful Architects in Aethel. Updated every cycle.</p>
  </header>

  <div class="bg-black/40 backdrop-blur-md rounded-lg border border-white/10 p-4 sm:p-6 shadow-2xl">
    <!-- Top Navigation Tabs -->
    <nav class="flex items-center space-x-6 border-b border-white/10 mb-4">
      <button
        on:click={() => changeTab('pvp')}
        class="py-3 font-cinzel text-lg tracking-wider transition border-b-2 {activeTab === 'pvp' ? 'text-white border-white' : 'text-white/60 border-transparent'}"
      >
        PvP Arena
      </button>

      <button
        on:click={() => changeTab('class')}
        class="py-3 font-cinzel text-lg tracking-wider transition border-b-2 {activeTab === 'class' ? 'text-white border-white' : 'text-white/60 border-transparent'}"
      >
        Class Mastery
      </button>
    </nav>

    <!-- Class Sub-Tabs -->
    {#if activeTab === 'class'}
      <nav class="flex items-center gap-x-4 gap-y-2 flex-wrap mb-6 text-sm">
        {#each [
          { id: 'array-knight', name: 'Array Knight' },
          { id: 'dynamic-mage', name: 'Dynamic Mage' },
          { id: 'graph-assassin', name: 'Graph Assassin' },
          { id: 'greedy-ronin', name: 'Greedy Ronin' },
          { id: 'bit-sage', name: 'Bit Sage' }
        ] as cls}
          <button
            on:click={() => changeClassTab(cls.id)}
            class="px-3 py-1 rounded-full transition {activeClassTab === cls.id
              ? 'bg-blue-600 text-white'
              : 'bg-white/10 hover:bg-white/20 text-white'}"
          >
            {cls.name}
          </button>
        {/each}
      </nav>
    {/if}

    <div class="overflow-x-auto">
      <div class="grid grid-cols-12 gap-4 px-4 py-2 text-sm font-cinzel tracking-wider text-white/70 border-b border-white/10">
        <div class="col-span-1">Rank</div>
        <div class="col-span-5">Architect</div>
        <div class="col-span-3 hidden sm:block">Class</div>
        <div class="col-span-3 text-right">{activeTab === 'pvp' ? 'Combat Rating' : 'Corruptions Purged'}</div>
      </div>

      <div class="space-y-2 mt-2 animate-fade-in">
        {#each paginatedData as player, i}
          {@const rank = (currentPage - 1) * itemsPerPage + i + 1}
          <div class="grid grid-cols-12 gap-4 items-center bg-white/5 p-3 rounded-md border border-transparent hover:border-white/20 transition-all text-base">
            <div class="col-span-1 font-cinzel text-xl {rank === 1 ? 'text-yellow-400' : rank === 2 ? 'text-slate-300' : rank === 3 ? 'text-amber-500' : ''}">{rank}</div>
            <div class="col-span-5 font-bold truncate">{player.name}</div>
            <div class="col-span-3 hidden sm:block text-slate-300">{player.class}</div>
            <div class="col-span-3 text-right font-mono text-lg {activeTab === 'pvp' ? 'text-blue-400' : 'text-green-400'}">{player.score}</div>
          </div>
        {/each}
      </div>
    </div>

    <div class="flex justify-between items-center mt-6 text-sm">
      <button 
        on:click={previousPage} 
        disabled={currentPage === 1} 
        class="px-4 py-2 rounded bg-white/10 disabled:opacity-50 hover:bg-white/20 transition"
      >
        Previous
      </button>
      <span class="text-white/70">Page {currentPage} of {totalPages}</span>
      <button 
        on:click={nextPage} 
        disabled={currentPage === totalPages} 
        class="px-4 py-2 rounded bg-white/10 disabled:opacity-50 hover:bg-white/20 transition"
      >
        Next
      </button>
    </div>

  </div>
</div>

<style>
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .animate-fade-in {
    animation: fade-in 0.4s ease-in-out forwards;
  }
</style>