"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Edit, TrendingUp, Calendar } from "lucide-react"

interface UserData {
  email: string
  firstName: string
  lastName: string
  avatar: string
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserData | null>(null)

  useEffect(() => {
    const userData = localStorage.getItem("blustock_user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  if (!user) {
    return <div>Loading...</div>
  }

  const userStats = {
    totalReturn: "+18.5%",
    tradeIdeas: 23,
    followers: 1247,
    following: 89,
    clubsLeading: 2,
    clubsMember: 6,
  }

  const recentIdeas = [
    { symbol: "AAPL", strategy: "Long Position", return: "+12.5%", likes: 89 },
    { symbol: "TSLA", strategy: "Swing Trade", return: "+24.5%", likes: 67 },
    { symbol: "NVDA", strategy: "Options Play", return: "+18.2%", likes: 45 },
  ]

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-xl font-bold">Profile</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="space-y-6">
          {/* Profile Header */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-2xl">
                    {user.firstName[0]}
                    {user.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold">
                    {user.firstName} {user.lastName}
                  </h2>
                  <p className="text-muted-foreground">{user.email}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <Badge variant="secondary">Pro Trader</Badge>
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Joined Dec 2023
                    </span>
                  </div>
                </div>
                <Button>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">{userStats.totalReturn}</div>
                <p className="text-sm text-muted-foreground">Total Return</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">{userStats.tradeIdeas}</div>
                <p className="text-sm text-muted-foreground">Trade Ideas</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">{userStats.followers}</div>
                <p className="text-sm text-muted-foreground">Followers</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">{userStats.following}</div>
                <p className="text-sm text-muted-foreground">Following</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">{userStats.clubsLeading}</div>
                <p className="text-sm text-muted-foreground">Leading</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">{userStats.clubsMember}</div>
                <p className="text-sm text-muted-foreground">Member</p>
              </CardContent>
            </Card>
          </div>

          {/* Content Tabs */}
          <Tabs defaultValue="ideas" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="ideas">Trade Ideas</TabsTrigger>
              <TabsTrigger value="clubs">Clubs</TabsTrigger>
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
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        <span>{idea.likes} likes</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="clubs">
              <div className="text-center py-8">
                <p className="text-muted-foreground">Club management coming soon...</p>
              </div>
            </TabsContent>

            <TabsContent value="activity">
              <div className="text-center py-8">
                <p className="text-muted-foreground">Activity feed coming soon...</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
