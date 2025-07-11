<script>
  import { dev } from '$app/environment';
    import { page } from '$app/state';
    let title = '';
    let description = '';
//     onMount(() => {
//     // A glitchy, corrupted background is perfect for an error page
//     backgroundImage.set("url('/img/error-glitch.jpg')"); 
//   });
  // Use a reactive block to set the thematic error message based on the status code
  $: {
    switch (page.status) {
      case 404:
        title = 'A VOID POINTER EXCEPTION';
        description = 'The resource you seek has been de-allocated by the Great Unraveling, or perhaps it never existed at all. The logic path leads into a void.';
        break;
      case 403:
        title = 'INSUFFICIENT PRIVILEGE';
        description = 'This memory fragment is protected by a higher-level sigil. Your Architect credentials do not grant access to this data stream.';
        break;
      case 500:
      case 503:
        title = 'KERNEL PANIC';
        description = 'The Compiler is struggling to process a fatal paradox, causing system-wide instability. Please return to a stable zone and try again when the cycle resets.';
        break;
      default:
        title = 'AN UNSTABLE PARADOX';
        description = 'You\'ve encountered a ripple in the CodeRealm—an anomaly that defies logic. It is unwise to linger here.';
    }
  }
</script>

<div class="flex flex-col items-center justify-center min-h-screen text-center text-white px-4 relative z-10">
  <div class="bg-black/50 backdrop-blur-lg p-8 md:p-12 rounded-xl border border-red-500/30 max-w-3xl shadow-2xl shadow-red-900/20">
    <div class="glitch font-cinzel text-7xl md:text-9xl font-black" data-text={page.status}>
      {page.status}
    </div>
    <h1 class="font-cinzel text-3xl md:text-4xl font-bold mt-4 text-red-400 tracking-wider">
      {title}
    </h1>
    <p class="font-cormorantI text-lg md:text-xl text-white/80 mt-6 max-w-2xl mx-auto">
      {description}
    </p>
    <div class="mt-10 flex justify-center space-x-4">
      <a 
      href="/"
        class="bg-cyan-600/20 hover:bg-cyan-500/30 text-white px-8 py-3 rounded-md transition font-cinzel tracking-wider shadow-lg  hover:shadow-xl hover:scale-105 duration-200 border border-white/20"
      >
        RETURN TO SAFETY
      </a>
      <a 
      href="/lore"
        class="bg-slate-800/40 hover:bg-slate-700/50 text-white px-8 py-3 rounded-md transition font-cinzel tracking-wider shadow-lg hover:shadow-xl hover:scale-105 duration-200 border border-white/20"
      >
        Revisit the Lore
      </a>
    </div>
    {#if dev && page.error?.message}
      <div class="mt-6 bg-black/40 p-4 rounded-md text-left border border-white/10 font-mono text-sm text-red-300">
        <p class="mb-1 text-white/60">🛠️ Technical Trace:</p>
        <code>{page.error.message}</code>
      </div>
    {/if}
  </div>
</div>


<!-- <div class="flex flex-col items-center justify-center min-h-screen text-center text-white px-4 relative z-10">
  <div class="bg-black/50 backdrop-blur-lg p-8 md:p-12 rounded-xl border border-red-500/30 max-w-3xl shadow-2xl shadow-red-900/20">
    <div class="glitch font-cinzel text-7xl md:text-9xl font-black" data-text={page.status}>
      {page.status}
    </div>
    <h1 class="font-cinzel text-3xl md:text-4xl font-bold mt-4 text-red-400 tracking-wider">
      {title}
    </h1>
    <p class="font-cormorantI text-lg md:text-xl text-white/80 mt-6 max-w-2xl mx-auto">
      {description}
    </p>
    <div class="mt-10">
      <a 
        class="bg-slate-700/50 text-white px-8 py-3 rounded-md transition font-cinzel tracking-wider shadow-lg hover:bg-slate-700/80 hover:shadow-xl hover:scale-105 duration-200 border border-white/20"
      >
        RETURN TO SAFETY
      </a>
    </div>
    {#if dev && page.error?.message}
      <div class="mt-8 p-4 bg-black/50 rounded-md border border-slate-700 max-w-full overflow-x-auto">
        <p class="font-mono text-xs text-left text-red-400">
          <span class="font-bold">DEBUGGER_LOG:</span> {page.error.message}
        </p>
      </div>
    {/if}
  </div>
</div> -->

<!-- <div class="min-h-screen flex items-center justify-center  text-white px-6 py-12 bg-[url('/img/landing.jpg')] bg-cover bg-center relative">
  <div class="relative z-10 max-w-2xl w-full bg-white/5 border border-white/10 rounded-xl shadow-2xl p-8 backdrop-blur text-center">
    <h1 class="text-5xl font-cinzel font-bold drop-shadow text-red-400">
      {page.status === 404 ? '404: Page Not Found' : `${page.status}: KERNEL PANIC`}
    </h1>
    <p class="mt-4 tex
    
    t-white/80 font-cormorantI text-lg italic">
      📜 CHRONICLER: "The Compiler faltered while parsing this route. The logic path leads into a void."
    </p>
    {#if page.error?.message}
      <div class="mt-6 bg-black/40 p-4 rounded-md text-left border border-white/10 font-mono text-sm text-red-300">
        <p class="mb-1 text-white/60">🛠️ Technical Trace:</p>
        <code>{page.error.message}</code>
      </div>
    {/if}
    <div class="mt-8 flex justify-center space-x-4">
      <a href="/" class="bg-cyan-600/20 hover:bg-cyan-500/30 text-white font-cinzel px-6 py-2 rounded-md border border-white/10 backdrop-blur shadow hover:shadow-cyan-500/20 transition">
        Return to Aethel
      </a>
      <a href="/lore" class="bg-slate-800/40 hover:bg-slate-700/50 text-white font-cinzel px-6 py-2 rounded-md border border-white/10 backdrop-blur transition">
        Revisit the Lore
      </a>
    </div>
  </div>
</div> -->


<style>
  /* A simple but effective glitch effect for the error code */
  .glitch {
    position: relative;
    text-shadow: 
      0.05em 0 0 rgba(255, 0, 0, 0.75),
      -0.025em -0.05em 0 rgba(0, 255, 0, 0.75),
      0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
    animation: glitch 500ms infinite;
  }

  .glitch:before,
  .glitch:after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: transparent;
  }

  .glitch:before {
    left: 2px;
    text-shadow: -2px 0 #ff00c1;
    clip: rect(44px, 450px, 56px, 0);
    animation: glitch-anim 2s infinite linear alternate-reverse;
  }

  .glitch:after {
    left: -2px;
    text-shadow: -2px 0 #00fff9, 2px 2px #ff00c1;
    clip: rect(85px, 450px, 90px, 0);
    animation: glitch-anim-2 3s infinite linear alternate-reverse;
  }

  @keyframes glitch-anim {
    0% { clip: rect(42px, 9999px, 44px, 0); }
    5% { clip: rect(12px, 9999px, 60px, 0); }
    /* ... add more steps for a more complex glitch ... */
    100% { clip: rect(90px, 9999px, 92px, 0); }
  }

  @keyframes glitch-anim-2 {
    0% { clip: rect(2px, 9999px, 10px, 0); }
    15% { clip: rect(78px, 9999px, 92px, 0); }
    /* ... add more steps ... */
    100% { clip: rect(52px, 9999px, 60px, 0); }
  }
</style>