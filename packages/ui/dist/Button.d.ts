import { ButtonHTMLAttributes } from 'react';

declare enum ButtonVariants {
    Primary = "primary",
    Secondary = "secondary",
    Soft = "soft"
}
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariants;
}
declare const Button: ({ children, variant, className, ...rest }: ButtonProps) => JSX.Element;

export { Button, ButtonVariants };
