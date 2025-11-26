"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import {
  type User,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type UserCredential,
} from "firebase/auth"
import { auth, isFirebaseReady } from "./firebase"

interface AuthContextType {
  user: User | null
  loading: boolean
  signup: (email: string, password: string, displayName: string) => Promise<UserCredential>
  login: (email: string, password: string) => Promise<UserCredential>
  logout: () => Promise<void>
  updateUserProfile: (displayName: string, photoURL?: string) => Promise<void>
  firebaseError: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [firebaseError, setFirebaseError] = useState<string | null>(null)

  useEffect(() => {
    if (!isFirebaseReady()) {
      setFirebaseError("Firebase not configured. Please add NEXT_PUBLIC_FIREBASE_* environment variables.")
      setLoading(false)
      console.warn("[v0] Firebase not ready - environment variables may be missing")
      return
    }

    if (!auth) {
      console.error("[v0] Auth instance not available")
      setLoading(false)
      return
    }

    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        console.log(
          "[v0] Auth state changed:",
          currentUser ? `User logged in: ${currentUser.email}` : "User logged out",
        )
        setUser(currentUser)
        setLoading(false)
      },
      (error) => {
        console.error("[v0] Auth listener error:", error.message)
        setLoading(false)
      },
    )

    return () => unsubscribe()
  }, [])

  const getErrorMessage = (code: string): string => {
    const errorMessages: Record<string, string> = {
      "auth/email-already-in-use": "This email is already registered. Please sign in or use a different email.",
      "auth/weak-password": "Password must be at least 6 characters long.",
      "auth/invalid-email": "Please enter a valid email address.",
      "auth/user-not-found": "No account found with this email. Please sign up first.",
      "auth/wrong-password": "Incorrect password. Please try again.",
      "auth/too-many-requests": "Too many login attempts. Please try again later.",
      "auth/operation-not-allowed": "Sign up is currently disabled. Please try again later.",
      "auth/network-request-failed": "Network error. Please check your connection.",
    }
    return errorMessages[code] || `Error: ${code}`
  }

  const signup = (email: string, password: string, displayName: string) => {
    console.log("[v0] Starting signup for:", email)

    if (!isFirebaseReady() || !auth) {
      const error = "Firebase is not configured. Please add environment variables."
      console.error("[v0]", error)
      return Promise.reject(new Error(error))
    }

    return createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log("[v0] User account created:", result.user.email)
        if (result.user) {
          return updateProfile(result.user, { displayName }).then(() => {
            console.log("[v0] User profile updated:", displayName)
            return result
          })
        }
        return result
      })
      .catch((error) => {
        const userMessage = getErrorMessage(error.code)
        console.error("[v0] Signup error - Code:", error.code, "Message:", error.message)
        throw new Error(userMessage)
      })
  }

  const login = (email: string, password: string) => {
    console.log("[v0] Starting login for:", email)

    if (!isFirebaseReady() || !auth) {
      const error = "Firebase is not configured. Please add environment variables."
      console.error("[v0]", error)
      return Promise.reject(new Error(error))
    }

    return signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log("[v0] User logged in:", result.user.email)
        return result
      })
      .catch((error) => {
        const userMessage = getErrorMessage(error.code)
        console.error("[v0] Login error - Code:", error.code, "Message:", error.message)
        throw new Error(userMessage)
      })
  }

  const logout = () => {
    if (!auth) {
      return Promise.reject(new Error("Authentication not initialized"))
    }

    return signOut(auth)
      .then(() => {
        console.log("[v0] User logged out")
      })
      .catch((error) => {
        console.error("[v0] Logout error:", error.message)
        throw error
      })
  }

  const updateUserProfile = (displayName: string, photoURL?: string) => {
    if (user) {
      return updateProfile(user, { displayName, photoURL }).catch((error) => {
        console.error("[v0] Profile update error:", error.message)
        throw error
      })
    }
    return Promise.resolve()
  }

  const value = {
    user,
    loading,
    signup,
    login,
    logout,
    updateUserProfile,
    firebaseError,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
