"use client"
import { useState } from "react"
import Link from "next/link"
import type { Metadata } from "next"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your account",
}

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  async function handleSignIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault() // prevent page reload
    setLoading(true);

    try {
      const res = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()
      console.log(data)

      if (res.ok) {
        // Handle successful sign-in (e.g., redirect to dashboard)
        alert("Sign-in successful!")
      } else {
        // Handle errors (e.g., show error message)
        alert(data.message || "Something went wrong")
      }
    } catch (error) {
      console.error(error)
      alert("Something went wrong. Please try again later.")
    } finally {
      setLoading(false)
    }

   
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
          <CardDescription>Enter your email and password to sign in to your account</CardDescription>
        </CardHeader>
        <form onSubmit={handleSignIn}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" value={email} type="email" placeholder="m@example.com" required  onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link
                href="/forgot-password"
                className="text-sm font-medium text-primary underline-offset-4 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <Input id="password" value={password} type="password" required  onChange={(e) => setPassword(e.target.value)}/>
          </div>
        </CardContent>
        </form>
        <CardFooter className="flex flex-col space-y-4">
          <Button className="w-full"> {loading ? 'loading...' : 'sign in'}</Button>
          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/auth/sign-up" className="font-medium text-primary underline-offset-4 hover:underline">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
