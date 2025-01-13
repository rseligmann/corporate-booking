import { Navigate, useLocation } from "react-router-dom"

interface RequireAuthProps {
    children: React.ReactNode
}

export function RequireAuth({ children }: RequireAuthProps) {
    const location = useLocation()

    // TODO: add real auth logic
    const isAuthenticated = false

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return <>{children}</>
}
