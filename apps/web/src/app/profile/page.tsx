"use client";

import { useState } from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { LucideSword, LucideShield, LucideWand, LucideCrown } from "lucide-react";

const mockProfile = {
  name: "Cipher Walker",
  class: "Array Knight",
  level: 17,
  xp: 3420,
  nextLevelXp: 4000,
  health: 120,
  maxHealth: 150,
  mana: 80,
  maxMana: 100,
  avatar: "/feature-classes.png",
  equipment: [
    { name: "Sword of Recursion", icon: <LucideSword className="w-6 h-6" />, type: "weapon" },
    { name: "Shield of Null Safety", icon: <LucideShield className="w-6 h-6" />, type: "shield" },
    { name: "Wand of Async", icon: <LucideWand className="w-6 h-6" />, type: "magic" },
  ],
  achievements: [
    { name: "First Commit", icon: <LucideCrown className="w-5 h-5" />, desc: "Joined the CodeRealm" },
    { name: "Bug Slayer", icon: <LucideSword className="w-5 h-5" />, desc: "Defeated 100 bugs" },
  ],
  backstory: `Once a humble script runner, Cipher Walker rose through the ranks of the Array Knights, wielding logic as both shield and blade. Their code is said to bend reality, and their quest: to debug the very fabric of Aethel.`
};

export default function ProfilePage() {
  const [profile] = useState(mockProfile);

  return (
    <div className="relative z-10 max-w-4xl mx-auto py-16 px-4 md:px-0">
      {/* Hero Banner */}
      <Card className="flex flex-col md:flex-row items-center bg-black/60 border border-white/10 shadow-xl mb-8 p-6 md:p-10 backdrop-blur-lg">
        <img
          src={profile.avatar}
          alt="Avatar"
          className="w-32 h-32 rounded-full border-4 border-cyan-400 shadow-lg object-cover bg-black/30"
        />
        <div className="md:ml-8 text-center md:text-left mt-6 md:mt-0">
          <h1 className="font-cinzel text-3xl md:text-4xl font-bold text-white drop-shadow mb-2">
            {profile.name}
          </h1>
          <div className="flex items-center justify-center md:justify-start space-x-3 mb-2">
            <span className="bg-cyan-700/30 text-cyan-200 px-3 py-1 rounded-full font-cinzel text-sm border border-cyan-400/30">
              {profile.class}
            </span>
            <span className="bg-purple-700/30 text-purple-200 px-3 py-1 rounded-full font-cinzel text-sm border border-purple-400/30">
              Level {profile.level}
            </span>
          </div>
          <div className="flex items-center justify-center md:justify-start space-x-2 text-white/80 text-sm">
            <span>XP: {profile.xp} / {profile.nextLevelXp}</span>
            <span className="mx-2">|</span>
            <span>Health: {profile.health} / {profile.maxHealth}</span>
            <span className="mx-2">|</span>
            <span>Mana: {profile.mana} / {profile.maxMana}</span>
          </div>
          <div className="mt-4 flex gap-2 justify-center md:justify-start">
            <Button variant="secondary" size="sm">Edit Profile</Button>
            <Button variant="outline" size="sm">Change Avatar</Button>
          </div>
        </div>
      </Card>

      {/* Stats & Equipment */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Equipment */}
        <Card className="bg-black/60 border border-white/10 p-6 backdrop-blur-lg">
          <h2 className="font-cinzel text-xl text-cyan-300 mb-4">Equipment</h2>
          <ul className="space-y-3">
            {profile.equipment.map((item, i) => (
              <li key={i} className="flex items-center space-x-3 text-white/90">
                <span>{item.icon}</span>
                <span className="font-cormorant text-lg">{item.name}</span>
              </li>
            ))}
          </ul>
        </Card>
        {/* Achievements */}
        <Card className="bg-black/60 border border-white/10 p-6 backdrop-blur-lg">
          <h2 className="font-cinzel text-xl text-yellow-300 mb-4">Achievements</h2>
          <ul className="space-y-3">
            {profile.achievements.map((ach, i) => (
              <li key={i} className="flex items-center space-x-3 text-white/90">
                <span>{ach.icon}</span>
                <span className="font-cormorant text-lg">{ach.name}</span>
                <span className="text-xs text-white/60 italic">{ach.desc}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Backstory */}
      <Card className="bg-black/60 border border-white/10 p-6 backdrop-blur-lg">
        <h2 className="font-cinzel text-xl text-purple-300 mb-2">Backstory</h2>
        <p className="font-cormorant text-white/90 italic text-lg leading-relaxed">
          {profile.backstory}
        </p>
      </Card>
    </div>
  );
}
