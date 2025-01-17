import { FC } from "react"
import { Outlet } from "react-router-dom"
import "./AuthLayout.scss"

const AuthLayout: FC = () => {
    return (
        <div className="auth-layout">
            <header className="auth-layout__header">
                <div className="auth-layout__container">
                    <div className="auth-layout__logo">
                        TravelPortal
                    </div>
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

export default AuthLayout