"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";



export function ProfileHeader({ name }: { name: string }) {
  const router = useRouter();
  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/");
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
      <div className="text-left">
        <h1 className="text-4xl font-cinzel font-bold">Architect Profile</h1>
        <p className="text-muted-foreground font-cormorant italic text-lg mt-1">
          Your identity within the CodeRealm
        </p>
      </div>
      <Button variant="outline" onClick={handleSignOut} className="font-cinzel mt-4 md:mt-0 cursor-pointer">
        Depart the Realm
      </Button>
    </div>
  );
}