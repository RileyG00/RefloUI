import { ButtonHTMLAttributes } from "react";

export type ButtonColor = "primary" | "secondary" | "tertiary";
// | "default"
// | "success"
// | "warning"
// | "danger"
// | "info";
export type ButtonVariant = "solid" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	color?: ButtonColor;
	variant?: ButtonVariant;
	size?: ButtonSize;
	fullWidth?: boolean;
	isLoading?: boolean;
	isDisabled?: boolean;
}
