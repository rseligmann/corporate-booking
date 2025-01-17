import { FC } from "react"
import { Outlet, Link, useLocation } from "react-router-dom"
import { LayoutDashboard, UserPlus, FileText, Settings, Bell } from "lucide-react"
import { Avatar } from "@/components/Avatar/avatar"
import "./DefaultLayout.scss"

const DefaultLayout: FC = () => {
    const location = useLocation()
    
    return (
        <div className="layout">
            <header className="header">
                <div className="header__container">
                    <div className="header__content">
                        <div className="header__left">
                            <h1 className="header__logo">TravelPortal</h1>
                            
                            <nav className="nav">
                                <Link 
                                    to="/dashboard"
                                    className={`nav__link ${location.pathname === '/dashboard' ? 'nav__link--active' : ''}`}
                                >
                                    <LayoutDashboard className="nav__icon" />
                                    <span>Dashboard</span>
                                </Link>
                                <Link 
                                    to="/guest-invite"
                                    className={`nav__link ${location.pathname === '/guest-invite' ? 'nav__link--active' : ''}`}
                                >
                                    <UserPlus className="nav__icon" />
                                    <span>Guest Invite</span>
                                </Link>
                                <Link 
                                    to="/reports"
                                    className={`nav__link ${location.pathname === '/reports' ? 'nav__link--active' : ''}`}
                                >
                                    <FileText className="nav__icon" />
                                    <span>Reports</span>
                                </Link>
                                <Link 
                                    to="/settings"
                                    className={`nav__link ${location.pathname === '/settings' ? 'nav__link--active' : ''}`}
                                >
                                    <Settings className="nav__icon" />
                                    <span>Settings</span>
                                </Link>
                            </nav>
                        </div>

                        <div className="header__actions">
                            <button className="icon-button">
                                <Bell />
                                <span className="sr-only">Notifications</span>
                            </button>
                            <Avatar fallback="SA" />
                        </div>
                    </div>
                </div>
            </header>

            <main className="main">
                <div className="main__container">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}

export default DefaultLayout;