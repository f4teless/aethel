"use client";

import { useState } from "react";
import Link from "next/link";

const CommunityMain = () => {
  const [activeLeaderboardTab, setActiveLeaderboardTab] = useState("pvp");

  const pvpRankings = [
    { rank: 1, name: "VoidWalker", class: "Graph Assassin", rating: 2850 },
    { rank: 2, name: "Recursia", class: "Dynamic Mage", rating: 2810 },
    { rank: 3, name: "Sentinel", class: "Array Knight", rating: 2795 },
    { rank: 4, name: "BinarySavant", class: "Bit Sage", rating: 2750 },
    { rank: 5, name: "SortaFine", class: "Greedy Ronin", rating: 2720 },
  ];

  const classMasters = [
    { rank: 1, name: "Recursia", class: "Dynamic Mage", solved: 450 },
    { rank: 2, name: "Sentinel", class: "Array Knight", solved: 435 },
    { rank: 3, name: "VoidWalker", class: "Graph Assassin", solved: 421 },
  ];

  const spotlightArchitect = {
    name: "Recursia",
    title: "The Unraveler of Knots",
    class: "Dynamic Mage",
    stats: [
      { label: "PvP Rank", value: "#2" },
      { label: "DP Problems Solved", value: "450" },
      { label: "Accuracy", value: "98.7%" },
    ],
  };

  const dailyBounty = {
    title: "Decrypt the Glitched Rune",
    difficulty: "Medium",
    domain: "Strings",
    xp: 500,
  };

  const communityEvents = [
    {
      title: "World Event: The Memory Leak",
      status: "UPCOMING",
      description:
        "A massive entity threatens to consume the world's memory. All Architects are called to defend reality itself.",
      date: "Next Cycle",
    },
    {
      title: "New Dungeon Discovered!",
      status: "LIVE",
      description:
        'The "Recursion Deeps," a mind-bending dungeon for Dynamic Mages, has been located. Gather your party.',
      date: "Now Live",
    },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 py-16 md:py-24 text-white">
      <header className="text-center max-w-4xl mx-auto mb-16">
        <h1 className="font-cinzel text-4xl md:text-6xl font-bold drop-shadow-lg">
          Halls of the Architects
        </h1>
        <p className="font-cormorant italic text-xl md:text-2xl text-white/80 mt-4">
          The chronicles of glory, the daily bounties, and the whispers of the
          community. Here, legends are recorded.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-black/30 backdrop-blur-md rounded-lg border border-white/10 p-6 shadow-xl">
          <h2 className="font-cinzel text-3xl">Architect Rankings</h2>
          <nav className="flex items-center space-x-6 border-b border-white/10 mt-4 mb-4">
            <button
              className={`py-2 font-cinzel tracking-wider transition ${
                activeLeaderboardTab === "pvp"
                  ? "text-white border-b-2 border-white"
                  : "text-gray-400"
              }`}
              onClick={() => setActiveLeaderboardTab("pvp")}
            >
              PvP Arena
            </button>
            <button
              className={`py-2 font-cinzel tracking-wider transition ${
                activeLeaderboardTab === "classes"
                  ? "text-white border-b-2 border-white"
                  : "text-gray-400"
              }`}
              onClick={() => setActiveLeaderboardTab("classes")}
            >
              Class Mastery
            </button>
          </nav>

          {activeLeaderboardTab === "pvp" && (
            <ol className="space-y-3 animate-fade-in">
              {pvpRankings.map((player) => (
                <li
                  key={player.rank}
                  className="flex items-center justify-between bg-white/10 p-3 rounded-md border border-white/10 hover:border-white/20 transition"
                >
                  <div className="flex items-center space-x-4">
                    <span className="font-cinzel text-xl text-slate-400 w-6">
                      #{player.rank}
                    </span>
                    <span className="font-bold text-lg">{player.name}</span>
                    <span className="text-sm text-slate-300 hidden sm:block">
                      {player.class}
                    </span>
                  </div>
                  <span className="font-mono text-lg text-blue-400">
                    {player.rating}
                  </span>
                </li>
              ))}
            </ol>
          )}

          {activeLeaderboardTab === "classes" && (
            <ol className="space-y-3 animate-fade-in">
              {classMasters.map((player) => (
                <li
                  key={player.rank}
                  className="flex items-center justify-between bg-white/5 p-3 rounded-md border border-transparent hover:border-white/20 transition"
                >
                  <div className="flex items-center space-x-4">
                    <span className="font-cinzel text-xl text-slate-400 w-6">
                      #{player.rank}
                    </span>
                    <span className="font-bold text-lg">{player.name}</span>
                    <span className="text-sm text-slate-300 hidden sm:block">
                      {player.class}
                    </span>
                  </div>
                  <span className="font-mono text-lg text-green-400">
                    {player.solved} Solved
                  </span>
                </li>
              ))}
            </ol>
          )}
        </div>

        <div className="space-y-8">
          <div className="bg-black/40 backdrop-blur-md rounded-lg border border-white/10 p-6 shadow-2xl shadow-black/40">
            <h3 className="font-cinzel text-2xl">Architect Spotlight</h3>
            <div className="flex items-center space-x-4 mt-4">
              <div>
                <p className="text-xl font-bold">
                  {spotlightArchitect.name}
                </p>
                <p className="text-sm text-slate-300 italic">
                  "{spotlightArchitect.title}"
                </p>
              </div>
            </div>
            <ul className="font-ebg space-y-2 mt-4 text-sm">
              {spotlightArchitect.stats.map((stat) => (
                <li key={stat.label} className="flex justify-between">
                  <span className="text-slate-400">{stat.label}:</span>
                  <span className="font-semibold text-white">
                    {stat.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-black/30 backdrop-blur-md rounded-lg border border-white/10 p-6 shadow-xl text-center">
            <h3 className="font-cinzel text-2xl">Daily Bounty</h3>
            <p className="text-white/70 text-sm mt-2">
              A new Corruption fragment requires debugging.
            </p>
            <div className="my-4 bg-transparent p-4 rounded-md border border border-white/20">
              <p className="text-lg font-semibold">{dailyBounty.title}</p>
              <p className="text-sm mt-1">
                <span className="text-yellow-400">
                  {dailyBounty.difficulty}
                </span>
                •
                <span className="text-blue-400">{dailyBounty.domain}</span>•
                <span className="text-green-400">{dailyBounty.xp} XP</span>
              </p>
            </div>
            <Link
              href="/"
              className="text-white py-2 px-6 font-bold tracking-wide shadow-lg bg-transparent rounded-md transition hover:bg-current/20 hover:shadow-xl duration-200 border border-white/20 backdrop-blur-sm cursor-not-allowed"
            >
              ACCEPT BOUNTY
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-16 text-center">
        <h2 className="font-cinzel text-4xl text-white">
          Join the Alliance
        </h2>
        <p className="font-cormorant italic text-xl text-white/80 mt-2">
          Join the collective mind that guides our realm through the digital darkness and shape the future of Aethel. 
        </p>
        <div className="flex justify-center space-x-4 mt-6">
          <a
            href="https://discord.com/users/755804749210845236"
            target="_blank"
            className="text-white font-bold py-3 px-6 bg-transparent rounded-md transition hover:bg-current/20 hover:shadow-xl duration-200 border border-white/20 backdrop-blur-sm"
          >
            Join Discord
          </a>
          <a
            href="https://x.com/playaethel"
            target="_blank"
            className="text-white font-bold py-3 px-8 bg-transparent rounded-md transition hover:bg-current/20 hover:shadow-xl duration-200 border border-white/20 backdrop-blur-sm"
          >
            Follow on X
          </a>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="font-cinzel text-4xl text-center">
          Global Events & Dispatches
        </h2>
        <div className="mt-8 grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {communityEvents.map((event) => (
            <div
              key={event.title}
              className="bg-black/30 backdrop-blur-md rounded-lg border border-white/10 p-6 shadow-xl"
            >
              <div className="flex justify-between items-start">
                <h3 className="font-cinzel text-2xl">{event.title}</h3>
                <span
                  className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded bg-opacity-90 text-white ${
                    event.status === "LIVE"
                      ? "bg-green-600"
                      : "bg-purple-600"
                  }`}
                >
                  {event.status}
                </span>
              </div>
              <p className="text-white/80 mt-2 font-ebg">
                {event.description}
              </p>
              <p className="text-slate-400 text-sm mt-2">{event.date}</p>
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default CommunityMain; 