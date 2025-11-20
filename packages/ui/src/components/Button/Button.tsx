import { forwardRef } from "react";
import clsx from "clsx";
import {
	ButtonProps,
	ButtonVariant,
	ButtonSize,
	ButtonColor,
} from "./Button.types";
import "../../styles/tokens.css";
import "./Button.css";

const colorClasses: Record<ButtonColor, string> = {
	primary: "rf-btn--primary",
	secondary: "rf-btn--secondary",
	tertiary: "rf-btn--tertiary",
};

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
			color = "primary",
			variant = "solid",
			size = "md",
			fullWidth,
			isLoading,
			isDisabled,
			children,
			...rest
		},
		ref,
	) => (
		<button
			ref={ref}
			className={clsx(
				"rf-btn",
				colorClasses[color],
				variantClasses[variant],
				sizeClasses[size],
				fullWidth && "rf-btn--full",

				className,
			)}
			disabled={isDisabled || isLoading}
			{...rest}
		>
			{children}
		</button>
	),
);

Button.displayName = "Button";
