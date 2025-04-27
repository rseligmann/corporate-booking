import { FC } from "react"
import { Outlet } from "react-router-dom"
import { TravelMgrPortalHeader } from "@/components/TravelMgrPortalHeader/TravelMgrPortalHeader"
import { AppShell } from '@mantine/core'
import classes from './DefaultLayout.module.scss'

const DefaultLayout: FC = () => {
    
    return (
        <AppShell
            header={{ height: 60 }}
            padding="md"
            className={classes.background}
        >
        <AppShell.Header >
            <TravelMgrPortalHeader />
        </AppShell.Header>

        <AppShell.Main pt={60}>
            {/* <Container size="xl"> */}
            <Outlet />
            {/* </Container> */}
        </AppShell.Main>
        </AppShell>
    )
}

export default DefaultLayout;