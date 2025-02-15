import { FC } from "react"
import { Outlet } from "react-router-dom"
import { TravelMgrPortalHeader } from "@/components/TravelMgrPortalHeader/TravelMgrPortalHeader"
import { AppShell, Container } from '@mantine/core'

const DefaultLayout: FC = () => {
    
    return (
        <AppShell
        header={{ height: 60 }}
        padding="md"
        bg="var(--mantine-color-gray-0)"
        >
        <AppShell.Header>
            <TravelMgrPortalHeader />
        </AppShell.Header>

        <AppShell.Main pt={60}>
            <Container size="xl">
            <Outlet />
            </Container>
        </AppShell.Main>
        </AppShell>
    )
}

export default DefaultLayout;