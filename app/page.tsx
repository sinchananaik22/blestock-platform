"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserMenu } from "@/components/auth/user-menu"
import { CreateClubModal } from "@/components/clubs/create-club-modal"
import { CreateIdeaModal } from "@/components/ideas/create-idea-modal"
import {
  TrendingUp,
  Users,
  MessageSquare,
  BarChart3,
  ArrowUpRight,
  Eye,
  ThumbsUp,
  Share2,
  Bell,
  Search,
  Menu,
} from "lucide-react"

export default function BlustockPlatform() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [likedIdeas, setLikedIdeas] = useState<Set<string>>(new Set())
  const [likedAnalysis, setLikedAnalysis] = useState<Set<string>>(new Set())

  useEffect(() => {
    const checkAuth = () => {
      const userData = localStorage.getItem("blustock_user")
      console.log("[v0] Checking authentication:", !!userData)
      setIsAuthenticated(!!userData)
      setIsLoading(false)

      if (!userData) {
        console.log("[v0] No user data found, redirecting to auth")
        setTimeout(() => {
          window.location.href = "/auth"
        }, 1000)
      }
    }

    // Check immediately and also after a short delay to handle any timing issues
    checkAuth()
    const timer = setTimeout(checkAuth, 100)

    return () => clearTimeout(timer)
  }, [])

  const handleLike = (id: string, type: "idea" | "analysis") => {
    if (type === "idea") {
      const newLiked = new Set(likedIdeas)
      if (newLiked.has(id)) {
        newLiked.delete(id)
      } else {
        newLiked.add(id)
      }
      setLikedIdeas(newLiked)
    } else {
      const newLiked = new Set(likedAnalysis)
      if (newLiked.has(id)) {
        newLiked.delete(id)
      } else {
        newLiked.add(id)
      }
      setLikedAnalysis(newLiked)
    }
  }

  const handleNavigation = (path: string) => {
    console.log("[v0] Navigating to:", path)
    window.location.href = path
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Blustock</h1>
          <p className="text-muted-foreground mb-4">Loading your trading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Blustock</h1>
          <p className="text-muted-foreground mb-4">Redirecting to login...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-primary-foreground" />
                </div>
                <h1 className="text-xl font-bold text-foreground">Blustock</h1>
              </div>
              <nav className="hidden md:flex items-center gap-6">
                <Button variant="ghost" size="sm" onClick={() => setActiveTab("dashboard")}>
                  Dashboard
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setActiveTab("clubs")}>
                  Clubs
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setActiveTab("ideas")}>
                  Trade Ideas
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setActiveTab("analysis")}>
                  Analysis
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setActiveTab("discussions")}>
                  Discussions
                </Button>
              </nav>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={() => handleNavigation("/search")}>
                <Search className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => handleNavigation("/notifications")}>
                <Bell className="w-4 h-4" />
              </Button>
              <UserMenu />
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="clubs">Clubs</TabsTrigger>
            <TabsTrigger value="ideas">Trade Ideas</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="discussions">Discussions</TabsTrigger>
          </TabsList>{" "}
          {/* Added closing tag for TabsList */}
          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleNavigation("/portfolio")}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Portfolio</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">$124,580</div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <ArrowUpRight className="w-3 h-3" />
                    +12.5% this month
                  </p>
                </CardContent>
              </Card>
              <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveTab("clubs")}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Active Clubs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground">3 as leader</p>
                </CardContent>
              </Card>
              <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveTab("ideas")}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Trade Ideas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">23</div>
                  <p className="text-xs text-muted-foreground">15 this week</p>
                </CardContent>
              </Card>
              <Card
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleNavigation("/profile")}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Followers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,247</div>
                  <p className="text-xs text-muted-foreground">+89 this week</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      action: "Posted trade idea",
                      target: "AAPL Long Position",
                      time: "2 hours ago",
                      link: "/ideas/aapl-long-position",
                    },
                    {
                      action: "Joined club",
                      target: "Tech Traders United",
                      time: "5 hours ago",
                      link: "/clubs/tech-traders-united",
                    },
                    {
                      action: "Shared analysis",
                      target: "Q4 Market Outlook",
                      time: "1 day ago",
                      link: "/analysis/q4-outlook",
                    },
                    {
                      action: "Started discussion",
                      target: "Fed Rate Impact",
                      time: "2 days ago",
                      link: "/discussions/fed-rate-impact",
                    },
                  ].map((activity, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between py-2 border-b last:border-0 cursor-pointer hover:bg-muted/50 rounded px-2"
                      onClick={() => handleNavigation(activity.link)}
                    >
                      <div>
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.target}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Ideas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { symbol: "TSLA", strategy: "Swing Trade", return: "+24.5%", likes: 89, id: "tsla-swing-trade" },
                    { symbol: "NVDA", strategy: "Long Hold", return: "+18.2%", likes: 67, id: "nvda-long-hold" },
                    { symbol: "MSFT", strategy: "Options Play", return: "+15.8%", likes: 45, id: "msft-options" },
                    { symbol: "AMZN", strategy: "Earnings Play", return: "+12.3%", likes: 38, id: "amzn-earnings" },
                  ].map((idea, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between py-2 border-b last:border-0 cursor-pointer hover:bg-muted/50 rounded px-2"
                      onClick={() => handleNavigation(`/ideas/${idea.id}`)}
                    >
                      <div className="flex items-center gap-3">
                        <Badge variant="outline">{idea.symbol}</Badge>
                        <div>
                          <p className="text-sm font-medium">{idea.strategy}</p>
                          <p className="text-xs text-primary font-semibold">{idea.return}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <ThumbsUp className="w-3 h-3" />
                        {idea.likes}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          {/* Clubs Tab */}
          <TabsContent value="clubs" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Trading Clubs</h2>
              <CreateClubModal>
                <Button>
                  <Users className="w-4 h-4 mr-2" />
                  Create Club
                </Button>
              </CreateClubModal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  id: "tech-traders-united",
                  name: "Tech Traders United",
                  members: 1247,
                  description: "Focus on technology stocks and emerging trends",
                  performance: "+18.5%",
                  isLeader: true,
                  avatar: "/tech-trading-club-logo.jpg",
                },
                {
                  id: "crypto-pioneers",
                  name: "Crypto Pioneers",
                  members: 892,
                  description: "Cryptocurrency trading strategies and analysis",
                  performance: "+24.2%",
                  isLeader: false,
                  avatar: "/crypto-trading-club-logo.jpg",
                },
                {
                  id: "value-investors",
                  name: "Value Investors",
                  members: 2156,
                  description: "Long-term value investing approach",
                  performance: "+12.8%",
                  isLeader: false,
                  avatar: "/value-investing-club-logo.jpg",
                },
                {
                  id: "options-masters",
                  name: "Options Masters",
                  members: 634,
                  description: "Advanced options trading strategies",
                  performance: "+31.4%",
                  isLeader: true,
                  avatar: "/options-trading-club-logo.jpg",
                },
                {
                  id: "day-trading-elite",
                  name: "Day Trading Elite",
                  members: 445,
                  description: "High-frequency day trading techniques",
                  performance: "+19.7%",
                  isLeader: false,
                  avatar: "/day-trading-club-logo.jpg",
                },
                {
                  id: "esg-investors",
                  name: "ESG Investors",
                  members: 1089,
                  description: "Sustainable and responsible investing",
                  performance: "+14.3%",
                  isLeader: false,
                  avatar: "/esg-investing-club-logo.jpg",
                },
              ].map((club, i) => (
                <Card key={i} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={club.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {club.name
                            .split(" ")
                            .map((w) => w[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-lg">{club.name}</CardTitle>
                          {club.isLeader && <Badge variant="secondary">Leader</Badge>}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {club.members.toLocaleString()}
                          </span>
                          <span className="text-primary font-semibold">{club.performance}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{club.description}</CardDescription>
                    <div className="flex items-center justify-between mt-4">
                      <Button variant="outline" size="sm" onClick={() => (window.location.href = `/clubs/${club.id}`)}>
                        View Club
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
          {/* Trade Ideas Tab */}
          <TabsContent value="ideas" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Trade Ideas</h2>
              <CreateIdeaModal>
                <Button>
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Share Idea
                </Button>
              </CreateIdeaModal>
            </div>

            <div className="space-y-4">
              {[
                {
                  id: "aapl-long-position",
                  author: "Sarah Chen",
                  avatar: "/female-trader-avatar.jpg",
                  symbol: "AAPL",
                  strategy: "Long Position",
                  entry: "$175.50",
                  target: "$195.00",
                  stopLoss: "$165.00",
                  timeframe: "2-4 weeks",
                  confidence: 85,
                  likes: 124,
                  comments: 23,
                  views: 1847,
                  time: "3 hours ago",
                  description:
                    "Strong earnings momentum and iPhone 15 cycle driving growth. Technical breakout above resistance.",
                },
                {
                  id: "tsla-swing-trade",
                  author: "Mike Rodriguez",
                  avatar: "/male-trader-avatar.jpg",
                  symbol: "TSLA",
                  strategy: "Swing Trade",
                  entry: "$240.00",
                  target: "$280.00",
                  stopLoss: "$220.00",
                  timeframe: "3-6 weeks",
                  confidence: 78,
                  likes: 89,
                  comments: 15,
                  views: 1234,
                  time: "6 hours ago",
                  description: "Cybertruck delivery ramp and FSD progress should drive next leg up. RSI oversold.",
                },
                {
                  id: "nvda-options-play",
                  author: "Alex Thompson",
                  avatar: "/trader-avatar.jpg",
                  symbol: "NVDA",
                  strategy: "Options Play",
                  entry: "$450 Calls",
                  target: "$500+",
                  stopLoss: "50% loss",
                  timeframe: "2 weeks",
                  confidence: 72,
                  likes: 67,
                  comments: 31,
                  views: 2156,
                  time: "1 day ago",
                  description: "AI demand continues strong. Earnings beat expected with guidance raise.",
                },
              ].map((idea, i) => (
                <Card key={i} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div
                        className="flex items-center gap-3 cursor-pointer"
                        onClick={() => handleNavigation(`/users/${idea.author.toLowerCase().replace(" ", "-")}`)}
                      >
                        <Avatar>
                          <AvatarImage src={idea.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {idea.author
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{idea.author}</p>
                          <p className="text-sm text-muted-foreground">{idea.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="font-bold">
                          {idea.symbol}
                        </Badge>
                        <Badge variant="secondary">{idea.strategy}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm">{idea.description}</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted/50 rounded-lg">
                      <div>
                        <p className="text-xs text-muted-foreground">Entry</p>
                        <p className="font-semibold">{idea.entry}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Target</p>
                        <p className="font-semibold text-primary">{idea.target}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Stop Loss</p>
                        <p className="font-semibold text-destructive">{idea.stopLoss}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Timeframe</p>
                        <p className="font-semibold">{idea.timeframe}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`gap-1 ${likedIdeas.has(idea.id) ? "text-primary" : ""}`}
                          onClick={(e) => {
                            e.stopPropagation()
                            handleLike(idea.id, "idea")
                          }}
                        >
                          <ThumbsUp className={`w-4 h-4 ${likedIdeas.has(idea.id) ? "fill-current" : ""}`} />
                          {idea.likes + (likedIdeas.has(idea.id) ? 1 : 0)}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleNavigation(`/ideas/${idea.id}#comments`)
                          }}
                        >
                          <MessageSquare className="w-4 h-4" />
                          {idea.comments}
                        </Button>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {idea.views}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Confidence:</span>
                        <Badge
                          variant={idea.confidence > 80 ? "default" : idea.confidence > 70 ? "secondary" : "outline"}
                        >
                          {idea.confidence}%
                        </Badge>
                        <Button variant="ghost" size="sm" onClick={() => handleNavigation(`/ideas/${idea.id}`)}>
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          {/* Analysis Tab */}
          <TabsContent value="analysis" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Market Analysis</h2>
              <Button onClick={() => handleNavigation("/analysis/create")}>
                <BarChart3 className="w-4 h-4 mr-2" />
                Create Analysis
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[
                {
                  id: "q4-tech-outlook",
                  title: "Q4 2024 Tech Sector Outlook",
                  author: "Emma Wilson",
                  type: "Sector Analysis",
                  readTime: "8 min read",
                  likes: 234,
                  comments: 45,
                  time: "2 days ago",
                  preview:
                    "Technology sector showing strong fundamentals despite macro headwinds. AI adoption accelerating across enterprise...",
                  tags: ["Tech", "AI", "Earnings"],
                },
                {
                  id: "fed-policy-impact",
                  title: "Federal Reserve Policy Impact on Markets",
                  author: "David Kim",
                  type: "Macro Analysis",
                  readTime: "12 min read",
                  likes: 189,
                  comments: 67,
                  time: "3 days ago",
                  preview:
                    "Analysis of potential Fed rate cuts and their historical impact on equity markets. Key sectors to watch...",
                  tags: ["Fed", "Rates", "Macro"],
                },
                {
                  id: "crypto-cycle-analysis",
                  title: "Cryptocurrency Market Cycle Analysis",
                  author: "Lisa Chang",
                  type: "Crypto Analysis",
                  readTime: "6 min read",
                  likes: 156,
                  comments: 89,
                  time: "5 days ago",
                  preview:
                    "Bitcoin halving cycle patterns and altcoin rotation strategies. Historical precedents suggest...",
                  tags: ["Crypto", "Bitcoin", "Cycles"],
                },
                {
                  id: "energy-transition-thesis",
                  title: "Energy Transition Investment Thesis",
                  author: "Robert Taylor",
                  type: "Thematic Analysis",
                  readTime: "10 min read",
                  likes: 98,
                  comments: 23,
                  time: "1 week ago",
                  preview:
                    "Clean energy infrastructure buildout creating multi-year investment opportunities. Key players and valuations...",
                  tags: ["Energy", "ESG", "Infrastructure"],
                },
              ].map((analysis, i) => (
                <Card
                  key={i}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleNavigation(`/analysis/${analysis.id}`)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <Badge variant="outline">{analysis.type}</Badge>
                        <CardTitle className="text-lg leading-tight">{analysis.title}</CardTitle>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>By {analysis.author}</span>
                          <span>•</span>
                          <span>{analysis.time}</span>
                          <span>•</span>
                          <span>{analysis.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{analysis.preview}</p>

                    <div className="flex flex-wrap gap-2">
                      {analysis.tags.map((tag, j) => (
                        <Badge key={j} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`gap-1 ${likedAnalysis.has(analysis.id) ? "text-primary" : ""}`}
                          onClick={(e) => {
                            e.stopPropagation()
                            handleLike(analysis.id, "analysis")
                          }}
                        >
                          <ThumbsUp className={`w-4 h-4 ${likedAnalysis.has(analysis.id) ? "fill-current" : ""}`} />
                          {analysis.likes + (likedAnalysis.has(analysis.id) ? 1 : 0)}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleNavigation(`/analysis/${analysis.id}#comments`)
                          }}
                        >
                          <MessageSquare className="w-4 h-4" />
                          {analysis.comments}
                        </Button>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleNavigation(`/analysis/${analysis.id}`)
                        }}
                      >
                        Read Full Analysis
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
              <h2 className="text-2xl font-bold">Community Discussions</h2>
              <Button onClick={() => handleNavigation("/discussions/create")}>
                <MessageSquare className="w-4 h-4 mr-2" />
                Start Discussion
              </Button>
            </div>

            <div className="space-y-4">
              {[
                {
                  id: "market-volatility",
                  title: "What are your thoughts on the current market volatility?",
                  author: "Jennifer Adams",
                  avatar: "/female-discussion-avatar.jpg",
                  category: "Market Discussion",
                  replies: 47,
                  likes: 23,
                  time: "4 hours ago",
                  lastReply: "12 minutes ago",
                  preview:
                    "With the recent Fed announcements and geopolitical tensions, how are you adjusting your portfolios?",
                },
                {
                  id: "options-learning",
                  title: "Best resources for learning options trading?",
                  author: "Mark Johnson",
                  avatar: "/male-discussion-avatar.jpg",
                  category: "Education",
                  replies: 32,
                  likes: 18,
                  time: "8 hours ago",
                  lastReply: "2 hours ago",
                  preview:
                    "Looking for comprehensive resources to master options strategies. What worked best for you?",
                },
                {
                  id: "ai-stocks-bubble",
                  title: "AI stocks: Bubble or sustainable growth?",
                  author: "Tech Trader Pro",
                  avatar: "/tech-trader-avatar.jpg",
                  category: "Stock Discussion",
                  replies: 89,
                  likes: 56,
                  time: "1 day ago",
                  lastReply: "45 minutes ago",
                  preview:
                    "The AI sector has seen massive gains. Are we in a bubble similar to dot-com era or is this different?",
                },
                {
                  id: "crypto-regulation",
                  title: "Crypto regulation impact on traditional markets",
                  author: "Crypto Analyst",
                  avatar: "/crypto-analyst-avatar.jpg",
                  category: "Crypto",
                  replies: 28,
                  likes: 15,
                  time: "2 days ago",
                  lastReply: "6 hours ago",
                  preview: "How do you think increasing crypto regulation will affect traditional financial markets?",
                },
              ].map((discussion, i) => (
                <Card
                  key={i}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleNavigation(`/discussions/${discussion.id}`)}
                >
                  <CardHeader>
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
                          <Badge variant="outline">{discussion.category}</Badge>
                          <span className="text-sm text-muted-foreground">{discussion.time}</span>
                        </div>
                        <CardTitle className="text-lg leading-tight">{discussion.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">By {discussion.author}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{discussion.preview}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" className="gap-1">
                          <MessageSquare className="w-4 h-4" />
                          {discussion.replies} replies
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-1">
                          <ThumbsUp className="w-4 h-4" />
                          {discussion.likes}
                        </Button>
                      </div>
                      <div className="text-sm text-muted-foreground">Last reply: {discussion.lastReply}</div>
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
