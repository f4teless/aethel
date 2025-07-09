<script lang="ts">
// Icons can be simple SVGs or imported components
// import BrainIcon from '/icons/BrainIcon.svg';
// import CodeIcon from '/icons/CodeIcon.svg?component';
// import CommunityIcon from '/icons/CommunityIcon.svg?component';
</script>

<div class="py-20 md:py-32">
  <div class="container mx-auto px-6 text-center">
    <h2 class="font-cinzel text-4xl md:text-5xl text-white font-bold drop-shadow-lg">
      A World Woven from Code
    </h2>
    <p class="font-cormorantI text-xl text-white/80 mt-4 max-w-3xl mx-auto">
      Once perfect, the world of Aethel is now breaking apart — its logic fading, its memory leaking. The Compiler sleeps. The Corruption spreads. Only Architects like you—wielders of logic—can fight back the Corruption that threatens to unravel existence.
    </p>

    <div class="grid md:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto">
      <!-- Pillar 1: AI Story -->
      <div class="bg-black/20 p-8 rounded-lg border border-white/10 backdrop-blur-md shadow-xl hover:-translate-y-2 transition-transform duration-300">
        <div class="h-16 w-16 mx-auto mb-4 text-slate-400 flex items-center justify-center">
          <!-- <BrainIcon /> -->
          <img src="/icons/BrainIcon.svg" alt="Brain Icon" class="object-fit" />
        </div>
        <h3 class="font-cinzel text-2xl text-white font-semibold">Narrative-Driven</h3>
        <p class="text-white/70 mt-2 font-ebg">
          Embark on an epic saga crafted by a powerful AI Chronicler. Your choices, victories, and failures shape a story that is uniquely yours.
        </p>
      </div>

      <!-- Pillar 2: Code Combat -->
      <div class="bg-black/20 p-8 rounded-lg border border-white/10 backdrop-blur-md shadow-xl hover:-translate-y-2 transition-transform duration-300">
        <div class="h-16 w-16 mx-auto mb-4 text-slate-400 flex items-center justify-center">
          <!-- <CodeIcon /> -->
           <img src="/icons/CodeIcon.svg" alt="code-icon" class="object-fit"/>
        </div>
        <h3 class="font-cinzel text-2xl text-white font-semibold">Code is Combat</h3>
        <p class="text-white/70 mt-2 font-ebg">
          Your mind is your weapon. Solve algorithmic challenges to defeat enemies, shatter arcane seals, and debug a world falling apart.
        </p>
      </div>

      <!-- Pillar 3: Community -->
      <div class="bg-black/20 p-8 rounded-lg border border-white/10 backdrop-blur-md shadow-xl hover:-translate-y-2 transition-transform duration-300">
        <div class="h-16 w-16 mx-auto mb-4 text-slate-400 flex items-center justify-center">
          <!-- <CommunityIcon /> -->
           <img src="/icons/CommunityIcon.svg" alt="community-icon" class="object-fit"/>
        </div>
        <h3 class="font-cinzel text-2xl text-white font-semibold">Living World</h3>
        <p class="text-white/70 mt-2 font-ebg">
          Compete for global glory in the PvP Arena, team up with friends to conquer dungeons, and unite in server-wide events to save Aethel.
        </p>
      </div>
    </div>
  </div>
</div>