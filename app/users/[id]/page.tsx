"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, UserPlus, MessageSquare, TrendingUp, Calendar, MapPin, LinkIcon } from "lucide-react"

export default function UserProfilePage({ params }: { params: { id: string } }) {
  const [isFollowing, setIsFollowing] = useState(false)
  const [activeTab, setActiveTab] = useState("ideas")

  // Mock user data based on ID
  const getUserData = (id: string) => {
    const users: Record<string, any> = {
      "sarah-chen": {
        name: "Sarah Chen",
        username: "@sarahtrader",
        avatar: "/female-trader-avatar.jpg",
        bio: "Senior Portfolio Manager at TechFund. Specializing in growth stocks and emerging technologies. 8+ years experience in equity research.",
        location: "San Francisco, CA",
        website: "sarahchen.trading",
        joinDate: "March 2023",
        followers: 1247,
        following: 89,
        totalReturn: "+24.5%",
        winRate: "68%",
        badges: ["Top Contributor", "Tech Expert", "Pro Trader"],
        stats: {
          tradeIdeas: 45,
          analyses: 12,
          clubsLeading: 2,
          clubsMember: 5,
        },
      },
      "mike-rodriguez": {
        name: "Mike Rodriguez",
        username: "@mikeswings",
        avatar: "/male-trader-avatar.jpg",
        bio: "Swing trader focused on momentum plays and technical analysis. Former hedge fund analyst turned independent trader.",
        location: "Austin, TX",
        website: "swingtrading.pro",
        joinDate: "January 2023",
        followers: 892,
        following: 156,
        totalReturn: "+31.2%",
        winRate: "72%",
        badges: ["Swing Master", "Technical Analyst"],
        stats: {
          tradeIdeas: 67,
          analyses: 8,
          clubsLeading: 1,
          clubsMember: 7,
        },
      },
    }
    return users[id] || users["sarah-chen"]
  }

  const user = getUserData(params.id)

  const recentIdeas = [
    { symbol: "AAPL", strategy: "Long Position", return: "+12.5%", likes: 89, time: "2 days ago" },
    { symbol: "TSLA", strategy: "Swing Trade", return: "+24.5%", likes: 67, time: "1 week ago" },
    { symbol: "NVDA", strategy: "Options Play", return: "+18.2%", likes: 45, time: "2 weeks ago" },
  ]

  const recentAnalyses = [
    { title: "Q4 Tech Earnings Preview", type: "Sector Analysis", likes: 156, time: "3 days ago" },
    { title: "Fed Policy Impact on Growth Stocks", type: "Macro Analysis", likes: 89, time: "1 week ago" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-xl font-bold">Trader Profile</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="space-y-6">
          {/* Profile Header */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <Avatar className="w-24 h-24 mx-auto md:mx-0">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-2xl">
                    {user.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-col md:flex-row md:items-center gap-4 mb-3">
                    <div>
                      <h2 className="text-2xl font-bold">{user.name}</h2>
                      <p className="text-muted-foreground">{user.username}</p>
                    </div>
                    <div className="flex gap-2 justify-center md:justify-start">
                      <Button
                        variant={isFollowing ? "outline" : "default"}
                        onClick={() => setIsFollowing(!isFollowing)}
                      >
                        <UserPlus className="w-4 h-4 mr-2" />
                        {isFollowing ? "Following" : "Follow"}
                      </Button>
                      <Button variant="outline">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Message
                      </Button>
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed mb-4">{user.bio}</p>

                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                    {user.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {user.location}
                      </span>
                    )}
                    {user.website && (
                      <span className="flex items-center gap-1">
                        <LinkIcon className="w-4 h-4" />
                        {user.website}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Joined {user.joinDate}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {user.badges.map((badge: string, i: number) => (
                      <Badge key={i} variant="secondary">
                        {badge}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-6 text-sm">
                    <span>
                      <strong>{user.followers}</strong> followers
                    </span>
                    <span>
                      <strong>{user.following}</strong> following
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Stats */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">{user.totalReturn}</div>
                <p className="text-sm text-muted-foreground">Total Return</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">{user.winRate}</div>
                <p className="text-sm text-muted-foreground">Win Rate</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">{user.stats.tradeIdeas}</div>
                <p className="text-sm text-muted-foreground">Trade Ideas</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">{user.stats.analyses}</div>
                <p className="text-sm text-muted-foreground">Analyses</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">{user.stats.clubsLeading}</div>
                <p className="text-sm text-muted-foreground">Leading</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">{user.stats.clubsMember}</div>
                <p className="text-sm text-muted-foreground">Member</p>
              </CardContent>
            </Card>
          </div>

          {/* Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="ideas">Trade Ideas</TabsTrigger>
              <TabsTrigger value="analyses">Analyses</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="ideas" className="space-y-4">
              {recentIdeas.map((idea, i) => (
                <Card key={i} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline">{idea.symbol}</Badge>
                        <span className="font-medium">{idea.strategy}</span>
                        <span className="text-primary font-semibold">{idea.return}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4" />
                          <span>{idea.likes} likes</span>
                        </div>
                        <span>{idea.time}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="analyses" className="space-y-4">
              {recentAnalyses.map((analysis, i) => (
                <Card key={i} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h3 className="font-medium">{analysis.title}</h3>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {analysis.type}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{analysis.time}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <TrendingUp className="w-4 h-4" />
                        <span>{analysis.likes} likes</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="activity">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Activity feed coming soon...</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
