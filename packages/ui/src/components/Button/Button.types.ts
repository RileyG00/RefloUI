import { ButtonHTMLAttributes, ReactNode, Ref } from "react";

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
	| "outlineRemain"
	| "ghost"
	| "ghostOutline"
	| "flat"
	| "none"
	| "shadow";
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
	ref?: Ref<HTMLButtonElement>;
	startContent?: ReactNode | string;
	endContent?: ReactNode | string;
	color?: ButtonColor;
	variant?: ButtonVariant;
	size?: ButtonSize;
	radius?: ButtonRadius;
	fullWidth?: boolean;
	isLoading?: boolean;
	isDisabled?: boolean;
	isDisableRipple?: boolean;
}
