"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, X, Upload } from "lucide-react"

export default function CreateAnalysisPage() {
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    content: "",
    type: "",
    readTime: "",
  })
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [relatedStocks, setRelatedStocks] = useState<string[]>([])
  const [newStock, setNewStock] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log("[v0] Creating analysis:", { ...formData, tags, relatedStocks })
    setIsLoading(false)

    // Redirect to analysis
    window.location.href = "/"
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const addStock = () => {
    if (newStock.trim() && !relatedStocks.includes(newStock.trim().toUpperCase())) {
      setRelatedStocks([...relatedStocks, newStock.trim().toUpperCase()])
      setNewStock("")
    }
  }

  const removeStock = (stockToRemove: string) => {
    setRelatedStocks(relatedStocks.filter((stock) => stock !== stockToRemove))
  }

  const handleKeyPress = (e: React.KeyboardEvent, type: "tag" | "stock") => {
    if (e.key === "Enter") {
      e.preventDefault()
      if (type === "tag") addTag()
      else addStock()
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
            <h1 className="text-xl font-bold">Create Market Analysis</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>Create Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Analysis Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Q4 2024 Tech Sector Outlook"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Analysis Type</Label>
                  <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sector-analysis">Sector Analysis</SelectItem>
                      <SelectItem value="macro-analysis">Macro Analysis</SelectItem>
                      <SelectItem value="stock-analysis">Stock Analysis</SelectItem>
                      <SelectItem value="crypto-analysis">Crypto Analysis</SelectItem>
                      <SelectItem value="thematic-analysis">Thematic Analysis</SelectItem>
                      <SelectItem value="earnings-analysis">Earnings Analysis</SelectItem>
                      <SelectItem value="technical-analysis">Technical Analysis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="summary">Executive Summary</Label>
                <Textarea
                  id="summary"
                  placeholder="Brief summary of your analysis and key conclusions..."
                  value={formData.summary}
                  onChange={(e) => handleInputChange("summary", e.target.value)}
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Full Analysis</Label>
                <Textarea
                  id="content"
                  placeholder="Write your detailed market analysis here. Use ## for headings and ### for subheadings..."
                  value={formData.content}
                  onChange={(e) => handleInputChange("content", e.target.value)}
                  rows={12}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Tip: Use ## for main headings, ### for subheadings, and - for bullet points
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <Label>Tags</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {tags.map((tag, i) => (
                      <Badge key={i} variant="secondary" className="gap-1">
                        {tag}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-auto p-0 w-4 h-4"
                          onClick={() => removeTag(tag)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add tags (e.g., Tech, AI, Earnings)"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => handleKeyPress(e, "tag")}
                    />
                    <Button type="button" variant="outline" onClick={addTag}>
                      Add
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Related Stocks</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {relatedStocks.map((stock, i) => (
                      <Badge key={i} variant="outline" className="gap-1">
                        {stock}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-auto p-0 w-4 h-4"
                          onClick={() => removeStock(stock)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add stock symbols (e.g., AAPL, MSFT)"
                      value={newStock}
                      onChange={(e) => setNewStock(e.target.value)}
                      onKeyPress={(e) => handleKeyPress(e, "stock")}
                    />
                    <Button type="button" variant="outline" onClick={addStock}>
                      Add
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="readTime">Estimated Read Time</Label>
                <Select value={formData.readTime} onValueChange={(value) => handleInputChange("readTime", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select read time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2-3 min read">2-3 min read</SelectItem>
                    <SelectItem value="4-5 min read">4-5 min read</SelectItem>
                    <SelectItem value="6-8 min read">6-8 min read</SelectItem>
                    <SelectItem value="10-12 min read">10-12 min read</SelectItem>
                    <SelectItem value="15+ min read">15+ min read</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Supporting Charts/Images</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Click to upload charts or images</p>
                  <p className="text-xs text-muted-foreground">PNG, JPG up to 5MB each</p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t">
                <Button type="button" variant="outline" onClick={() => window.history.back()}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading || !formData.title || !formData.content}>
                  {isLoading ? "Publishing Analysis..." : "Publish Analysis"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
