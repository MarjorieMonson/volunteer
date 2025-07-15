import Link from "next/link"
import { ExternalLink, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const organizations = [
  {
    id: 1,
    name: "Green Earth Initiative",
    logo: "/placeholder.svg?height=80&width=80",
    mission: "Dedicated to environmental conservation and sustainable community practices.",
    description: "We organize community cleanups, tree planting events, and environmental education programs.",
    website: "https://greenearthinitiative.org",
    activePrograms: 5,
    upcomingEvents: 3,
    registrationOpen: true,
    nextDeadline: "2025-01-15",
    programs: [
      "Community Garden Maintenance",
      "Beach Cleanup Drives",
      "Tree Planting Events",
      "Environmental Education Workshops",
    ],
  },
  {
    id: 2,
    name: "City Food Bank",
    logo: "/placeholder.svg?height=80&width=80",
    mission: "Fighting hunger in our community by providing food assistance to families in need.",
    description: "We collect, sort, and distribute food to local families while organizing community awareness events.",
    website: "https://cityfoodbank.org",
    activePrograms: 3,
    upcomingEvents: 2,
    registrationOpen: true,
    nextDeadline: "2025-01-20",
    programs: ["Food Sorting & Distribution", "Community Food Drives", "Nutrition Education Programs"],
  },
  {
    id: 3,
    name: "Elder Care Network",
    logo: "/placeholder.svg?height=80&width=80",
    mission: "Enhancing the quality of life for seniors through companionship and support services.",
    description:
      "We provide social activities, companionship visits, and support services for elderly community members.",
    website: "https://eldercarenetwork.org",
    activePrograms: 4,
    upcomingEvents: 2,
    registrationOpen: true,
    nextDeadline: "2025-01-25",
    programs: [
      "Senior Center Activities",
      "Companionship Visits",
      "Technology Training for Seniors",
      "Health & Wellness Programs",
    ],
  },
  {
    id: 4,
    name: "Future Leaders Foundation",
    logo: "/placeholder.svg?height=80&width=80",
    mission: "Empowering youth through mentorship, education, and leadership development programs.",
    description:
      "We connect young people with mentors and provide educational opportunities to help them reach their potential.",
    website: "https://futureleadersfoundation.org",
    activePrograms: 6,
    upcomingEvents: 1,
    registrationOpen: false,
    nextDeadline: "2025-02-01",
    programs: [
      "Youth Mentorship Program",
      "Leadership Development Workshops",
      "Career Guidance Sessions",
      "Educational Support Programs",
    ],
  },
  {
    id: 5,
    name: "Ocean Guardians",
    logo: "/placeholder.svg?height=80&width=80",
    mission: "Protecting marine ecosystems through conservation efforts and community education.",
    description:
      "We organize beach cleanups, marine life protection initiatives, and ocean conservation education programs.",
    website: "https://oceanguardians.org",
    activePrograms: 4,
    upcomingEvents: 4,
    registrationOpen: true,
    nextDeadline: "2025-01-30",
    programs: [
      "Beach Cleanup Initiatives",
      "Marine Life Protection",
      "Ocean Conservation Education",
      "Coastal Restoration Projects",
    ],
  },
]

export default function OrganizationsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Partner Organizations</h1>
          <p className="text-gray-600">Meet our amazing partner organizations making a difference in the community</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {organizations.map((org) => (
            <Card key={org.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start space-x-4">
                  <img
                    src={org.logo || "/placeholder.svg"}
                    alt={`${org.name} logo`}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-xl">{org.name}</CardTitle>
                      <Badge variant={org.registrationOpen ? "default" : "secondary"}>
                        {org.registrationOpen ? "Open" : "Closed"}
                      </Badge>
                    </div>
                    <CardDescription className="text-sm font-medium text-blue-600">{org.mission}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-700">{org.description}</p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 py-4 border-t border-b">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{org.activePrograms}</div>
                      <div className="text-xs text-gray-500">Active Programs</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{org.upcomingEvents}</div>
                      <div className="text-xs text-gray-500">Upcoming Events</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{new Date(org.nextDeadline).getDate()}</div>
                      <div className="text-xs text-gray-500">Next Deadline</div>
                    </div>
                  </div>

                  {/* Programs */}
                  <div>
                    <h4 className="font-semibold mb-2">Current Programs:</h4>
                    <div className="flex flex-wrap gap-2">
                      {org.programs.map((program, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {program}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Important Date */}
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Next deadline: {new Date(org.nextDeadline).toLocaleDateString()}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2 pt-4">
                    <Button className="flex-1" asChild>
                      <Link href={`/organizations/${org.id}`}>View Details</Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href={org.website} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Website
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
