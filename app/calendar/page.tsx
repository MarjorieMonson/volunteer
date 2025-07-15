"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, CalendarIcon, Clock, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const events = [
  {
    id: 1,
    title: "Registration Opens: Community Garden Cleanup",
    date: "2025-01-15",
    type: "deadline",
    organization: "Green Earth Initiative",
    description: "Registration opens for the community garden cleanup event",
  },
  {
    id: 2,
    title: "Community Garden Cleanup",
    date: "2025-01-20",
    type: "event",
    organization: "Green Earth Initiative",
    time: "9:00 AM - 2:00 PM",
    location: "Central Park Community Garden",
  },
  {
    id: 3,
    title: "Food Bank Sorting",
    date: "2025-01-25",
    type: "event",
    organization: "City Food Bank",
    time: "10:00 AM - 4:00 PM",
    location: "Downtown Food Bank",
  },
  {
    id: 4,
    title: "Registration Deadline: Youth Mentorship",
    date: "2025-01-30",
    type: "deadline",
    organization: "Future Leaders Foundation",
    description: "Last day to register for the youth mentorship program",
  },
  {
    id: 5,
    title: "Senior Center Activities",
    date: "2025-02-01",
    type: "event",
    organization: "Elder Care Network",
    time: "1:00 PM - 5:00 PM",
    location: "Sunset Senior Center",
  },
  {
    id: 6,
    title: "Beach Cleanup Drive",
    date: "2025-02-05",
    type: "event",
    organization: "Ocean Guardians",
    time: "8:00 AM - 12:00 PM",
    location: "Sunset Beach",
  },
  {
    id: 7,
    title: "Info Session: Environmental Programs",
    date: "2025-02-08",
    type: "info-session",
    organization: "Green Earth Initiative",
    time: "6:00 PM - 7:30 PM",
    location: "Community Center",
  },
  {
    id: 8,
    title: "Youth Mentorship Program",
    date: "2025-02-10",
    type: "event",
    organization: "Future Leaders Foundation",
    time: "3:00 PM - 6:00 PM",
    location: "Community Center",
  },
]

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<"month" | "list">("month")

  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getYear() + 1900

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)
    if (direction === "prev") {
      newDate.setMonth(currentMonth - 1)
    } else {
      newDate.setMonth(currentMonth + 1)
    }
    setCurrentDate(newDate)
  }

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay()
  }

  const getEventsForDate = (date: string) => {
    return events.filter((event) => event.date === date)
  }

  const renderCalendarGrid = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear)
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear)
    const days = []

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-gray-200"></div>)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
      const dayEvents = getEventsForDate(dateString)
      const isToday = new Date().toDateString() === new Date(dateString).toDateString()

      days.push(
        <div key={day} className={`h-24 border border-gray-200 p-1 ${isToday ? "bg-blue-50" : "bg-white"}`}>
          <div className={`text-sm font-medium ${isToday ? "text-blue-600" : "text-gray-900"}`}>{day}</div>
          <div className="space-y-1 mt-1">
            {dayEvents.slice(0, 2).map((event) => (
              <div
                key={event.id}
                className={`text-xs p-1 rounded truncate ${
                  event.type === "event"
                    ? "bg-blue-100 text-blue-800"
                    : event.type === "deadline"
                      ? "bg-red-100 text-red-800"
                      : "bg-green-100 text-green-800"
                }`}
                title={event.title}
              >
                {event.title}
              </div>
            ))}
            {dayEvents.length > 2 && <div className="text-xs text-gray-500">+{dayEvents.length - 2} more</div>}
          </div>
        </div>,
      )
    }

    return days
  }

  const upcomingEvents = events
    .filter((event) => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 10)

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Important Dates & Calendar</h1>
          <p className="text-gray-600">Stay up to date with registration deadlines, events, and important dates</p>
        </div>

        {/* View Toggle */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-2">
            <Button variant={viewMode === "month" ? "default" : "outline"} onClick={() => setViewMode("month")}>
              Month View
            </Button>
            <Button variant={viewMode === "list" ? "default" : "outline"} onClick={() => setViewMode("list")}>
              List View
            </Button>
          </div>
        </div>

        {viewMode === "month" ? (
          <div className="bg-white rounded-lg shadow-sm">
            {/* Calendar Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">
                {months[currentMonth]} {currentYear}
              </h2>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="p-6">
              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-0 mb-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="h-8 flex items-center justify-center text-sm font-medium text-gray-500">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-0 border border-gray-200">{renderCalendarGrid()}</div>
            </div>

            {/* Legend */}
            <div className="p-6 border-t bg-gray-50">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Legend</h3>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-blue-100 rounded"></div>
                  <span className="text-sm text-gray-600">Events</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-red-100 rounded"></div>
                  <span className="text-sm text-gray-600">Deadlines</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-100 rounded"></div>
                  <span className="text-sm text-gray-600">Info Sessions</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Events & Deadlines</h2>
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                      <CardDescription>{event.organization}</CardDescription>
                    </div>
                    <Badge
                      variant={
                        event.type === "event" ? "default" : event.type === "deadline" ? "destructive" : "secondary"
                      }
                    >
                      {event.type === "event" ? "Event" : event.type === "deadline" ? "Deadline" : "Info Session"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      {new Date(event.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    {event.time && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-2" />
                        {event.time}
                      </div>
                    )}
                    {event.location && (
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        {event.location}
                      </div>
                    )}
                    {event.description && <p className="text-sm text-gray-700 mt-2">{event.description}</p>}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
