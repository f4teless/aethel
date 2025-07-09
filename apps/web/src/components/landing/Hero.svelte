<script>
import { hero } from "$lib/constants";
import { backgroundImage } from "$lib/stores/uiStore";
import { onMount } from "svelte";

const selected = hero[Math.floor(Math.random() * hero.length)];

const headingSentences = selected.heading
	.split(".")
	.map((s) => s.trim())
	.filter((s) => s.length > 0);

const loreIntro =
	selected.lore || "A world once governed by logic... now broken.";

onMount(() => {
	backgroundImage.set("url('/icons/bg2.jpg')");
});
</script>

<div class="flex flex-col items-center justify-center min-h-[90vh] text-center px-4">
    
    <!-- Lore: Changed to white for better contrast on dark backgrounds -->
    <p class="font-cormorantI text-xl text-white/70 mb-4 drop-shadow">
      {loreIntro}
    </p>

    <!-- Heading: Added a blinking cursor for the "code" vibe -->
    <div class="font-cinzel text-5xl md:text-6xl font-bold text-white space-y-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
      {#each headingSentences as sentence, i}
        <p>
          {sentence}.
          <!-- IMPROVEMENT: Add a blinking cursor only to the last sentence -->
          {#if i === headingSentences.length - 1}
            <span class="ml-1 animate-pulse">|</span>
          {/if}
        </p>
      {/each}
    </div>

    <!-- Subheading: No changes needed, already good -->
    <div class="font-cormorantI text-2xl text-white/80 px-6 mt-6 max-w-3xl drop-shadow-sm">
      {selected.subheading}
    </div>

    <!-- CTA: Enhanced the "glass" effect -->
    <div class="mt-10">
      <!-- IMPROVEMENT: Added backdrop-blur and a subtle border -->
      <a 
        href="/start" 
        class="bg-slate-700/30 text-white px-8 py-3 rounded-md transition font-ebg text-xl shadow-lg hover:bg-slate-700/60 hover:shadow-xl hover:scale-105 duration-200 border border-white/20 backdrop-blur-sm"
      >
        {selected.cta}
      </a>
    </div>

    <!-- Tagline: No changes needed -->
    {#if selected.tagline}
      <p class="mt-4 text-white/70 text-sm font-medium italic max-w-xl px-4">
        {selected.tagline}
      </p>
    {/if}
</div>