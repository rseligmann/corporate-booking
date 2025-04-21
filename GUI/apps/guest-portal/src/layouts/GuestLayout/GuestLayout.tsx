import { FC } from "react"
import { Outlet } from "react-router-dom"
import "./GuestLayout.scss"

const GuestLayout: FC = () => {
    return (
        <div className="guest-layout">
            <header className="guest-layout__header">
                <div className="guest-layout__container">
                    <div className="guest-layout__logo">
                        TravelPortal
                    </div>
                </div>
            </header>
            <main className="guest-layout__main">
                <div className="guest-layout__container">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}

export default GuestLayout