import { FC } from "react"
import { Routes, Route } from "react-router-dom"
import AuthLayout from "@/layouts/AuthLayout/AuthLayout"
import { DefaultLayout } from "@/layouts/DefaultLayout"
import GuestLayout from "@/layouts/GuestLayout/GuestLayout"
import { ConfirmationPage, DashboardPage, GuestDashboardPage, GuestExpensesPage, 
    GuestFlightsPage, GuestHotelPage, GuestInvitePage, GuestTransportPage, 
    LoginPage, RegisterPage, ReportsPage, SettingsPage
} from "@/routes"
import { RequireAuth } from "@/features/auth/RequireAuth"
import { TokenRefreshManager } from "@/features/auth/TokenRefreshManager"

const App: FC = () => {
    return (
        <>
        <TokenRefreshManager />
        
        <RequireAuth>
            <Routes>
                {/* Travel Manager Auth Routes */}
                <Route element={<AuthLayout />}>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/confirm-signup" element={<ConfirmationPage />} />
                    {/* Add other auth routes like register, forgot-password here */}
                </Route>

                {/* Protected routes */}
                <Route element={
                    <RequireAuth requireAuth={true}>
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
        </RequireAuth>
        </>
    )
}

export default App