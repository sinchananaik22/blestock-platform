"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, ArrowLeft, Users, TrendingUp } from "lucide-react"

export default function SearchPage() {
  const [query, setQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const searchResults = {
    clubs: [
      { id: "tech-traders", name: "Tech Traders United", members: 1247, description: "Technology stocks and trends" },
      {
        id: "crypto-pioneers",
        name: "Crypto Pioneers",
        members: 892,
        description: "Cryptocurrency trading strategies",
      },
    ],
    ideas: [
      { id: "aapl-long", symbol: "AAPL", author: "Sarah Chen", strategy: "Long Position", confidence: 85 },
      { id: "tsla-swing", symbol: "TSLA", author: "Mike Rodriguez", strategy: "Swing Trade", confidence: 78 },
    ],
    users: [
      { id: "sarah-chen", name: "Sarah Chen", followers: 1247, avatar: "/female-trader-avatar.jpg" },
      { id: "mike-rodriguez", name: "Mike Rodriguez", followers: 892, avatar: "/male-trader-avatar.jpg" },
    ],
    discussions: [
      { id: "market-volatility", title: "Market volatility thoughts?", author: "Jennifer Adams", replies: 47 },
      { id: "ai-stocks-bubble", title: "AI stocks: Bubble or growth?", author: "Tech Trader Pro", replies: 89 },
    ],
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search clubs, ideas, users, discussions..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="clubs">Clubs</TabsTrigger>
            <TabsTrigger value="ideas">Ideas</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="discussions">Discussions</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Clubs
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {searchResults.clubs.map((club) => (
                    <div
                      key={club.id}
                      className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-muted/50"
                      onClick={() => (window.location.href = `/clubs/${club.id}`)}
                    >
                      <div>
                        <p className="font-medium">{club.name}</p>
                        <p className="text-sm text-muted-foreground">{club.description}</p>
                      </div>
                      <Badge variant="outline">{club.members} members</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Trade Ideas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {searchResults.ideas.map((idea) => (
                    <div
                      key={idea.id}
                      className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-muted/50"
                      onClick={() => (window.location.href = `/ideas/${idea.id}`)}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{idea.symbol}</Badge>
                          <span className="font-medium">{idea.strategy}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">By {idea.author}</p>
                      </div>
                      <Badge variant="secondary">{idea.confidence}%</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="clubs">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.clubs.map((club) => (
                <Card
                  key={club.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => (window.location.href = `/clubs/${club.id}`)}
                >
                  <CardHeader>
                    <CardTitle>{club.name}</CardTitle>
                    <CardDescription>{club.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{club.members.toLocaleString()} members</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
