<script lang="ts">
  import worldImg from '$lib/assets/icons/lore/lore-world.webp?enhanced';
  import unravelingImg from '$lib/assets/icons/lore/lore-unraveling.webp?enhanced';
  import corruptionImg from '$lib/assets/icons/lore/lore-corruption.webp?enhanced';
  import architectImg from '$lib/assets/icons/lore/lore-architect.webp?enhanced';
  import loreLibrary from '$lib/assets/icons/lore/lore-library.webp';

  import { backgroundImage } from '$lib/stores/uiStore';
  import { onMount } from 'svelte';

  let activeTab = $state('unraveling');
  
  onMount(() => {
    backgroundImage.set(`url(${loreLibrary})`);
  })
</script>


<!-- Add the namespace required for enhanced:img -->
<svelte:options namespace="html" />

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

  <!-- Lore Navigation -->
  <div class="top-[70px] z-40 bg-slate-900/50 backdrop-blur-lg rounded-lg border border-white/10 mb-12">
    <nav class="flex justify-center items-center flex-wrap gap-x-4 sm:gap-x-8 p-4 font-cinzel tracking-wider">
      <button class={`transition ${activeTab === 'world' ? 'text-white' : 'text-white/60'}`} onclick={() => activeTab = 'world'}>The World</button>
      <div class="h-4 w-px bg-white/20 hidden sm:block"></div>
      <button class={`transition ${activeTab === 'unraveling' ? 'text-white' : 'text-white/60'}`} onclick={() => activeTab = 'unraveling'}>The Great Unraveling</button>
      <div class="h-4 w-px bg-white/20 hidden sm:block"></div>
      <button class={`transition ${activeTab === 'corruption' ? 'text-white' : 'text-white/60'}`} onclick={() => activeTab = 'corruption'}>The Code Corruption</button>
      <div class="h-4 w-px bg-white/20 hidden sm:block"></div>
      <button class={`transition ${activeTab === 'architects' ? 'text-white' : 'text-white/60'}`} onclick={() => activeTab = 'architects'}>The Architects</button>
    </nav>
  </div>

  <!-- Lore Content -->
  <div class="max-w-4xl mx-auto space-y-20">

    <!-- Aethel: The World -->
    {#if activeTab === 'world'}
      <section class="space-y-6 animate-fade-in">
        <h2 class="font-cinzel text-3xl md:text-4xl border-b border-white/20 pb-2">Aethel: The CodeRealm</h2>
        <enhanced:img
          src={worldImg}
          alt="A sweeping vista of the world of Aethel"
          sizes="(min-width: 1024px) 1024px, 100vw"
          class="h-300 rounded-lg shadow-xl border border-white/10 w-full object-cover"
        />
        <p class="font-ebg text-lg text-white/90 leading-relaxed">
          Aethel is not a world of earth and stone, but one of pure logic and syntax...
        </p>
        <blockquote class="border-l-4 border-blue-400 pl-4 py-2 my-4 bg-black/20 font-cormorantI italic text-lg text-slate-300">
          "In the beginning, there was the void. Then, the Compiler spoke: `main()`. And there was light." - The First Log
        </blockquote>
        <p class="font-ebg text-lg text-white/90 leading-relaxed">
          For eons, The Compiler maintained perfect harmony. But no system is eternal...
        </p>
      </section>
    {/if}

    <!-- The Great Unraveling -->
    {#if activeTab === 'unraveling'}
      <section class="space-y-6 animate-fade-in">
        <h2 class="font-cinzel text-3xl md:text-4xl border-b border-white/20 pb-2">The Great Unraveling</h2>
        <enhanced:img
          src={unravelingImg}
          alt="A world fracturing and dissolving into digital fragments"
          sizes="(min-width: 1024px) 1024px, 100vw"
          class="h-200 rounded-lg shadow-xl border border-white/10 w-full object-cover"
        />
        <p class="font-ebg text-lg text-white/90 leading-relaxed">
          The Great Unraveling is the name given to the slow, catastrophic system crash of reality itself...
        </p>
        <blockquote class="border-l-4 border-purple-500 pl-4 py-2 my-4 bg-black/20 font-cormorantI italic text-lg text-slate-300">
          "The Unraveling is not death. It is worse. It is the systematic de-allocation of memory..."
        </blockquote>
        <p class="font-ebg text-lg text-white/90 leading-relaxed">
          Should the Unraveling complete, Aethel will cease to exist...
        </p>
      </section>
    {/if}

    <!-- The Code Corruption -->
    {#if activeTab === 'corruption'}
      <section class="space-y-6 animate-fade-in">
        <h2 class="font-cinzel text-3xl md:text-4xl border-b border-white/20 pb-2">The Code Corruption</h2>
        <enhanced:img
          src={corruptionImg}
          alt="A monstrous glitch beast"
          sizes="(min-width: 1024px) 1024px, 100vw"
          class="h-250 rounded-lg shadow-xl border border-white/10 w-full object-cover"
        />
        <p class="font-ebg text-lg text-white/90 leading-relaxed">
          If the Great Unraveling is the disease, the Code Corruption is its symptoms...
        </p>
        <blockquote class="border-l-4 border-red-500 pl-4 py-2 my-4 bg-black/20 font-cormorantI italic text-lg text-slate-300">
          "We saw it first in the Datawood... the trees began to scream in binary."
        </blockquote>
        <p class="font-ebg text-lg text-white/90 leading-relaxed">
          These anomalies are not merely dangerous; they are catalysts...
        </p>
      </section>
    {/if}

    <!-- The Architects -->
    {#if activeTab === 'architects'}
      <section class="space-y-6 animate-fade-in">
        <h2 class="font-cinzel text-3xl md:text-4xl border-b border-white/20 pb-2">The Architects</h2>
        <enhanced:img
          src={architectImg}
          alt="A cloaked figure manipulating lines of code"
          sizes="(min-width: 1024px) 1024px, 100vw"
          class="h-200 rounded-lg shadow-xl border border-white/10 w-full object-cover"
        />
        <p class="font-ebg text-lg text-white/90 leading-relaxed">
          In a desperate attempt to halt the Unraveling, The Compiler granted a new class of user...
        </p>
        <blockquote class="border-l-4 border-blue-400 pl-4 py-2 my-4 bg-black/20 font-cormorantI italic text-lg text-slate-300">
          "They are not gods. They are debuggers. And the fate of our world is their stack trace."
        </blockquote>
        <p class="font-ebg text-lg text-white/90 leading-relaxed">
          Your journey is to seek out the root cause of the Corruption...
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

  /* Optional: scoped styles for enhanced image if needed */
  enhanced\:img {
    display: block;
  }
</style>
