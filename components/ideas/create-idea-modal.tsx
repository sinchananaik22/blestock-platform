"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { X } from "lucide-react"

interface CreateIdeaModalProps {
  children: React.ReactNode
}

export function CreateIdeaModal({ children }: CreateIdeaModalProps) {
  const [formData, setFormData] = useState({
    symbol: "",
    strategy: "",
    entry: "",
    target: "",
    stopLoss: "",
    timeframe: "",
    confidence: [75],
    description: "",
    analysis: "",
    club: "",
  })
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log("[v0] Creating trade idea:", { ...formData, tags })
    setIsLoading(false)
    setOpen(false)

    // Reset form
    setFormData({
      symbol: "",
      strategy: "",
      entry: "",
      target: "",
      stopLoss: "",
      timeframe: "",
      confidence: [75],
      description: "",
      analysis: "",
      club: "",
    })
    setTags([])
  }

  const handleInputChange = (field: string, value: string | number[]) => {
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addTag()
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Share Trade Idea</DialogTitle>
          <DialogDescription>
            Share your trading strategy with the community and get feedback from fellow traders.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="symbol">Symbol</Label>
              <Input
                id="symbol"
                placeholder="e.g., AAPL"
                value={formData.symbol}
                onChange={(e) => handleInputChange("symbol", e.target.value.toUpperCase())}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="strategy">Strategy Type</Label>
              <Select value={formData.strategy} onValueChange={(value) => handleInputChange("strategy", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select strategy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="long-position">Long Position</SelectItem>
                  <SelectItem value="short-position">Short Position</SelectItem>
                  <SelectItem value="swing-trade">Swing Trade</SelectItem>
                  <SelectItem value="day-trade">Day Trade</SelectItem>
                  <SelectItem value="options-play">Options Play</SelectItem>
                  <SelectItem value="earnings-play">Earnings Play</SelectItem>
                  <SelectItem value="breakout-trade">Breakout Trade</SelectItem>
                  <SelectItem value="value-play">Value Play</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="entry">Entry Price</Label>
              <Input
                id="entry"
                placeholder="$175.50"
                value={formData.entry}
                onChange={(e) => handleInputChange("entry", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="target">Target Price</Label>
              <Input
                id="target"
                placeholder="$195.00"
                value={formData.target}
                onChange={(e) => handleInputChange("target", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stopLoss">Stop Loss</Label>
              <Input
                id="stopLoss"
                placeholder="$165.00"
                value={formData.stopLoss}
                onChange={(e) => handleInputChange("stopLoss", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="timeframe">Timeframe</Label>
              <Select value={formData.timeframe} onValueChange={(value) => handleInputChange("timeframe", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="intraday">Intraday</SelectItem>
                  <SelectItem value="1-3-days">1-3 days</SelectItem>
                  <SelectItem value="1-2-weeks">1-2 weeks</SelectItem>
                  <SelectItem value="2-4-weeks">2-4 weeks</SelectItem>
                  <SelectItem value="1-3-months">1-3 months</SelectItem>
                  <SelectItem value="3-6-months">3-6 months</SelectItem>
                  <SelectItem value="6-12-months">6-12 months</SelectItem>
                  <SelectItem value="long-term">Long term (1+ years)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="club">Share to Club (Optional)</Label>
              <Select value={formData.club} onValueChange={(value) => handleInputChange("club", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select club" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tech-traders">Tech Traders United</SelectItem>
                  <SelectItem value="crypto-pioneers">Crypto Pioneers</SelectItem>
                  <SelectItem value="options-masters">Options Masters</SelectItem>
                  <SelectItem value="day-trading-elite">Day Trading Elite</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3">
            <Label>Confidence Level: {formData.confidence[0]}%</Label>
            <Slider
              value={formData.confidence}
              onValueChange={(value) => handleInputChange("confidence", value)}
              max={100}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Low Confidence</span>
              <span>High Confidence</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Quick Summary</Label>
            <Textarea
              id="description"
              placeholder="Brief description of your trade thesis..."
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={2}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="analysis">Detailed Analysis</Label>
            <Textarea
              id="analysis"
              placeholder="Share your detailed technical and fundamental analysis..."
              value={formData.analysis}
              onChange={(e) => handleInputChange("analysis", e.target.value)}
              rows={6}
            />
          </div>

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
                placeholder="Add tags (e.g., Technology, Earnings)"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <Button type="button" variant="outline" onClick={addTag}>
                Add
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || !formData.symbol || !formData.description}>
              {isLoading ? "Sharing Idea..." : "Share Idea"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
