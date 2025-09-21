"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, ThumbsUp, MessageSquare, Share2, MoreHorizontal, Reply } from "lucide-react"

export default function DiscussionPage({ params }: { params: { id: string } }) {
  const [newReply, setNewReply] = useState("")
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set())

  const getDiscussionData = (id: string) => {
    const discussions = {
      "market-volatility": {
        title: "What are your thoughts on the current market volatility?",
        author: "Jennifer Adams",
        avatar: "/female-discussion-avatar.jpg",
        category: "Market Discussion",
        content:
          "With the recent Fed announcements and geopolitical tensions, how are you adjusting your portfolios? I've been seeing a lot of mixed signals in the market and would love to hear different perspectives on risk management strategies during these uncertain times.",
        likes: 23,
        replies: 47,
        time: "4 hours ago",
        tags: ["Market", "Volatility", "Fed", "Risk Management"],
      },
      "options-learning": {
        title: "Best resources for learning options trading?",
        author: "Mark Johnson",
        avatar: "/male-discussion-avatar.jpg",
        category: "Education",
        content:
          "Looking for comprehensive resources to master options strategies. What worked best for you? I'm particularly interested in understanding the Greeks and how to manage risk effectively. Any book recommendations or online courses that helped you become profitable?",
        likes: 18,
        replies: 32,
        time: "8 hours ago",
        tags: ["Options", "Education", "Learning", "Strategy"],
      },
      "ai-stocks-bubble": {
        title: "AI stocks: Bubble or sustainable growth?",
        author: "Tech Trader Pro",
        avatar: "/tech-trader-avatar.jpg",
        category: "Stock Discussion",
        content:
          "The AI sector has seen massive gains. Are we in a bubble similar to dot-com era or is this different? The valuations seem stretched but the technology adoption is real. What's your take on companies like NVDA, MSFT, and GOOGL at current levels?",
        likes: 56,
        replies: 89,
        time: "1 day ago",
        tags: ["AI", "Tech", "Bubble", "Valuation"],
      },
      "crypto-regulation": {
        title: "Crypto regulation impact on traditional markets",
        author: "Crypto Analyst",
        avatar: "/crypto-analyst-avatar.jpg",
        category: "Crypto",
        content:
          "How do you think increasing crypto regulation will affect traditional financial markets? We're seeing more institutional adoption but also more regulatory scrutiny. Could this actually be bullish for crypto in the long run?",
        likes: 15,
        replies: 28,
        time: "2 days ago",
        tags: ["Crypto", "Regulation", "Institutional", "Markets"],
      },
      "fed-rate-impact": {
        title: "Fed Rate Impact on Market Sectors",
        author: "Market Strategist",
        avatar: "/professional-trader-avatar.png",
        category: "Market Discussion",
        content:
          "With potential rate cuts on the horizon, which sectors do you think will benefit most? Historically, growth stocks and REITs perform well in declining rate environments, but this cycle might be different given inflation concerns.",
        likes: 34,
        replies: 52,
        time: "2 days ago",
        tags: ["Fed", "Rates", "Sectors", "Strategy"],
      },
    }

    return discussions[id as keyof typeof discussions] || discussions["market-volatility"]
  }

  const discussion = {
    id: params.id,
    ...getDiscussionData(params.id),
  }

  const replies = [
    {
      id: "reply-1",
      author: "Mike Rodriguez",
      avatar: "/male-trader-avatar.jpg",
      content:
        "I've been reducing my position sizes and focusing more on defensive stocks. The VIX has been elevated, so I'm using that as a hedge through some put options.",
      likes: 12,
      time: "3 hours ago",
      replies: [
        {
          id: "reply-1-1",
          author: "Sarah Chen",
          avatar: "/female-trader-avatar.jpg",
          content: "That's a smart approach. I've also been looking at utilities and consumer staples as safe havens.",
          likes: 5,
          time: "2 hours ago",
        },
      ],
    },
    {
      id: "reply-2",
      author: "Alex Thompson",
      avatar: "/trader-avatar.jpg",
      content:
        "Volatility creates opportunities! I've been swing trading the bounces and using technical analysis to time entries. The key is proper risk management with tight stops.",
      likes: 18,
      time: "2 hours ago",
      replies: [],
    },
    {
      id: "reply-3",
      author: "Tech Trader Pro",
      avatar: "/tech-trader-avatar.jpg",
      content:
        "Dollar cost averaging into quality tech names during the dips. Companies with strong balance sheets will weather this storm and come out stronger.",
      likes: 9,
      time: "1 hour ago",
      replies: [],
    },
  ]

  const handleLike = (commentId: string) => {
    const newLiked = new Set(likedComments)
    if (newLiked.has(commentId)) {
      newLiked.delete(commentId)
    } else {
      newLiked.add(commentId)
    }
    setLikedComments(newLiked)
  }

  const handleReply = () => {
    if (newReply.trim()) {
      console.log("[v0] Posting reply:", newReply)
      setNewReply("")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-lg font-semibold">Discussion</h1>
              <p className="text-sm text-muted-foreground">{discussion.category}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="space-y-6">
          {/* Original Discussion */}
          <Card>
            <CardHeader>
              <div className="flex items-start gap-3">
                <Avatar className="w-12 h-12">
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
                  <CardTitle className="text-xl leading-tight">{discussion.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">By {discussion.author}</p>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-relaxed">{discussion.content}</p>

              <div className="flex flex-wrap gap-2">
                {discussion.tags.map((tag, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="sm" className="gap-1">
                    <ThumbsUp className="w-4 h-4" />
                    {discussion.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <MessageSquare className="w-4 h-4" />
                    {discussion.replies} replies
                  </Button>
                </div>
                <Button variant="ghost" size="sm">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Reply Form */}
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                <Textarea
                  placeholder="Share your thoughts on this discussion..."
                  value={newReply}
                  onChange={(e) => setNewReply(e.target.value)}
                  rows={3}
                />
                <div className="flex justify-end">
                  <Button onClick={handleReply} disabled={!newReply.trim()}>
                    Post Reply
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Replies */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{replies.length} Replies</h3>

            {replies.map((reply) => (
              <div key={reply.id} className="space-y-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarImage src={reply.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {reply.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold">{reply.author}</p>
                          <span className="text-sm text-muted-foreground">{reply.time}</span>
                        </div>
                        <p className="text-sm leading-relaxed">{reply.content}</p>
                        <div className="flex items-center gap-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`gap-1 ${likedComments.has(reply.id) ? "text-primary" : ""}`}
                            onClick={() => handleLike(reply.id)}
                          >
                            <ThumbsUp className={`w-3 h-3 ${likedComments.has(reply.id) ? "fill-current" : ""}`} />
                            {reply.likes + (likedComments.has(reply.id) ? 1 : 0)}
                          </Button>
                          <Button variant="ghost" size="sm" className="gap-1">
                            <Reply className="w-3 h-3" />
                            Reply
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Nested Replies */}
                {reply.replies.map((nestedReply) => (
                  <div key={nestedReply.id} className="ml-12">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={nestedReply.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="text-xs">
                              {nestedReply.author
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                              <p className="font-semibold text-sm">{nestedReply.author}</p>
                              <span className="text-xs text-muted-foreground">{nestedReply.time}</span>
                            </div>
                            <p className="text-sm leading-relaxed">{nestedReply.content}</p>
                            <div className="flex items-center gap-4">
                              <Button
                                variant="ghost"
                                size="sm"
                                className={`gap-1 text-xs ${likedComments.has(nestedReply.id) ? "text-primary" : ""}`}
                                onClick={() => handleLike(nestedReply.id)}
                              >
                                <ThumbsUp
                                  className={`w-3 h-3 ${likedComments.has(nestedReply.id) ? "fill-current" : ""}`}
                                />
                                {nestedReply.likes + (likedComments.has(nestedReply.id) ? 1 : 0)}
                              </Button>
                              <Button variant="ghost" size="sm" className="gap-1 text-xs">
                                <Reply className="w-3 h-3" />
                                Reply
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
