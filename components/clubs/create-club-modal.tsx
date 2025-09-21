"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Upload } from "lucide-react"

interface CreateClubModalProps {
  children: React.ReactNode
}

export function CreateClubModal({ children }: CreateClubModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    privacy: "public",
    rules: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log("[v0] Creating club:", formData)
    setIsLoading(false)
    setOpen(false)

    // Reset form
    setFormData({
      name: "",
      description: "",
      category: "",
      privacy: "public",
      rules: "",
    })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Trading Club</DialogTitle>
          <DialogDescription>
            Start your own trading community and share strategies with like-minded traders.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="clubName">Club Name</Label>
              <Input
                id="clubName"
                placeholder="e.g., Tech Traders United"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your club's focus, trading style, and what members can expect..."
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="cryptocurrency">Cryptocurrency</SelectItem>
                  <SelectItem value="value-investing">Value Investing</SelectItem>
                  <SelectItem value="day-trading">Day Trading</SelectItem>
                  <SelectItem value="options">Options Trading</SelectItem>
                  <SelectItem value="forex">Forex</SelectItem>
                  <SelectItem value="commodities">Commodities</SelectItem>
                  <SelectItem value="esg">ESG/Sustainable</SelectItem>
                  <SelectItem value="general">General Trading</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Privacy Settings</Label>
              <RadioGroup
                value={formData.privacy}
                onValueChange={(value) => handleInputChange("privacy", value)}
                className="space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="public" id="public" />
                  <Label htmlFor="public" className="flex-1">
                    <div>
                      <p className="font-medium">Public</p>
                      <p className="text-sm text-muted-foreground">Anyone can find and join your club</p>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="private" id="private" />
                  <Label htmlFor="private" className="flex-1">
                    <div>
                      <p className="font-medium">Private</p>
                      <p className="text-sm text-muted-foreground">Members need approval to join</p>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="invite-only" id="invite-only" />
                  <Label htmlFor="invite-only" className="flex-1">
                    <div>
                      <p className="font-medium">Invite Only</p>
                      <p className="text-sm text-muted-foreground">Only invited members can join</p>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rules">Club Rules & Guidelines</Label>
              <Textarea
                id="rules"
                placeholder="Set clear guidelines for your club members..."
                value={formData.rules}
                onChange={(e) => handleInputChange("rules", e.target.value)}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label>Club Avatar</Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                <p className="text-xs text-muted-foreground">PNG, JPG up to 2MB</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || !formData.name || !formData.description}>
              {isLoading ? "Creating Club..." : "Create Club"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
