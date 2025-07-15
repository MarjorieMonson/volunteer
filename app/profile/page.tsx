"use client"

import { useState } from "react"
import { User, Mail, Calendar, Building2, Edit, Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/lib/auth"
import { ProtectedRoute } from "@/components/auth/protected-route"

function ProfileContent() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [editedName, setEditedName] = useState(user?.name || "")

  if (!user) return null

  const handleSave = () => {
    // In a real app, this would update the user profile via API
    console.log("Saving profile changes:", { name: editedName })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedName(user.name)
    setIsEditing(false)
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800"
      case "organization":
        return "bg-blue-100 text-blue-800"
      case "volunteer":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Profile</h1>
          <p className="text-gray-600">Manage your account information and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <Avatar className="h-24 w-24 mx-auto mb-4">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback className="text-2xl">{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">{user.name}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
                <Badge className={`mt-2 ${getRoleBadgeColor(user.role)}`}>
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
                  </div>
                  {user.organizationName && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Building2 className="h-4 w-4 mr-2" />
                      <span>{user.organizationName}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your personal details</CardDescription>
                  </div>
                  {!isEditing ? (
                    <Button variant="outline" onClick={() => setIsEditing(true)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  ) : (
                    <div className="flex space-x-2">
                      <Button size="sm" onClick={handleSave}>
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleCancel}>
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      {isEditing ? (
                        <Input id="name" value={editedName} onChange={(e) => setEditedName(e.target.value)} />
                      ) : (
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-gray-400" />
                          <span>{user.name}</span>
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">{user.email}</span>
                      </div>
                    </div>
                  </div>

                  {user.organizationName && (
                    <div className="space-y-2">
                      <Label>Organization</Label>
                      <div className="flex items-center space-x-2">
                        <Building2 className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">{user.organizationName}</span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Role-specific sections */}
            {user.role === "volunteer" && (
              <Card>
                <CardHeader>
                  <CardTitle>Volunteer Activity</CardTitle>
                  <CardDescription>Your volunteer history and statistics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">5</div>
                      <div className="text-sm text-gray-500">Events Attended</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">24</div>
                      <div className="text-sm text-gray-500">Hours Volunteered</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">3</div>
                      <div className="text-sm text-gray-500">Organizations Helped</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {user.role === "organization" && (
              <Card>
                <CardHeader>
                  <CardTitle>Organization Dashboard</CardTitle>
                  <CardDescription>Quick overview of your organization's activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">8</div>
                      <div className="text-sm text-gray-500">Active Events</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">45</div>
                      <div className="text-sm text-gray-500">Total Volunteers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">12</div>
                      <div className="text-sm text-gray-500">Pending Applications</div>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <Button className="w-full" asChild>
                    <a href="/organization-dashboard">Go to Full Dashboard</a>
                  </Button>
                </CardContent>
              </Card>
            )}

            {user.role === "admin" && (
              <Card>
                <CardHeader>
                  <CardTitle>Admin Overview</CardTitle>
                  <CardDescription>Platform statistics and quick actions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">25</div>
                      <div className="text-sm text-gray-500">Total Events</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">15</div>
                      <div className="text-sm text-gray-500">Organizations</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">500</div>
                      <div className="text-sm text-gray-500">Total Users</div>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <Button className="w-full" asChild>
                    <a href="/admin">Go to Admin Panel</a>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  )
}
