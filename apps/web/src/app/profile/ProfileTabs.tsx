"use client";
import { useRef } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LucideUser, LucideSettings, LucideShieldAlert } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CountUp } from "./CountUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { calculateXpToNext } from "@dashingadi/game-formulas";
import { formatLabel } from "@/utils/format";

interface ProfileTabsProps {
    activeTab: string;
    setActiveTab: (tab: "profile" | "settings" | "danger") => void;
}

export function ProfileTabs({ activeTab, setActiveTab }: ProfileTabsProps) {
    return (
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile"><LucideUser className="w-4 h-4 mr-2" />Profile</TabsTrigger>
                <TabsTrigger value="settings"><LucideSettings className="w-4 h-4 mr-2" />Settings</TabsTrigger>
                <TabsTrigger value="danger"><LucideShieldAlert className="w-4 h-4 mr-2" />Danger Zone</TabsTrigger>
            </TabsList>
        </Tabs>
    );

}

const BentoCard = ({ className, children }: { className?: string, children: React.ReactNode }) => (
    <Card className={`
        relative group
        bg-gradient-to-br from-card/80 via-card/60 to-card/40 
        backdrop-blur-xl 
        border border-border/20 
        shadow-lg hover:shadow-2xl 
        transition-all duration-500 
        h-full 
        overflow-hidden
        before:absolute before:inset-0 
        before:bg-gradient-to-br before:from-primary/8 before:via-transparent before:to-accent/8 
        before:opacity-0 before:transition-opacity before:duration-500
        hover:before:opacity-100
        hover:border-primary/30
        hover:scale-[1.02]
        ${className}
    `}>
        <div className="relative z-10 h-full">
            {children}
        </div>
        {/* Enhanced glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        {/* Subtle border highlight */}
        <div className="absolute inset-0 rounded-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </Card>
);

export function CompactProfileCard({ className, profile }: any) {
    const progressRef = useRef<HTMLDivElement>(null);
    const xpPercentage = Math.min((profile.xp / (calculateXpToNext(profile.level))) * 100, 100);

    useGSAP(() => {
        if (progressRef.current) {
            gsap.fromTo(progressRef.current,
                { width: '0%' },
                { width: `${xpPercentage}%`, duration: 1.5, ease: 'power3.inOut', delay: 0.3 }
            );
        }
    }, { dependencies: [xpPercentage] });

    return (
        <BentoCard className={className}>
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="font-cinzel text-2xl font-bold text-foreground">{profile.name}</h1>
                        <p className="text-sm text-muted-foreground">{formatLabel(profile.class)}</p>
                    </div>
                    <div className="text-right">
                        <div className="text-3xl font-bold text-primary">Lv.{profile.level}</div>
                        <div className="text-xs text-muted-foreground">
                            {profile.xp.toLocaleString()} / {calculateXpToNext(profile.level).toLocaleString()} XP
                        </div>
                    </div>
                </div>

                {/* Compact XP Bar */}
                <div className="w-full bg-muted rounded-full h-2 mb-4">
                    <div
                        ref={progressRef}
                        className="bg-gradient-to-r from-primary to-accent h-full rounded-full transition-all duration-300"
                    />
                </div>

                {/* Compact Stats Row */}
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 rounded-lg bg-chart-3/10 border border-chart-3/20">
                        <div className="text-xl font-bold text-chart-3">{profile.currentHp}</div>
                        <div className="text-xs text-muted-foreground">HP</div>
                    </div>
                    <div className="p-3 rounded-lg bg-chart-2/10 border border-chart-2/20">
                        <div className="text-xl font-bold text-chart-2">{profile.currentMp}</div>
                        <div className="text-xs text-muted-foreground">MP</div>
                    </div>
                    <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                        <div className="text-xl font-bold text-primary">{Math.round(xpPercentage)}%</div>
                        <div className="text-xs text-muted-foreground">Progress</div>
                    </div>
                </div>
            </CardContent>
        </BentoCard>
    );
}

export function StatsGrid({ className, stats }: any) {
    return (
        <BentoCard className={className}>
            <CardHeader className="pb-3">
                <CardTitle className="font-cinzel text-lg flex items-center">
                    <span className="mr-2">📊</span>
                    Performance Stats
                </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 rounded-lg bg-chart-3/10 border border-chart-3/20 hover:scale-105 transition-transform">
                    <div className="text-2xl font-bold text-chart-3"><CountUp end={stats.problemsSolved > 0 ? stats.problemsSolved : 0} /></div>
                    <div className="text-xs text-muted-foreground">Solved</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-chart-2/10 border border-chart-2/20 hover:scale-105 transition-transform">
                    <div className="text-2xl font-bold text-chart-2"><CountUp end={stats.accuracy > 0 ? stats.accuracy : 0} />%</div>
                    <div className="text-xs text-muted-foreground">Accuracy</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-primary/10 border border-primary/20 hover:scale-105 transition-transform">
                    <div className="text-2xl font-bold text-primary"><CountUp end={stats.currentStreak > 0 ? stats.currentStreak : 0} /></div>
                    <div className="text-xs text-muted-foreground">Streak</div>
                </div>
            </CardContent>
        </BentoCard>
    );
}

export function AchievementsList({ className, achievements }: any) {
    // Debug logging
    console.log('AchievementsList received:', achievements);
    console.log('AchievementsList type:', typeof achievements);
    console.log('AchievementsList isArray:', Array.isArray(achievements));

    // Extract achievement data from the nested structure
    const achievementsList = achievements.map((item: any) => ({
        name: item.achievement?.name || item.name,
        icon: item.achievement?.icon || item.icon,
        desc: item.achievement?.description || item.desc || item.description
    }))

    console.log('Final achievementsList:', achievementsList);
    console.log('Final length:', achievementsList.length);

    return (
        <BentoCard className={className}>
            <CardHeader className="pb-3">
                <CardTitle className="font-cinzel text-lg flex items-center">
                    <span className="mr-2">🏆</span>
                    Achievements
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                {achievementsList.length > 0 ? (
                    achievementsList.slice(0, 5).map((achievement: any, index: number) => (
                        <div key={index} className="flex items-center space-x-3 p-2 border border-border/30 rounded-lg hover:bg-muted/30 transition-colors">
                            <span className="text-lg">{achievement.icon}</span>
                            <div className="flex-1 min-w-0">
                                <div className="font-medium text-sm truncate">{achievement.name}</div>
                                <div className="text-xs text-muted-foreground line-clamp-1">{achievement.desc || achievement.description}</div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-muted-foreground py-4 text-sm">No achievements</div>
                )}
            </CardContent>
        </BentoCard>
    );
}

export function EquipmentList({ className, equipment }: any) {
    const equipmentList = Array.isArray(equipment) ? equipment : [];

    const getRarityColor = (type: string) => {
        const colors = {
            weapon: "text-destructive bg-destructive/10 border-destructive/20",
            shield: "text-chart-2 bg-chart-2/10 border-chart-2/20",
            magic: "text-primary bg-primary/10 border-primary/20"
        };
        return colors[type as keyof typeof colors] || "text-muted-foreground bg-muted/10 border-muted/20";
    };

    return (
        <BentoCard className={className}>
            <CardHeader className="pb-3">
                <CardTitle className="font-cinzel text-lg flex items-center">
                    <span className="mr-2">⚔️</span>
                    Equipment
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                {equipmentList.length > 0 ? (
                    equipmentList.map((item: any, index: number) => (
                        <div key={index} className={`flex items-center justify-between p-2 rounded-lg border ${getRarityColor(item.type)} hover:scale-102 transition-all cursor-pointer`}>
                            <div className="flex items-center space-x-2">
                                <span className="text-lg">{item.icon}</span>
                                <div>
                                    <div className="font-medium text-sm">{item.name}</div>
                                    <div className="text-xs text-muted-foreground capitalize">{item.type}</div>
                                </div>
                            </div>
                            <div className="text-xs font-bold">+{index + 1}</div>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-muted-foreground py-4 text-sm">No equipment</div>
                )}
            </CardContent>
        </BentoCard>
    );
}