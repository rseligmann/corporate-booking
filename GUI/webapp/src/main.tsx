import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider } from "~/contexts/ThemeContext"
import { queryClient } from "~/api/query-client"
import App from "./App"
import "./styles/index.scss"

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </ThemeProvider>
        </QueryClientProvider>
    </React.StrictMode>
)
