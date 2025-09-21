"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, PieChart, BarChart3, Calendar } from "lucide-react"

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const portfolioData = {
    totalValue: 124580,
    totalReturn: 18.5,
    todayChange: 2.3,
    todayChangeValue: 2847,
    positions: [
      { symbol: "AAPL", shares: 50, avgPrice: 175.5, currentPrice: 185.2, value: 9260, return: 5.5 },
      { symbol: "TSLA", shares: 25, avgPrice: 240.0, currentPrice: 268.5, value: 6712, return: 11.9 },
      { symbol: "NVDA", shares: 15, avgPrice: 450.0, currentPrice: 520.3, value: 7804, return: 15.6 },
      { symbol: "MSFT", shares: 30, avgPrice: 380.0, currentPrice: 395.8, value: 11874, return: 4.2 },
      { symbol: "GOOGL", shares: 20, avgPrice: 140.0, currentPrice: 152.4, value: 3048, return: 8.9 },
    ],
    performance: [
      { period: "1D", return: 2.3 },
      { period: "1W", return: 5.8 },
      { period: "1M", return: 12.5 },
      { period: "3M", return: 18.5 },
      { period: "1Y", return: 24.7 },
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
            <h1 className="text-xl font-bold">Portfolio</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="space-y-6">
          {/* Portfolio Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Total Value</span>
                </div>
                <div className="text-2xl font-bold">${portfolioData.totalValue.toLocaleString()}</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Total Return</span>
                </div>
                <div className="text-2xl font-bold text-primary">+{portfolioData.totalReturn}%</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Today</span>
                </div>
                <div
                  className={`text-2xl font-bold ${portfolioData.todayChange >= 0 ? "text-primary" : "text-destructive"}`}
                >
                  {portfolioData.todayChange >= 0 ? "+" : ""}
                  {portfolioData.todayChange}%
                </div>
                <div className={`text-sm ${portfolioData.todayChange >= 0 ? "text-primary" : "text-destructive"}`}>
                  ${portfolioData.todayChangeValue.toLocaleString()}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <PieChart className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Positions</span>
                </div>
                <div className="text-2xl font-bold">{portfolioData.positions.length}</div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-4">
                {portfolioData.performance.map((perf, i) => (
                  <div key={i} className="text-center p-4 border rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">{perf.period}</div>
                    <div className={`text-lg font-bold ${perf.return >= 0 ? "text-primary" : "text-destructive"}`}>
                      {perf.return >= 0 ? "+" : ""}
                      {perf.return}%
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Holdings */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Holdings</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Current Positions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {portfolioData.positions.map((position, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 cursor-pointer"
                      >
                        <div className="flex items-center gap-4">
                          <Badge variant="outline" className="font-bold">
                            {position.symbol}
                          </Badge>
                          <div>
                            <p className="font-medium">{position.shares} shares</p>
                            <p className="text-sm text-muted-foreground">
                              Avg: ${position.avgPrice} • Current: ${position.currentPrice}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">${position.value.toLocaleString()}</p>
                          <div
                            className={`text-sm flex items-center gap-1 ${position.return >= 0 ? "text-primary" : "text-destructive"}`}
                          >
                            {position.return >= 0 ? (
                              <TrendingUp className="w-3 h-3" />
                            ) : (
                              <TrendingDown className="w-3 h-3" />
                            )}
                            {position.return >= 0 ? "+" : ""}
                            {position.return}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="transactions">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Transaction history coming soon...</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analysis">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Portfolio analysis coming soon...</p>
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
