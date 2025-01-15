import { FC, FormEvent, useState } from "react"
import { Button, Input, Text } from "@/components"

import "./Login.scss"

export const Login: FC = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setError("")
        setIsLoading(true)

        try {
            // TODO: Implement actual login logic
            await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
            console.log("Login attempt with:", { email, password })
        } catch (err) {
            setError("Invalid email or password")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="login">
            <div className="login__card">
                <div className="login__header">
                    <Text
                        variant="body"
                        size="xl"
                        weight="bold"
                        className="login__title"
                    >
                        Sign in to your account
                    </Text>
                </div>

                <form onSubmit={handleSubmit} className="login__form">
                    {error && (
                        <div className="login__error">
                            <Text
                                variant="body"
                                size="sm"
                                className="text-danger"
                            >
                                {error}
                            </Text>
                        </div>
                    )}

                    <div className="login__input-group">
                        <Input
                            type="email"
                            label="Email"
                            size="sm"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder=""
                            required
                        />
                    </div>

                    <div className="login__input-group">
                        <Input
                            type="password"
                            label="Password"
                            size="sm"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                        <Text size="sm">
                            <a
                                href="/forgot-password"
                                className="login__forgot-link"
                            >
                                Forgot password?
                            </a>
                        </Text>
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                        className="login__submit"
                        isLoading={isLoading}
                        isDisabled={isLoading}
                    >
                        Sign In
                    </Button>
                </form>

                <div className="login__footer">
                    <Text variant="body" size="sm" className="login__subtitle">
                        Don't have an account?{" "}
                        <a href="/register" className="login__link">
                            Sign up
                        </a>
                    </Text>
                </div>
            </div>
        </div>
    )
}
