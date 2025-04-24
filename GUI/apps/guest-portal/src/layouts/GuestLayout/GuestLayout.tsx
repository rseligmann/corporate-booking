import { FC } from "react"
import { Outlet } from "react-router-dom"
import { AppShell } from '@mantine/core'
import classes from "./GuestLayout.module.scss"

const GuestLayout: FC = () => {
    return (
        <AppShell
            header={{ height: 60 }}
            padding="md"
            bg="var(--mantine-color-gray-0)"
        >
        <AppShell.Header >
            <div className={classes.guestLayout}>
                <div className={classes.guestLayout__container}>
                    <div className={classes.guestLayout__flex}>
                        <div className={classes.guestLayout__logo}>
                            TravelPortal
                        </div>
                    </div>
                </div>
            </div>
        </AppShell.Header>

        <AppShell.Main pt={60}>
            <Outlet />
        </AppShell.Main>
        </AppShell>
    )
}

export default GuestLayout