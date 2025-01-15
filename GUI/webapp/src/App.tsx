import { FC } from "react"
import { Routes, Route } from "react-router-dom"
import { DefaultLayout } from "@/layouts/DefaultLayout"
import { AuthLayout } from "@/layouts/AuthLayout"
import { Login } from "@/routes/login"
import { RequireAuth } from "@/features/auth/RequireAuth"
import "~/styles/App.scss"

const App: FC = () => {
    return (
        <Routes>
            {/* Auth routes */}
            <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
                {/* Add other auth routes like register, forgot-password here */}
            </Route>

            {/* Protected routes */}
            <Route
                path="/"
                element={
                    <RequireAuth>
                        <DefaultLayout />
                    </RequireAuth>
                }
            >
                <></>
            </Route>
        </Routes>
    )
}

export default App
