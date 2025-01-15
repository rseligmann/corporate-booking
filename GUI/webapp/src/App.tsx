import { FC } from "react"
import { Routes, Route } from "react-router-dom"
//import { DefaultLayout } from "@/layouts/DefaultLayout"
import { AuthLayout } from "@/layouts/AuthLayout"
import { Login } from "@/routes/login"
import { RequireAuth } from "@/features/auth/RequireAuth"

import { DashboardPage } from "@/routes/dashboard"
import { GuestInvitePage } from "@/routes/guest-invite"
import { ReportsPage } from "@/routes/reports"
import { SettingsPage } from "@/routes/settings"
import "~/styles/App.scss"
import TravelMgrLayout from "./layouts/TravelMgrLayout/TravelMgrLayout"

const App: FC = () => {
    return (
        <Routes>
            {/* Auth routes */}
            <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
                {/* Add other auth routes like register, forgot-password here */}
            </Route>
            
            {/* routes with TravelMgrLayout only*/}
            <Route 
                path="/"
                element = {
                <RequireAuth>
                    <TravelMgrLayout />
                </RequireAuth>
                }
            >
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/invite" element={<GuestInvitePage />} />
                <Route path="/reports" element={<ReportsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
            </Route>
        </Routes>
    )
}

export default App