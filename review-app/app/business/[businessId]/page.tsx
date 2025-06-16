import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import {
  Star,
  BarChart3,
  MessageSquare,
  User,
  Settings,
  Calendar,
  ThumbsUp,
  ThumbsDown,
  Mic,
  Filter,
  Search,
  MoreHorizontal,
  Building2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const metadata: Metadata = {
  title: "Business Dashboard | ReviewPulse",
  description: "Manage your business reviews and analytics",
}

// Mock data for the dashboard
const businessData = {
  name: "Cafe Deluxe",
  description: "A cozy cafe serving specialty coffee and pastries",
  location: "123 Main St, New York, NY",
  category: "Restaurant",
  joinDate: "Jan 2023",
  subscription: "Professional",
  totalReviews: 124,
  averageRating: 4.7,
}

const analyticsData = {
  ratingDistribution: [
    { rating: 5, count: 78 },
    { rating: 4, count: 32 },
    { rating: 3, count: 10 },
    { rating: 2, count: 3 },
    { rating: 1, count: 1 },
  ],
  recentTrend: [
    { month: "Jan", rating: 4.5 },
    { month: "Feb", rating: 4.6 },
    { month: "Mar", rating: 4.7 },
    { month: "Apr", rating: 4.8 },
    { month: "May", rating: 4.7 },
    { month: "Jun", rating: 4.9 },
  ],
  sentiment: {
    positive: 85,
    neutral: 12,
    negative: 3,
  },
}

const reviews = [
  {
    id: 1,
    customer: {
      name: "John Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      isAnonymous: false,
    },
    rating: 5,
    date: "2023-06-15",
    content:
      "Amazing coffee and atmosphere! The staff was incredibly friendly and attentive. Will definitely be coming back regularly.",
    mediaType: "text",
    helpful: 12,
    unhelpful: 1,
  },
  {
    id: 2,
    customer: {
      name: "Anonymous",
      avatar: null,
      isAnonymous: true,
    },
    rating: 4,
    date: "2023-06-10",
    content: "Good food but a bit pricey. The ambiance is nice though.",
    mediaType: "text",
    helpful: 8,
    unhelpful: 2,
  },
  {
    id: 3,
    customer: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      isAnonymous: false,
    },
    rating: 5,
    date: "2023-06-05",
    content: "I took this picture of my latte art. It was beautiful and delicious!",
    mediaType: "image",
    mediaUrl: "/placeholder.svg?height=200&width=300",
    helpful: 15,
    unhelpful: 0,
  },
  {
    id: 4,
    customer: {
      name: "Michael Brown",
      avatar: "/placeholder.svg?height=40&width=40",
      isAnonymous: false,
    },
    rating: 3,
    date: "2023-05-28",
    content: "Recorded my thoughts about the new menu items.",
    mediaType: "audio",
    mediaUrl: "#",
    helpful: 5,
    unhelpful: 1,
  },
  {
    id: 5,
    customer: {
      name: "Anonymous",
      avatar: null,
      isAnonymous: true,
    },
    rating: 2,
    date: "2023-05-20",
    content: "Service was slow today. Had to wait 20 minutes for my order.",
    mediaType: "text",
    helpful: 3,
    unhelpful: 7,
  },
]

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="hidden w-64 flex-col border-r bg-background md:flex">
        <div className="flex h-16 items-center border-b px-6">
          <div className="flex items-center gap-2">
            <Star className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">ReviewPulse</span>
          </div>
        </div>
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
              <div className="font-medium">{businessData.name}</div>
              <div className="text-xs text-muted-foreground">{businessData.subscription} Plan</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
          <div className="flex flex-1 items-center gap-4 md:hidden">
            <Star className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">ReviewPulse</span>
          </div>
          <div className="flex flex-1 items-center justify-end gap-4">
            <Button variant="outline" size="sm" className="hidden md:flex">
              <Calendar className="mr-2 h-4 w-4" />
              Last 30 Days
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                    <AvatarFallback>CD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back! Heres an overview of your business reviews and analytics.
              </p>
            </div>

            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="profile">Profile</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{businessData.totalReviews}</div>
                      <p className="text-xs text-muted-foreground">+12% from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                      <Star className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center">
                        <div className="text-2xl font-bold">{businessData.averageRating}</div>
                        <div className="ml-2 flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(businessData.averageRating)
                                  ? "fill-primary text-primary"
                                  : "text-muted-foreground"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">+0.2 from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Positive Sentiment</CardTitle>
                      <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{analyticsData.sentiment.positive}%</div>
                      <p className="text-xs text-muted-foreground">+5% from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">92%</div>
                      <p className="text-xs text-muted-foreground">+2% from last month</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="lg:col-span-4">
                    <CardHeader>
                      <CardTitle>Review Trend</CardTitle>
                      <CardDescription>Average rating over the last 6 months</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[200px] w-full">
                        {/* This would be a chart in a real implementation */}
                        <div className="flex h-full items-end gap-2">
                          {analyticsData.recentTrend.map((month, i) => (
                            <div key={i} className="relative flex flex-1 flex-col items-center">
                              <div
                                className="w-full bg-primary"
                                style={{ height: `${(month.rating / 5) * 100}%` }}
                              ></div>
                              <span className="mt-2 text-xs">{month.month}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="lg:col-span-3">
                    <CardHeader>
                      <CardTitle>Rating Distribution</CardTitle>
                      <CardDescription>Breakdown of ratings by star count</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {analyticsData.ratingDistribution.map((item) => (
                          <div key={item.rating} className="flex items-center">
                            <div className="w-12 text-sm">{item.rating} stars</div>
                            <div className="flex-1">
                              <div className="h-2 w-full rounded-full bg-muted">
                                <div
                                  className="h-2 rounded-full bg-primary"
                                  style={{
                                    width: `${(item.count / businessData.totalReviews) * 100}%`,
                                  }}
                                ></div>
                              </div>
                            </div>
                            <div className="w-12 text-right text-sm">{item.count}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Reviews</CardTitle>
                    <CardDescription>Your most recent customer feedback</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {reviews.slice(0, 3).map((review) => (
                        <div key={review.id} className="flex items-start space-x-4">
                          <Avatar>
                            {review.customer.avatar ? (
                              <AvatarImage src={review.customer.avatar || "/placeholder.svg"} alt="Avatar" />
                            ) : (
                              <AvatarFallback>
                                {review.customer.isAnonymous ? "AN" : review.customer.name.charAt(0)}
                              </AvatarFallback>
                            )}
                          </Avatar>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center">
                              <p className="font-medium">{review.customer.name}</p>
                              {review.customer.isAnonymous && (
                                <Badge variant="outline" className="ml-2">
                                  Anonymous
                                </Badge>
                              )}
                              <div className="ml-auto flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < review.rating ? "fill-primary text-primary" : "text-muted-foreground"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {new Date(review.date).toLocaleDateString()}
                            </p>
                            <p className="text-sm">{review.content}</p>
                            {review.mediaType === "image" && review.mediaUrl && (
                              <div className="mt-2">
                                <Image
                                  src={review.mediaUrl || "/placeholder.svg"}
                                  alt="Review image"
                                  width={200}
                                  height={150}
                                  className="rounded-md"
                                />
                              </div>
                            )}
                            {review.mediaType === "audio" && review.mediaUrl && (
                              <div className="mt-2 flex items-center rounded-md bg-muted p-2">
                                <Mic className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">Audio review</span>
                                <Button variant="ghost" size="sm" className="ml-auto h-8 w-8 p-0">
                                  <span className="sr-only">Play</span>
                                  {/* Play icon would go here */}
                                </Button>
                              </div>
                            )}
                            <div className="flex items-center pt-2">
                              <Button variant="ghost" size="sm" className="h-8 gap-1 px-2">
                                <ThumbsUp className="h-4 w-4" />
                                <span>{review.helpful}</span>
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 gap-1 px-2">
                                <ThumbsDown className="h-4 w-4" />
                                <span>{review.unhelpful}</span>
                              </Button>
                              <Button variant="ghost" size="sm" className="ml-auto h-8 px-2">
                                Reply
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 text-center">
                      <Button variant="outline" size="sm">
                        View All Reviews
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Reviews Tab */}
              <TabsContent value="reviews" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>All Reviews</CardTitle>
                    <CardDescription>Manage and respond to customer feedback</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                      <div className="flex items-center space-x-2">
                        <div className="relative">
                          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input type="search" placeholder="Search reviews..." className="pl-8 md:w-[300px]" />
                        </div>
                        <Button variant="outline" size="sm">
                          <Filter className="mr-2 h-4 w-4" />
                          Filter
                        </Button>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Select defaultValue="newest">
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Sort by" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="newest">Newest first</SelectItem>
                            <SelectItem value="oldest">Oldest first</SelectItem>
                            <SelectItem value="highest">Highest rated</SelectItem>
                            <SelectItem value="lowest">Lowest rated</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="mt-6 space-y-6">
                      {reviews.map((review) => (
                        <div key={review.id} className="border-b pb-6 last:border-0">
                          <div className="flex items-start space-x-4">
                            <Avatar>
                              {review.customer.avatar ? (
                                <AvatarImage src={review.customer.avatar || "/placeholder.svg"} alt="Avatar" />
                              ) : (
                                <AvatarFallback>
                                  {review.customer.isAnonymous ? "AN" : review.customer.name.charAt(0)}
                                </AvatarFallback>
                              )}
                            </Avatar>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center">
                                <p className="font-medium">{review.customer.name}</p>
                                {review.customer.isAnonymous && (
                                  <Badge variant="outline" className="ml-2">
                                    Anonymous
                                  </Badge>
                                )}
                                <div className="ml-auto flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < review.rating ? "fill-primary text-primary" : "text-muted-foreground"
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {new Date(review.date).toLocaleDateString()}
                              </p>
                              <p className="text-sm">{review.content}</p>
                              {review.mediaType === "image" && review.mediaUrl && (
                                <div className="mt-2">
                                  <Image
                                    src={review.mediaUrl || "/placeholder.svg"}
                                    alt="Review image"
                                    width={200}
                                    height={150}
                                    className="rounded-md"
                                  />
                                </div>
                              )}
                              {review.mediaType === "audio" && review.mediaUrl && (
                                <div className="mt-2 flex items-center rounded-md bg-muted p-2">
                                  <Mic className="mr-2 h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm">Audio review</span>
                                  <Button variant="ghost" size="sm" className="ml-auto h-8 w-8 p-0">
                                    <span className="sr-only">Play</span>
                                    {/* Play icon would go here */}
                                  </Button>
                                </div>
                              )}
                              <div className="flex items-center pt-2">
                                <Button variant="ghost" size="sm" className="h-8 gap-1 px-2">
                                  <ThumbsUp className="h-4 w-4" />
                                  <span>{review.helpful}</span>
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 gap-1 px-2">
                                  <ThumbsDown className="h-4 w-4" />
                                  <span>{review.unhelpful}</span>
                                </Button>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="ml-auto h-8 px-2">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>Reply</DropdownMenuItem>
                                    <DropdownMenuItem>Mark as featured</DropdownMenuItem>
                                    <DropdownMenuItem>Report</DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 flex items-center justify-center space-x-2">
                      <Button variant="outline" size="sm">
                        Previous
                      </Button>
                      <Button variant="outline" size="sm" className="px-4">
                        1
                      </Button>
                      <Button variant="outline" size="sm" className="px-4">
                        2
                      </Button>
                      <Button variant="outline" size="sm" className="px-4">
                        3
                      </Button>
                      <Button variant="outline" size="sm">
                        Next
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Profile Tab */}
              <TabsContent value="profile" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Business Profile</CardTitle>
                    <CardDescription>View and update your business information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-6 sm:space-y-0">
                      <div className="flex h-24 w-24 items-center justify-center rounded-md border">
                        <Building2 className="h-12 w-12 text-muted-foreground" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-xl font-bold">{businessData.name}</h3>
                        <p className="text-sm text-muted-foreground">{businessData.category}</p>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(businessData.averageRating)
                                  ? "fill-primary text-primary"
                                  : "text-muted-foreground"
                              }`}
                            />
                          ))}
                          <span className="ml-2 text-sm font-medium">{businessData.averageRating}</span>
                          <span className="text-sm text-muted-foreground">({businessData.totalReviews} reviews)</span>
                        </div>
                      </div>
                      <div className="ml-auto">
                        <Button variant="outline" size="sm">
                          Edit Profile
                        </Button>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Business Name</p>
                        <p className="text-sm text-muted-foreground">{businessData.name}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Category</p>
                        <p className="text-sm text-muted-foreground">{businessData.category}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Location</p>
                        <p className="text-sm text-muted-foreground">{businessData.location}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Joined</p>
                        <p className="text-sm text-muted-foreground">{businessData.joinDate}</p>
                      </div>
                      <div className="space-y-1 md:col-span-2">
                        <p className="text-sm font-medium">Description</p>
                        <p className="text-sm text-muted-foreground">{businessData.description}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium">Subscription Plan</p>
                      <div className="rounded-md border p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{businessData.subscription}</p>
                            <p className="text-sm text-muted-foreground">$79/month - Up to 50 businesses</p>
                          </div>
                          <Button variant="outline" size="sm">
                            Upgrade
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium">QR Code</p>
                      <div className="flex items-center justify-center rounded-md border p-6">
                        <div className="h-40 w-40 bg-muted"></div>
                      </div>
                      <div className="flex justify-center space-x-2">
                        <Button variant="outline" size="sm">
                          Download QR Code
                        </Button>
                        <Button variant="outline" size="sm">
                          Print QR Code
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
