<script lang="ts">
  import { createForm } from '@tanstack/svelte-form';
  import z from 'zod/v4';
  import { authClient } from '$lib/auth-client';
  import { goto } from '$app/navigation';
  import FormField from './FormField.svelte';

  // IMPROVEMENT: Add a state for API errors
  let apiError = $state<string | null>(null);


  const validationSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
  });

  const form = createForm(() => ({
    defaultValues: { name: '', email: '', password: '' },
    onSubmit: async ({ value }) => {
      apiError = null;
      await authClient.signUp.email(
        {
          email: value.email,
          password: value.password,
          name: value.name,
        },
        {
          onSuccess: () => goto('/dashboard'),
          onError: (error) => {
            apiError = error.error.message || 'Sign up failed. Please try again.';
          },
        }
      );
    },
    validators: { onSubmit: validationSchema },
  }));
</script>

<form
  class="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-lg w-full max-w-md space-y-4"
  onsubmit={(e) => { e.preventDefault(); e.stopPropagation(); form.handleSubmit(); }}
>
  <!-- Name Field -->
  <form.Field name="name">
    {#snippet children(field)} <FormField {field} label="Architect's Name" /> {/snippet}
  </form.Field>

  <!-- Email Field -->
  <form.Field name="email">
    {#snippet children(field)} <FormField {field} label="Glyph (Email)" type="email" /> {/snippet}
  </form.Field>

  <!-- Password Field -->
  <form.Field name="password">
    {#snippet children(field)} <FormField {field} label="Secret Rune (Password)" type="password" /> {/snippet}
  </form.Field>

  <!-- IMPROVEMENT: Display API error here -->
  {#if apiError}
    <p class="text-center text-red-400 bg-red-900/30 p-2 rounded-md">{apiError}</p>
  {/if}

  <!-- Submit Button -->
  <form.Subscribe selector={(state) => ({ canSubmit: state.canSubmit, isSubmitting: state.isSubmitting })}>
    {#snippet children(state)}
      <button type="submit" class="w-full bg-[#0B1014]/80 text-white py-2 rounded font-ebg hover:bg-[#0B1014] transition" disabled={!state.canSubmit || state.isSubmitting}>
        {state.isSubmitting ? 'Summoning...' : 'Forge Sigil'}
      </button>
    {/snippet}
  </form.Subscribe>
</form>
