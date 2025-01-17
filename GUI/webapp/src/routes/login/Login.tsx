import { FC, FormEvent, useState } from "react"
import  Button  from "@/components/Button/button"
import { Input } from "@/components/Input"; 
import "./Login.scss"

export const Login: FC = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        // Handle login logic
    }

    return (
        <div className="login">
            <div className="login__card">
                <h1 className="login__title">Sign in to your account</h1>
                <form onSubmit={handleSubmit} className="login__form">
                    <div className="login__field">
                        <label htmlFor="email" className="login__label">Email</label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div className="login__field">
                        <label htmlFor="password" className="login__label">Password</label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    
                    <Button type="submit" variant="default" fullWidth>
                        Sign In
                    </Button>
                </form>
                
                <div className="login__footer">
                    <span>Don't have an account? </span>
                    <a href="/register" className="login__link">Sign up</a>
                </div>
            </div>
        </div>
    )
}