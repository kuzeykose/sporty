import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}
declare enum InputVariants {
    Primary = "primary",
    Password = "password"
}
declare const Input: ({ label, ...rest }: InputProps) => JSX.Element;

export { Input, InputVariants };
