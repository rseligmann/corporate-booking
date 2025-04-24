import { Navigate, useLocation } from "react-router-dom"
import { useAuthGuest } from "@/contexts/AuthContextGuest"

interface RequireAuthProps {
    children: React.ReactNode
    requireAuth?: boolean
}

export const RequireAuth: React.FC<RequireAuthProps> = ({ children, requireAuth = false } ) => {
    const location = useLocation()
    const { authState } = useAuthGuest()

    if (requireAuth && !authState.isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

return <>{children}</>
}