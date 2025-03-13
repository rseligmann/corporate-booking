import { FC, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Text, TextInput } from '@mantine/core';
import { useConfirmSignup } from "@/api/hooks/useAuth"
import { ConfirmSignupRequest } from "@/types";
import { CircleAlert } from 'lucide-react'
import classes from "./ConfirmSignup.module.scss"


export const ConfirmSignup: FC = () => {
    const navigate = useNavigate();
    const { mutate, isPending, error } = useConfirmSignup();
    const defaultEmail = sessionStorage.getItem('signupEmail') || '';
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<ConfirmSignupRequest>({
        defaultValues: {
            email: defaultEmail
        }
    });

     // Pre-fill email if we have it
    useEffect(() => {
        if (defaultEmail) {
        setValue('email', defaultEmail);
        }
    }, [defaultEmail, setValue]);

    const onSubmit = (data: ConfirmSignupRequest) => {
        mutate(data);
    };

    // Redirect to signup if we don't have an email
    useEffect(() => {
        if (!defaultEmail) {
        navigate('/signup', { 
            state: { 
            message: 'Please sign up before confirming your account' 
            } 
        });
        }
    }, [defaultEmail, navigate]);

    return (
        <div className={classes.confirm}>
            <div className={classes.confirm__card}>
                <h1 className={classes.confirm__title}>Confirm your account</h1>
                <Text size="md" c="dimmed">
                    We've sent a confirmation code to your email. Please enter it below to verify your account.
                </Text>

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
                <form onSubmit={handleSubmit(onSubmit)} className={classes.confirm__form}>
                    <Text fw={700} c="dimmed">Personal Information</Text>
                    <div className={classes.confirm__field}>
                        <TextInput
                            label="Email"
                            placeholder={defaultEmail}
                            disabled
                            value={defaultEmail}
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
                    <div className={classes.confirm__field}>
                        <TextInput
                            label="Confirmation Code"
                            required
                            withAsterisk
                            placeholder="Enter code sent to your email"
                            error={errors.confirmation_code?.message}
                            {...register('confirmation_code', { 
                                required: 'Confirmation code is required' 
                              })}
                        />
                    </div>   
                    
                    <Button 
                        type="submit"
                        fullWidth
                        disabled={isPending}
                    >
                        {isPending ? 'Verifying...' : 'Verify Account'}
                    </Button>
                </form>
                
                <div className={classes.confirm__footer}>
                    <span>Didn't Recieve a Code? </span>
                    <a 
                        //Feature is not yet implemented
                        //href="/login" 
                        className={classes.confirm__link}
                    >
                        Resend Code
                    </a>
                </div>
            </div>
        </div>
    )
}