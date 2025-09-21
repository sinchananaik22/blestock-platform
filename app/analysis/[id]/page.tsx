"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, ThumbsUp, MessageSquare, Share2, Bookmark, Clock, TrendingUp, TrendingDown } from "lucide-react"

export default function AnalysisPage({ params }: { params: { id: string } }) {
  const [newComment, setNewComment] = useState("")
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  const getAnalysisData = (id: string) => {
    const analyses = {
      "q4-outlook": {
        title: "Q4 2024 Tech Sector Outlook: AI Revolution Continues",
        author: "Emma Wilson",
        avatar: "/female-trader-avatar.jpg",
        type: "Sector Analysis",
        readTime: "8 min read",
        publishDate: "December 15, 2024",
        likes: 234,
        comments: 45,
        views: 2847,
        tags: ["Tech", "AI", "Earnings", "Q4", "Sector Analysis"],
        summary:
          "Technology sector showing strong fundamentals despite macro headwinds. AI adoption accelerating across enterprise segments with major implications for 2025.",
        content: `The technology sector continues to demonstrate remarkable resilience in the face of macroeconomic uncertainties. As we approach the end of 2024, several key themes are emerging that will likely define the sector's trajectory into 2025.

## AI Revolution Accelerates

The artificial intelligence revolution is no longer a future promise—it's happening now. Enterprise adoption of AI tools has accelerated dramatically, with companies reporting significant productivity gains and cost savings. Key players like Microsoft, Google, and NVIDIA are seeing unprecedented demand for their AI infrastructure and services.

### Key Metrics:
- Enterprise AI spending up 340% YoY
- Cloud infrastructure demand growing 45% annually
- AI chip shortage creating supply constraints through 2025

## Earnings Momentum Building

Despite concerns about valuations, tech earnings continue to surprise to the upside. The sector's ability to maintain margins while investing heavily in AI infrastructure speaks to the underlying strength of these business models.

### Q4 Expectations:
- Semiconductor companies: +25% revenue growth expected
- Cloud providers: +30% growth in AI-related services
- Software companies: Margin expansion despite R&D investments

## Investment Implications

For investors, the tech sector presents both opportunities and risks. While valuations appear stretched in some segments, the fundamental transformation driven by AI creates long-term value creation opportunities.

### Recommended Positioning:
1. **Overweight AI Infrastructure**: Companies building the picks and shovels
2. **Selective Software**: Focus on companies with clear AI integration
3. **Underweight Consumer Tech**: Facing headwinds from economic slowdown

## Risks to Monitor

- Regulatory scrutiny increasing globally
- Potential AI bubble concerns
- Supply chain constraints in semiconductor space
- Rising interest rates impacting growth valuations

## Conclusion

The technology sector remains our top pick for 2025, driven by the AI transformation. However, selectivity will be key as not all tech companies will benefit equally from this trend.`,
        keyPoints: [
          "AI enterprise adoption accelerating at unprecedented pace",
          "Tech earnings showing strong momentum despite macro concerns",
          "Supply chain constraints creating opportunities for infrastructure plays",
          "Regulatory risks increasing but manageable for quality names",
        ],
        relatedStocks: [
          { symbol: "NVDA", price: 520.3, change: 2.5, recommendation: "Strong Buy" },
          { symbol: "MSFT", price: 395.8, change: 1.2, recommendation: "Buy" },
          { symbol: "GOOGL", price: 152.4, change: -0.8, recommendation: "Buy" },
          { symbol: "AMZN", price: 178.9, change: 1.8, recommendation: "Hold" },
        ],
      },
      "fed-rate-impact": {
        title: "Federal Reserve Policy Impact on Markets",
        author: "David Kim",
        avatar: "/male-trader-avatar.jpg",
        type: "Macro Analysis",
        readTime: "12 min read",
        publishDate: "December 12, 2024",
        likes: 189,
        comments: 67,
        views: 3421,
        tags: ["Fed", "Rates", "Macro", "Policy"],
        summary:
          "Analysis of potential Fed rate cuts and their historical impact on equity markets. Key sectors to watch as monetary policy shifts.",
        content: `The Federal Reserve's monetary policy decisions continue to be the primary driver of market sentiment and sector rotation. As we analyze the current environment, several key themes emerge that will shape investment strategies going forward.

## Current Fed Policy Stance

The Federal Reserve has maintained a hawkish stance throughout 2024, but recent economic data suggests a potential shift in policy direction. Inflation has shown signs of cooling, while employment data indicates a softening labor market.

### Key Economic Indicators:
- Core PCE inflation trending toward 2% target
- Unemployment rate rising to 4.2%
- GDP growth slowing but remaining positive
- Consumer spending showing resilience

## Historical Market Impact

Looking at historical precedents, Fed policy shifts have predictable impacts on different market sectors:

### Rate Cut Cycles:
- Growth stocks typically outperform value
- REITs and utilities see increased demand
- Financials may face margin pressure
- Small caps often benefit from easier credit conditions

## Sector Implications

Different sectors will be impacted differently by potential rate cuts:

### Winners:
1. **Technology**: Lower discount rates benefit growth stocks
2. **Real Estate**: REITs become more attractive vs bonds
3. **Consumer Discretionary**: Lower rates boost consumer spending
4. **Small Caps**: Easier access to capital

### Potential Losers:
1. **Financials**: Net interest margin compression
2. **Energy**: Potential dollar weakness impacts commodities
3. **Healthcare**: Defensive sectors may underperform in risk-on environment

## Investment Strategy

Given the evolving Fed policy landscape, we recommend:

1. **Overweight Growth**: Prepare for potential rate cuts
2. **Underweight Financials**: Margin pressure likely
3. **Selective Value**: Focus on quality names with pricing power
4. **International Exposure**: Dollar weakness could benefit foreign assets

## Risks and Considerations

- Fed policy mistakes could reignite inflation
- Geopolitical tensions may complicate policy decisions
- Market expectations may be too aggressive
- Credit conditions could tighten unexpectedly

## Conclusion

The Fed's next moves will be crucial for market direction. Investors should position for a potential shift toward easier monetary policy while remaining vigilant for signs of policy errors.`,
        keyPoints: [
          "Fed policy shift toward easing appears increasingly likely",
          "Historical patterns suggest growth stocks will outperform",
          "Sector rotation opportunities emerging in current environment",
          "Risk management remains critical given policy uncertainty",
        ],
        relatedStocks: [
          { symbol: "QQQ", price: 412.5, change: 1.8, recommendation: "Buy" },
          { symbol: "IWM", price: 198.3, change: 2.1, recommendation: "Buy" },
          { symbol: "XLF", price: 38.7, change: -0.5, recommendation: "Hold" },
          { symbol: "VNQ", price: 89.2, change: 1.4, recommendation: "Buy" },
        ],
      },
    }

    return analyses[id as keyof typeof analyses] || analyses["q4-outlook"]
  }

  const analysis = {
    id: params.id,
    ...getAnalysisData(params.id),
  }

  const comments = [
    {
      id: "comment-1",
      author: "Mike Rodriguez",
      avatar: "/male-trader-avatar.jpg",
      content:
        "Excellent analysis! I've been positioning in NVDA and seeing great returns. The AI infrastructure theme is definitely playing out.",
      likes: 12,
      time: "2 hours ago",
    },
    {
      id: "comment-2",
      author: "Sarah Chen",
      avatar: "/female-trader-avatar.jpg",
      content:
        "Great points on the regulatory risks. I think this is being underpriced by the market currently. Thanks for the detailed breakdown!",
      likes: 8,
      time: "4 hours ago",
    },
  ]

  const handleComment = () => {
    if (newComment.trim()) {
      console.log("[v0] Posting comment:", newComment)
      setNewComment("")
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
              <h1 className="text-lg font-semibold">Market Analysis</h1>
              <p className="text-sm text-muted-foreground">{analysis.type}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="space-y-6">
          {/* Article Header */}
          <Card>
            <CardHeader className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="outline">{analysis.type}</Badge>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {analysis.readTime}
                </span>
              </div>

              <h1 className="text-3xl font-bold leading-tight">{analysis.title}</h1>

              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={analysis.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {analysis.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{analysis.author}</p>
                  <p className="text-sm text-muted-foreground">{analysis.publishDate}</p>
                </div>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">{analysis.summary}</p>

              <div className="flex flex-wrap gap-2">
                {analysis.tags.map((tag, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`gap-1 ${isLiked ? "text-primary" : ""}`}
                    onClick={() => setIsLiked(!isLiked)}
                  >
                    <ThumbsUp className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
                    {analysis.likes + (isLiked ? 1 : 0)}
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <MessageSquare className="w-4 h-4" />
                    {analysis.comments}
                  </Button>
                  <span className="text-sm text-muted-foreground">{analysis.views} views</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={isBookmarked ? "text-primary" : ""}
                    onClick={() => setIsBookmarked(!isBookmarked)}
                  >
                    <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Key Points */}
          <Card>
            <CardHeader>
              <CardTitle>Key Takeaways</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {analysis.keyPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm">{point}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Related Stocks */}
          <Card>
            <CardHeader>
              <CardTitle>Related Stocks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {analysis.relatedStocks.map((stock, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="font-bold">
                        {stock.symbol}
                      </Badge>
                      <div>
                        <p className="font-semibold">${stock.price}</p>
                        <div
                          className={`text-sm flex items-center gap-1 ${stock.change >= 0 ? "text-primary" : "text-destructive"}`}
                        >
                          {stock.change >= 0 ? (
                            <TrendingUp className="w-3 h-3" />
                          ) : (
                            <TrendingDown className="w-3 h-3" />
                          )}
                          {stock.change >= 0 ? "+" : ""}
                          {stock.change}%
                        </div>
                      </div>
                    </div>
                    <Badge
                      variant={
                        stock.recommendation === "Strong Buy"
                          ? "default"
                          : stock.recommendation === "Buy"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {stock.recommendation}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Article Content */}
          <Card>
            <CardContent className="p-6">
              <div className="prose prose-sm max-w-none">
                {analysis.content.split("\n").map((paragraph, i) => {
                  if (paragraph.startsWith("## ")) {
                    return (
                      <h2 key={i} className="text-xl font-bold mt-6 mb-3">
                        {paragraph.replace("## ", "")}
                      </h2>
                    )
                  } else if (paragraph.startsWith("### ")) {
                    return (
                      <h3 key={i} className="text-lg font-semibold mt-4 mb-2">
                        {paragraph.replace("### ", "")}
                      </h3>
                    )
                  } else if (paragraph.startsWith("- ")) {
                    return (
                      <li key={i} className="ml-4">
                        {paragraph.replace("- ", "")}
                      </li>
                    )
                  } else if (paragraph.trim()) {
                    return (
                      <p key={i} className="mb-4 leading-relaxed">
                        {paragraph}
                      </p>
                    )
                  }
                  return null
                })}
              </div>
            </CardContent>
          </Card>

          {/* Comment Form */}
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                <h3 className="font-semibold">Share your thoughts</h3>
                <Textarea
                  placeholder="What do you think about this analysis?"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={3}
                />
                <div className="flex justify-end">
                  <Button onClick={handleComment} disabled={!newComment.trim()}>
                    Post Comment
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comments */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{comments.length} Comments</h3>

            {comments.map((comment) => (
              <Card key={comment.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Avatar>
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
                        <p className="font-semibold">{comment.author}</p>
                        <span className="text-sm text-muted-foreground">{comment.time}</span>
                      </div>
                      <p className="text-sm leading-relaxed">{comment.content}</p>
                      <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" className="gap-1">
                          <ThumbsUp className="w-3 h-3" />
                          {comment.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-xs">
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
