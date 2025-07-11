<script lang="ts">
import { backgroundImage } from "$lib/stores/uiStore";
import gsap from "gsap";
import { onMount } from "svelte";
import bg3 from "$lib/assets/icons/pvp/bg3.webp";


onMount(() => {
	gsap.from(".pvp-container", {
		y: 50,
		opacity: 0,
		duration: 1.2,
		ease: "power2.out",
	});

	gsap.from(".swords", {
		scale: 0.5,
		opacity: 0,
		rotate: -30,
		duration: 1.2,
		ease: "back.out(1.7)",
		delay: 0.3,
	});

	backgroundImage.set(`url(${bg3})`);
});
</script>

<div class="min-h-screen text-white relative overflow-hidden">

  <div class="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4 pvp-container">
    <!-- Icon or visual flair -->
    <div class="swords text-6xl mb-4 drop-shadow-lg">⚔️</div>

    <!-- Title -->
    <h1 class="text-5xl font-cinzel font-bold drop-shadow mb-3">Arena Awaits</h1>

    <!-- Subheading -->
    <p class="text-xl text-white/90 font-cormorantI max-w-xl mx-auto mb-6">
      The Architects shall clash soon. Logic will be your blade. Speed, your shield.
    </p>

    <!-- Button (non-functional yet) -->
    <button
      disabled
      class="text-white/70 bg-transparent border border-white/20 px-6 py-2 rounded-xl font-bold font-cinzel tracking-wide cursor-not-allowed transition hover:bg-current/20 backdrop-blur"
    >
      Coming Soon
    </button>
  </div>
</div>

<style>
  .swords {
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.4);
  }
</style>



