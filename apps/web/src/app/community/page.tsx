import Header from "@/components/landing/Header";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Tabs,TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { pvpRankings, classMasters, spotlightArchitect, dailyBounty, communityEvents } from "./communitydata";
import { Badge } from "@/components/ui/badge";

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <div className="container mx-auto px-4 sm:px-6 py-16 md:py-24">
      <header className="text-center max-w-4xl mx-auto mb-16">
        <h1 className="font-cinzel text-4xl md:text-6xl font-bold drop-shadow-lg">
          Halls of the Architects
        </h1>
        <p className="font-cormorant italic text-xl md:text-2xl text-muted-foreground mt-4">
          The chronicles of glory, the daily bounties, and the whispers of the
          community. Here, legends are recorded.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="font-cinzel text-3xl">Architect Rankings</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="pvp">
                <TabsList>
                  <TabsTrigger className="cursor-pointer" value="pvp">PvP Arena</TabsTrigger>
                  <TabsTrigger className="cursor-pointer" value="classes">Class Mastery</TabsTrigger>
                </TabsList>
                <TabsContent value="pvp" className="animate-fade-in">
                  <ol className="space-y-3 mt-4">
                    {pvpRankings.map((player) => (
                      <li
                        key={player.rank}
                        className="flex items-center justify-between p-3 rounded-md border hover:border-primary/50 transition"
                      >
                        <div className="flex items-center space-x-4">
                          <span className="font-cinzel text-xl text-muted-foreground w-6">
                            #{player.rank}
                          </span>
                          <span className="font-bold text-lg">{player.name}</span>
                          <span className="text-sm text-muted-foreground hidden sm:block">
                            {player.class}
                          </span>
                        </div>
                        <span className="font-mono text-lg text-primary">
                          {player.rating}
                        </span>
                      </li>
                    ))}
                  </ol>
                </TabsContent>
                <TabsContent value="classes" className="animate-fade-in">
                  <ol className="space-y-3 mt-4">
                    {classMasters.map((player) => (
                      <li
                        key={player.rank}
                        className="flex items-center justify-between p-3 rounded-md border hover:border-primary/50 transition"
                      >
                        <div className="flex items-center space-x-4">
                          <span className="font-cinzel text-xl text-muted-foreground w-6">
                            #{player.rank}
                          </span>
                          <span className="font-bold text-lg">{player.name}</span>
                          <span className="text-sm text-muted-foreground hidden sm:block">
                            {player.class}
                          </span>
                        </div>
                        <span className="font-mono text-lg text-green-400">
                          {player.solved} Solved
                        </span>
                      </li>
                    ))}
                  </ol>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="font-cinzel text-2xl">Architect Spotlight</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <div>
                  <p className="text-xl font-bold">{spotlightArchitect.name}</p>
                  <p className="text-sm text-muted-foreground italic">
                    &quot;{spotlightArchitect.title}&quot;
                  </p>
                </div>
              </div>
              <ul className="font-ebg space-y-2 mt-4 text-sm">
                {spotlightArchitect.stats.map((stat) => (
                  <li key={stat.label} className="flex justify-between">
                    <span className="text-muted-foreground">{stat.label}:</span>
                    <span className="font-semibold">{stat.value}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <CardTitle className="font-cinzel text-2xl">Daily Bounty</CardTitle>
              <CardDescription>A new Corruption fragment requires debugging.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="my-4 p-4 rounded-md border">
                <p className="text-lg font-semibold">{dailyBounty.title}</p>
                <p className="text-sm mt-1">
                  <span className="text-yellow-400">{dailyBounty.difficulty}</span>
                  {' • '}
                  <span className="text-blue-400">{dailyBounty.domain}</span>
                  {' • '}
                  <span className="text-green-400">{dailyBounty.xp} XP</span>
                </p>
              </div>
              <Button variant="outline" disabled>
                ACCEPT BOUNTY
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-16 text-center">
        <h2 className="font-cinzel text-4xl">Join the Alliance</h2>
        <p className="font-cormorant italic text-xl text-muted-foreground mt-2">
          Join the collective mind that guides our realm through the digital darkness and shape the future of Aethel.
        </p>
        <div className="flex justify-center space-x-4 mt-6">
          <Button asChild>
            <a href="https://discord.com/users/755804749210845236" target="_blank">
              Join Discord
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href="https://x.com/playaethel" target="_blank">
              Follow on X
            </a>
          </Button>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="font-cinzel text-4xl text-center">Global Events & Dispatches</h2>
        <div className="mt-8 grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {communityEvents.map((event) => (
            <Card key={event.title}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="font-cinzel text-2xl">{event.title}</CardTitle>
                  <Badge variant={event.status === 'LIVE' ? 'default' : 'secondary'}>
                    {event.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mt-2 font-ebg">
                  {event.description}
                </p>
                <p className="text-muted-foreground text-sm mt-2">{event.date}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      
    </div>

    </div>
  );
}
