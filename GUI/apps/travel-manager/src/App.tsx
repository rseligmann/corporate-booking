import { FC } from "react"
import { Routes, Route } from "react-router-dom"
import AuthLayout from "@/layouts/AuthLayout/AuthLayout"
import { DefaultLayout } from "@/layouts/DefaultLayout"
import { ConfirmationPage, DashboardPage, GuestInvitePage, 
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
            </Routes>
        </RequireAuth>
        </>
    )
}

export default App