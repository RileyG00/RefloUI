import { forwardRef } from "react";
import clsx from "clsx";
import { ButtonProps, ButtonVariant, ButtonSize } from "./Button.types";
import "../../styles/tokens.css";
import "./Button.css";

const variantClasses: Record<ButtonVariant, string> = {
	solid: "rf-btn--solid",
	outline: "rf-btn--outline",
	ghost: "rf-btn--ghost",
};

const sizeClasses: Record<ButtonSize, string> = {
	sm: "rf-btn--sm",
	md: "rf-btn--md",
	lg: "rf-btn--lg",
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
				"rf-btn",
				variantClasses[variant],
				sizeClasses[size],
				fullWidth && "rf-btn--full",
				(disabled || loading) && "rf-btn--disabled",
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
