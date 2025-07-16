"use client"

import Link from "next/link"
import { Calendar, Clock, MapPin, Users, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/lib/auth"
import { ProtectedRoute } from "@/components/auth/protected-route"

// Mock data for user's events
const userEvents = {
  registered: [
    {
    id: 1,
    title: "Turtle hatchling release",
    organization: "FIPIE",
    date: "2025-01-20",
    time: "9:00 AM - 2:00 PM",
    location: "San Diego beach",
    status: "Confirmed",
  },
  {
    id: 2,
    title: "CLothes donation",
    organization: "Hope",
    date: "2025-01-25",
    time: "10:00 AM - 4:00 PM",
    location: "ESEN",
    status: "completed",
    hoursVolunteered: 4,
  },
  {
    id: 3,
    title: "Cuscatlan park cleanup",
    organization: "Raices ESEN",
    date: "2025-02-01",
    time: "1:00 PM - 5:00 PM",
    location: "Parque Cuscatlan",
    status: "pending",
  },
  {
    id: 4,
    title: "Become a tutor",
    organization: "Consejo Estudiantil ESEN    ",
    date: "2025-02-05",
    time: "8:00 AM - 12:00 PM",
    location: "Instalaciones ESEN",
    status: "confirmed",
    },
  ],
}

function MyEventsContent() {
  const { user } = useAuth()

  if (!user) return null

  const totalHours = userEvents.completed.reduce((sum, event) => sum + (event.hoursVolunteered || 0), 0)

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">My Events</h1>
          <p className="text-gray-600">Track your volunteer activities and upcoming commitments</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userEvents.registered.length}</div>
              <p className="text-xs text-muted-foreground">Events registered</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Events</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userEvents.completed.length}</div>
              <p className="text-xs text-muted-foreground">Events attended</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hours Volunteered</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalHours}</div>
              <p className="text-xs text-muted-foreground">Total hours</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Organizations</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Organizations helped</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
            <TabsTrigger value="completed">Completed Events</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-6">
            <div className="grid gap-6">
              {userEvents.registered.map((event) => (
                <Card key={event.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{event.title}</CardTitle>
                        <CardDescription>{event.organization}</CardDescription>
                      </div>
                      <Badge variant={event.status === "confirmed" ? "default" : "secondary"}>
                        {event.status === "confirmed" ? (
                          <>
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Confirmed
                          </>
                        ) : (
                          <>
                            <Clock className="h-3 w-3 mr-1" />
                            Pending
                          </>
                        )}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        {new Date(event.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-2" />
                        {event.time}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        {event.location}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button asChild>
                        <Link href={`/events/${event.id}`}>View Details</Link>
                      </Button>
                      <Button variant="outline">
                        <XCircle className="h-4 w-4 mr-2" />
                        Cancel Registration
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            <div className="grid gap-6">
              {userEvents.completed.map((event) => (
                <Card key={event.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{event.title}</CardTitle>
                        <CardDescription>{event.organization}</CardDescription>
                      </div>
                      <Badge variant="secondary">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Completed
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        {new Date(event.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-2" />
                        {event.time}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        {event.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="h-4 w-4 mr-2" />
                        {event.hoursVolunteered} hours
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" asChild>
                        <Link href={`/events/${event.id}`}>View Details</Link>
                      </Button>
                      <Button variant="outline">Leave Review</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default function MyEventsPage() {
  return (
    <ProtectedRoute allowedRoles={["volunteer"]}>
      <MyEventsContent />
    </ProtectedRoute>
  )
}
