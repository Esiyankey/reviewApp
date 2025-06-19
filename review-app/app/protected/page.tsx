'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { LogoutButton } from '@/components/logout-button'
import { createClient } from '@/lib/server'

export default function ProtectedPage() {
  const router = useRouter()
  const [user, setUser] = useState<{ id: string; email: string } | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = await createClient()
      const { data, error } = await supabase.auth.getUser()

      if (error || !data?.user) {
        router.replace('/auth/login')
        return
      }

      setUser({ id: data.user.id ?? '', email: data.user.email ?? '' })

      // Check if user exists in "User" table, insert if not
      const { data: userData } = await supabase
        .from("User")
        .select("id")
        .eq("id", data.user.id)
        .single()

      if (!userData) {
        await supabase.from("User").insert([
          { id: data.user.id, email: data.user.email },
        ])
      }
    }

    fetchUser()
  }, [router])

  if (!user) {
    return null // or a loading spinner
  }

  return (
    <div className="flex h-svh w-full items-center justify-center gap-2">
      <p>
        Hello <span>{user.email}</span>
      </p>
      <LogoutButton />
    </div>
  )
}
