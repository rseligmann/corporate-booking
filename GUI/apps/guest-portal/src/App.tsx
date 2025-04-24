import { FC } from "react"
import { Routes, Route } from "react-router-dom"
import GuestLayout from './layouts/GuestLayout/GuestLayout'
import { GuestDashboardPage, GuestExpensesPage, 
    GuestFlightsPage, GuestHotelPage, GuestTransportPage,
} from "./routes"
import { RequireAuth } from "@/features/auth/RequireAuth"

const App: FC = () => {
    return (
        <> 
            <Routes>
                Guest Routes
                <Route 
                    path = "/guest" 
                    element={
                        <RequireAuth requireAuth={true}>
                            <GuestLayout />
                        </RequireAuth>
                    }
                >
                    <Route path="dashboard" element={<GuestDashboardPage />} />
                    <Route path="flights" element={<GuestFlightsPage />} />
                    <Route path="hotel" element={<GuestHotelPage />} />
                    <Route path="transport" element={<GuestTransportPage />} />
                    <Route path="expenses" element={<GuestExpensesPage />} />
                </Route>
            </Routes>
        </>
    )
}

export default App