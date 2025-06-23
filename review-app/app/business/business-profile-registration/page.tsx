"use client";
import { useState } from "react";
import Link from "next/link";
import { Star, ArrowLeft, FileText, CreditCard, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";






export default function RegisterBusinessPage() {
  const [business_name, setBusiness_name] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async () => {
    if (!business_name || !description) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      
      const res = await fetch("/api/business/business_information", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          business_name: business_name,
          description: description,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Business registered:", data);
        alert("Business registered successfully!");
        router.push("/business/business-profile-registration-continuation");
      } else {
        const errorData = await res
          .json()
          .catch(() => ({ message: "Unknown error" }));
        console.error("Registration failed:", res.status, errorData);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Star className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">ReviewPulse</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/#features"
              className="text-sm font-medium hover:text-primary"
            >
              Features
            </Link>
            <Link
              href="/#how-it-works"
              className="text-sm font-medium hover:text-primary"
            >
              How It Works
            </Link>
            <Link
              href="/#pricing"
              className="text-sm font-medium hover:text-primary"
            >
              Pricing
            </Link>
            <Link
              href="/businesses"
              className="text-sm font-medium hover:text-primary"
            >
              Businesses
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <>
              <Link
                href="/auth/login"
                className="text-sm font-medium hover:text-primary"
              >
                Login
              </Link>
              <Button asChild>
                <Link href="/register">Get Started</Link>
              </Button>
            </>
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
                Fill out the form below to register your business on ReviewPulse
                and start collecting customer reviews.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="business_name">Business Name</Label>
                  <Input
                    id="business_name"
                    placeholder="Enter your business name"
                    required
                    value={business_name}
                    onChange={(e) => setBusiness_name(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your business"
                    className="min-h-[120px]"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="flex items-center space-x-2 rounded-md border p-4">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div className="space-y-0.5">
                      <p className="text-sm font-medium">
                        Business Information
                      </p>
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
                        Youll be prompted to enter payment details after
                        registration.
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
              <span>
                All data filled here will be saved. Make sure you provided the
                right data.
              </span>
              <Button
                className="w-full bg-primary hover:bg-primary/90"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Loading..." : "Continue to Subscription"}
              </Button>
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
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
