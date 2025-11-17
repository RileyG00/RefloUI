import { forwardRef } from "react";
import clsx from "clsx";
import { ButtonProps } from "./Button.types";
import "../styles/tokens.css";

const variantClasses: Record<ButtonProps["variant"], string> = {
	solid: "bg-[var(--rf-color-primary)] text-[var(--rf-color-primary-foreground)] border-transparent",
	outline:
		"border border-[var(--rf-color-primary)] text-[var(--rf-color-primary)] bg-transparent",
	ghost: "bg-transparent text-[var(--rf-color-primary)] border-transparent hover:bg-[color-mix(in srgb,var(--rf-color-primary) 10%,transparent)]",
};

const sizeClasses: Record<ButtonProps["size"], string> = {
	sm: "text-sm px-3 py-1.5",
	md: "text-base px-4 py-2",
	lg: "text-lg px-5 py-2.5",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			variant = "solid",
			size = "md",
			fullWidth,
			loading,
			children,
			disabled,
			...rest
		},
		ref,
	) => (
		<button
			ref={ref}
			className={clsx(
				"inline-flex items-center justify-center rounded-[var(--rf-radius-md)] font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rf-color-primary)]",
				variantClasses[variant],
				sizeClasses[size],
				fullWidth && "w-full",
				(disabled || loading) && "opacity-60 cursor-not-allowed",
				className,
			)}
			disabled={disabled || loading}
			{...rest}
		>
			{loading ? "Loading..." : children}
		</button>
	),
);

Button.displayName = "Button";
