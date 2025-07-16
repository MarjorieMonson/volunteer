import Link from "next/link"
import { ExternalLink, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const organizations = [
  {
    id: 1,
    name: "Raices ESEN",
    logo: "https://th.bing.com/th/id/OIP.G8apXlpVNl7rRcb9uESP2AHaEK?w=166&h=104&c=7&bgcl=105f66&r=0&o=6&cb=thws4&pid=13.1",
    mission: "Dedicated to environmental conservation and sustainable community practices.",
    description: "We organize community cleanups, tree planting events, and environmental education programs.",
    website: "https://RaicesESEN.org",
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
    name: "Rotarac",
    logo: "https://th.bing.com/th/id/OIP.cNMrP8s7a-evmdE_FBv97wAAAA?w=80&h=80&c=1&bgcl=b3e65f&r=0&o=7&cb=thws4&pid=ImgRC&rm=3",
    mission: "Fighting inequalities in our community by providing assistance to families in need.",
    description: "We collect, sort, and distribute food to local families while organizing community awareness events.",
    website: "https://Rotarac.org",
    activePrograms: 3,
    upcomingEvents: 2,
    registrationOpen: true,
    nextDeadline: "2025-01-20",
    programs: ["Food Sorting & Distribution", "Community Food Drives", "Nutrition Education Programs"],
  },
  {
    id: 3,
    name: "Hope ESEN",
    logo: "data:image/webp;base64,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",
    mission: "Enhancing the quality of life for kids in hospitals through companionship and support services.",
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
    logo: "data:image/webp;base64,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",
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
    name: "FIPIE",
    logo: "data:image/webp;base64,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",
    mission: "Protecting marine ecosystems through conservation efforts and community education.",
    description:
      "We organize beach cleanups, marine life protection initiatives, and ocean conservation education programs.",
    website: "https://FIPIE.org",
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
