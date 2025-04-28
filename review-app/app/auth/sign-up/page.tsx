"use client";
import Link from "next/link";
import { useState } from "react";
// import type { Metadata } from "next";

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
import { Checkbox } from "@/components/ui/checkbox";

//  const metadata: Metadata = {
//   title: "Sign Up",
//   description: "Create a new account",
// };

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("customer"); 

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // prevent page reload
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password,role }),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        // Registration successful
        alert("Account created successfully!");
        // Optionally redirect user or clear form
        setName("");
        setEmail("");
        setPassword("");
        setRole("customer"); // Reset role to default
      } else {
        // Handle errors
        alert(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">
            Create an account
          </CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleRegister}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <div className="flex gap-3">

              <p className="text-sm text-muted-foreground">
                Select your role in the system
              </p>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="customer">Customer</option>
              <option value="business_admin">Business Admin</option>
              <option value="super_admin">Super Admin </option>
            </select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                required
                className="data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground"
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="text-secondary underline-offset-4 hover:underline"
                >
                  terms of service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-secondary underline-offset-4 hover:underline"
                >
                  privacy policy
                </Link>
              </label>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full my-4 bg-accent hover:bg-accent/90 text-accent-foreground"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create account"}
            </Button>

            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link
                href="/auth/sign-in"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Sign in
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
