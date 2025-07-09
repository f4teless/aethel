<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import { QueryClientProvider } from "@tanstack/svelte-query";
  import { SvelteQueryDevtools } from "@tanstack/svelte-query-devtools";
  import "../app.css";
  import { queryClient } from "$lib/orpc";
  import Header from "../components/Header.svelte";
  import { backgroundImage } from "$lib/stores/uiStore";

  let { children } = $props();
</script>

<QueryClientProvider client={queryClient}>
  <div
    class="bg-cover bg-center min-h-screen relative text-white transition-all duration-700"
    style:background-image={$backgroundImage}
  >
    <div class="absolute inset-0 bg-black/40 backdrop-blur-sm z-0"></div>

    <div class="grid h-svh grid-rows-[auto_1fr] relative z-10">
      <Header />
      
      <main class="overflow-y-auto">
        {@render children()}
      </main>
    </div>
  </div>

  <SvelteQueryDevtools />
</QueryClientProvider>