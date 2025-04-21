import { FC } from "react"
import { useForm } from "react-hook-form"
import { Alert, Button, PasswordInput, Text, TextInput } from '@mantine/core';
import { useSignup } from "@/features/auth/useAuth"
import { SignupRequest, SignupFormData } from "@/types";
import { CircleAlert } from 'lucide-react'
import classes from "./Register.module.scss"

export const Register: FC = () => {
    const { mutate, isPending, error } = useSignup();
    const { register, handleSubmit, watch, formState: { errors } } = useForm<SignupFormData>();

    const password = watch('password', '');

    const onSubmit = (data: SignupFormData) => {
        
        if (!data.company) {
            data.company = {};
        }
        // if (!data.company.location) {
        //     data.company.location = "Not specified";
        // }
        // Store password temporarily for auto-login after confirmation
        sessionStorage.setItem('tempPassword', data.password);
        const signupData: SignupRequest = {
            email: data.email,
            password: data.password,
            first_name: data.first_name,
            last_name: data.last_name,
            company: {
                name: data.company?.name,
                street: data.company?.street,
                city: data.company?.city,
                state: data.company?.state,
                country: data.company?.country,
                postal_code: data.company?.postal_code
            }
          };
        mutate(signupData);
    };

    return (
        <div className={classes.register}>
            <div className={classes.register__card}>
                <h1 className={classes.register__title}>Create a new account</h1>

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
                <form onSubmit={handleSubmit(onSubmit)} className={classes.register__form}>
                    <Text fw={700} c="dimmed">Personal Information</Text>
                    <div className={classes.register__namegroup}>
                        <div className={classes.register__field}>
                            <TextInput
                                label="First Name"
                                placeholder="Enter first name"
                                required
                                withAsterisk
                                error={errors.first_name?.message}
                                {...register('first_name', { required: 'First name is required' })}
                            />
                        </div>
                        <div className={classes.register__field}>
                            <TextInput
                                label="Last Name"
                                placeholder="Enter last name"
                                required
                                withAsterisk
                                error={errors.last_name?.message}
                                {...register('last_name', { required: 'Last name is required' })}
                            />
                        </div>
                    </div>
                    <div className={classes.register__field}>
                        <TextInput
                            label="Email"
                            placeholder="you@example.com"
                            required
                            withAsterisk
                            error={errors.email?.message}
                            {...register('email', { 
                                required: 'Email is required',
                                pattern: {
                                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                  message: 'Invalid email address'
                                }
                            })}
                        />
                    </div>
                    <div className={classes.register__field}>
                        <PasswordInput
                            label="Password"
                            placeholder="your password"
                            required
                            withAsterisk
                            error={errors.password?.message}
                            {...register('password', { 
                                required: 'Password is required',
                                minLength: {
                                  value: 8,
                                  message: 'Password must be at least 8 characters'
                                },
                                validate: {
                                  hasUpperCase: (value) => 
                                    /[A-Z]/.test(value) || 'Password must contain at least one uppercase letter',
                                  hasLowerCase: (value) => 
                                    /[a-z]/.test(value) || 'Password must contain at least one lowercase letter',
                                  hasNumber: (value) => 
                                    /[0-9]/.test(value) || 'Password must contain at least one number'
                                }
                              })}
                        />
                    </div>
                    <div className={classes.register__field}>
                        <PasswordInput
                            label="Confirm Password"
                            placeholder="confirm your password"
                            required
                            withAsterisk
                            error={errors.confirmPassword?.message}
                            {...register('confirmPassword', { 
                                validate: (value) => value === password || 'The passwords do not match'
                              })}
                        />
                    </div>
                    <Text fw={700} c="dimmed">Company Information</Text>
                    <div className={classes.register__field}>
                        <TextInput
                            label="Company Name"
                            required
                            withAsterisk
                            placeholder="Enter name of company"
                            error={errors.company?.name?.message}
                            {...register('company.name', { 
                                required: 'Company name is required' 
                              })}
                        />
                    </div>
                    <div className={classes.register__field}>
                        <TextInput
                            label="Street Address"
                            required
                            withAsterisk
                            placeholder="Street Address"
                            error={errors.company?.street?.message}
                            {...register('company.street', { 
                                required: 'Street address is required' 
                              })}
                        />
                    </div>
                    <div className={classes.register__field}>
                        <TextInput
                            label="City"
                            required
                            withAsterisk
                            placeholder="City"
                            error={errors.company?.city?.message}
                            {...register('company.city', { 
                                required: 'City is required' 
                              })}
                        />
                    </div>
                    <div className={classes.register__field}>
                        <TextInput
                            label="Postal Code"
                            required
                            withAsterisk
                            placeholder="Postal Code"
                            error={errors.company?.postal_code?.message}
                            {...register('company.postal_code', { 
                                required: 'Postal code is required' 
                              })}
                        />
                    </div>
                    <div className={classes.register__namegroup}>
                        <div className={classes.register__field}>
                            <TextInput
                                label="State"
                                required
                                withAsterisk
                                placeholder="State"
                                error={errors.company?.state?.message}
                                {...register('company.state', { 
                                    required: 'State is required' 
                                  })}
                            />
                        </div>
                        <div className={classes.register__field}>
                            <TextInput
                                label="Country"
                                required
                                withAsterisk
                                placeholder="Country"
                                error={errors.company?.country?.message}
                                {...register('company.country', { 
                                    required: 'Country is required' 
                                  })}
                            />
                        </div>
                    </div>
                    
                    
                    <Button 
                        type="submit"
                        fullWidth
                        loading={isPending}
                    >
                        {isPending ? 'Creating Account...' : 'Create Account'}
                    </Button>
                </form>
                
                <div className={classes.register__footer}>
                    <span>Have an account? </span>
                    <a href="/login" className={classes.register__link}>Sign in</a>
                </div>
            </div>
        </div>
    )
}