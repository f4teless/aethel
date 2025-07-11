// src/lib/stores/uiStore.ts
import { writable } from "svelte/store";
import bg2 from "$lib/assets/icons/landing/bg2.webp";

// This store will hold the URL string for the current background image.
export const backgroundImage = writable(`url(${bg2})`); // Default background
export const reducedMotion = writable(false);
