"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { signup, firebaseError } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (firebaseError) {
      setError(firebaseError)
    }
  }, [firebaseError])

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await signup(email, password, displayName)
      console.log("[v0] Signup successful, redirecting to dashboard")
      router.push("/dashboard")
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Signup failed"
      setError(errorMessage)
      console.error("[v0] Signup error:", errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#0a0a0a] p-4 relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#ff6b35] rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#d63e2f] rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#ff6b35] rounded-full mix-blend-screen filter blur-3xl opacity-5 animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,107,53,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,107,53,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo and Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative group">
              {/* Logo container with glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#ff6b35] to-[#d63e2f] rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              <div className="">
                <Image
                  src="/logo.svg"
                  alt="TekGridAI Logo"
                  width={320}
                  height={320}
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
          <p className="text-gray-400 text-lg font-serif tracking-wide">Join the AI Revolution</p>
        </div>

        {/* Signup Card */}
        <div className="bg-[#111111]/80 border border-[#222222] rounded-2xl p-8 card-glow backdrop-blur-xl shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2 font-serif">Create Account</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#ff6b35] to-[#d63e2f] mx-auto rounded-full"></div>
          </div>

          <form onSubmit={handleSignup} className="space-y-5">
            {error && (
              <div className="bg-red-950/20 border border-red-900/30 text-red-200 px-4 py-3 rounded-lg text-sm font-serif backdrop-blur-sm animate-shake">
                {error}
                {error.includes("already registered") && (
                  <div className="mt-2 text-xs text-red-300">
                    <Link href="/login" className="hover:text-[#ff6b35] transition-colors underline inline-flex items-center gap-1">
                      Go to Sign In
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                  </div>
                )}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 font-serif flex items-center gap-2">
                <svg className="w-4 h-4 text-[#ff6b35]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Full Name
              </label>
              <Input
                type="text"
                placeholder="Your name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
                className="bg-[#0a0a0a] border-[#222222] text-white placeholder:text-gray-600 focus:border-[#ff6b35] focus:ring-[#ff6b35] transition-all rounded-lg font-serif h-12 hover:border-[#333333]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 font-serif flex items-center gap-2">
                <svg className="w-4 h-4 text-[#ff6b35]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
                Email Address
              </label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-[#0a0a0a] border-[#222222] text-white placeholder:text-gray-600 focus:border-[#ff6b35] focus:ring-[#ff6b35] transition-all rounded-lg font-serif h-12 hover:border-[#333333]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 font-serif flex items-center gap-2">
                <svg className="w-4 h-4 text-[#ff6b35]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Password
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-[#0a0a0a] border-[#222222] text-white placeholder:text-gray-600 focus:border-[#ff6b35] focus:ring-[#ff6b35] transition-all rounded-lg font-serif h-12 hover:border-[#333333]"
              />
              <p className="text-xs text-gray-500 font-serif flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Minimum 6 characters required
              </p>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#ff6b35] to-[#d63e2f] hover:from-[#ff5721] hover:to-[#c53428] text-white font-semibold py-3 rounded-lg button-glow font-serif text-lg shadow-lg hover:shadow-[#ff6b35]/50 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] h-12"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  Create Account
                </span>
              )}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-[#222222]">
            <p className="text-center text-sm text-gray-400 font-serif">
              Already have an account?{" "}
              <Link 
                href="/login" 
                className="text-[#ff6b35] hover:text-[#ff5721] font-semibold transition-colors inline-flex items-center gap-1 group"
              >
                Sign In
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </p>
          </div>
        </div>

        {/* Footer text */}
        <p className="text-center text-xs text-gray-500 mt-6 font-serif">
          Secure registration • AI-powered analytics
        </p>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </div>
  )
}