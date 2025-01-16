import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, UserPlus, FileText, Settings, Bell } from 'lucide-react'
import  Button  from "@/components/Button/button"
import { Avatar } from "../../../components/Avatar/avatar"
import './AppLayout.scss'

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const location = useLocation();
  
  const navigationItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/invite', icon: UserPlus, label: 'Guest Invite' },
    { path: '/reports', icon: FileText, label: 'Reports' },
    { path: '/settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <div className="app-layout">
      <header className="app-header">
        <div className="app-header__container">
          <div className="app-header__content">
            {/* Logo */}
            <div className="app-header__logo-section">
              <h1 className="app-header__logo">TravelPortal</h1>
              
              {/* Navigation Links */}
              <nav className="app-nav">
                {navigationItems.map((item) => (
                  <Button
                    key={item.path}
                    variant={location.pathname === item.path ? 'secondary' : 'ghost'}
                    className="app-nav__item"
                    onClick={() => {}}
                  >
                    <Link to={item.path} className="app-nav__link">
                      <item.icon className="app-nav__icon" />
                      {item.label}
                    </Link>
                  </Button>
                ))}
              </nav>
            </div>

            {/* User Actions */}
            <div className="app-header__actions">
              <Button variant="ghost" className="notification-btn">
                <Bell />
                <span className="sr-only">Notifications</span>
              </Button>
              <Avatar
                fallback="SA"
                size="sm"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="app-main">
        <div className="app-main__container">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AppLayout;