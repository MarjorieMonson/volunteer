import Link from "next/link"
import { ArrowLeft, Calendar, Clock, MapPin, Users, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// Mock event data - en un caso real vendría de base de datos o API
const getEventById = (id: string) => {
  const events = {
    "1": {
      id: 1,
      title: "Turtle hachling release",
      organization: "FIPIE",
      date: "2025-01-20",
      time: "9:00 AM - 2:00 PM",
      location: "San Diego beach",
      description: "Join us for our turtle hachling release event and participate in the marine conservation talk.",
      type: "Ambiental",
      status: "open",
      spotsAvailable: 15,
      spotsTotal: 20,
      requirements: [
        "Comfortable working outdoors",
        "Bring water bottle and sun protection",
      ],
      whatToBring: [
        "Work gloves (provided if needed)",
        "Water bottle",
        "Sun hat or cap",
        "Comfortable work clothes",
      ],
      contact: {
        name: "George Bale",
        email: "george@greenearthinitiative.org",
        phone: "(555) 123-4567",
      },
      organizationInfo: {
        name: "FIPIE",
        mission: "Dedicated to environmental conservation and sustainable community practices.",
        website: "https://FIPIE.org",
      },
    },
  };

  return events[id as keyof typeof events] || null;
};

// Esta función indica a Next.js qué rutas dinámicas debe generar
export async function generateStaticParams() {
  return [
    { id: '1' }, // agregar más ids si hay más eventos
  ];
}

export default function EventDetailPage({ params }: { params: { id: string } }) {
  const event = getEventById(params.id);

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h1>
          <p className="text-gray-600 mb-8">The event you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/events">Back to Events</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/events">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Events
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <CardTitle className="text-2xl mb-2">{event.title}</CardTitle>
                    <CardDescription className="text-lg">{event.organization}</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Badge variant={event.status === "open" ? "default" : "secondary"}>{event.status}</Badge>
                    <Badge variant="outline">{event.type}</Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(event.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    {event.time}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {event.location}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">About This Event</h3>
                    <p className="text-gray-700 leading-relaxed">{event.description}</p>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Requirements</h3>
                    <ul className="space-y-2">
                      {event.requirements.map((req, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-gray-700">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-semibold mb-3">What to Bring</h3>
                    <ul className="space-y-2">
                      {event.whatToBring.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Organization Info */}
            <Card>
              <CardHeader>
                <CardTitle>About {event.organizationInfo.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{event.organizationInfo.mission}</p>
                <Button variant="outline" asChild>
                  <a href={event.organizationInfo.website} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Visit Website
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Registration Card */}
            <Card>
              <CardHeader>
                <CardTitle>Registration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Available Spots:</span>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      <span className="font-semibold">
                        {event.spotsAvailable}/{event.spotsTotal}
                      </span>
                    </div>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${((event.spotsTotal - event.spotsAvailable) / event.spotsTotal) * 100}%`,
                      }}
                    ></div>
                  </div>

                  <Button
                    className="w-full"
                    size="lg"
                    disabled={event.status === "closed" || event.spotsAvailable === 0}
                  >
                    {event.status === "closed"
                      ? "Registration Closed"
                      : event.spotsAvailable === 0
                      ? "Event Full"
                      : "Register Now"}
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    Registration confirmation will be sent via email
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium">{event.contact.name}</p>
                    <p className="text-sm text-gray-600">Event Coordinator</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm">
                      <span className="font-medium">Email:</span>{" "}
                      <a href={`mailto:${event.contact.email}`} className="text-blue-600 hover:underline">
                        {event.contact.email}
                      </a>
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Phone:</span>{" "}
                      <a href={`tel:${event.contact.phone}`} className="text-blue-600 hover:underline">
                        {event.contact.phone}
                      </a>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Share Event */}
            <Card>
              <CardHeader>
                <CardTitle>Share This Event</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full bg-transparent" size="sm">
                    Share on Social Media
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent" size="sm">
                    Copy Event Link
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
