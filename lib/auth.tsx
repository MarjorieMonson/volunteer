"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type UserRole = "admin" | "volunteer" | "organization"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  organizationId?: string
  organizationName?: string
  avatar?: string
  createdAt: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (userData: RegisterData) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  loading: boolean
}

interface RegisterData {
  email: string
  password: string
  name: string
  role: UserRole
  organizationName?: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: "1",
    email: "admin@esen.org",
    name: "Admin User",
    role: "admin",
    createdAt: "2024-01-01",
  },
  {
    id: "2",
    email: "volunteer@example.com",
    name: "John Volunteer",
    role: "volunteer",
    createdAt: "2024-01-15",
  },
  {
    id: "3",
    email: "org@greenearthinitiative.org",
    name: "Sarah Johnson",
    role: "organization",
    organizationId: "1",
    organizationName: "Green Earth Initiative",
    createdAt: "2024-01-10",
  },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("esen_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock authentication
    const foundUser = mockUsers.find((u) => u.email === email)

    if (foundUser && password === "password123") {
      setUser(foundUser)
      localStorage.setItem("esen_user", JSON.stringify(foundUser))
      setLoading(false)
      return { success: true }
    }

    setLoading(false)
    return { success: false, error: "Invalid email or password" }
  }

  const register = async (userData: RegisterData) => {
    setLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check if user already exists
    const existingUser = mockUsers.find((u) => u.email === userData.email)
    if (existingUser) {
      setLoading(false)
      return { success: false, error: "User with this email already exists" }
    }

    // Create new user
    const newUser: User = {
      id: (mockUsers.length + 1).toString(),
      email: userData.email,
      name: userData.name,
      role: userData.role,
      organizationName: userData.organizationName,
      createdAt: new Date().toISOString(),
    }

    mockUsers.push(newUser)
    setUser(newUser)
    localStorage.setItem("esen_user", JSON.stringify(newUser))
    setLoading(false)
    return { success: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("esen_user")
  }

  return <AuthContext.Provider value={{ user, login, register, logout, loading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
