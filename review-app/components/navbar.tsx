'use client'
import React from 'react'
import Link from 'next/link'
import {Star} from 'lucide-react'
import {Button} from '@/components/ui/button'
import { createClient } from '@/lib/client'
import {toast } from "sonner"


export const Navbar = () => {

 const handleSignOut = async () => {
    const supabase = createClient()
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error("Error signing out:", error.message)
    } else {
        toast.success("You have been signed out successfully")
      window.location.href = "/auth/login"
    }
  }

  return (
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
            <Button asChild>
              <Link href="/business/">Business Dashboard</Link>
            </Button>
            <Button onClick={handleSignOut} className="text-sm font-medium hover:text-primary">
              Logout
            </Button>
          </div>
        </div>
      </header>
  )
}
