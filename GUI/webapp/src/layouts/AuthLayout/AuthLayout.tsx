import { FC } from "react"
import { Outlet } from "react-router-dom"
import "./AuthLayout.scss"

export const AuthLayout: FC = () => {
    return (
        <div className="auth-layout">
            <header className="auth-layout__header">
                <div className="auth-layout__logo">
                    {/* TODO: Replace with your actual logo */}
                    <span className="auth-layout__logo-text">LOGO/NAME</span>
                </div>
            </header>
            <main className="auth-layout__main">
                <div className="auth-layout__container">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}
