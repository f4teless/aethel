<script lang="ts">
  import { onMount } from 'svelte';
  import { backgroundImage } from '$lib/stores/uiStore'; // Assuming you have a store to set the page background

  // Countdown timer state
  let days = $state(0);
  let hours = $state(0);
  let minutes = $state(0);
  let seconds = $state(0);

  function calculateCountdown() {
    // Set a fictional, epic-sounding launch date
    const launchDate = new Date('2025-12-25T00:00:00Z').getTime();
    const now = new Date().getTime();
    const distance = launchDate - now;

    if (distance < 0) {
      // Handle case where countdown is over
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
      return;
    }

    days = Math.floor(distance / (1000 * 60 * 60 * 24));
    hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    seconds = Math.floor((distance % (1000 * 60)) / 1000);
  }

  onMount(() => {
    // Set a dramatic background image for this page
    // backgroundImage.set("url('/img/bg2.jpg')"); // Make sure to have a suitable image

    // Initialize and update the countdown every second
    calculateCountdown();
    const timer = setInterval(calculateCountdown, 1000);

    return () => {
      clearInterval(timer);
      // Optional: Reset background when leaving the page
      // backgroundImage.set("url('/img/default-bg.jpg')"); 
    };
  });
</script>

<!-- Main Container -->
<div class="flex flex-col items-center justify-center min-h-[90vh] text-center text-white px-4 relative z-10">
  
  <!-- Content Wrapper with a subtle background to improve readability -->
  <div class="bg-black/40 backdrop-blur-sm p-8 md:p-12 rounded-lg border border-white/10 max-w-4xl shadow-2xl">
    
    <!-- Main Heading -->
    <h1 class="font-cinzel text-4xl md:text-6xl font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
      The Arena Slumbers
    </h1>

    <!-- Subheading / Lore Text -->
    <p class="font-cormorantI text-xl md:text-2xl text-white/80 mt-4 max-w-2xl mx-auto drop-shadow-sm">
      Whispers echo through the halls of the Grand Coliseum. Soon, the gates will open, and the greatest Architects of Aethel will clash in duels of pure logic. Only the most elegant code will achieve victory.
    </p>

    <!-- Separator -->
    <div class="w-24 h-px bg-white/30 mx-auto my-10"></div>

    <!-- Countdown Timer -->
    <div>
      <h2 class="font-cinzel tracking-widest text-lg text-slate-300">PREPARATIONS COMPLETE IN</h2>
      <div class="flex justify-center items-center space-x-4 md:space-x-8 mt-4">
        <div class="text-center">
          <p class="font-cinzel text-4xl md:text-6xl font-bold">{String(days).padStart(2, '0')}</p>
          <p class="text-sm uppercase tracking-wider text-white/70">Days</p>
        </div>
        <div class="text-4xl md:text-6xl font-cinzel text-white/50 -mt-4">:</div>
        <div class="text-center">
          <p class="font-cinzel text-4xl md:text-6xl font-bold">{String(hours).padStart(2, '0')}</p>
          <p class="text-sm uppercase tracking-wider text-white/70">Hours</p>
        </div>
        <div class="text-4xl md:text-6xl font-cinzel text-white/50 -mt-4">:</div>
        <div class="text-center">
          <p class="font-cinzel text-4xl md:text-6xl font-bold">{String(minutes).padStart(2, '0')}</p>
          <p class="text-sm uppercase tracking-wider text-white/70">Minutes</p>
        </div>
        <div class="text-4xl md:text-6xl font-cinzel text-white/50 -mt-4">:</div>
        <div class="text-center">
          <p class="font-cinzel text-4xl md:text-6xl font-bold">{String(seconds).padStart(2, '0')}</p>
          <p class="text-sm uppercase tracking-wider text-white/70">Seconds</p>
        </div>
      </div>
    </div>

    <!-- Email Signup for Notification -->
    <div class="mt-12">
      <p class="text-lg font-ebg text-white/90">Be the first to know when the gates open.</p>
      <form class="mt-4 flex flex-col sm:flex-row justify-center items-center gap-2 max-w-lg mx-auto">
        <input 
          type="email" 
          placeholder="Enter your Architect's Glyph (email)..."
          class="w-full sm:w-auto flex-grow bg-white/5 border border-white/30 rounded px-4 py-3 text-white placeholder-white/50 focus:border-white/60 focus:ring-2 focus:ring-blue-500/50 outline-none transition"
        />
        <button 
          type="submit"
          class="w-full sm:w-auto bg-slate-700/50 text-white px-8 py-3 rounded-md transition font-cinzel tracking-wider shadow-lg hover:bg-slate-700/80 hover:shadow-xl hover:scale-105 duration-200 border border-white/20"
        >
          NOTIFY ME
        </button>
      </form>
    </div>

  </div>
</div>