import { FC } from "react"
import { Routes, Route } from "react-router-dom"
import AuthLayout from "@/layouts/AuthLayout/AuthLayout"
import { DefaultLayout } from "@/layouts/DefaultLayout"
import GuestLayout from "@/layouts/GuestLayout/GuestLayout"
import { Login } from "@/routes/login"
import { RequireAuth } from "@/features/auth/RequireAuth"
import { DashboardPage } from "@/routes/dashboard"
import { GuestInvitePage } from "@/routes/guestinvite"
import{ GuestFlightsPage } from "@/routes/guestflightbooking"
import{ GuestTransportPage } from "@/routes/guesttransport"
import { GuestHotelPage } from "@/routes/guesthotel"
import { GuestExpensesPage } from "@/routes/guestexpenses"
import { ReportsPage } from "@/routes/reports"
import { SettingsPage } from "@/routes/settings"
import { GuestDashboardPage } from "@/routes/guestdashboard"

const App: FC = () => {
    return (
        <Routes>
            {/* Travel Manager Auth Routes */}
            <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
                {/* Add other auth routes like register, forgot-password here */}
            </Route>

            {/* Protected routes */}
            <Route element={
                <RequireAuth>
                    <DefaultLayout />
                </RequireAuth>
            }>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/guest-invite" element={<GuestInvitePage />} />
                <Route path="/reports" element={<ReportsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
            </Route>

            {/* Guest Routes */}
            <Route path = "/guest" element={
                <GuestLayout />
            }>
                <Route path="dashboard" element={<GuestDashboardPage />} />
                <Route path="flights" element={<GuestFlightsPage />} />
                <Route path="hotel" element={<GuestHotelPage />} />
                <Route path="transport" element={<GuestTransportPage />} />
                <Route path="expenses" element={<GuestExpensesPage />} />



            </Route>
        </Routes>
    )
}

export default App