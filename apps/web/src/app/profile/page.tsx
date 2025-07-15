"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import AuthGuard from "@/components/AuthGuard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LucideSword, LucideShield, LucideWand, LucideCrown, LucideUser, LucideSettings, LucideShieldAlert } from "lucide-react";

function ProfileContent() {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: session?.user?.name || '',
    email: session?.user?.email || '',
  });

  const handleSaveProfile = async () => {
    try {
      // TODO: Implement profile update API call
      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  const handleDeleteAccount = async () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      try {
        // TODO: Implement account deletion
        toast.success("Account deleted successfully");
        await authClient.signOut();
        router.push('/');
      } catch (error) {
        toast.error("Failed to delete account");
      }
    }
  };

  // Mock game data - will be replaced with real data
  const mockProfile = {
    class: "Array Knight",
    level: 17,
    xp: 3420,
    nextLevelXp: 4000,
    health: 120,
    maxHealth: 150,
    mana: 80,
    maxMana: 100,
    equipment: [
      { name: "Sword of Recursion", icon: <LucideSword className="w-6 h-6" />, type: "weapon" },
      { name: "Shield of Null Safety", icon: <LucideShield className="w-6 h-6" />, type: "shield" },
      { name: "Wand of Async", icon: <LucideWand className="w-6 h-6" />, type: "magic" },
    ],
    achievements: [
      { name: "First Commit", icon: <LucideCrown className="w-5 h-5" />, desc: "Joined the CodeRealm" },
      { name: "Bug Slayer", icon: <LucideSword className="w-5 h-5" />, desc: "Defeated 100 bugs" },
      { name: "Code Whisperer", icon: <LucideWand className="w-5 h-5" />, desc: "Wrote 100 lines of code" },
    ],
    backstory: `Once a humble script runner, ${session?.user?.name || 'this Architect'} rose through the ranks of the Array Knights, wielding logic as both shield and blade.`
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div>
            <h1 className="text-4xl font-cinzel font-bold text-[var(--foreground)]">
              Architect Profile
            </h1>
            <p className="text-[var(--muted-foreground)] font-cormorant italic text-lg mt-2">
              Manage your identity in the CodeRealm
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => router.push('/dashboard')}
            className="font-cinzel"
          >
            Back to Dashboard
          </Button>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <LucideUser className="w-4 h-4" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <LucideSettings className="w-4 h-4" />
              <span>Settings</span>
            </TabsTrigger>
            <TabsTrigger value="danger" className="flex items-center space-x-2">
              <LucideShieldAlert className="w-4 h-4" />
              <span>Security</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Character Info */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-[var(--card)] border-[var(--border)]">
                  <CardHeader>
                    <CardTitle className="font-cinzel text-2xl text-[var(--foreground)]">
                      Character Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-[var(--primary)]">{mockProfile.level}</div>
                        <div className="text-sm text-[var(--muted-foreground)]">Level</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-[var(--primary)]">{mockProfile.health}/{mockProfile.maxHealth}</div>
                        <div className="text-sm text-[var(--muted-foreground)]">Health</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-[var(--primary)]">{mockProfile.mana}/{mockProfile.maxMana}</div>
                        <div className="text-sm text-[var(--muted-foreground)]">Mana</div>
                      </div>
                    </div>
                    
                    <div>
                      <Badge variant="secondary" className="font-cinzel text-lg px-4 py-2">
                        {mockProfile.class}
                      </Badge>
                    </div>

                    <div className="p-4 rounded-lg bg-[var(--muted)] border border-[var(--border)]">
                      <h3 className="font-cinzel font-semibold mb-2">Backstory</h3>
                      <p className="text-[var(--muted-foreground)] font-cormorant italic">
                        {mockProfile.backstory}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Equipment */}
                <Card className="bg-[var(--card)] border-[var(--border)]">
                  <CardHeader>
                    <CardTitle className="font-cinzel text-xl text-[var(--foreground)]">
                      Equipment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {mockProfile.equipment.map((item, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 border border-[var(--border)] rounded-lg bg-[var(--muted)]/50">
                          <div className="text-[var(--primary)]">{item.icon}</div>
                          <div>
                            <div className="font-semibold text-[var(--foreground)]">{item.name}</div>
                            <div className="text-sm text-[var(--muted-foreground)] capitalize">{item.type}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Achievements */}
              <div>
                <Card className="bg-[var(--card)] border-[var(--border)]">
                  <CardHeader>
                    <CardTitle className="font-cinzel text-xl text-[var(--foreground)]">
                      Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {mockProfile.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 border border-[var(--border)] rounded-lg">
                        <div className="text-[var(--primary)]">{achievement.icon}</div>
                        <div>
                          <div className="font-semibold text-[var(--foreground)]">{achievement.name}</div>
                          <div className="text-xs text-[var(--muted-foreground)]">{achievement.desc}</div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-[var(--card)] border-[var(--border)]">
              <CardHeader>
                <CardTitle className="font-cinzel text-xl text-[var(--foreground)]">
                  Account Settings
                </CardTitle>
                <CardDescription className="text-[var(--muted-foreground)]">
                  Update your account information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-[var(--foreground)]">Architect Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={!isEditing}
                    className="bg-[var(--muted)] border-[var(--border)]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[var(--foreground)]">Glyph (Email)</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={!isEditing}
                    className="bg-[var(--muted)] border-[var(--border)]"
                  />
                </div>
                <div className="flex space-x-3">
                  {!isEditing ? (
                    <Button onClick={() => setIsEditing(true)} className="font-cinzel">
                      Edit Profile
                    </Button>
                  ) : (
                    <>
                      <Button onClick={handleSaveProfile} className="font-cinzel">
                        Save Changes
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setIsEditing(false);
                          setFormData({
                            name: session?.user?.name || '',
                            email: session?.user?.email || '',
                          });
                        }}
                        className="font-cinzel"
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="danger" className="space-y-6">
            <Card className="bg-[var(--card)] border-[var(--border)] border-red-500/20">
              <CardHeader>
                <CardTitle className="font-cinzel text-xl text-red-400">
                  Danger Zone
                </CardTitle>
                <CardDescription className="text-[var(--muted-foreground)]">
                  Irreversible and destructive actions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border border-red-500/20 rounded-lg bg-red-500/5">
                  <h3 className="font-cinzel font-semibold text-red-400 mb-2">Delete Account</h3>
                  <p className="text-[var(--muted-foreground)] text-sm mb-4">
                    This will permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                  <Button 
                    variant="destructive" 
                    onClick={handleDeleteAccount}
                    className="font-cinzel"
                  >
                    Delete Account Forever
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <AuthGuard>
      <ProfileContent />
    </AuthGuard>
  );
}
