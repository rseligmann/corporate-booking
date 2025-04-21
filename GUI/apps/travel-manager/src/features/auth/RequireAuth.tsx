import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"

interface RequireAuthProps {
    children: React.ReactNode
    requireAuth?: boolean
}

export const RequireAuth: React.FC<RequireAuthProps> = ({ children, requireAuth = false } ) => {
    const location = useLocation()
    const { authState } = useAuth()

    if (requireAuth && !authState.isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

return <>{children}</>
}