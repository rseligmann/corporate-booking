import { FC } from "react"
import { Outlet } from "react-router-dom"
import { Nav } from "@components"
import "./DefaultLayout.scss"

const DefaultLayout: FC = () => {
    return (
        <div className="app">
            <Nav />
            <main className="main-content">
                <Outlet />
            </main>
        </div>
    )
}

export default DefaultLayout
