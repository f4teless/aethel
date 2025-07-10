<!-- src/routes/login/+page.svelte (or your page component) -->
<script lang="ts">
import { backgroundImage, reducedMotion } from "$lib/stores/uiStore";
import gsap from "gsap";
import { onDestroy, onMount } from "svelte";
import SignInForm from "../../components/SignInForm.svelte";
import SignUpForm from "../../components/SignUpForm.svelte";
import bg4 from "$lib/assets/icons/bg4.webp";
import bg1 from "$lib/assets/icons/bg1.webp";

let showSignIn = $state(true);
const apiError = $state<string | null>(null);

let motionQuery: MediaQueryList;

// --- Audio ---
// Preload audio for better performance
let mountSfx: HTMLAudioElement | undefined;
let flipSfx: HTMLAudioElement | undefined;

// --- Cursor Aura ---
let cursorAura: HTMLElement;
const onMouseMove = (e: MouseEvent) => {
	// Use GSAP for smooth, interpolated movement
	gsap.to(cursorAura, {
		x: e.clientX,
		y: e.clientY,
		duration: 0.5,
		ease: "power2.out",
	});
};

// --- Particle System ---
let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D | null;
const particles: Particle[] = [];

class Particle {
	x: number;
	y: number;
	size: number;
	speedX: number;
	speedY: number;
	color: string;
	life: number;
	maxLife: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
		this.size = Math.random() * 5 + 2; // Size between 2px and 7px
		this.speedX = Math.random() * 3 - 1.5; // Horizontal velocity
		this.speedY = Math.random() * 3 - 1.5; // Vertical velocity
		this.color = `hsla(${Math.random() * 60 + 200}, 100%, 70%, 1)`; // Bluish-white sparkles
		this.maxLife = Math.random() * 60 + 30; // Frames to live
		this.life = this.maxLife;
	}

	update() {
		this.x += this.speedX;
		this.y += this.speedY;
		this.life -= 1;
		this.size *= 0.98; // Shrink over time
	}

	draw(context: CanvasRenderingContext2D) {
		context.fillStyle = this.color.replace(
			"1)",
			`${this.life / this.maxLife})`,
		);
		context.beginPath();
		context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
		context.fill();
	}
}

function triggerParticles(count = 30) {
	if (!canvas) return;
	const rect = canvas.getBoundingClientRect();
	const centerX = rect.width / 2;
	const centerY = rect.height / 2;
	for (let i = 0; i < count; i++) {
		particles.push(new Particle(centerX, centerY));
	}
}

function animateParticles() {
	if (!ctx || !canvas) return;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (let i = particles.length - 1; i >= 0; i--) {
		const p = particles[i];
		p.update();
		p.draw(ctx);
		if (p.life <= 0) {
			particles.splice(i, 1);
		}
	}
	requestAnimationFrame(animateParticles);
}

// --- Animations ---
const entryEffects = [
	() =>
		gsap.from(".auth-container", {
			y: -100,
			opacity: 0,
			duration: 1.2,
			ease: "back.out(1.7)",
		}),
	() =>
		gsap.from(".auth-container", {
			scale: 0.7,
			opacity: 0,
			duration: 1,
			ease: "expo.out",
		}),
	() =>
		gsap.from(".auth-container", {
			rotationX: 90,
			opacity: 0,
			duration: 1,
			transformOrigin: "top center",
			ease: "power2.out",
		}),
	() =>
		gsap.from(".auth-container", {
			y: 60,
			opacity: 0,
			duration: 1,
			ease: "power3.out",
		}),
];

function switchToSignIn() {
	animateFlip(() => (showSignIn = true));
}

function switchToSignUp() {
	animateFlip(() => (showSignIn = false));
}

function animateFlip(callback: () => void) {
	if ($reducedMotion) {
		callback();
		return; // Skip the animation entirely
	}
	const container = document.querySelector(".auth-card");
	const shimmer = document.querySelector(".flip-aura");
	if (!container) return;

	// Play flip sound and trigger effects
	flipSfx?.play();
	triggerParticles();

	gsap.to(container, {
		rotateY: 90,
		duration: 0.35, // Slightly longer for a better feel
		ease: "power2.in",
		onStart: () => {
			// "Bloom" the aura effect
			if (shimmer)
				gsap.fromTo(
					shimmer,
					{ opacity: 0, scale: 0.8 },
					{ opacity: 1, scale: 1.2, duration: 0.3 },
				);
		},
		onComplete: () => {
			callback();
			gsap.fromTo(
				container,
				{ rotateY: -90 },
				{
					rotateY: 0,
					duration: 0.35,
					ease: "power2.out",
					onComplete: () => {
						// Fade out the aura
						if (shimmer) gsap.to(shimmer, { opacity: 0, duration: 0.3 });
					},
				},
			);
		},
	});
}

onMount(() => {
	motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
	reducedMotion.set(motionQuery.matches);
	const motionListener = () => reducedMotion.set(motionQuery.matches);
	motionQuery.addEventListener("change", motionListener);
	// Initialize SFX
	mountSfx = new Audio("/music/retro-game-notification.wav");
	flipSfx = new Audio("/music/fast-sweep-transition.wav"); // Assumes you have a flip sound
	if (mountSfx) mountSfx.volume = 0.3;
	if (flipSfx) flipSfx.volume = 0.4;

	// Play entry sound
	mountSfx.play().catch((e) => console.error("Audio play failed:", e));

	// Initialize Cursor Aura
	window.addEventListener("mousemove", onMouseMove);

	// Initialize Particles
	ctx = canvas.getContext("2d");
	if (canvas && ctx) {
		canvas.width = canvas.offsetWidth;
		canvas.height = canvas.offsetHeight;
		animateParticles();
	}

	// Run random entry animation
	if (!$reducedMotion) {
		const fx = entryEffects[Math.floor(Math.random() * entryEffects.length)];
		fx();
	}
});

onDestroy(() => {
	// Clean up event listeners to prevent memory leaks
	window.removeEventListener("mousemove", onMouseMove);
	// motionQuery.removeEventListener('change', motionListener);
});

$effect(() => {
	$: backgroundImage.set(
		showSignIn ? `url(${bg4})` : `url(${bg1})`,
	);
});
</script>

<!-- The background now uses a dynamic image based on the view -->
<div
  class="min-h-screen relative text-white transition-all duration-500 overflow-hidden"
  >

  <!-- AURA: Follows the cursor -->
  <div bind:this={cursorAura} id="cursor-aura"></div>

  <!-- AURA: Blooms during card flip transition -->
  <div class="flip-aura pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(ellipse_at_center,rgba(180,210,255,0.15),transparent_60%)] opacity-0"></div>

  <!-- Main Content -->
  <div class="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
    <div class="auth-container text-center relative">
      <!-- PARTICLES: Canvas for the particle animations -->
      <div class="absolute inset-0 pointer-events-none z-[-1] flex justify-center items-center">
        <canvas bind:this={canvas} class="w-[500px] h-[500px]"></canvas>
      </div>

      <!-- Header Text -->
      {#if showSignIn}
        <h1 class="text-4xl font-cinzel font-bold drop-shadow">
          Welcome Back, Seeker
        </h1>
        <p class="text-lg font-cormorantI text-white/80 mt-2 mb-6">
          The CodeRealm stirs. Your glyph is recognized.
        </p>
      {:else}
        <h1 class="text-4xl font-cinzel font-bold drop-shadow">
          Forge Your Fate
        </h1>
        <p class="text-lg font-cormorantI text-white/80 mt-2 mb-6">
          Bind your soul to a new Architect’s Sigil.
        </p>
      {/if}

      <!-- Flip Animation Container -->
      <div class="perspective">
        <div class="auth-card w-full max-w-md relative">
          {#if showSignIn}
            <SignInForm />
          {:else}
            <SignUpForm />
          {/if}
        </div>
      </div>

      <!-- Switch Button -->
      <div class="mt-4">
        {#if showSignIn}
          <button
            type="button"
            class="text-white/70 hover:text-white underline text-sm"
            onclick={switchToSignUp}
          >
            No identity yet? Begin Your Journey
          </button>
        {:else}
          <button
            type="button"
            class="text-white/70 hover:text-white underline text-sm"
            onclick={switchToSignIn}
          >
            Already sworn an oath? Return to Sign In
          </button>
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  .perspective {
    perspective: 1200px;
  }
  .auth-card {
    transform-style: preserve-3d;
  }
  
  /* Style for the cursor following aura */
  #cursor-aura {
    position: fixed;
    top: 0;
    left: 0;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    /* A soft, ethereal blue glow */
    background: radial-gradient(circle, rgba(100, 150, 255, 0.4) 0%, rgba(100, 150, 255, 0) 60%);
    pointer-events: none; /* Allows clicks to pass through */
    z-index: 9999;
    /* Center the aura on the cursor */
    transform: translate(-50%, -50%);
  }
</style>