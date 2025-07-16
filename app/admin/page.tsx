"use client"

import { useState } from "react"
import { Plus, Edit, Trash2, Users, Calendar, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ProtectedRoute } from "@/components/auth/protected-route"

// Mock data for demonstration
const mockEvents = [
  {
    id: 1,
    title: "Turtle hatchling release",
    organization: "FIPIE",
    date: "2025-01-20",
    status: "open",
    registrations: 12,
  },
  {
    id: 2,
    title: "Become a tutor",
    organization: "Consejo Estudiantil ESEN",
    date: "2025-01-25",
    status: "open",
    registrations: 8,
  },
]

const mockOrganizations = [
  {
    id: 1,
    name: "FIPIE",
    activePrograms: 5,
    totalVolunteers: 45,
    status: "active",
  },
  {
    id: 2,
    name: "Consejo Estudiantil ESEN",
    activePrograms: 3,
    totalVolunteers: 32,
    status: "active",
  },
]

function AdminContent() {
  const [events, setEvents] = useState(mockEvents)
  const [organizations, setOrganizations] = useState(mockOrganizations)
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false)
  const [isOrgDialogOpen, setIsOrgDialogOpen] = useState(false)

  const [newEvent, setNewEvent] = useState({
    title: "",
    organization: "",
    date: "",
    time: "",
    location: "",
    description: "",
    type: "",
    spotsAvailable: "",
  })

  const [newOrg, setNewOrg] = useState({
    name: "",
    mission: "",
    description: "",
    website: "",
    programs: "",
  })

  const handleAddEvent = () => {
    const event = {
      id: events.length + 1,
      ...newEvent,
      status: "open",
      registrations: 0,
    }
    setEvents([...events, event])
    setNewEvent({
      title: "",
      organization: "",
      date: "",
      time: "",
      location: "",
      description: "",
      type: "",
      spotsAvailable: "",
    })
    setIsEventDialogOpen(false)
  }

  const handleAddOrganization = () => {
    const org = {
      id: organizations.length + 1,
      name: newOrg.name,
      activePrograms: 0,
      totalVolunteers: 0,
      status: "active",
    }
    setOrganizations([...organizations, org])
    setNewOrg({
      name: "",
      mission: "",
      description: "",
      website: "",
      programs: "",
    })
    setIsOrgDialogOpen(false)
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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
          <p className="text-gray-600">Manage events, organizations, and volunteer registrations</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Events</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{events.length}</div>
              <p className="text-xs text-muted-foreground">{events.filter((e) => e.status === "open").length} active</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Organizations</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{organizations.length}</div>
              <p className="text-xs text-muted-foreground">
                {organizations.filter((o) => o.status === "active").length} active
              </p>
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
              <CardTitle className="text-sm font-medium">Active Volunteers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {organizations.reduce((sum, org) => sum + org.totalVolunteers, 0)}
              </div>
              <p className="text-xs text-muted-foreground">Total registered</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="events" className="space-y-6">
          <TabsList>
            <TabsTrigger value="events">Events Management</TabsTrigger>
            <TabsTrigger value="organizations">Organizations</TabsTrigger>
            <TabsTrigger value="registrations">Registrations</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="events" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Events Management</h2>
              <Dialog open={isEventDialogOpen} onOpenChange={setIsEventDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Event
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Add New Event</DialogTitle>
                    <DialogDescription>Create a new volunteer opportunity event.</DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Event Title</Label>
                      <Input
                        id="title"
                        value={newEvent.title}
                        onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                        placeholder="Enter event title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="organization">Organization</Label>
                      <Select
                        value={newEvent.organization}
                        onValueChange={(value) => setNewEvent({ ...newEvent, organization: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select organization" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Green Earth Initiative">Green Earth Initiative</SelectItem>
                          <SelectItem value="City Food Bank">City Food Bank</SelectItem>
                          <SelectItem value="Elder Care Network">Elder Care Network</SelectItem>
                        </SelectContent>
                      </Select>
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
                      <Label htmlFor="spots">Available Spots</Label>
                      <Input
                        id="spots"
                        type="number"
                        value={newEvent.spotsAvailable}
                        onChange={(e) => setNewEvent({ ...newEvent, spotsAvailable: e.target.value })}
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
                    <Button onClick={handleAddEvent}>Add Event</Button>
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
                        <CardDescription>{event.organization}</CardDescription>
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
                        <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                        <p>Registrations: {event.registrations}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        View Registrations
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="organizations" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Organizations Management</h2>
              <Dialog open={isOrgDialogOpen} onOpenChange={setIsOrgDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Organization
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Add New Organization</DialogTitle>
                    <DialogDescription>Add a new partner organization to the platform.</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="orgName">Organization Name</Label>
                      <Input
                        id="orgName"
                        value={newOrg.name}
                        onChange={(e) => setNewOrg({ ...newOrg, name: e.target.value })}
                        placeholder="Enter organization name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mission">Mission Statement</Label>
                      <Textarea
                        id="mission"
                        value={newOrg.mission}
                        onChange={(e) => setNewOrg({ ...newOrg, mission: e.target.value })}
                        placeholder="Enter mission statement"
                        rows={2}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="orgDescription">Description</Label>
                      <Textarea
                        id="orgDescription"
                        value={newOrg.description}
                        onChange={(e) => setNewOrg({ ...newOrg, description: e.target.value })}
                        placeholder="Enter organization description"
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        value={newOrg.website}
                        onChange={(e) => setNewOrg({ ...newOrg, website: e.target.value })}
                        placeholder="https://example.org"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button variant="outline" onClick={() => setIsOrgDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddOrganization}>Add Organization</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {organizations.map((org) => (
                <Card key={org.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{org.name}</CardTitle>
                        <CardDescription>
                          {org.activePrograms} active programs • {org.totalVolunteers} volunteers
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={org.status === "active" ? "default" : "secondary"}>{org.status}</Badge>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="registrations" className="space-y-6">
            <h2 className="text-2xl font-bold">Registration Management</h2>
            <Card>
              <CardHeader>
                <CardTitle>Recent Registrations</CardTitle>
                <CardDescription>Manage volunteer registrations and track participation</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Registration management interface would be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-bold">Platform Settings</h2>
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Configure platform-wide settings and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Settings interface would be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default function AdminPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminContent />
    </ProtectedRoute>
  )
}
