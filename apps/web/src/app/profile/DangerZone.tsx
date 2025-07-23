"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function DangerZoneContent() {
    const router = useRouter();

    const handleDeleteAccount = async () => {
        if (window.confirm("FINAL CONFIRMATION:\nAre you sure you want to delete your account? This action is permanent and cannot be undone.")) {
            try {
                toast.info("De-allocating Architect profile...");
                // await orpc.user.delete.mutate(); // Your real API call
                toast.success("Account deleted successfully. Signing out.");
                await authClient.signOut();
                router.push('/');
            } catch (error) {
                toast.error("Failed to delete account. Please try again.");
            }
        }
    };

    const handleResetProgress = async () => {
        if (window.confirm("FINAL CONFIRMATION:\nAre you sure you want to reset all progress? This will reset your level, stats, and achievements to zero.")) {
            toast.info("Resetting progress to genesis block...");
            // await orpc.user.resetProgress.mutate(); // Your real API call
            toast.success("Progress has been reset.");
        }
    };

    return (
        <Card className="bg-card/50 backdrop-blur-lg border-red-500/30 bento-card">
            <CardHeader>
                <CardTitle className="font-cinzel text-xl text-destructive">Danger Zone</CardTitle>
            </CardHeader>
            <CardContent className="p-4 border-t border-destructive/20 space-y-4">
                <div>
                    <h3 className="font-semibold">De-allocate Architect Profile</h3>
                    <p className="text-sm text-muted-foreground mb-2">This is permanent. All progress will be lost.</p>
                    <Button variant="destructive" onClick={handleDeleteAccount} className="font-cinzel">Delete Account Forever</Button>
                </div>
            </CardContent>
        </Card>
    )
}