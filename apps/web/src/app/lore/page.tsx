'use client';

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertTriangle, Search, Bookmark, BookmarkCheck, Eye, Clock, Tag } from "lucide-react";
import Header from "@/components/landing/Header";
import { loreArticles, LoreArticle } from "./lorearticles";

export const clearanceNames = {
  0: "VISITOR",
  1: "INITIATE",
  2: "ARCHITECT",
  3: "DEBUGGER",
  4: "REALITY HACKER",
  5: "LOGIC GUARDIAN"
};

export default function LorePage() {
  const [scrollY, setScrollY] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [bookmarkedArticles, setBookmarkedArticles] = useState<string[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);
  const [userClearanceLevel, setUserClearanceLevel] = useState(1); // Simulate user's story progress
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

 

  const toggleBookmark = (articleId: string) => {
    setBookmarkedArticles(prev => 
      prev.includes(articleId) 
        ? prev.filter(id => id !== articleId)
        : [...prev, articleId]
    );
  };

  const accessArticle = (article: LoreArticle) => {
    if (article.clearanceLevel > userClearanceLevel) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      return;
    }
    setSelectedArticle(article.id);
  };

  const filterArticles = (category: LoreArticle['category']) => {
    return loreArticles
      .filter(article => article.category === category)
      .filter(article => 
        searchTerm === '' || 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
  };

  const ClassifiedText = ({ text, userLevel, requiredLevel }: { text: string, userLevel: number, requiredLevel: number }) => {
    if (userLevel >= requiredLevel) {
      return <span>{text}</span>;
    }
    
    const redactedText = text.replace(/[a-zA-Z0-9]/g, '█');
    return (
      <span className="font-mono bg-red-900/20 px-1 border border-red-500/30 text-red-400">
        {redactedText}
      </span>
    );
  };

  const ArticleCard = ({ article }: { article: LoreArticle }) => (
    <Card className="bg-[var(--card)]/60 border-[var(--border)] backdrop-blur-sm hover:bg-[var(--muted)]/30 transition-all duration-300 group">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <div className="flex gap-2">
            <Badge variant="outline" className="font-mono text-xs">
              CLEARANCE: {article.clearanceLevel}
            </Badge>
            <Badge variant="secondary" className="font-mono text-xs">
              {article.category.toUpperCase()}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="icon" 
            onClick={() => toggleBookmark(article.id)}
            className="opacity-60 hover:opacity-100"
          >
            {bookmarkedArticles.includes(article.id) ? (
              <BookmarkCheck className="w-4 h-4" />
            ) : (
              <Bookmark className="w-4 h-4" />
            )}
          </Button>
        </div>
        
        <CardTitle className="font-cinzel text-lg">
          {article.clearanceLevel <= userClearanceLevel ? (
            article.title
          ) : (
            <ClassifiedText text={article.title} userLevel={userClearanceLevel} requiredLevel={article.clearanceLevel} />
          )}
        </CardTitle>
        
        <div className="flex items-center gap-4 text-sm text-[var(--muted-foreground)]">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {article.readingTime}
          </div>
          <div className="flex items-center gap-1">
            <Tag className="w-3 h-3" />
            {article.tags.slice(0, 2).join(', ')}
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="font-cormorant text-[var(--muted-foreground)] mb-4 leading-relaxed">
          {article.clearanceLevel <= userClearanceLevel ? (
            article.teaser
          ) : (
            <ClassifiedText text={article.teaser} userLevel={userClearanceLevel} requiredLevel={article.clearanceLevel} />
          )}
        </p>
        
        <Button 
          onClick={() => accessArticle(article)}
          variant={article.clearanceLevel <= userClearanceLevel ? "default" : "destructive"}
          className="font-mono text-sm"
        >
          <Eye className="w-3 h-3 mr-2" />
          {article.clearanceLevel <= userClearanceLevel ? "ACCESS" : "INSUFFICIENT CLEARANCE"}
        </Button>
        
        {article.clearanceLevel > userClearanceLevel && (
          <div className="mt-2 flex items-center gap-1 text-xs text-[var(--destructive)] font-mono">
            <AlertTriangle className="w-3 h-3" />
            INSUFFICIENT CLEARANCE
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen relative overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <div className="relative min-h-screen z-10 text-center max-w-4xl mx-auto px-4 pt-32 pb-16">
        <Badge 
          variant="outline" 
          className="mb-6 px-4 py-2 font-mono border-[var(--primary)]/30 bg-[var(--primary)]/10"
        >
          <span className="w-2 h-2 bg-[var(--primary)] rounded-full mr-2 animate-pulse" />
          CLASSIFIED ARCHIVES • CLEARANCE LEVEL: {clearanceNames[userClearanceLevel as keyof typeof clearanceNames]}
        </Badge>
        
        <h1 className="font-cinzel text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-[var(--primary)] bg-clip-text text-transparent">
          Aethel Database
        </h1>
        
        <p className="font-cormorant text-xl md:text-2xl text-[var(--muted-foreground)] italic leading-relaxed">
          Access classified research, incident reports, and historical records. Search with caution - some knowledge carries its own dangers.
        </p>
      </div>

      {/* Main Content */}
      <div className="relative z-10 bg-[var(--background)]">
        <div className="container mx-auto px-4 py-16 max-w-6xl">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--muted-foreground)] w-4 h-4" />
              <Input
                placeholder="Search classified archives..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-[var(--card)]/50 border-[var(--border)] font-mono"
              />
            </div>
          </div>

          <Tabs defaultValue="anomalies" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-[var(--muted)] border border-[var(--border)]">
              <TabsTrigger value="anomalies" className="font-cinzel">Anomalies</TabsTrigger>
              <TabsTrigger value="historical" className="font-cinzel">Historical Records</TabsTrigger>
              <TabsTrigger value="technology" className="font-cinzel">Technology Reports</TabsTrigger>
            </TabsList>

            {/* Anomalies Tab */}
            <TabsContent value="anomalies" className="mt-8">
              <div className="space-y-8">
                <div className="text-center mb-12">
                  <h2 className="font-cinzel text-3xl font-bold mb-4">Reality Anomalies</h2>
                  <p className="font-cormorant text-[var(--muted-foreground)] italic">
                    Unexplained phenomena and disturbances in the fabric of reality
                  </p>
                </div>

                <div className="grid gap-6">
                  {filterArticles('anomaly').map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Historical Records Tab */}
            <TabsContent value="historical" className="mt-8">
              <div className="space-y-8">
                <div className="text-center mb-12">
                  <h2 className="font-cinzel text-3xl font-bold mb-4">Historical Archives</h2>
                  <p className="font-cormorant text-[var(--muted-foreground)] italic">
                    Preserved records from before and after the corruption began
                  </p>
                </div>

                <div className="grid gap-6">
                  {filterArticles('historical').map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Technology Reports Tab */}
            <TabsContent value="technology" className="mt-8">
              <div className="space-y-8">
                <div className="text-center mb-12">
                  <h2 className="font-cinzel text-3xl font-bold mb-4">Technical Documentation</h2>
                  <p className="font-cormorant text-[var(--muted-foreground)] italic">
                    System specifications, protocols, and corruption analysis
                  </p>
                </div>

                <div className="grid gap-6">
                  {filterArticles('technology').map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Loading Overlay */}
          {isLoading && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <Card className="bg-[var(--card)] p-8">
                <div className="text-center">
                  <div className="animate-spin w-8 h-8 border-2 border-[var(--primary)] border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="font-mono text-sm">ACCESSING CLASSIFIED DATABASE...</p>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
