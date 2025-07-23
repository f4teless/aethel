import { Card, CardContent } from "../ui/card";

const testimonials = [
  { name: "Jiangly", class: "Graph Assassin", quote: "The corruption runs deeper than expected..." },
  { name: "Tourist", class: "Dynamic Mage", quote: "Each pattern reveals the next layer of truth." },
  { name: "Sentinel", class: "Array Knight", quote: "Order must be restored to the data realm." }
];

export default function Testimonials() {
    return (
        <section className="py-24 px-4 relative">
            <div className="container mx-auto max-w-4xl">
                <div className="text-center mb-16">
                    <h2 className="font-cinzel text-3xl md:text-4xl font-bold mb-4">
                        Voices from the Depths
                    </h2>
                    <p className="font-cormorant text-lg text-[var(--muted-foreground)] italic">
                        Hear the whispers of those who've walked the path before you.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <Card
                            key={index}
                            className="bg-[var(--card)]/60 border-[var(--border)] backdrop-blur-md"
                        >
                            <CardContent className="p-6">
                                <p className="font-cormorant italic text-[var(--muted-foreground)] mb-4 text-center">
                                    "{testimonial.quote}"
                                </p>
                                <div className="text-center">
                                    <div className="font-cinzel font-bold text-[var(--foreground)]">
                                        {testimonial.name}
                                    </div>
                                    <div className="text-sm text-[var(--primary)]">
                                        {testimonial.class}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}