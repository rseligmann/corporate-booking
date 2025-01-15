import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, UserPlus, FileText, Settings, Bell } from 'lucide-react'
import  Button  from "@/components/Button/button"
import { Avatar } from "../../components/Avatar/avatar"

const AppLayout = ({ children }: { children: React.ReactNode }) => {
    const location = useLocation()
    const pathname = location.pathname
  
  return (
     <div className="min-h-screen bg-background">
      {/* Header Navigation */}
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-xl font-bold mr-8">TravelPortal</h1>
              
              {/* Navigation Links */}
              <nav className="hidden md:flex space-x-1">
                <Button variant={pathname === '/' ? 'secondary' : 'ghost'} asChild>
                  <Link to="/dashboard">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </Button>
                <Button variant={pathname === '/guest-invite' ? 'secondary' : 'ghost'} asChild>
                  <Link to ="/invite">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Guest Invite
                  </Link>
                </Button>
                <Button variant={pathname === '/reports' ? 'secondary' : 'ghost'} asChild>
                  <Link to="/reports">
                    <FileText className="mr-2 h-4 w-4" />
                    Reports
                  </Link>
                </Button>
                <Button variant={pathname === '/settings' ? 'secondary' : 'ghost'} asChild>
                  <Link to="/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </Button>
              </nav>
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Button>

                <Avatar fallback = "SA"/>

            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-8">
        {children}
      </main>
    </div>
  )
}

export default AppLayout