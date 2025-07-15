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
        { name: "Shadow Dagger", icon: <LucideSword className="w-6 h-6" />, type: "weapon" },
        { name: "Recursive Cloak", icon: <LucideShield className="w-6 h-6" />, type: "shield" },
        { name: "Greedy Amulet", icon: <LucideWand className="w-6 h-6" />, type: "magic" },
    ],
    achievements: [
        { name: "First Commit", icon: <LucideCrown className="w-5 h-5" />, desc: "Joined the CodeRealm" },
        { name: "Bug Slayer", icon: <LucideSword className="w-5 h-5" />, desc: "Defeated 100 bugs" },
        { name: "Code Whisperer", icon: <LucideSword className="w-5 h-5" />, desc: "Wrote 100 lines of code" },
        { name: "Master of Loops", icon: <LucideSword className="w-5 h-5" />, desc: "Wrote 100 loops" },
    ],
    backstory: `Once a humble script runner, Cipher Walker rose through the ranks of the Array Knights, wielding logic as both shield and blade. Their code is said to bend reality, and their quest: to debug the very fabric of Aethel.`
};

const mockUser = {
    name: 'VoidWalker',
    class: 'Graph Assassin',
    title: 'Wielder of Depths',
    rank: 'PvP #1',
    avatar: '/img/avatar-voidwalker.png', // optional
    stats: [
        { label: 'Problems Solved', value: 782 },
        { label: 'Accuracy', value: '94.3%' },
        { label: 'Last Quest', value: 'Conquer the Binary Tree' }
    ],
    equipped: ['Shadow Dagger', 'Recursive Cloak', 'Greedy Amulet'],
    titles: ['Bug Slayer', 'Code Whisperer', 'Master of Loops']
};

export default function ProfilePage() {
    const [profile] = useState(mockProfile);
    const [activeTab, setActiveTab] = useState('account');

    return (
        <div className="relative z-10 max-w-4xl mx-auto py-16 px-4 md:px-0">
            {/* Hero Banner */}
            <Card className="flex flex-col md:flex-row items-center bg-black/60 border border-white/10 shadow-xl mb-8 p-6 md:p-10 backdrop-blur-lg">
                <div className="flex flex-col items-center gap-2">
                    <img
                        src={profile.avatar}
                        alt="Avatar"
                        className="w-32 h-32 rounded-full border-4 border-cyan-400 shadow-lg object-cover bg-black/30"
                    />
                    <div className="text-white/90 ">PvP #1</div>
                </div>
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
                        <Button variant="secondary" className="text-white" size="sm">Edit Profile</Button>
                        <Button variant="outline" className="text-white" size="sm">Change Avatar</Button>
                    </div>
                </div>
                <div className="grid grid-row-3 gap-4 text-sm">
                    {mockUser.stats.map((stat, i) => (
                        <div
                            key={i}
                            className="bg-black/40 p-4 rounded-lg border border-slate-700 shadow-inner"
                        >
                            <p className="text-slate-400">{stat.label}</p>
                            <p className="text-white text-lg ">{stat.value}</p>
                        </div>
                    ))}
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
            <Card className="bg-black/60 border border-white/10 p-6 backdrop-blur-lg mb-8">
                <h2 className="font-cinzel text-xl text-purple-300 mb-2">Backstory</h2>
                <p className="font-cormorant text-white/90 italic text-lg leading-relaxed">
                    {profile.backstory}
                </p>
            </Card>

            <Card className="bg-black/60 border border-white/10 p-6 backdrop-blur-lg text-white">
                <h2 className="font-cinzel text-2xl border-b border-white/10 pb-2 mb-4">Sigil Configuration</h2>
                <div className="flex flex-col md:flex-row gap-8 items-center">
                    {/* Tab Navigation */}
                    <nav className="flex md:flex-col md:w-1/4 h-full gap-4 justify-between">
                        <button
                            onClick={() => setActiveTab('account')}
                            className={`p-3 text-left w-full rounded-md transition ${activeTab === 'account' ? 'bg-white/10' : 'hover:bg-white/5'}`}
                            style={{ flex: 1 }}
                        >
                            Account
                        </button>
                        <button
                            onClick={() => setActiveTab('password')}
                            className={`p-3 text-left w-full rounded-md transition ${activeTab === 'password' ? 'bg-white/10' : 'hover:bg-white/5'}`}
                            style={{ flex: 1 }}
                        >
                            Password
                        </button>
                        <button
                            onClick={() => setActiveTab('danger')}
                            className={`p-3 text-left w-full rounded-md transition text-red-400 ${activeTab === 'danger' ? 'bg-red-900/20' : 'hover:bg-red-900/10'}`}
                            style={{ flex: 1 }}
                        >
                            Danger Zone
                        </button>
                    </nav>

                    {/* Tab Content */}
                    <div className="w-full md:w-3/4 bg-black/30 p-6 rounded-lg border border-white/10">
                        {activeTab === 'account' && (
                            <div className="space-y-4">
                                <h3 className="font-cinzel text-xl">Re-carve Your Glyph</h3>
                                <div>
                                    <label className="text-sm text-slate-400">Architect Name</label>
                                    <input type="text" defaultValue={mockUser.name} className="w-full bg-white/5 border border-white/30 rounded px-3 py-2 mt-1" />
                                </div>
                                <div>
                                    <label className="text-sm text-slate-400">Glyph (Email)</label>
                                    <input type="email" defaultValue={mockUser.email} className="w-full bg-white/5 border border-white/30 rounded px-3 py-2 mt-1" />
                                </div>
                                <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded transition">Save Changes</button>
                            </div>
                        )}
                        {activeTab === 'password' && (
                            <div className="space-y-4">
                                <h3 className="font-cinzel text-xl">Forge a New Secret Rune</h3>
                                {/* Form fields for current, new, and confirm password would go here */}
                                <p className="text-white/70">Password update form placeholder.</p>
                                <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded transition">Update Password</button>
                            </div>
                        )}
                        {activeTab === 'danger' && (
                            <div className="space-y-4 border border-red-500/30 p-4 rounded-lg">
                                <h3 className="font-cinzel text-xl text-red-400">De-allocate Architect Profile</h3>
                                <p className="text-white/70">This action is irreversible. All your progress, stats, and achievements will be permanently erased from the chronicles.</p>
                                <button className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-6 rounded transition">Delete My Account</button>
                            </div>
                        )}
                    </div>
                </div>
            </Card>
        </div>
    );
}
