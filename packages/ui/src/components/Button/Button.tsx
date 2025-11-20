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
			primary:
				"[--btn-color:var(--color-primary)] [--btn-foreground:var(--color-primary-foreground)] focus-visible:outline-[var(--color-primary)]",
			secondary:
				"[--btn-color:var(--color-secondary)] [--btn-foreground:var(--color-secondary-foreground)] focus-visible:outline-[var(--color-secondary)]",
			tertiary:
				"[--btn-color:var(--color-tertiary)] [--btn-foreground:var(--color-tertiary-foreground)] focus-visible:outline-[var(--color-tertiary)]",
			default:
				"[--btn-color:var(--color-default)] [--btn-foreground:var(--color-default-foreground)] focus-visible:outline-[var(--color-default)]",
		} satisfies Record<ButtonColor, string>,
		variant: {
			solid: "border-transparent bg-[var(--btn-color)] text-[var(--btn-foreground)] enabled:hover:bg-[color-mix(in_srgb,var(--btn-color)_80%,transparent)]",
			outline:
				"bg-transparent text-[var(--btn-color)] border-[var(--btn-color)] enabled:hover:bg-[color-mix(in_srgb,var(--btn-color)_15%,transparent)]",
			ghost: "bg-transparent border-transparent text-[var(--btn-color)] enabled:hover:bg-[color-mix(in_srgb,var(--btn-color)_15%,transparent)]",
			flat: "border-transparent text-[var(--btn-color)] bg-[color-mix(in_srgb,var(--btn-color)_20%,transparent)] enabled:hover:bg-[color-mix(in_srgb,var(--btn-color)_10%,transparent)]",
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
	compoundVariants: [
		{
			variant: "flat",
			color: "default",
			class: "text-[var(--color-default-950)] bg-[color-mix(in_srgb,var(--btn-color)_40%,transparent)] enabled:hover:bg-[color-mix(in_srgb,var(--btn-color)_25%,transparent)]",
		},
	],
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

