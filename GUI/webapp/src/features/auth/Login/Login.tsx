import { useForm } from "react-hook-form"
import { useLocation } from "react-router-dom"
import { LoginRequest } from "@/types"
import { useLogin } from "@/api/hooks/useAuth"
import { Alert, Button, PasswordInput, TextInput } from '@mantine/core';
import { CircleAlert } from 'lucide-react'
import "./Login.scss"

export const Login = () => {
    const location = useLocation()
    const message = location.state?.message
    const { mutate, isPending, error } = useLogin()

    const { register, handleSubmit, formState: { errors } } = useForm<LoginRequest>()
    
    const onSubmit = (data: LoginRequest) => {
        mutate(data)
    }

    return (
        <div className="login">
            <div className="login__card">
                <h1 className="login__title">Sign in to your account</h1>

                {message && (
                    <Alert color="green" mb="md">
                        {message}
                    </Alert>
                )}

                {error && (
                    <Alert 
                        icon={<CircleAlert size="1rem" />} 
                        title="Error" 
                        color="red" 
                        mb="md"
                    >
                        {(error as Error).message}
                    </Alert>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="login__form">
                    <div className="login__field">
                        <TextInput
                            label="Email"
                            placeholder="you@example.com"
                            required
                            error={errors.username?.message}
                            {...register('username', { 
                                required: 'Email is required',
                                pattern: {
                                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                  message: 'Invalid email address'
                                }
                            })}
                        />
                    </div>
                    
                    <div className="login__field">
                        <PasswordInput
                            label="Password"
                            placeholder="your password"
                            required
                            error={errors.password?.message}
                            {...register('password', { 
                                required: 'Password is required' 
                              })}
                        />
                    </div>
                    
                    <Button 
                        fullWidth
                        type="submit"
                        disabled={isPending}
                    >
                        {isPending ? 'Logging in...' : 'Log In'}
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