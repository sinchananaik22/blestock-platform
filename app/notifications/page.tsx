"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Bell, MessageSquare, Users, Heart } from "lucide-react"

export default function NotificationsPage() {
  const [notifications] = useState([
    {
      id: 1,
      type: "like",
      message: "Sarah Chen liked your trade idea",
      details: "AAPL Long Position",
      time: "2 minutes ago",
      read: false,
      avatar: "/female-trader-avatar.jpg",
    },
    {
      id: 2,
      type: "comment",
      message: "Mike Rodriguez commented on your analysis",
      details: "Q4 Tech Sector Outlook",
      time: "15 minutes ago",
      read: false,
      avatar: "/male-trader-avatar.jpg",
    },
    {
      id: 3,
      type: "follow",
      message: "Alex Thompson started following you",
      details: "",
      time: "1 hour ago",
      read: true,
      avatar: "/trader-avatar.jpg",
    },
    {
      id: 4,
      type: "club",
      message: "New member joined Tech Traders United",
      details: "Jennifer Adams joined your club",
      time: "2 hours ago",
      read: true,
      avatar: "/female-discussion-avatar.jpg",
    },
  ])

  const getIcon = (type: string) => {
    switch (type) {
      case "like":
        return <Heart className="w-4 h-4 text-red-500" />
      case "comment":
        return <MessageSquare className="w-4 h-4 text-blue-500" />
      case "follow":
        return <Users className="w-4 h-4 text-green-500" />
      case "club":
        return <Users className="w-4 h-4 text-purple-500" />
      default:
        return <Bell className="w-4 h-4" />
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
            <h1 className="text-xl font-bold">Notifications</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-2xl">
        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card
              key={notification.id}
              className={`cursor-pointer hover:shadow-md transition-shadow ${!notification.read ? "border-primary/50" : ""}`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={notification.avatar || "/placeholder.svg"} />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {getIcon(notification.type)}
                      <p className="font-medium">{notification.message}</p>
                      {!notification.read && <div className="w-2 h-2 bg-primary rounded-full" />}
                    </div>
                    {notification.details && <p className="text-sm text-muted-foreground">{notification.details}</p>}
                    <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
