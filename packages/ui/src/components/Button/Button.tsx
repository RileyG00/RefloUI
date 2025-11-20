import { forwardRef } from "react";
import { tv } from "tailwind-variants";
import {
	ButtonProps,
	ButtonVariant,
	ButtonSize,
	ButtonColor,
} from "./Button.types";
import "../../styles/tokens.css";

const buttonStyles = tv({
	base: [
		"inline-flex items-center justify-center",
		"font-medium font-[var(--font-family)]",
		"border transition-colors duration-[var(--transition-duration)] var(--transition-style)",
		"min-w-fit",
		"focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1",
		"disabled:opacity-60 disabled:cursor-not-allowed",
		"hover:cursor-pointer",
	].join(" "),
	variants: {
		color: {
			primary: [
				"[--btn-surface:var(--color-primary-surface)]",
				"[--btn-on-surface:var(--color-primary-foreground)]",
				"[--btn-on-light:var(--color-primary-on-light)]",
				"[--btn-tint:var(--color-primary-tint)]",
				"focus-visible:outline-[var(--color-primary-on-light)]",
			].join(" "),
			secondary: [
				"[--btn-surface:var(--color-secondary-surface)]",
				"[--btn-on-surface:var(--color-secondary-foreground)]",
				"[--btn-on-light:var(--color-secondary-on-light)]",
				"[--btn-tint:var(--color-secondary-tint)]",
				"focus-visible:outline-[var(--color-secondary-on-light)]",
			].join(" "),
			tertiary: [
				"[--btn-surface:var(--color-tertiary-surface)]",
				"[--btn-on-surface:var(--color-tertiary-foreground)]",
				"[--btn-on-light:var(--color-tertiary-on-light)]",
				"[--btn-tint:var(--color-tertiary-tint)]",
				"focus-visible:outline-[var(--color-tertiary-on-light)]",
			].join(" "),
			default: [
				"[--btn-surface:var(--color-default-surface)]",
				"[--btn-on-surface:var(--color-default-foreground)]",
				"[--btn-on-light:var(--color-default-on-light)]",
				"[--btn-tint:var(--color-default-tint)]",
				"focus-visible:outline-[var(--color-default-on-light)]",
			].join(" "),
			success: [
				"[--btn-surface:var(--color-success-surface)]",
				"[--btn-on-surface:var(--color-success-foreground)]",
				"[--btn-on-light:var(--color-success-on-light)]",
				"[--btn-tint:var(--color-success-tint)]",
				"focus-visible:outline-[var(--color-success-on-light)]",
			].join(" "),
			info: [
				"[--btn-surface:var(--color-info-surface)]",
				"[--btn-on-surface:var(--color-info-foreground)]",
				"[--btn-on-light:var(--color-info-on-light)]",
				"[--btn-tint:var(--color-info-tint)]",
				"focus-visible:outline-[var(--color-info-on-light)]",
			].join(" "),
			warning: [
				"[--btn-surface:var(--color-warning-surface)]",
				"[--btn-on-surface:var(--color-warning-foreground)]",
				"[--btn-on-light:var(--color-warning-on-light)]",
				"[--btn-tint:var(--color-warning-tint)]",
				"focus-visible:outline-[var(--color-warning-on-light)]",
			].join(" "),
			danger: [
				"[--btn-surface:var(--color-danger-surface)]",
				"[--btn-on-surface:var(--color-danger-foreground)]",
				"[--btn-on-light:var(--color-danger-on-light)]",
				"[--btn-tint:var(--color-danger-tint)]",
				"focus-visible:outline-[var(--color-danger-on-light)]",
			].join(" "),
		} satisfies Record<ButtonColor, string>,
		variant: {
			solid: [
				"border-transparent",
				"bg-[var(--btn-surface)]",
				"text-[var(--btn-on-surface)]",
				"enabled:hover:bg-[color-mix(in_srgb,var(--btn-surface)_85%,transparent)]",
			].join(" "),
			outline: [
				"bg-transparent text-[var(--btn-on-light)]",
				"border-[var(--btn-on-light)]",
				"enabled:hover:bg-[color-mix(in_srgb,var(--btn-on-light)_12%,transparent)]",
			].join(" "),
			outlineFill: [
				"bg-transparent text-[var(--btn-on-light)]",
				"border-[var(--btn-on-light)]",
				"enabled:hover:bg-[color-mix(in_srgb,var(--btn-on-light)_100%,transparent)]",
				"enabled:hover:text-[var(--btn-on-surface)]",
			].join(" "),
			ghost: [
				"bg-transparent",
				"border-transparent",
				"text-[var(--btn-on-light)]",
				"enabled:hover:bg-[color-mix(in_srgb,var(--btn-on-light)_12%,transparent)]",
			].join(" "),
			flat: [
				"border-transparent",
				"text-[var(--btn-on-light)]",
				"bg-[color-mix(in_srgb,var(--btn-tint)_80%,transparent)]",
				"enabled:hover:bg-[color-mix(in_srgb,var(--btn-tint)_65%,transparent)]",
			].join(" "),
		} satisfies Record<ButtonVariant, string>,
		size: {
			sm: "text-sm py-[0.3rem] px-[0.75rem]",
			md: "text-base py-[0.4rem] px-[1rem]",
			lg: "text-lg py-[0.5rem] px-[1.25rem]",
		} satisfies Record<ButtonSize, string>,
		fullWidth: {
			true: "w-full",
		},
		radius: {
			none: "rounded-[var(--radius-none)]",
			xs: "rounded-[var(--radius-xs)]",
			sm: "rounded-[var(--radius-sm)]",
			md: "rounded-[var(--radius-md)]",
			lg: "rounded-[var(--radius-lg)]",
			xl: "rounded-[var(--radius-xl)]",
			"2xl": "rounded-[var(--radius-2xl)]",
			"3xl": "rounded-[var(--radius-3xl)]",
			"4xl": "rounded-[var(--radius-4xl)]",
			full: "rounded-full",
		},
	},
	defaultVariants: {
		color: "primary",
		variant: "solid",
		size: "md",
		radius: "lg",
	},
});

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			color = "primary",
			variant = "solid",
			size = "md",
			radius = "lg",
			fullWidth = false,
			isLoading = false,
			isDisabled = false,
			children,
			...rest
		},
		ref,
	) => (
		<button
			ref={ref}
			data-loading={isLoading}
			data-disabled={isDisabled}
			className={buttonStyles({
				color,
				variant,
				size,
				radius,
				fullWidth,
				class: className,
			})}
			disabled={isDisabled || isLoading}
			{...rest}
		>
			{children}
		</button>
	),
);

Button.displayName = "Button";

