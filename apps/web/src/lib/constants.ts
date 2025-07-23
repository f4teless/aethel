import { Brain, Sword, Users, Trophy } from "lucide-react";

export const communityImages = [
  "/community-hall.webp",
  "/community-hall1.webp",
  "/community-hall2.webp",
];

export const errorImages = [
  "/error-glitch.webp",
  "/error-glitch1.webp",
];

export const leaderboardImages = [
  "/hall-of-honor.webp",
  "/hall-of-honor1.webp",
];

export const getRandomItem = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};



