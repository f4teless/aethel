<script lang="ts">
import { orpc } from "$lib/orpc";
import { createQuery } from "@tanstack/svelte-query";
const healthCheck = createQuery(orpc.healthCheck.queryOptions());
import Hero from "../components/Hero.svelte";
</script>

<div>
	<Hero />
</div>