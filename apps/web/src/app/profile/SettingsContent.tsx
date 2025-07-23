"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SettingsContent({ session }: { session: any }) {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  
  const [profileForm, setProfileForm] = useState({
    name: session?.user?.name || '',
    email: session?.user?.email || '',
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSaveProfile = async () => {
    toast.success("Profile updated successfully (API call mocked)");
    setIsEditingProfile(false);
  };
  
  const handleSavePassword = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }
    toast.success("Password updated successfully (API call mocked)");
    setIsEditingPassword(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bento-card">
      {/* Profile Edit Card */}
      <Card className="bg-card/50 backdrop-blur-lg border-border/50">
        <CardHeader>
          <CardTitle className="font-cinzel text-xl">Re-carve Your Glyph</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Architect Name</Label>
            <Input id="name" value={profileForm.name} onChange={(e) => setProfileForm({...profileForm, name: e.target.value})} disabled={!isEditingProfile} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Glyph (Email)</Label>
            <Input id="email" type="email" value={profileForm.email} disabled />
          </div>
          <div className="flex space-x-2">
            {isEditingProfile ? (
              <>
                <Button onClick={handleSaveProfile} className="font-cinzel">Save</Button>
                <Button variant="outline" onClick={() => setIsEditingProfile(false)} className="font-cinzel">Cancel</Button>
              </>
            ) : (
              <Button onClick={() => setIsEditingProfile(true)} className="font-cinzel">Edit Profile</Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Password Edit Card */}
      <Card className="bg-card/50 backdrop-blur-lg border-border/50">
        <CardHeader>
          <CardTitle className="font-cinzel text-xl">Forge a New Secret Rune</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isEditingPassword ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Rune</Label>
                <Input id="currentPassword" type="password" onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Rune</Label>
                <Input id="newPassword" type="password" onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Rune</Label>
                <Input id="confirmPassword" type="password" onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})} />
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleSavePassword} className="font-cinzel">Update Rune</Button>
                <Button variant="outline" onClick={() => setIsEditingPassword(false)} className="font-cinzel">Cancel</Button>
              </div>
            </>
          ) : (
            <div className="text-center pt-8">
               <p className="text-muted-foreground mb-4">Your Secret Rune is confidential and secured.</p>
               <Button onClick={() => setIsEditingPassword(true)} className="font-cinzel">Change Password</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}