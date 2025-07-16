"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Filter, MapPin, Calendar, Clock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

const events = [
  {
    id: 1,
    title: "Liberacion de tortugas",
    organization: "FIPIE",
    date: "2025-01-20",
    time: "9:00 AM - 2:00 PM",
    location: "San Diego beach",
    description: "Horas sociales por asistir a la liberacion de tortugas y charla de conservacion marina.",
    type: "Ambiental",
    status: "open",
    spotsAvailable: 15,
  },
  {
    id: 2,
    title: "Donacion de ropa",
    organization: "Hope",
    date: "2025-01-25",
    time: "10:00 AM - 4:00 PM",
    location: "ESEN",
    description: "Ayuda a organizar y limpiar ropa para donaciones de ropa con familias que necesitan apoyo.",
    type: "Servicio a la comunidad",
    status: "open",
    spotsAvailable: 20,
  },
  {
    id: 3,
    title: "Limpieza parque Cuscatlan",
    organization: "Raices ESEN",
    date: "2025-02-01",
    time: "1:00 PM - 5:00 PM",
    location: "Parque Cuscatlan",
    description: "Ayuda con la limpieza de uno de nuestros parques.",
    type: "Ambiental",
    status: "open",
    spotsAvailable: 8,
  },
  {
    id: 4,
    title: "Vuelvete tutor",
    organization: "Consejo Estudiantil ESEN    ",
    date: "2025-02-05",
    time: "8:00 AM - 12:00 PM",
    location: "Instalaciones ESEN",
    description: "Animate a repartir tus conocimientos a los estudiantes de años menores.",
    type: "social",
    status: "open",
    spotsAvailable: 30,
  },
  {
    id: 5,
    title: "Youth Mentorship Program",
    organization: "Direcccion Estudiantil ESEN",
    date: "2025-02-10",
    time: "3:00 PM - 6:00 PM",
    location: "Plaza Legorreta ",
    description: "Mentor young people and help them develop leadership skills.",
    type: "Education",
    status: "closed",
    spotsAvailable: 0,
  },
]

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.organization.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || event.type === filterType
    const matchesStatus = filterStatus === "all" || event.status === filterStatus

    return matchesSearch && matchesType && matchesStatus
  })

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Volunteer Opportunities</h1>
          <p className="text-gray-600">Discover meaningful ways to give back to your peers</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger>
                <SelectValue placeholder="Event Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Environment">Environment</SelectItem>
                <SelectItem value="Community Service">Community Service</SelectItem>
                <SelectItem value="Social">Social</SelectItem>
                <SelectItem value="Education">Education</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="w-full bg-transparent">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant={event.status === "open" ? "default" : "secondary"}>{event.status}</Badge>
                  <Badge variant="outline">{event.type}</Badge>
                </div>
                <CardTitle className="text-lg">{event.title}</CardTitle>
                <CardDescription>{event.organization}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
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
                    {event.spotsAvailable} spots available
                  </div>
                  <p className="text-sm text-gray-700 line-clamp-2">{event.description}</p>
                </div>
                <div className="mt-4 space-y-2">
                  <Button className="w-full" disabled={event.status === "closed"} asChild={event.status === "open"}>
                    {event.status === "open" ? (
                      <Link href={`/events/${event.id}`}>Register Now</Link>
                    ) : (
                      "Registration Closed"
                    )}
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent" asChild>
                    <Link href={`/events/${event.id}`}>View Details</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No events found matching your criteria.</p>
            <Button
              variant="outline"
              className="mt-4 bg-transparent"
              onClick={() => {
                setSearchTerm("")
                setFilterType("all")
                setFilterStatus("all")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
