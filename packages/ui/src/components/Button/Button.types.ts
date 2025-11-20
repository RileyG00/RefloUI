import { ButtonHTMLAttributes } from "react";

export type ButtonColor =
	| "primary"
	| "secondary"
	| "tertiary"
	| "default"
	| "success"
	| "info"
	| "warning"
	| "danger";
export type ButtonVariant =
	| "solid"
	| "outline"
	| "outlineFill"
	| "outlineRemove"
	| "ghost"
	| "flat";
export type ButtonSize = "sm" | "md" | "lg";
export type ButtonRadius =
	| "none"
	| "xs"
	| "sm"
	| "md"
	| "lg"
	| "xl"
	| "2xl"
	| "3xl"
	| "4xl"
	| "full";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	color?: ButtonColor;
	variant?: ButtonVariant;
	size?: ButtonSize;
	radius?: ButtonRadius;
	fullWidth?: boolean;
	isLoading?: boolean;
	isDisabled?: boolean;
	isDisableRipple?: boolean;
}
