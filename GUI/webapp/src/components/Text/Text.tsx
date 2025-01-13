import { ElementType, FC, ReactNode } from "react"
import "./Text.scss"

export type TextSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl"
export type TextWeight = "light" | "normal" | "medium" | "semibold" | "bold"
export type TextAlign = "left" | "center" | "right" | "justify"
export type TextTransform = "none" | "capitalize" | "uppercase" | "lowercase"
export type TextVariant = "body" | "display" | "mono" | "caption"

export interface TextProps {
    children: ReactNode
    size?: TextSize
    weight?: TextWeight
    align?: TextAlign
    transform?: TextTransform
    variant?: TextVariant
    as?: ElementType
    truncate?: boolean
    maxLines?: number
    className?: string
    color?: string
    italic?: boolean
}

const Text: FC<TextProps> = ({
    children,
    size = "md",
    weight = "normal",
    align = "left",
    transform = "none",
    variant = "body",
    as: Component = "p",
    truncate = false,
    maxLines,
    className = "",
    color,
    italic = false,
}) => {
    const baseClass = "text"
    const classes = [
        baseClass,
        `${baseClass}--${variant}`,
        `${baseClass}--${size}`,
        `${baseClass}--${weight}`,
        align !== "left" && `${baseClass}--${align}`,
        transform !== "none" && `${baseClass}--${transform}`,
        truncate && `${baseClass}--truncate`,
        maxLines && `${baseClass}--multiline`,
        italic && `${baseClass}--italic`,
        className,
    ]
        .filter(Boolean)
        .join(" ")

    const style = {
        ...(color && { color }),
        ...(maxLines && {
            WebkitLineClamp: maxLines,
        }),
    }

    return (
        <Component className={classes} style={style}>
            {children}
        </Component>
    )
}

export default Text
