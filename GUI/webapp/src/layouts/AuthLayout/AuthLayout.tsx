import { FC } from "react"
import { Outlet, useLocation } from "react-router-dom"
import "./AuthLayout.scss"

export const AuthLayout: FC = () => {
    const locattion = useLocation();
    const isRegisterPage = locattion.pathname === "/register";
    return (
        <div className="auth-layout">
            <main className="auth-layout__main">
                <div className={`auth-layout__container ${isRegisterPage ? "auth-layout__container--register" : ""}`}>
                    <Outlet />
                </div>
            </main>
        </div>
    )
}

export default AuthLayout