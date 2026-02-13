import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, Sparkles, Heart, Star } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Logo/Brand with Robot */}
          <div className="flex items-center justify-center gap-3 relative">
            <div className="absolute -left-20 top-1/2 -translate-y-1/2 hidden lg:block animate-in zoom-in duration-700 delay-200">
              <Image
                src="/robot/Future_Robot_3d 1.png"
                alt="Robot mascot"
                width={80}
                height={80}
                className="object-contain drop-shadow-2xl animate-bounce"
                style={{ animationDuration: '3s' }}
              />
            </div>
            <BookOpen className="w-12 h-12 text-primary" />
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
              Smart Library
            </h1>
            <div className="absolute -right-20 top-1/2 -translate-y-1/2 hidden lg:block animate-in zoom-in duration-700 delay-300">
              <Image
                src="/robot/AI_Robot_04_3d 1.png"
                alt="Robot mascot"
                width={80}
                height={80}
                className="object-contain drop-shadow-2xl animate-bounce"
                style={{ animationDuration: '3s', animationDelay: '0.5s' }}
              />
            </div>
          </div>

          {/* Mobile Robot - Shows on smaller screens */}
          <div className="lg:hidden flex justify-center gap-8 animate-in zoom-in duration-700">
            <Image
              src="/robot/Future_Robot_3d 1.png"
              alt="Robot mascot"
              width={60}
              height={60}
              className="object-contain drop-shadow-xl"
            />
            <Image
              src="/robot/AI_Robot_04_3d 1.png"
              alt="Robot mascot"
              width={60}
              height={60}
              className="object-contain drop-shadow-xl"
            />
          </div>

          {/* Headline */}
          <div className="space-y-4">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Discover Your Next
              <br />
              <span className="text-primary">Favorite Book</span> 📚✨
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Answer a few fun questions and we'll recommend the perfect books tailored just for you!
            </p>
          </div>

          {/* CTA Button */}
          <div className="pt-4">
            <Link href="/wizard?step=name">
              <Button size="lg" className="h-14 px-8 text-lg gap-2 rounded-full">
                <Sparkles className="w-5 h-5" />
                Start Your Book Journey
              </Button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="max-w-4xl mx-auto mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 text-center space-y-3 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Heart className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-heading font-semibold text-lg">Personalized</h3>
            <p className="text-sm text-muted-foreground">
              Books matched to your interests, age, and reading preferences
            </p>
          </Card>

          <Card className="p-6 text-center space-y-3 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-secondary/30 flex items-center justify-center mx-auto">
              <Star className="w-6 h-6 text-secondary-foreground" />
            </div>
            <h3 className="font-heading font-semibold text-lg">Hand-Picked</h3>
            <p className="text-sm text-muted-foreground">
              Carefully curated collection of award-winning and beloved books
            </p>
          </Card>

          <Card className="p-6 text-center space-y-3 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-accent/30 flex items-center justify-center mx-auto">
              <Sparkles className="w-6 h-6 text-accent-foreground" />
            </div>
            <h3 className="font-heading font-semibold text-lg">Fun & Easy</h3>
            <p className="text-sm text-muted-foreground">
              Simple wizard takes just 2 minutes to find your perfect matches
            </p>
          </Card>
        </div>

        {/* Secondary CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            Ready to explore? It's quick and fun!
          </p>
          <Link href="/wizard?step=name">
            <Button variant="outline" size="lg" className="gap-2">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
