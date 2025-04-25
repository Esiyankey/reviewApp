import Link from "next/link"
import type { Metadata } from "next"
import { Star, ArrowLeft, Building2, FileText, CreditCard, Calendar } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export const metadata: Metadata = {
  title: "Register Business | ReviewPulse",
  description: "Register your business on ReviewPulse",
}

export default function RegisterBusinessPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Star className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">ReviewPulse</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/#features" className="text-sm font-medium hover:text-primary">
              Features
            </Link>
            <Link href="/#how-it-works" className="text-sm font-medium hover:text-primary">
              How It Works
            </Link>
            <Link href="/#pricing" className="text-sm font-medium hover:text-primary">
              Pricing
            </Link>
            <Link href="/businesses" className="text-sm font-medium hover:text-primary">
              Businesses
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium hover:text-primary">
              Login
            </Link>
            <Button asChild>
              <Link href="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 py-12">
          <div className="flex items-center mb-8 mx-2">
            <Link
              href="/"
              className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Home
            </Link>
          </div>
        <div className="container px-4 md:px-6 max-w-3xl mx-auto">

          <Card className="border shadow-md">
            <CardHeader>
              <CardTitle className="text-2xl">Register Your Business</CardTitle>
              <CardDescription>
                Fill out the form below to register your business on ReviewPulse and start collecting customer reviews.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
               

                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input id="businessName" placeholder="Enter your business name" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Describe your business" className="min-h-[120px]" required />
                </div>

                <div className="space-y-2">
                  <Label>Subscription Plan</Label>
                  <RadioGroup defaultValue="starter">
                    <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
                      <div className="flex items-start space-x-2 rounded-md border p-4 w-full">
                        <RadioGroupItem value="starter" id="starter" />
                        <div className="flex flex-col space-y-1">
                          <Label htmlFor="starter" className="font-medium">
                            Starter
                          </Label>
                          <p className="text-sm text-muted-foreground">$29/month - Up to 10 businesses</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2 rounded-md border p-4 w-full">
                        <RadioGroupItem value="professional" id="professional" />
                        <div className="flex flex-col space-y-1">
                          <Label htmlFor="professional" className="font-medium">
                            Professional
                          </Label>
                          <p className="text-sm text-muted-foreground">$79/month - Up to 50 businesses</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2 rounded-md border p-4 w-full">
                        <RadioGroupItem value="enterprise" id="enterprise" />
                        <div className="flex flex-col space-y-1">
                          <Label htmlFor="enterprise" className="font-medium">
                            Enterprise
                          </Label>
                          <p className="text-sm text-muted-foreground">$199/month - Unlimited businesses</p>
                        </div>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>QR Code</Label>
                  <div className="rounded-md border border-dashed p-8 text-center">
                    <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                        <Building2 className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <h3 className="mt-4 text-lg font-semibold">QR Code Generation</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Your unique QR code will be generated automatically after registration.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="flex items-center space-x-2 rounded-md border p-4">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div className="space-y-0.5">
                      <p className="text-sm font-medium">Business Information</p>
                      <p className="text-xs text-muted-foreground">
                        Your business details will be visible to customers.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border p-4">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                    <div className="space-y-0.5">
                      <p className="text-sm font-medium">Billing Information</p>
                      <p className="text-xs text-muted-foreground">
                        Youll be prompted to enter payment details after registration.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border p-4">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div className="space-y-0.5">
                      <p className="text-sm font-medium">Last Updated</p>
                      <p className="text-xs text-muted-foreground">
                        The updatedAt timestamp will be set automatically.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button className="w-full bg-primary hover:bg-primary/90">Register Business</Button>
              <p className="text-center text-sm text-muted-foreground">
                By registering, you agree to our{" "}
                <Link href="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </CardFooter>
          </Card>
        </div>
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
