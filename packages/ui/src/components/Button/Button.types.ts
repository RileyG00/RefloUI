import { CSSProperties, ReactNode, Ref } from "react";
import { AriaButtonProps } from "react-aria";
import buttonStyles from "./Button.styles";

export type Ripple = {
	id: number;
	style: CSSProperties;
};

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
	| "dashed"
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

type AriaButtonPropsCleansed = Omit<AriaButtonProps, "onClick">;
type ButtonStyleSlots = Partial<(typeof buttonStyles)["slots"]>;

export interface ButtonProps extends AriaButtonPropsCleansed {
	children?: ReactNode;
	className?: string;
	classNames?: ButtonStyleSlots;
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
	onHoverStart?: () => any;
	onHoverEnd?: () => any;
	onHoverChange?: () => any;
}
