"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { UserMenu } from "@/components/auth/user-menu"
import {
  TrendingUp,
  MessageSquare,
  Eye,
  ThumbsUp,
  Share2,
  Bell,
  Search,
  ArrowLeft,
  Bookmark,
  Flag,
  MoreHorizontal,
} from "lucide-react"

export default function TradeIdeaDetailPage({ params }: { params: { id: string } }) {
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [comment, setComment] = useState("")

  const getIdeaData = (id: string) => {
    const ideas = {
      "aapl-long-position": {
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
        fullAnalysis: `Apple (AAPL) is showing strong technical and fundamental signals for a continued upward move. Here's my detailed analysis:

**Technical Analysis:**
- Clean breakout above the $175 resistance level with strong volume
- RSI showing bullish momentum without being overbought (currently at 62)
- 50-day MA providing strong support at $170
- MACD showing positive divergence

**Fundamental Drivers:**
- iPhone 15 super cycle showing strong early adoption
- Services revenue continuing to grow at 15%+ YoY
- China market showing signs of recovery
- Strong cash flow generation supporting dividend and buybacks

**Risk Factors:**
- Macro headwinds from potential Fed rate hikes
- China regulatory concerns
- Seasonal weakness typically seen in Q1

**Position Sizing:**
I'm allocating 3% of my portfolio to this trade, which aligns with my risk management rules for individual stock positions.

**Exit Strategy:**
- Take 50% profits at $185 (first resistance)
- Let remaining 50% run to $195 target
- Stop loss at $165 (below key support)`,
        tags: ["Technology", "Large Cap", "Earnings Play"],
        club: "Tech Traders United",
      },
      "tsla-swing-trade": {
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
        fullAnalysis: `Tesla (TSLA) presents an attractive swing trading opportunity based on several catalysts converging:

**Technical Setup:**
- Stock has found support at the $235-240 level
- RSI oversold at 28, indicating potential bounce
- Volume spike on recent selling suggests capitulation
- 200-day MA at $245 providing additional support

**Fundamental Catalysts:**
- Cybertruck deliveries ramping up faster than expected
- FSD (Full Self Driving) showing significant improvements
- Energy business growing at 40%+ annually
- China production efficiency improvements

**Risk Management:**
- Position size: 2.5% of portfolio
- Stop loss below key support at $220
- Will take partial profits at $260 resistance

**Timeline:**
Expecting move to play out over 3-6 weeks, with potential acceleration on positive news flow.`,
        tags: ["Electric Vehicles", "Growth", "Swing Trade"],
        club: "Tech Traders United",
      },
      "nvda-options": {
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
        fullAnalysis: `NVIDIA (NVDA) options play ahead of earnings with strong AI tailwinds:

**Options Strategy:**
- Buying $450 calls expiring in 2 weeks
- Premium paid: $12.50 per contract
- Breakeven: $462.50
- Max risk: 50% of premium ($6.25)

**Thesis:**
- AI chip demand showing no signs of slowing
- Data center revenue growth accelerating
- Guidance likely to be raised again
- Options implied volatility relatively low pre-earnings

**Technical Analysis:**
- Stock consolidating above $440 support
- Bullish flag pattern suggesting continuation
- Volume profile shows strong support at current levels

**Risk Factors:**
- High valuation multiple
- Potential profit-taking after strong run
- Macro headwinds affecting tech sector

**Exit Strategy:**
- Take profits on 50%+ gain
- Stop loss at 50% premium loss
- Close position before earnings if setup deteriorates`,
        tags: ["AI", "Options", "Earnings Play"],
        club: "Options Masters",
      },
    }

    return ideas[id as keyof typeof ideas] || ideas["aapl-long-position"]
  }

  const idea = {
    id: params.id,
    ...getIdeaData(params.id),
  }

  const comments = [
    {
      id: 1,
      author: "Mike Rodriguez",
      avatar: "/male-trader-avatar.jpg",
      content:
        "Great analysis! I agree on the technical setup. The volume on the breakout was impressive. What are your thoughts on the upcoming earnings?",
      time: "2 hours ago",
      likes: 8,
    },
    {
      id: 2,
      author: "Alex Thompson",
      avatar: "/trader-avatar.jpg",
      content:
        "Solid trade idea. I'm a bit concerned about the macro environment though. Fed policy could impact tech stocks significantly.",
      time: "1 hour ago",
      likes: 5,
    },
    {
      id: 3,
      author: "Emma Wilson",
      avatar: "/female-discussion-avatar.jpg",
      content: "Thanks for sharing the detailed analysis. The risk/reward ratio looks attractive at these levels.",
      time: "45 minutes ago",
      likes: 3,
    },
  ]

  const relatedIdeas = [
    {
      symbol: "MSFT",
      author: "David Kim",
      strategy: "Long Position",
      return: "+15.8%",
      time: "1 day ago",
    },
    {
      symbol: "GOOGL",
      author: "Lisa Chang",
      strategy: "Options Play",
      return: "+22.3%",
      time: "2 days ago",
    },
    {
      symbol: "NVDA",
      author: "Robert Taylor",
      strategy: "Swing Trade",
      return: "+18.7%",
      time: "3 days ago",
    },
  ]

  const handleLike = () => {
    setIsLiked(!isLiked)
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  const handleComment = () => {
    if (comment.trim()) {
      console.log("[v0] Adding comment:", comment)
      setComment("")
    }
  }

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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Trade Idea Header */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
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
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{idea.time}</span>
                        <span>•</span>
                        <span>from {idea.club}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="font-bold text-lg px-3 py-1">
                      {idea.symbol}
                    </Badge>
                    <Badge variant="secondary">{idea.strategy}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg">{idea.description}</p>

                <div className="flex flex-wrap gap-2">
                  {idea.tags.map((tag, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Trade Details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-muted/50 rounded-lg">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">Entry Price</p>
                    <p className="text-xl font-bold">{idea.entry}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">Target</p>
                    <p className="text-xl font-bold text-primary">{idea.target}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">Stop Loss</p>
                    <p className="text-xl font-bold text-destructive">{idea.stopLoss}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">Timeframe</p>
                    <p className="text-xl font-bold">{idea.timeframe}</p>
                  </div>
                </div>

                {/* Confidence & Stats */}
                <div className="flex items-center justify-between p-4 bg-card border rounded-lg">
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Confidence</p>
                      <Badge variant="default" className="text-lg px-3 py-1 mt-1">
                        {idea.confidence}%
                      </Badge>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Risk/Reward</p>
                      <p className="text-lg font-bold mt-1">1:2.8</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {idea.views}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-3">
                    <Button variant={isLiked ? "default" : "ghost"} size="sm" className="gap-1" onClick={handleLike}>
                      <ThumbsUp className="w-4 h-4" />
                      {idea.likes + (isLiked ? 1 : 0)}
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <MessageSquare className="w-4 h-4" />
                      {idea.comments}
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <Share2 className="w-4 h-4" />
                      Share
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant={isBookmarked ? "default" : "ghost"} size="sm" onClick={handleBookmark}>
                      <Bookmark className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Flag className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Full Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Detailed Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  {idea.fullAnalysis.split("\n\n").map((paragraph, i) => (
                    <div key={i} className="mb-4">
                      {paragraph.startsWith("**") ? (
                        <h3 className="font-semibold text-lg mb-2">{paragraph.replace(/\*\*/g, "")}</h3>
                      ) : (
                        <p className="text-sm leading-relaxed">{paragraph}</p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Comments Section */}
            <Card>
              <CardHeader>
                <CardTitle>Comments ({comments.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Add Comment */}
                <div className="space-y-3">
                  <Textarea
                    placeholder="Share your thoughts on this trade idea..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={3}
                  />
                  <div className="flex justify-end">
                    <Button onClick={handleComment} disabled={!comment.trim()}>
                      Post Comment
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Comments List */}
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={comment.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {comment.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-sm">{comment.author}</p>
                          <span className="text-xs text-muted-foreground">{comment.time}</span>
                        </div>
                        <p className="text-sm">{comment.content}</p>
                        <div className="flex items-center gap-3">
                          <Button variant="ghost" size="sm" className="gap-1 h-auto p-1">
                            <ThumbsUp className="w-3 h-3" />
                            {comment.likes}
                          </Button>
                          <Button variant="ghost" size="sm" className="h-auto p-1">
                            Reply
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Author Info */}
            <Card>
              <CardHeader>
                <CardTitle>About the Author</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
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
                    <p className="text-sm text-muted-foreground">Tech Trader</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Success Rate</p>
                    <p className="font-semibold">72%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Followers</p>
                    <p className="font-semibold">1,247</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Total Ideas</p>
                    <p className="font-semibold">89</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Avg Return</p>
                    <p className="font-semibold text-primary">+18.5%</p>
                  </div>
                </div>
                <Button className="w-full">Follow</Button>
              </CardContent>
            </Card>

            {/* Related Ideas */}
            <Card>
              <CardHeader>
                <CardTitle>Related Ideas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {relatedIdeas.map((relatedIdea, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">{relatedIdea.symbol}</Badge>
                      <div>
                        <p className="text-sm font-medium">{relatedIdea.strategy}</p>
                        <p className="text-xs text-muted-foreground">By {relatedIdea.author}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-primary">{relatedIdea.return}</p>
                      <p className="text-xs text-muted-foreground">{relatedIdea.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Market Context</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Current Price</span>
                  <span className="font-semibold">$178.25</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Day Change</span>
                  <span className="font-semibold text-primary">+2.75 (+1.57%)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Volume</span>
                  <span className="font-semibold">45.2M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Market Cap</span>
                  <span className="font-semibold">$2.78T</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
