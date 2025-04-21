import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { QueryClientProvider } from "@tanstack/react-query"
import { HelmetProvider } from 'react-helmet-async'
import { MantineProvider } from "@mantine/core"
import '@mantine/core/styles.css'
import '@mantine/charts/styles.css'
import '@mantine/dates/styles.css'
import { queryClient } from "../../../packages/api/src/query-client"
import App from "./App"
import "./styles/index.scss"

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
          <HelmetProvider>
            <QueryClientProvider client={queryClient}>
                {/* <AuthProvider> */}
                    <MantineProvider defaultColorScheme="auto">
                        <BrowserRouter>
                            <App />
                        </BrowserRouter>
                    </MantineProvider>
                {/* </AuthProvider> */}
                </QueryClientProvider>
          </HelmetProvider>
    </React.StrictMode>
)
