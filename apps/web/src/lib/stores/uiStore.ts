// src/lib/stores/uiStore.ts
import { writable } from "svelte/store";

// This store will hold the URL string for the current background image.
export const backgroundImage = writable("url('/icons/bg2.jpg')"); // Default background
export const reducedMotion = writable(false);
