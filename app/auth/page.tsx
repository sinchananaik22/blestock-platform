"use client"

import { useState, useEffect } from "react"
import { LoginForm } from "@/components/auth/login-form"
import { SignupForm } from "@/components/auth/signup-form"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)

  useEffect(() => {
    const userData = localStorage.getItem("blustock_user")
    if (userData) {
      window.location.href = "/"
    }
  }, [])

  const handleLogin = (email: string, password: string) => {
    console.log("[v0] Login attempt:", { email, password })
    // Simulate successful login
    const userData = {
      email,
      firstName: "John",
      lastName: "Doe",
      avatar: "/professional-trader-avatar.png",
    }
    localStorage.setItem("blustock_user", JSON.stringify(userData))

    window.location.reload()
  }

  const handleSignup = (data: { email: string; password: string; firstName: string; lastName: string }) => {
    console.log("[v0] Signup attempt:", data)
    // Simulate successful signup
    const userData = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      avatar: "/professional-trader-avatar.png",
    }
    localStorage.setItem("blustock_user", JSON.stringify(userData))

    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {isLogin ? (
          <LoginForm onToggleMode={() => setIsLogin(false)} onLogin={handleLogin} />
        ) : (
          <SignupForm onToggleMode={() => setIsLogin(true)} onSignup={handleSignup} />
        )}
      </div>
    </div>
  )
}
