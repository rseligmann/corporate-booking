import React from "react"
import './alert.scss'

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'destructive';
}

interface AlertTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

interface AlertDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
    ({ className = '', variant = 'default', ...props }, ref) => (
        <div
            ref={ref}
            role="alert"
            className={`alert alert--${variant} ${className}`}
            {...props}
        />
    )
)
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<HTMLHeadingElement, AlertTitleProps>(
    ({ className = '', ...props }, ref) => (
        <h5
            ref={ref}
            className={`alert__title ${className}`}
            {...props}
        />
    )
)
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<HTMLParagraphElement, AlertDescriptionProps>(
    ({ className = '', ...props }, ref) => (
        <div
            ref={ref}
            className={`alert__description ${className}`}
            {...props}
        />
    )
)
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }