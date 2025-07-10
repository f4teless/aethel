import { PUBLIC_SERVER_URL } from "$env/static/public";
import { createAuthClient } from "better-auth/svelte";

export const authClient = createAuthClient({
  baseURL: "https://aethel-server.dashing4149.workers.dev/",
});
