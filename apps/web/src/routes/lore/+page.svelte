<script lang="ts">
  import { onMount } from 'svelte';
  import { backgroundImage } from '$lib/stores/uiStore';

  // Set 'unraveling' as the default tab to highlight this new lore
  let activeTab = $state('unraveling');

  onMount(() => {
    backgroundImage.set("url('/icons/lore-library.jpeg')");
  });
</script>

<div class="container mx-auto px-4 sm:px-6 py-16 md:py-24 text-white">
  
  <!-- Page Header -->
  <header class="text-center max-w-4xl mx-auto mb-16">
    <h1 class="font-cinzel text-4xl md:text-6xl font-bold drop-shadow-lg">
      The Chronicles of Aethel
    </h1>
    <p class="font-cormorantI text-xl md:text-2xl text-white/80 mt-4">
      Recovered fragments from a world on the brink. Study the past to prevent the final `SIGTERM`.
    </p>
  </header>

 <!-- Lore Navigation / Table of Contents -->
<div class="top-[70px] z-40 bg-slate-900/50 backdrop-blur-lg rounded-lg border border-white/10 mb-12">
  <nav class="flex justify-center items-center flex-wrap gap-x-4 sm:gap-x-8 p-4 font-cinzel tracking-wider">
    
    <button 
      class={`transition ${activeTab === 'world' ? 'text-white' : 'text-white/60'}`} 
      on:click={() => activeTab = 'world'}
    >
      The World
    </button>
    <div class="h-4 w-px bg-white/20 hidden sm:block"></div>

    <button 
      class={`transition ${activeTab === 'unraveling' ? 'text-white' : 'text-white/60'}`} 
      on:click={() => activeTab = 'unraveling'}
    >
      The Great Unraveling
    </button>
    <div class="h-4 w-px bg-white/20 hidden sm:block"></div>

    <button 
      class={`transition ${activeTab === 'corruption' ? 'text-white' : 'text-white/60'}`} 
      on:click={() => activeTab = 'corruption'}
    >
      The Code Corruption
    </button>
    <div class="h-4 w-px bg-white/20 hidden sm:block"></div>

    <button 
      class={`transition ${activeTab === 'architects' ? 'text-white' : 'text-white/60'}`} 
      on:click={() => activeTab = 'architects'}
    >
      The Architects
    </button>
  </nav>
</div>


  <!-- Lore Content Section -->
  <div class="max-w-4xl mx-auto space-y-20">

    <!-- The World of Aethel -->
    {#if activeTab === 'world'}
      <section class="space-y-6 animate-fade-in">
        <h2 class="font-cinzel text-3xl md:text-4xl border-b border-white/20 pb-2">Aethel: The CodeRealm</h2>
        <img src="/icons/lore-world.jpg" alt="A sweeping vista of the world of Aethel" class="h-300 rounded-lg shadow-xl border border-white/10 w-full object-cover">
        <p class="font-ebg text-lg text-white/90 leading-relaxed">
          Aethel is not a world of earth and stone, but one of pure logic and syntax...
        </p>
        <blockquote class="border-l-4 border-blue-400 pl-4 py-2 my-4 bg-black/20 font-cormorantI italic text-lg text-slate-300">
          "In the beginning, there was the void. Then, the Compiler spoke: `main()`. And there was light." - The First Log
        </blockquote>
        <p class="font-ebg text-lg text-white/90 leading-relaxed">
          For eons, The Compiler maintained perfect harmony. But no system is eternal. A single, unresolved anomaly deep within its core has begun a cascade failure that threatens all of existence: **The Great Unraveling**.
        </p>
      </section>
    {/if}

    <!-- NEW SECTION: The Great Unraveling -->
    {#if activeTab === 'unraveling'}
      <section class="space-y-6 animate-fade-in">
        <h2 class="font-cinzel text-3xl md:text-4xl border-b border-white/20 pb-2">The Great Unraveling</h2>
        <img src="/icons/lore-unraveling.jpg" alt="A world fracturing and dissolving into digital fragments" class="h-200 rounded-lg shadow-xl border border-white/10 w-full object-cover">
        <p class="font-ebg text-lg text-white/90 leading-relaxed">
          The Great Unraveling is the name given to the slow, catastrophic system crash of reality itself. It is not an event, but a process—the final, irreversible outcome of the unchecked Code Corruption. Think of it as the world's operating system entering kernel panic.
        </p>
        <p class="font-ebg text-lg text-white/90 leading-relaxed">
          It began with what scholars call the **Primal Error**: a paradox that The Compiler cannot resolve. This error spawns the tangible glitches known as the Code Corruption. Each time an Architect fails to "debug" a manifestation of the Corruption, the system's stability degrades further, and the Unraveling accelerates.
        </p>
        <blockquote class="border-l-4 border-purple-500 pl-4 py-2 my-4 bg-black/20 font-cormorantI italic text-lg text-slate-300">
          "The Unraveling is not death. It is worse. It is the systematic de-allocation of memory, the deletion of pointers to everything that ever was. It is the promise that soon, there will be nothing left but a segmentation fault at the heart of time." - Final entry of a Bit Sage
        </blockquote>
        <p class="font-ebg text-lg text-white/90 leading-relaxed">
          Should the Unraveling complete, Aethel will cease to exist. Not destroyed, but erased—a fatal exception from which there is no recovery. The fight against the Corruption is a desperate race against this final, silent apocalypse.
        </p>
      </section>
    {/if}

    <!-- The Code Corruption -->
    {#if activeTab === 'corruption'}
      <section class="space-y-6 animate-fade-in">
        <h2 class="font-cinzel text-3xl md:text-4xl border-b border-white/20 pb-2">The Code Corruption</h2>
        <img src="/icons/lore-corruption.jpg" alt="A monstrous glitch beast" class="h-250 rounded-lg shadow-xl border border-white/10 w-full object-cover">
        <p class="font-ebg text-lg text-white/90 leading-relaxed">
          If the Great Unraveling is the disease, the Code Corruption is its symptoms. It is the tangible manifestation of the Primal Error—glitched beasts, paradoxes, and broken logic that plague the land. Unchecked memory leaks drain the life from forests...
        </p>
        <blockquote class="border-l-4 border-red-500 pl-4 py-2 my-4 bg-black/20 font-cormorantI italic text-lg text-slate-300">
          "We saw it first in the Datawood... the trees began to scream in binary." - Recovered Scribe's Log
        </blockquote>
        <p class="font-ebg text-lg text-white/90 leading-relaxed">
          These anomalies are not merely dangerous; they are catalysts. Each unresolved bug puts more strain on The Compiler, accelerating the Great Unraveling and threatening to `SIGKILL` existence itself.
        </p>
      </section>
    {/if}

    <!-- The Architects -->
    {#if activeTab === 'architects'}
      <!-- This section remains largely the same, but its context is now richer -->
      <section class="space-y-6 animate-fade-in">
        <h2 class="font-cinzel text-3xl md:text-4xl border-b border-white/20 pb-2">The Architects</h2>
        <img src="/icons/lore-architect.jpg" alt="A cloaked figure manipulating lines of code" class="h-200 rounded-lg shadow-xl border border-white/10 w-full object-cover">
        <p class="font-ebg text-lg text-white/90 leading-relaxed">
          In a desperate attempt to halt the Unraveling, The Compiler granted a new class of user elevated privileges: The Architects...
        </p>
        <blockquote class="border-l-4 border-blue-400 pl-4 py-2 my-4 bg-black/20 font-cormorantI italic text-lg text-slate-300">
          "They are not gods. They are debuggers. And the fate of our world is their stack trace." - Loremaster Elara
        </blockquote>
        <p class="font-ebg text-lg text-white/90 leading-relaxed">
          Your journey is to seek out the root cause of the Corruption. By debugging the world, you not only push back the decay but also buy precious time against the Great Unraveling...
        </p>
      </section>
    {/if}

  </div>
</div>

<style>
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fade-in 0.5s ease-out forwards;
  }
</style>