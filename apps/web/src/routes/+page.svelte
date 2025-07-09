<script lang="ts">
  import { orpc } from "$lib/orpc";
  import { createQuery } from "@tanstack/svelte-query";
  const healthCheck = createQuery(orpc.healthCheck.queryOptions());
  import Hero from "../components/landing/Hero.svelte";
  import GamePlay from "../components/landing/GamePlay.svelte";
  import FinalCta from "../components/landing/FinalCTA.svelte";
  import Footer from "../components/landing/Footer.svelte";
  import Pillars from "../components/landing/Pillars.svelte";
</script>

<div>
  <Hero />
  <Pillars />
  <GamePlay />
  <FinalCta />
  <Footer />
</div>
