<script lang="ts">
import { orpc } from "$lib/orpc";
import { createQuery } from "@tanstack/svelte-query";

const healthCheck = createQuery(orpc.healthCheck.queryOptions());

import FinalCta from "../components/landing/FinalCTA.svelte";
import Footer from "../components/landing/Footer.svelte";
import GamePlay from "../components/landing/GamePlay.svelte";
import Hero from "../components/landing/Hero.svelte";
import Pillars from "../components/landing/Pillars.svelte";
  import Features from "../components/landing/Features.svelte";
</script>

<div>
  <Hero />
  <Pillars />
  <Features />
  <GamePlay />
  <FinalCta />
  <Footer />
</div>
