import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { memo } from "react";


const FinalCta = memo(() => {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <Card className="bg-gradient-to-br from-[var(--card)] to-[var(--muted)] border-[var(--border)] backdrop-blur-md">
          <CardContent className="p-12">
            <h2 className="font-cinzel text-3xl md:text-4xl font-bold mb-6">
              Your Fate Is Unwritten
            </h2>
            <p className="font-cormorant text-lg text-[var(--muted-foreground)] mb-8 italic">
              The world of Aethel needs its Architects. Will you answer the call?
            </p>
            <Button
              asChild
              size="lg"
              className="font-cinzel text-lg px-12 py-6 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] hover:opacity-90 transition-opacity duration-300 shadow-lg"
            >
              <Link href="/login">
                Begin Your Journey
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
});

export default FinalCta;