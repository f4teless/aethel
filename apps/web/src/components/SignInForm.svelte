<script lang="ts">
import { goto } from "$app/navigation";
import { authClient } from "$lib/auth-client";
import { createForm } from "@tanstack/svelte-form";
import z from "zod/v4";
import FormField from "./FormField.svelte";

// IMPROVEMENT: Add a state for API errors
let apiError = $state<string | null>(null);

const validationSchema = z.object({
	email: z.email("Invalid email address"),
	password: z.string().min(1, "Password is required"),
});

const form = createForm(() => ({
	defaultValues: { email: "", password: "" },
	onSubmit: async ({ value }) => {
		apiError = null;
		await authClient.signIn.email(
			{ email: value.email, password: value.password },
			{
				onSuccess: () => goto("/dashboard"),
				onError: (error) => {
					apiError = error.error.message || "Sign in failed. Please try again.";
				},
			},
		);
	},
	validators: { onSubmit: validationSchema },
}));
</script>

<form
      class="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-lg w-full max-w-md space-y-4"
      onsubmit={(e) => {
			e.preventDefault();
			e.stopPropagation();
			form.handleSubmit();
		}}
    >
      <!-- Email Field -->
      <form.Field name="email">
        {#snippet children(field)}
          <FormField {field} label="Glyph (Email)" type="email" />
        {/snippet}
      </form.Field>

      <!-- Password Field -->
      <form.Field name="password">
        {#snippet children(field)}
          <FormField {field} label="Secret Rune (Password)" type="password" />
        {/snippet}
      </form.Field>

      <!-- Submit -->
      <form.Subscribe selector={(state) => ({ canSubmit: state.canSubmit, isSubmitting: state.isSubmitting })}>
        {#snippet children(state)}
          <button
            type="submit"
            class="w-full bg-[#0B1014]/80 text-white py-2 rounded font-ebg hover:bg-[#0B1014] transition"
            disabled={!state.canSubmit || state.isSubmitting}
          >
            {state.isSubmitting ? 'Entering Realm…' : 'Return to the CodeRealm'}
          </button>
        {/snippet}
      </form.Subscribe>
    </form>
