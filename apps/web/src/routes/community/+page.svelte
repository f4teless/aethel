<script lang="ts">
  import { onMount } from "svelte";
  import { backgroundImage } from "$lib/stores/uiStore";
  import communityImage from "$lib/assets/icons/community/community-hall.webp";
  import communityImage1 from "$lib/assets/icons/community/community-hall1.webp";
  import communityImage2 from "$lib/assets/icons/community/community-hall2.webp";

  const backgroundImages = [communityImage, communityImage1, communityImage2];

  // State to manage the active leaderboard tab
  let activeLeaderboardTab = $state("pvp");

  // --- MOCK DATA (In a real app, this would be fetched from your API) ---
  const pvpRankings = [
    { rank: 1, name: "VoidWalker", class: "Graph Assassin", rating: 2850 },
    { rank: 2, name: "Recursia", class: "Dynamic Mage", rating: 2810 },
    { rank: 3, name: "Sentinel", class: "Array Knight", rating: 2795 },
    { rank: 4, name: "BinarySavant", class: "Bit Sage", rating: 2750 },
    { rank: 5, name: "SortaFine", class: "Greedy Ronin", rating: 2720 },
  ];

  const classMasters = [
    { rank: 1, name: "Recursia", class: "Dynamic Mage", solved: 450 },
    { rank: 2, name: "Sentinel", class: "Array Knight", solved: 435 },
    { rank: 3, name: "VoidWalker", class: "Graph Assassin", solved: 421 },
  ];

  const spotlightArchitect = {
    name: "Recursia",
    title: "The Unraveler of Knots",
    // avatar: '/img/avatar-mage.jpg',
    class: "Dynamic Mage",
    stats: [
      { label: "PvP Rank", value: "#2" },
      { label: "DP Problems Solved", value: "450" },
      { label: "Accuracy", value: "98.7%" },
    ],
  };

  const dailyBounty = {
    title: "Decrypt the Glitched Rune",
    difficulty: "Medium",
    domain: "Strings",
    xp: 500,
  };

  const communityEvents = [
    {
      title: "World Event: The Memory Leak",
      status: "UPCOMING",
      description:
        "A massive entity threatens to consume the world's memory. All Architects are called to defend reality itself.",
      date: "Next Cycle",
    },
    {
      title: "New Dungeon Discovered!",
      status: "LIVE",
      description:
        'The "Recursion Deeps," a mind-bending dungeon for Dynamic Mages, has been located. Gather your party.',
      date: "Now Live",
    },
  ];

  onMount(() => {
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    const selectedImage = backgroundImages[randomIndex];
    backgroundImage.set(`url(${selectedImage})`);
  });
</script>

<div class="container mx-auto px-4 sm:px-6 py-16 md:py-24 text-white">
  <!-- Page Header -->
  <header class="text-center max-w-4xl mx-auto mb-16">
    <h1 class="font-cinzel text-4xl md:text-6xl font-bold drop-shadow-lg">
      Halls of the Architects
    </h1>
    <p class="font-cormorantI text-xl md:text-2xl text-white/80 mt-4">
      The chronicles of glory, the daily bounties, and the whispers of the
      community. Here, legends are recorded.
    </p>
  </header>

  <!-- Main Grid Layout -->
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <!-- Left Column: Leaderboards (takes up 2/3 on large screens) -->
    <div
      class="lg:col-span-2 bg-black/30 backdrop-blur-md rounded-lg border border-white/10 p-6 shadow-xl"
    >
      <h2 class="font-cinzel text-3xl">Architect Rankings</h2>

      <!-- Leaderboard Tabs -->
      <nav
        class="flex items-center space-x-6 border-b border-white/10 mt-4 mb-4"
      >
        <button
          class="py-2 font-cinzel tracking-wider transition"
          class:text-white={activeLeaderboardTab === "pvp"}
          class:text-gray={activeLeaderboardTab !== "pvp"}
          class:border-b-2={activeLeaderboardTab === "pvp"}
          class:border-white={activeLeaderboardTab === "pvp"}
          onclick={() => (activeLeaderboardTab = "pvp")}
        >
          PvP Arena
        </button>
        <button
          class="py-2 font-cinzel tracking-wider transition"
          class:text-white={activeLeaderboardTab === "classes"}
          class:text-gray={activeLeaderboardTab !== "classes"}
          class:border-b-2={activeLeaderboardTab === "classes"}
          class:border-white={activeLeaderboardTab === "classes"}
          onclick={() => (activeLeaderboardTab = "classes")}
        >
          Class Mastery
        </button>
      </nav>

      <!-- PvP Rankings -->
      {#if activeLeaderboardTab === "pvp"}
        <ol class="space-y-3 animate-fade-in">
          {#each pvpRankings as player}
            <li
              class="flex items-center justify-between bg-white/10 p-3 rounded-md border border-white/10 hover:border-white/20 transition"
            >
              <div class="flex items-center space-x-4">
                <span class="font-cinzel text-xl text-slate-400 w-6"
                  >#{player.rank}</span
                >
                <span class="font-bold text-lg">{player.name}</span>
                <span class="text-sm text-slate-300 hidden sm:block"
                  >{player.class}</span
                >
              </div>
              <span class="font-mono text-lg text-blue-400"
                >{player.rating}</span
              >
            </li>
          {/each}
        </ol>
      {/if}

      <!-- Class Mastery Rankings -->
      {#if activeLeaderboardTab === "classes"}
        <ol class="space-y-3 animate-fade-in">
          {#each classMasters as player}
            <li
              class="flex items-center justify-between bg-white/5 p-3 rounded-md border border-transparent hover:border-white/20 transition"
            >
              <div class="flex items-center space-x-4">
                <span class="font-cinzel text-xl text-slate-400 w-6"
                  >#{player.rank}</span
                >
                <span class="font-bold text-lg">{player.name}</span>
                <span class="text-sm text-slate-300 hidden sm:block"
                  >{player.class}</span
                >
              </div>
              <span class="font-mono text-lg text-green-400"
                >{player.solved} Solved</span
              >
            </li>
          {/each}
        </ol>
      {/if}
    </div>

    <!-- Right Column: Spotlight & Daily Bounty -->
    <div class="space-y-8">
      <!-- Architect Spotlight -->
      <div
        class="bg-black/40 backdrop-blur-md rounded-lg border border-white/10 p-6 shadow-2xl shadow-black/40"
      >
        <h3 class="font-cinzel text-2xl">Architect Spotlight</h3>
        <div class="flex items-center space-x-4 mt-4">
          <!-- <img src={spotlightArchitect.avatar} alt="Avatar of {spotlightArchitect.name}" class="w-20 h-20 rounded-full border-2 border-slate-500"> -->
          <div>
            <p class="text-xl font-bold">{spotlightArchitect.name}</p>
            <p class="text-sm text-slate-300 italic">
              "{spotlightArchitect.title}"
            </p>
          </div>
        </div>
        <ul class="font-ebg space-y-2 mt-4 text-sm">
          {#each spotlightArchitect.stats as stat}
            <li class="flex justify-between">
              <span class="text-slate-400">{stat.label}:</span>
              <span class="font-semibold text-white">{stat.value}</span>
            </li>
          {/each}
        </ul>
      </div>

      <!-- Daily Bounty -->
      <div
        class="bg-black/30 backdrop-blur-md rounded-lg border border-white/10 p-6 shadow-xl text-center"
      >
        <h3 class="font-cinzel text-2xl">Daily Bounty</h3>
        <p class="text-white/70 text-sm mt-2">
          A new Corruption fragment requires debugging.
        </p>
        <div
          class="my-4 bg-transparent p-4 rounded-md border border border-white/20"
        >
          <p class="text-lg font-semibold">{dailyBounty.title}</p>
          <p class="text-sm mt-1">
            <span class="text-yellow-400">{dailyBounty.difficulty}</span>
            •
            <span class="text-blue-400">{dailyBounty.domain}</span>
            •
            <span class="text-green-400">{dailyBounty.xp} XP</span>
          </p>
        </div>
        <a
          href="/play/daily"
          class="text-white py-2 px-6 font-bold tracking-wide shadow-lg bg-transparent rounded-md transition hover:bg-current/20 hover:shadow-xl duration-200 border border-white/20 backdrop-blur-sm cursor-not-allowed"
        >
          ACCEPT BOUNTY
        </a>
      </div>
    </div>
  </div>

  <!-- Social & Events Section -->
  <div class="mt-16 text-center">
    <h2 class="font-cinzel text-4xl text-white">Join the Conversation</h2>
    <p class="font-cormorantI text-xl text-white/80 mt-2">
      Coordinate with fellow Architects, share strategies, and forge alliances.
    </p>
    <div class="flex justify-center space-x-4 mt-6">
      <a
        href="https://discord.com/users/755804749210845236"
        target="_blank"
        class="text-white font-bold py-3 px-6 bg-transparent rounded-md transition hover:bg-current/20 hover:shadow-xl duration-200 border border-white/20 backdrop-blur-sm"
      >
        Join Discord
      </a>

      <a
        href="https://x.com/playaethel"
        target="_blank"
        class="text-white font-bold py-3 px-8 bg-transparent rounded-md transition hover:bg-current/20 hover:shadow-xl duration-200 border border-white/20 backdrop-blur-sm"
        >Follow on X</a
      >
    </div>
  </div>

  <!-- Upcoming Events -->
  <div class="mt-16">
    <h2 class="font-cinzel text-4xl text-center">Global Events & Dispatches</h2>
    <div class="mt-8 grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
      {#each communityEvents as event}
        <div
          class="bg-black/30 backdrop-blur-md rounded-lg border border-white/10 p-6 shadow-xl"
        >
          <div class="flex justify-between items-start">
            <h3 class="font-cinzel text-2xl">{event.title}</h3>
            <span
              class="text-xs font-bold uppercase tracking-wider px-2 py-1 rounded bg-opacity-90 text-white"
              class:bg-green-600={event.status === "LIVE"}
              class:bg-purple-600={event.status === "UPCOMING"}
            >
              {event.status}
            </span>
          </div>
          <p class="text-white/70 mt-2 font-ebg">{event.description}</p>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  .animate-fade-in {
    animation: fade-in 0.3s ease-in-out forwards;
  }
</style>
