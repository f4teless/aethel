import { Card, CardContent } from "../ui/card";

const features = [
    {
        icon: "🎯",
        title: "Algorithmic Mastery",
        description: "Forge your mind through progressively challenging data structure puzzles",
        color: "from-[var(--primary)] to-[var(--accent)]"
    },
    {
        icon: "⚔️",
        title: "Code Combat Arena",
        description: "Battle other Architects in real-time programming duels",
        color: "from-[var(--secondary)] to-[var(--primary)]"


    },
    {
        icon: "🏰",
        title: "Dungeon Expeditions",
        description: "Venture into collaborative algorithmic labyrinths with your friends",
        color: "from-[var(--accent)] to-[var(--primary)]"

    }
];

export default function FeaturesSection() {

    return (
        <section className="py-24 px-4">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-16">
                    <h2 className="font-cinzel text-3xl md:text-4xl font-bold mb-4">
                        Master the Dark Arts of Code
                    </h2>
                    <p className="font-cormorant text-lg text-[var(--muted-foreground)] italic">
                        Three paths diverge in the shadow of corruption. Choose your discipline.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <Card
                            key={index}
                            className="group bg-[var(--card)]/80 border-[var(--border)] backdrop-blur-md hover:bg-[var(--muted)]/50 transition-transform duration-500 hover:scale-105 hover:shadow-xl"
                        >
                            <CardContent className="p-8 text-center">
                                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                    {feature.icon}
                                </div>
                                <h3 className="font-cinzel text-xl font-bold mb-3 text-[var(--foreground)]">
                                    {feature.title}
                                </h3>
                                <p className="font-cormorant text-[var(--muted-foreground)] leading-relaxed">
                                    {feature.description}
                                </p>
                                <div className={`mt-4 h-1 w-16 mx-auto rounded-full bg-gradient-to-r ${feature.color} opacity-60 group-hover:opacity-100 transition-opacity duration-300`} />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}