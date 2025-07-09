<!-- src/components/FormField.svelte -->
<script lang="ts">
import type { Field } from "@tanstack/svelte-form";

type Props = {
	field: Field<any, any, any, any>;
	label: string;
	type?: "text" | "email" | "password";
};

const { field, label, type = "text" }: Props = $props();

// IMPROVEMENT: State for password visibility toggle
  let showPassword = $state(false);
const isPassword = $derived(type === "password");
</script>

<div class="space-y-1 relative">
  <label for={field.name} class="text-sm font-medium text-white/80">{label}</label>
  <input
    id={field.name}
    name={field.name}
    type={isPassword ? (showPassword ? 'text' : 'password') : type}
    class="w-full bg-white/5 border border-white/30 rounded px-3 py-2 transition focus:border-white/60 focus:ring-2 focus:ring-blue-500/50 outline-none"
    class:pr-10={isPassword}
    value={field.state.value}
    oninput={(e) => field.handleChange((e.target as HTMLInputElement).value)}
    onblur={field.handleBlur}
  />
  
  <!-- IMPROVEMENT: Password visibility toggle button -->
  {#if isPassword}
    <button 
      type="button" 
      onclick={() => showPassword = !showPassword} 
      class="absolute right-3 top-[33px] text-white/50 hover:text-white"
      aria-label={showPassword ? "Hide password" : "Show password"}
    >
      <!-- Basic eye icon SVG -->
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
        <circle cx="12" cy="12" r="3"></circle>
        {#if !showPassword}
          <line x1="2" y1="22" x2="22" y2="2"></line>
        {/if}
      </svg>
    </button>
  {/if}

  {#if field.state.meta.isTouched && field.state.meta.errors.length}
    <div class="text-sm text-red-400 pt-1">
      {field.state.meta.errors[0]} <!-- Show only the first error for cleaner UI -->
    </div>
  {/if}
</div>