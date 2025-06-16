import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { Star, QrCode, BarChart3, Building2, Users, ArrowRight, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "ReviewPulse | Admin Dashboard",
  description: "Manage your business review platform",
}

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Star className="h-6 w-6 text-primary"/>
            <span className="text-xl font-bold">ReviewPulse</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:text-primary">
              How It Works
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-primary">
              Pricing
            </Link>
            <Link href="/businesses" className="text-sm font-medium hover:text-primary">
              Businesses
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/auth/login" className="text-sm font-medium hover:text-primary">
              Login
            </Link>
            <Button asChild>
              <Link href="/business/business-profile-registration">Register Business</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Manage Your Business Reviews Platform
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Connect businesses with their customers through our powerful review platform. Generate QR codes,
                    collect feedback, and grow your network.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                    <Link href="/auth/sign-up">Register Business</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="/businesses">View Businesses</Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/images/qrcode.jpg"
                  width={550}
                  height={550}
                  alt="Dashboard Preview"
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:gap-12">
              <div className="flex flex-col items-center justify-center space-y-2 border-r border-gray-200 pr-4 last:border-r-0 last:pr-0">
                <div className="text-3xl font-bold md:text-4xl">500+</div>
                <div className="text-center text-sm font-medium text-muted-foreground">Businesses</div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 border-r border-gray-200 pr-4 last:border-r-0 last:pr-0">
                <div className="text-3xl font-bold md:text-4xl">50k+</div>
                <div className="text-center text-sm font-medium text-muted-foreground">Reviews</div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 border-r border-gray-200 pr-4 last:border-r-0 last:pr-0">
                <div className="text-3xl font-bold md:text-4xl">98%</div>
                <div className="text-center text-sm font-medium text-muted-foreground">Satisfaction</div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="text-3xl font-bold md:text-4xl">24/7</div>
                <div className="text-center text-sm font-medium text-muted-foreground">Support</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Features</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Everything You Need to Manage Reviews
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Our platform provides all the tools you need to connect businesses with their customers and manage
                  reviews effectively.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-12 mt-8">
              <Card className="border-none shadow-md">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <QrCode className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">QR Code Generation</h3>
                  <p className="text-muted-foreground">
                    Create custom QR codes for businesses to collect customer reviews easily.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="rounded-full bg-secondary/10 p-3">
                    <BarChart3 className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="text-xl font-bold">Analytics Dashboard</h3>
                  <p className="text-muted-foreground">
                    Comprehensive analytics to track review performance and customer sentiment.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="rounded-full bg-accent/10 p-3">
                    <Building2 className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold">Business Management</h3>
                  <p className="text-muted-foreground">Easily register and manage all businesses in your platform.</p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Customer Feedback</h3>
                  <p className="text-muted-foreground">
                    Collect and manage customer feedback for all registered businesses.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="rounded-full bg-secondary/10 p-3">
                    <Star className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="text-xl font-bold">Rating System</h3>
                  <p className="text-muted-foreground">Customizable rating system to match your business needs.</p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="rounded-full bg-accent/10 p-3">
                    <ArrowRight className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold">Integration</h3>
                  <p className="text-muted-foreground">Seamlessly integrate with other business tools and platforms.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">How It Works</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Simple Process, Powerful Results</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Our platform makes it easy to connect businesses with their customers and collect valuable feedback.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 mt-12">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                  1
                </div>
                <h3 className="text-xl font-bold">Register Businesses</h3>
                <p className="text-muted-foreground">
                  Add businesses to your platform with their details and subscription plans.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-lg font-bold text-secondary-foreground">
                  2
                </div>
                <h3 className="text-xl font-bold">Generate QR Codes</h3>
                <p className="text-muted-foreground">
                  Create unique QR codes for each business to collect customer reviews.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-lg font-bold text-accent-foreground">
                  3
                </div>
                <h3 className="text-xl font-bold">Collect & Analyze</h3>
                <p className="text-muted-foreground">
                  Customers scan QR codes to leave reviews, and businesses gain valuable insights.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Pricing</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Simple, Transparent Pricing</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Choose the right plan for your business needs.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8 mt-8">
              <Card className="border-none shadow-md">
                <CardContent className="p-6">
                  <div className="flex flex-col space-y-2 text-center">
                    <h3 className="text-xl font-bold">Starter</h3>
                    <div className="text-4xl font-bold">$29</div>
                    <p className="text-sm text-muted-foreground">per month</p>
                  </div>
                  <div className="mt-6 space-y-4">
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <CheckCircle2 className="mr-2 h-4 w-4 text-accent" />
                        <span>Up to 10 businesses</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle2 className="mr-2 h-4 w-4 text-accent" />
                        <span>Basic QR code generation</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle2 className="mr-2 h-4 w-4 text-accent" />
                        <span>Standard analytics</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle2 className="mr-2 h-4 w-4 text-accent" />
                        <span>Email support</span>
                      </li>
                    </ul>
                    <Button className="w-full mt-6"> <Link href="/business-profile-registration">Get Started</Link> </Button>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md relative">
                <div className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                  Popular
                </div>
                <CardContent className="p-6">
                  <div className="flex flex-col space-y-2 text-center">
                    <h3 className="text-xl font-bold">Professional</h3>
                    <div className="text-4xl font-bold">$79</div>
                    <p className="text-sm text-muted-foreground">per month</p>
                  </div>
                  <div className="mt-6 space-y-4">
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <CheckCircle2 className="mr-2 h-4 w-4 text-accent" />
                        <span>Up to 50 businesses</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle2 className="mr-2 h-4 w-4 text-accent" />
                        <span>Custom QR codes</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle2 className="mr-2 h-4 w-4 text-accent" />
                        <span>Advanced analytics</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle2 className="mr-2 h-4 w-4 text-accent" />
                        <span>Priority support</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle2 className="mr-2 h-4 w-4 text-accent" />
                        <span>API access</span>
                      </li>
                    </ul>
                    <Button className="w-full mt-6 bg-primary hover:bg-primary/90">Get Started</Button>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md">
                <CardContent className="p-6">
                  <div className="flex flex-col space-y-2 text-center">
                    <h3 className="text-xl font-bold">Enterprise</h3>
                    <div className="text-4xl font-bold">$199</div>
                    <p className="text-sm text-muted-foreground">per month</p>
                  </div>
                  <div className="mt-6 space-y-4">
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <CheckCircle2 className="mr-2 h-4 w-4 text-accent" />
                        <span>Unlimited businesses</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle2 className="mr-2 h-4 w-4 text-accent" />
                        <span>Premium QR codes</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle2 className="mr-2 h-4 w-4 text-accent" />
                        <span>Custom analytics</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle2 className="mr-2 h-4 w-4 text-accent" />
                        <span>24/7 dedicated support</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle2 className="mr-2 h-4 w-4 text-accent" />
                        <span>White labeling</span>
                      </li>
                    </ul>
                    <Button className="w-full mt-6">Contact Sales</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Ready to Get Started?</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Join thousands of businesses already using our platform to collect and manage customer reviews.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                  <Link href="/auth/sign-up">Register Business</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/businesses">View All Businesses</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-background py-6 md:py-12">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Star className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">ReviewPulse</span>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} ReviewPulse. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Terms
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
