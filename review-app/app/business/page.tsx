"use client"

import {
  Plus,
  Building2,
  Star,
  QrCode,
  MessageSquare,
  // TrendingUp,
  Settings,
  User,
  // Calendar,
  BarChart3,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"



const renderStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      className={`h-4 w-4 ${
        i < Math.floor(rating)
          ? "fill-yellow-400 text-yellow-400"
          : i < rating
          ? "fill-yellow-400/50 text-yellow-400"
          : "text-gray-300"
      }`}
    />
  ))
}

export default function ReviewDashboard() {


  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="flex h-16 items-center px-4 md:px-6">
          <div className="flex items-center space-x-4">
            <QrCode className="h-6 w-6" />
            <h1 className="text-xl font-semibold">ReviewQR Dashboard</h1>
          </div>
          <div className="ml-auto">
            <Link href="/business/business-profile-registration">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Business
            </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Sidebar + Content Layout */}
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden w-64 flex-col border-r bg-background md:flex">
          
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              <Link href="/dashboard" className="flex items-center gap-3 rounded-lg bg-primary/10 px-3 py-2 text-primary">
                <BarChart3 className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href="/dashboard/reviews"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <MessageSquare className="h-4 w-4" />
                Reviews
              </Link>
              <Link
                href="/dashboard/profile"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <User className="h-4 w-4" />
                Profile
              </Link>
              <Link
                href="/dashboard/settings"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <Settings className="h-4 w-4" />
                Settings
              </Link>
            </nav>
          </div>
          <div className="border-t p-4">
            <div className="flex items-center gap-3 rounded-lg px-3 py-2">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                <AvatarFallback>CD</AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <div className="font-medium">John Doe</div>
                <div className="text-xs text-muted-foreground">Basic Plan</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 px-4 py-8 md:px-6">
          {/* Overview Stats */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Businesses</CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">+2 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">+47 from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <div className="flex items-center space-x-1">{renderStars(0)}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">QR Code Scans</CardTitle>
                <QrCode className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">+0 from yesterday</p>
              </CardContent>
            </Card>
          </div>

          {/* Businesses Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Your Businesses</h2>
                <p className="text-muted-foreground">Manage QR codes and monitor customer reviews</p>
              </div>
            </div>

            {/* Business Cards Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* {businesses.map((business) => (
                <Link key={business.id} href={`/dashboard/business/${business.id}`}>
                  <Card className="cursor-pointer transition-all hover:shadow-md hover:scale-[1.02]">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{business.name}</CardTitle>
                        <Badge
                          variant={business.status === "active" ? "default" : "secondary"}
                          className={business.status === "active" ? "bg-green-100 text-green-800" : ""}
                        >
                          {business.status}
                        </Badge>
                      </div>
                      <CardDescription>{business.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                     
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center space-x-1">{renderStars(business.averageRating)}</div>
                            <span className="text-sm font-medium">{business.averageRating}</span>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">{business.totalReviews} reviews</p>
                          </div>
                        </div>

                     
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Recent Reviews</p>
                            <p className="text-lg font-semibold text-blue-600">+{business.recentReviews}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">QR Scans</p>
                            <p className="text-lg font-semibold text-green-600">{business.qrScans}</p>
                          </div>
                        </div>

                       
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <TrendingUp className="h-4 w-4 text-green-600" />
                            <span className="text-sm font-medium text-green-600">{business.monthlyGrowth}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>{business.lastReview}</span>
                          </div>
                        </div>

                       
                        <div>
                          <Badge variant="outline" className="text-xs">
                            {business.category}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))} */}

              {/* Add New Business Card */}
              <Link href="/business/business-profile-registration">
              
              <Card className="cursor-pointer border-dashed border-2 transition-all hover:border-primary hover:bg-muted/50">
                <CardContent className="flex flex-col items-center justify-center h-full min-h-[320px] space-y-4">
                  <div className="rounded-full bg-muted p-4">
                    <Plus className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div className="text-center space-y-2">
                    <h3 className="font-semibold">Add New Business</h3>
                    <p className="text-sm text-muted-foreground">
                      Register a new business and generate QR codes for customer reviews
                    </p>
                  </div>
                </CardContent>
              </Card>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
