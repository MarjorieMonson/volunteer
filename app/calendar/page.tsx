"use client"

import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, CalendarIcon, Clock, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const events = [
  {
    id: 1,
    title: "Turtle Hatchling Release",
    date: "2025-01-20",
    time: "9:00 AM - 2:00 PM",
    organization: "FIPIE",
    location: "San Diego beach",
    description: "Join us for our turtle hatchling release event and participate in the marine conservation talk.",
    type: "Environmental",
  },
  {
    id: 2,
    title: "Clothes Donation",
    organization: "Hope",
    date: "2025-01-25",
    time: "10:00 AM - 4:00 PM",
    location: "ESEN",
    description: "Help us by donating and organizing clothes for those in need.",
    type: "Community service",
  },
  {
    id: 3,
    title: "Cuscatlan Park Cleanup",
    organization: "Raices ESEN",
    date: "2025-02-01",
    time: "1:00 PM - 5:00 PM",
    location: "Parque Cuscatlan",
    description: "Help us with the conservation of our parks.",
    type: "Environmental",
  },
  {
    id: 4,
    title: "Become a Tutor",
    organization: "Consejo Estudiantil ESEN",
    date: "2025-02-05",
    time: "8:00 AM - 12:00 PM",
    location: "ESEN",
    description: "Support students by helping them better understand academic subjects.",
    type: "social",
  },
  {
    id: 5,
    title: "Youth Mentorship Program",
    organization: "Dirección Estudiantil ESEN",
    date: "2025-02-10",
    time: "3:00 PM - 6:00 PM",
    location: "Plaza Legorreta",
    description: "Mentor young people and help them develop leadership skills.",
    type: "Education",
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
  const [todayDate, setTodayDate] = useState<string | null>(null)

  useEffect(() => {
    setTodayDate(new Date().toDateString())
  }, [])

  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)
    newDate.setMonth(direction === "prev" ? currentMonth - 1 : currentMonth + 1)
    setCurrentDate(newDate)
  }

  const getDaysInMonth = (month: number, year: number) =>
    new Date(year, month + 1, 0).getDate()

  const getFirstDayOfMonth = (month: number, year: number) =>
    new Date(year, month, 1).getDay()

  const getEventsForDate = (date: string) =>
    events.filter((event) => event.date === date)

  const renderCalendarGrid = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear)
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear)
    const days = []

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-gray-200" />)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
      const dayEvents = getEventsForDate(dateString)
      const isToday = todayDate === new Date(dateString).toDateString()

      days.push(
        <div
          key={day}
          className={`h-24 border border-gray-200 p-1 ${isToday ? "bg-blue-50" : "bg-white"}`}
        >
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
            {dayEvents.length > 2 && (
              <div className="text-xs text-gray-500">+{dayEvents.length - 2} more</div>
            )}
          </div>
        </div>
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

            <div className="p-6">
              <div className="grid grid-cols-7 gap-0 mb-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="h-8 flex items-center justify-center text-sm font-medium text-gray-500">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-0 border border-gray-200">{renderCalendarGrid()}</div>
            </div>

            <div className="p-6 border-t bg-gray-50">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Legend</h3>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-blue-100 rounded" />
                  <span className="text-sm text-gray-600">Events</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-red-100 rounded" />
                  <span className="text-sm text-gray-600">Deadlines</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-100 rounded" />
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
                        event.type === "event" ? "default" :
                        event.type === "deadline" ? "destructive" : "secondary"
                      }
                    >
                      {event.type === "event" ? "Event" :
                       event.type === "deadline" ? "Deadline" : "Info Session"}
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
  