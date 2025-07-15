"use client"

import { useState } from "react"
import { Plus, Edit, Trash2, Users, Calendar, Eye, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useAuth } from "@/lib/auth"
import { ProtectedRoute } from "@/components/auth/protected-route"

// Mock data for organization events
const organizationEvents = [
  {
    id: 1,
    title: "Community Garden Cleanup",
    date: "2025-01-20",
    time: "9:00 AM - 2:00 PM",
    location: "Central Park Community Garden",
    status: "open",
    registrations: 12,
    maxSpots: 20,
  },
  {
    id: 2,
    title: "Environmental Workshop",
    date: "2025-02-05",
    time: "6:00 PM - 8:00 PM",
    location: "Community Center",
    status: "open",
    registrations: 8,
    maxSpots: 15,
  },
]

const volunteerApplications = [
  {
    id: 1,
    volunteerName: "John Smith",
    email: "john@example.com",
    eventTitle: "Community Garden Cleanup",
    appliedDate: "2025-01-10",
    status: "pending",
  },
  {
    id: 2,
    volunteerName: "Sarah Johnson",
    email: "sarah@example.com",
    eventTitle: "Environmental Workshop",
    appliedDate: "2025-01-12",
    status: "approved",
  },
]

function OrganizationDashboardContent() {
  const { user } = useAuth()
  const [events, setEvents] = useState(organizationEvents)
  const [applications, setApplications] = useState(volunteerApplications)
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false)

  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
    maxSpots: "",
  })

  if (!user || user.role !== "organization") return null

  const handleAddEvent = () => {
    const event = {
      id: events.length + 1,
      ...newEvent,
      status: "open",
      registrations: 0,
      maxSpots: Number.parseInt(newEvent.maxSpots),
    }
    setEvents([...events, event])
    setNewEvent({
      title: "",
      date: "",
      time: "",
      location: "",
      description: "",
      maxSpots: "",
    })
    setIsEventDialogOpen(false)
  }

  const handleApplicationAction = (applicationId: number, action: "approve" | "reject") => {
    setApplications(
      applications.map((app) =>
        app.id === applicationId ? { ...app, status: action === "approve" ? "approved" : "rejected" } : app,
      ),
    )
  }

  const toggleEventStatus = (eventId: number) => {
    setEvents(
      events.map((event) =>
        event.id === eventId ? { ...event, status: event.status === "open" ? "closed" : "open" } : event,
      ),
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Organization Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user.organizationName}</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Events</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{events.filter((e) => e.status === "open").length}</div>
              <p className="text-xs text-muted-foreground">Out of {events.length} total</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Registrations</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{events.reduce((sum, event) => sum + event.registrations, 0)}</div>
              <p className="text-xs text-muted-foreground">Across all events</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Applications</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{applications.filter((a) => a.status === "pending").length}</div>
              <p className="text-xs text-muted-foreground">Need review</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved Volunteers</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{applications.filter((a) => a.status === "approved").length}</div>
              <p className="text-xs text-muted-foreground">Ready to volunteer</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="events" className="space-y-6">
          <TabsList>
            <TabsTrigger value="events">My Events</TabsTrigger>
            <TabsTrigger value="applications">Volunteer Applications</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="events" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Event Management</h2>
              <Dialog open={isEventDialogOpen} onOpenChange={setIsEventDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Event
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create New Event</DialogTitle>
                    <DialogDescription>Create a new volunteer opportunity for your organization.</DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 space-y-2">
                      <Label htmlFor="title">Event Title</Label>
                      <Input
                        id="title"
                        value={newEvent.title}
                        onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                        placeholder="Enter event title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={newEvent.date}
                        onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">Time</Label>
                      <Input
                        id="time"
                        value={newEvent.time}
                        onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                        placeholder="e.g., 9:00 AM - 2:00 PM"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={newEvent.location}
                        onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                        placeholder="Enter location"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxSpots">Maximum Volunteers</Label>
                      <Input
                        id="maxSpots"
                        type="number"
                        value={newEvent.maxSpots}
                        onChange={(e) => setNewEvent({ ...newEvent, maxSpots: e.target.value })}
                        placeholder="Number of spots"
                      />
                    </div>
                    <div className="col-span-2 space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={newEvent.description}
                        onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                        placeholder="Enter event description"
                        rows={3}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button variant="outline" onClick={() => setIsEventDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddEvent}>Create Event</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {events.map((event) => (
                <Card key={event.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{event.title}</CardTitle>
                        <CardDescription>
                          {new Date(event.date).toLocaleDateString()} • {event.time}
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={event.status === "open" ? "default" : "secondary"}>{event.status}</Badge>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => toggleEventStatus(event.id)}>
                          {event.status === "open" ? "Close" : "Open"}
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-600">
                        <p>Location: {event.location}</p>
                        <p>
                          Registrations: {event.registrations}/{event.maxSpots}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          <Users className="h-4 w-4 mr-2" />
                          Manage Volunteers
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="applications" className="space-y-6">
            <h2 className="text-2xl font-bold">Volunteer Applications</h2>
            <div className="grid gap-4">
              {applications.map((application) => (
                <Card key={application.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{application.volunteerName}</CardTitle>
                        <CardDescription>{application.email}</CardDescription>
                      </div>
                      <Badge
                        variant={
                          application.status === "approved"
                            ? "default"
                            : application.status === "pending"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {application.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-600">
                        <p>Event: {application.eventTitle}</p>
                        <p>Applied: {new Date(application.appliedDate).toLocaleDateString()}</p>
                      </div>
                      {application.status === "pending" && (
                        <div className="flex space-x-2">
                          <Button size="sm" onClick={() => handleApplicationAction(application.id, "approve")}>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approve
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleApplicationAction(application.id, "reject")}
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold">Analytics & Reports</h2>
            <Card>
              <CardHeader>
                <CardTitle>Event Performance</CardTitle>
                <CardDescription>Track your events' success and volunteer engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Analytics dashboard would be implemented here with charts and metrics.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-bold">Organization Settings</h2>
            <Card>
              <CardHeader>
                <CardTitle>Organization Profile</CardTitle>
                <CardDescription>Update your organization information and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Organization settings interface would be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default function OrganizationDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={["organization"]}>
      <OrganizationDashboardContent />
    </ProtectedRoute>
  )
}
