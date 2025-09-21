"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { UserMenu } from "@/components/auth/user-menu"
import {
  TrendingUp,
  Users,
  MessageSquare,
  Calendar,
  ThumbsUp,
  Share2,
  Bell,
  Search,
  Crown,
  UserPlus,
  Settings,
  ArrowLeft,
} from "lucide-react"

export default function ClubDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock club data - in real app this would come from API
  const club = {
    id: params.id,
    name: "Tech Traders United",
    description: "Focus on technology stocks and emerging trends in the market",
    members: 1247,
    performance: "+18.5%",
    isLeader: true,
    isMember: true,
    avatar: "/tech-trading-club-logo.jpg",
    banner: "/tech-trading-banner.jpg",
    founded: "January 2023",
    category: "Technology",
    privacy: "Public",
  }

  const members = [
    {
      name: "Sarah Chen",
      role: "Leader",
      avatar: "/female-trader-avatar.jpg",
      performance: "+24.5%",
      joined: "2023-01-15",
    },
    {
      name: "Mike Rodriguez",
      role: "Admin",
      avatar: "/male-trader-avatar.jpg",
      performance: "+18.2%",
      joined: "2023-02-03",
    },
    {
      name: "Alex Thompson",
      role: "Member",
      avatar: "/trader-avatar.jpg",
      performance: "+15.8%",
      joined: "2023-02-15",
    },
    {
      name: "Emma Wilson",
      role: "Member",
      avatar: "/female-discussion-avatar.jpg",
      performance: "+12.3%",
      joined: "2023-03-01",
    },
    {
      name: "David Kim",
      role: "Member",
      avatar: "/male-discussion-avatar.jpg",
      performance: "+19.7%",
      joined: "2023-03-10",
    },
  ]

  const recentActivity = [
    { user: "Sarah Chen", action: "shared trade idea", target: "AAPL Long Position", time: "2 hours ago" },
    { user: "Mike Rodriguez", action: "posted analysis", target: "Q4 Tech Outlook", time: "5 hours ago" },
    { user: "Alex Thompson", action: "started discussion", target: "AI Stock Valuations", time: "1 day ago" },
    { user: "Emma Wilson", action: "joined the club", target: "", time: "2 days ago" },
  ]

  const topPerformers = [
    { name: "Sarah Chen", avatar: "/female-trader-avatar.jpg", return: "+24.5%", trades: 15 },
    { name: "David Kim", avatar: "/male-discussion-avatar.jpg", return: "+19.7%", trades: 12 },
    { name: "Mike Rodriguez", avatar: "/male-trader-avatar.jpg", return: "+18.2%", trades: 18 },
    { name: "Alex Thompson", avatar: "/trader-avatar.jpg", return: "+15.8%", trades: 9 },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-primary-foreground" />
                </div>
                <h1 className="text-xl font-bold text-foreground">Blustock</h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm">
                <Search className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <UserMenu />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Club Header */}
        <div className="relative mb-8">
          <div className="h-48 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg overflow-hidden">
            <img src={club.banner || "/placeholder.svg"} alt="Club banner" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-6 left-6">
            <Avatar className="w-24 h-24 border-4 border-background">
              <AvatarImage src={club.avatar || "/placeholder.svg"} />
              <AvatarFallback className="text-2xl">
                {club.name
                  .split(" ")
                  .map((w) => w[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Club Info */}
        <div className="flex items-start justify-between mb-8 mt-6">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">{club.name}</h1>
                {club.isLeader && <Crown className="w-6 h-6 text-yellow-500" />}
              </div>
              <p className="text-muted-foreground max-w-2xl">{club.description}</p>
            </div>

            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span className="font-semibold">{club.members.toLocaleString()}</span>
                <span className="text-muted-foreground">members</span>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                <span className="font-semibold text-primary">{club.performance}</span>
                <span className="text-muted-foreground">performance</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span className="text-muted-foreground">Founded {club.founded}</span>
              </div>
              <Badge variant="outline">{club.category}</Badge>
              <Badge variant="secondary">{club.privacy}</Badge>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {club.isMember ? (
              <>
                {club.isLeader && (
                  <Button variant="outline">
                    <Settings className="w-4 h-4 mr-2" />
                    Manage
                  </Button>
                )}
                <Button variant="outline">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button>
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Discuss
                </Button>
              </>
            ) : (
              <Button>
                <UserPlus className="w-4 h-4 mr-2" />
                Join Club
              </Button>
            )}
          </div>
        </div>

        {/* Club Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="discussions">Discussions</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentActivity.map((activity, i) => (
                      <div key={i} className="flex items-center justify-between py-3 border-b last:border-0">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback>
                              {activity.user
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm">
                              <span className="font-medium">{activity.user}</span> {activity.action}{" "}
                              {activity.target && <span className="font-medium">{activity.target}</span>}
                            </p>
                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Club Rules & Guidelines</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <h4 className="font-semibold">Trading Focus</h4>
                      <p className="text-sm text-muted-foreground">
                        Focus on technology stocks, emerging trends, and growth companies in the tech sector.
                      </p>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <h4 className="font-semibold">Discussion Guidelines</h4>
                      <p className="text-sm text-muted-foreground">
                        Keep discussions respectful, provide reasoning for trade ideas, and back up claims with
                        research.
                      </p>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <h4 className="font-semibold">Risk Management</h4>
                      <p className="text-sm text-muted-foreground">
                        Always include stop-loss levels and position sizing in your trade ideas.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Top Performers</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {topPerformers.map((performer, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-muted-foreground">#{i + 1}</span>
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={performer.avatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {performer.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                          <div>
                            <p className="text-sm font-medium">{performer.name}</p>
                            <p className="text-xs text-muted-foreground">{performer.trades} trades</p>
                          </div>
                        </div>
                        <Badge variant={i === 0 ? "default" : "secondary"}>{performer.return}</Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Club Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Total Members</span>
                      <span className="font-semibold">{club.members.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Active This Week</span>
                      <span className="font-semibold">342</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Total Trade Ideas</span>
                      <span className="font-semibold">1,247</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Success Rate</span>
                      <span className="font-semibold text-primary">68%</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Members Tab */}
          <TabsContent value="members" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Club Members ({club.members.toLocaleString()})</h2>
              {club.isLeader && (
                <Button>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Invite Members
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {members.map((member, i) => (
                <Card key={i}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar>
                        <AvatarImage src={member.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold">{member.name}</p>
                          {member.role === "Leader" && <Crown className="w-4 h-4 text-yellow-500" />}
                        </div>
                        <Badge
                          variant={
                            member.role === "Leader" ? "default" : member.role === "Admin" ? "secondary" : "outline"
                          }
                          className="text-xs"
                        >
                          {member.role}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Performance</span>
                        <span className="font-semibold text-primary">{member.performance}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Joined</span>
                        <span>{new Date(member.joined).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-4">
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        View Profile
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Discussions Tab */}
          <TabsContent value="discussions" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Club Discussions</h2>
              <Button>
                <MessageSquare className="w-4 h-4 mr-2" />
                Start Discussion
              </Button>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: "NVDA earnings play - thoughts?",
                  author: "Sarah Chen",
                  avatar: "/female-trader-avatar.jpg",
                  replies: 23,
                  likes: 15,
                  time: "2 hours ago",
                  preview: "Looking at NVDA ahead of earnings. Strong AI momentum but valuation concerns...",
                },
                {
                  title: "Apple iPhone 15 cycle impact analysis",
                  author: "Mike Rodriguez",
                  avatar: "/male-trader-avatar.jpg",
                  replies: 18,
                  likes: 12,
                  time: "5 hours ago",
                  preview: "Deep dive into how the iPhone 15 super cycle might affect AAPL stock price...",
                },
                {
                  title: "Tech sector rotation - when to take profits?",
                  author: "Alex Thompson",
                  avatar: "/trader-avatar.jpg",
                  replies: 31,
                  likes: 24,
                  time: "1 day ago",
                  preview: "Seeing some weakness in mega-cap tech. Is it time to rotate into value?",
                },
              ].map((discussion, i) => (
                <Card key={i} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarImage src={discussion.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {discussion.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{discussion.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          By {discussion.author} • {discussion.time}
                        </p>
                        <p className="text-sm">{discussion.preview}</p>

                        <div className="flex items-center gap-4 pt-2">
                          <Button variant="ghost" size="sm" className="gap-1">
                            <MessageSquare className="w-4 h-4" />
                            {discussion.replies}
                          </Button>
                          <Button variant="ghost" size="sm" className="gap-1">
                            <ThumbsUp className="w-4 h-4" />
                            {discussion.likes}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Club Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{club.performance}</div>
                  <p className="text-xs text-muted-foreground">Last 30 days</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">68%</div>
                  <p className="text-xs text-muted-foreground">Profitable trades</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Trades</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,247</div>
                  <p className="text-xs text-muted-foreground">All time</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Trade Ideas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { symbol: "NVDA", author: "Sarah Chen", return: "+34.5%", date: "2 weeks ago" },
                  { symbol: "AAPL", author: "Mike Rodriguez", return: "+28.2%", date: "1 month ago" },
                  { symbol: "MSFT", author: "Alex Thompson", return: "+22.8%", date: "3 weeks ago" },
                  { symbol: "GOOGL", author: "Emma Wilson", return: "+19.3%", date: "2 months ago" },
                ].map((trade, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b last:border-0">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="font-bold">
                        {trade.symbol}
                      </Badge>
                      <div>
                        <p className="text-sm font-medium">By {trade.author}</p>
                        <p className="text-xs text-muted-foreground">{trade.date}</p>
                      </div>
                    </div>
                    <Badge variant="default" className="bg-primary">
                      {trade.return}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
