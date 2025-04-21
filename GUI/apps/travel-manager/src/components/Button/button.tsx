import { FC, ButtonHTMLAttributes, ReactNode } from "react"
import "./Button.scss"

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
    size?: 'default' | 'sm' | 'lg' | 'icon'
    fullWidth?: boolean
    isLoading?: boolean
    asChild?: boolean // For compatibility with existing code
}

const Button: FC<ButtonProps> = ({
    children,
    variant = 'default',
    size = 'default',
    fullWidth = false,
    isLoading = false,
    className = '',
    disabled,
    ...props
}) => {
    const buttonClasses = [
        'button',
        `button--${variant}`,
        `button--${size}`,
        fullWidth ? 'button--full-width' : '',
        isLoading ? 'button--loading' : '',
        className
    ].filter(Boolean).join(' ')

    return (
        <button
            className={buttonClasses}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && (
                <span className="button__spinner">
                    <svg viewBox="0 0 24 24">
                        <circle
                            className="button__spinner-circle"
                            cx="12"
                            cy="12"
                            r="10"
                            fill="none"
                            strokeWidth="3"
                        />
                    </svg>
                </span>
            )}
            {!isLoading && children}
            {/*<span className={`button__content ${isLoading ? 'button__content--loading' : ''}`}>
                {children}

            </span>*/}
        </button>
    )
}

export default Button