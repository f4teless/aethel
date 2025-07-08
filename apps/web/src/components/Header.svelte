<script>
  import { page } from '$app/stores'; // SvelteKit's store for page data
  import { onMount } from 'svelte';

  export let transparent = true;
  
  // --- IMPROVEMENT 1: State for Mobile Menu ---
  let mobileMenuOpen = false;

  // --- IMPROVEMENT 2: Placeholder for User State ---
  // In a real app, this would come from a store: `import { user } from '$lib/stores/authStore';`
  let user = null; // or { name: 'Architect', avatar: '/img/avatar.png' }

  // Close mobile menu on navigation
  $: if ($page.url.pathname) {
    mobileMenuOpen = false;
  }
</script>

<!-- The w-full class is moved to a container div to handle sticky positioning correctly -->
<div class={`w-full z-20 transition-colors duration-300
  ${transparent && !mobileMenuOpen ? 'absolute top-0 left-0' : 'bg-slate-900/80 backdrop-blur-lg sticky top-0 shadow-xl'}
`}>
  <header class="px-6 md:px-12 py-4 flex justify-between items-center font-cinzel uppercase tracking-wider text-white text-sm">
    <!-- Logo -->
    <a href="/" class="text-2xl md:text-3xl font-bold tracking-widest text-white drop-shadow-md hover:scale-105 transition-transform">
      Aethel<span class="text-slate-400">.</span>
    </a>

    <!-- Desktop Navigation -->
    <nav class="space-x-6 hidden md:block text-slate-300 font-medium">
      <!-- IMPROVEMENT 3: Active Link Styling -->
      <a href="/start" class="hover:text-white transition" class:text-white={$page.url.pathname === '/start'}>Start</a>
      <a href="/lore" class="hover:text-white transition" class:text-white={$page.url.pathname === '/lore'}>Lore</a>
      <a href="/quests" class="hover:text-white transition" class:text-white={$page.url.pathname === '/quests'}>Quests</a>
      <a href="/pvp" class="hover:text-white transition" class:text-white={$page.url.pathname === '/pvp'}>PVP</a>
    </nav>

    <!-- Right Side: Auth State & Mobile Menu Toggle -->
    <div class="flex items-center space-x-4">
      <!-- IMPROVEMENT 4: Authenticated State -->
      <div class="hidden md:block">
        {#if user}
          <a href="/profile" class="flex items-center space-x-2 group">
            <span class="font-ebg normal-case group-hover:text-white text-slate-300">{user.name}</span>
            <img src={user.avatar} alt="User Avatar" class="w-8 h-8 rounded-full border-2 border-slate-500 group-hover:border-white transition"/>
          </a>
        {:else}
          <a 
            href="/login" 
            class="bg-slate-700/50 px-4 py-1.5 rounded-md hover:bg-slate-700/90 transition font-ebg shadow-md text-white border border-slate-600"
          >
            Log In
          </a>
        {/if}
      </div>

      <!-- CRITICAL: Mobile Menu Hamburger Button -->
      <button 
        on:click={() => mobileMenuOpen = !mobileMenuOpen}
        class="md:hidden z-30 p-2"
        aria-label="Toggle navigation menu"
      >
        <!-- Simple hamburger/close icon with transitions -->
        <div class="w-6 h-0.5 bg-white mb-1.5 transition-all duration-300" class:rotate-45={mobileMenuOpen} class:translate-y-2={mobileMenuOpen}></div>
        <div class="w-6 h-0.5 bg-white transition-all duration-300" class:opacity-0={mobileMenuOpen}></div>
        <div class="w-6 h-0.5 bg-white mt-1.5 transition-all duration-300" class:-rotate-45={mobileMenuOpen} class:-translate-y-2={mobileMenuOpen}></div>
      </button>
    </div>
  </header>

  <!-- Mobile Menu Panel -->
  {#if mobileMenuOpen}
    <div 
      class="md:hidden absolute top-full left-0 w-full bg-slate-900/95 backdrop-blur-lg flex flex-col items-center space-y-6 py-8 shadow-2xl"
    >
      <a href="/start" class="text-slate-300 hover:text-white text-xl">Start</a>
      <a href="/lore" class="text-slate-300 hover:text-white text-xl">Lore</a>
      <a href="/quests" class="text-slate-300 hover:text-white text-xl">Quests</a>
      <a href="/pvp" class="text-slate-300 hover:text-white text-xl">PVP</a>
      <hr class="w-3/4 border-slate-700"/>
      {#if user}
        <a href="/profile" class="text-white text-xl">{user.name}'s Profile</a>
        <a href="/logout" class="bg-red-600/80 px-6 py-2 rounded text-lg">Log Out</a>
      {:else}
        <a href="/login" class="bg-slate-700/80 px-8 py-2 rounded text-lg">Log In</a>
      {/if}
    </div>
  {/if}
</div>