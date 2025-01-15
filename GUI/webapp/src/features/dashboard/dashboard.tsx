import { Link } from 'react-router-dom';
import { Clock, UserCheck, AlertCircle, Search, Filter, UserPlus } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/Button/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Example recent trips data
const exampleTrips = [
  {
    id: 1,
    guest: {
      name: 'Alice Johnson',
      email: 'alice@example.com',
    },
    type: 'Interview',
    dates: 'May 15 - May 17, 2023',
    duration: '3 days',
    status: 'Completed',
  },
  {
    id: 2,
    guest: {
      name: 'Bob Smith',
      email: 'bob@example.com',
    },
    type: 'Conference',
    dates: 'Jun 1 - Jun 5, 2023',
    duration: '5 days',
    status: 'In Progress',
  },
  {
    id: 3,
    guest: {
      name: 'Carol Davis',
      email: 'carol@example.com',
    },
    type: 'Training',
    dates: 'Jun 10 - Jun 14, 2023',
    duration: '5 days',
    status: 'Upcoming',
  },
  {
    id: 4,
    guest: {
      name: 'David Wilson',
      email: 'david@example.com',
    },
    type: 'Client Meeting',
    dates: 'May 20 - May 21, 2023',
    duration: '2 days',
    status: 'Completed',
  },
  {
    id: 5,
    guest: {
      name: 'Eva Brown',
      email: 'eva@example.com',
    },
    type: 'Interview',
    dates: 'Jun 7 - Jun 8, 2023',
    duration: '2 days',
    status: 'Upcoming',
  },
]

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <main className="container mx-auto p-8">
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, Sarah</h1>
            <p className="text-muted-foreground">Manage your guest travel arrangements</p>
          </div>
          <Button
            asChild
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <Link to="/guest-invite">
              <UserPlus size={20} />
              <span>New Guest Invite</span>
            </Link>
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Arrivals</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Next arrival in 2 days</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Guests</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">3 checking out today</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Requires Attention</CardTitle>
              <AlertCircle className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-orange-500">Flight delays detected</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Trips */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle>Recent Trips</CardTitle>
                <CardDescription>Overview of your latest guest arrangements</CardDescription>
              </div>
              <div className="flex space-x-2 w-full sm:w-auto">
                <div className="relative flex-grow sm:flex-grow-0">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search trips..."
                    className="pl-9 pr-4 w-full"
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                  <span className="sr-only">Filter</span>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Guest</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Dates</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {exampleTrips.map((trip) => (
                    <TableRow key={trip.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarFallback>{trip.guest.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{trip.guest.name}</div>
                            <div className="text-sm text-muted-foreground">{trip.guest.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                          {trip.type}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div>{trip.dates}</div>
                        <div className="text-sm text-muted-foreground">{trip.duration}</div>
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                          trip.status === 'Completed' 
                            ? 'bg-green-50 text-green-700 ring-green-600/20' 
                            : trip.status === 'In Progress'
                            ? 'bg-blue-50 text-blue-700 ring-blue-600/20'
                            : 'bg-yellow-50 text-yellow-700 ring-yellow-600/20'
                        }`}>
                          {trip.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button variant="link" asChild>
                          <Link to={`/trips/${trip.id}`}>View Details</Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default Dashboard