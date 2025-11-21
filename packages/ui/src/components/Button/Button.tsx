/* eslint-env browser */
import {
	forwardRef,
	useEffect,
	useRef,
	useState,
	type CSSProperties,
	type MouseEvent,
} from "react";
import { tv } from "tailwind-variants";
import {
	ButtonProps,
	ButtonVariant,
	ButtonSize,
	ButtonColor,
} from "./Button.types";
import "./Button.css";
import "../../styles/tokens.css";

type Ripple = {
	id: number;
	style: CSSProperties;
};

const RIPPLE_DURATION = 650;

const buttonStyles = tv({
	base: [
		"rfui-button",
		"inline-flex items-center justify-center",
		"font-medium font-[var(--font-family)]",
		"border",
		"transition-[background-color,color,border-color]",
		"duration-[var(--transition-duration)]",
		"ease-[var(--transition-style)]",
		"min-w-fit",
		"focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1",
		"disabled:opacity-60 disabled:cursor-not-allowed",
		"hover:cursor-pointer",
		"relative overflow-hidden",
		"enabled:active:scale-97",
	].join(" "),
	variants: {
		color: {
			primary: [
				"[--btn-bg:hsl(var(--color-primary))]",
				"[--btn-bg-hover:hsl(var(--color-primary)/0.75)]",
				"[--btn-bg-flat:hsl(var(--color-primary)/0.18)]",
				"[--btn-bg-flat-txt:hsl(var(--btn-bg))]",
				"[--btn-txt:hsl(var(--color-primary-foreground))]",
				"[--btn-txt-inverted:hsl(var(--color-primary-foreground-inverted))]",
				"focus-visible:outline-[hsl(var(--color-primary))]",
			].join(" "),
			secondary: [
				"[--btn-bg:hsl(var(--color-secondary))]",
				"[--btn-bg-hover:hsl(var(--color-secondary)/0.75)]",
				"[--btn-bg-flat:hsl(var(--color-secondary)/0.18)]",
				"[--btn-bg-flat-txt:hsl(var(--btn-bg))]",
				"[--btn-txt:hsl(var(--color-secondary-foreground))]",
				"[--btn-txt-inverted:hsl(var(--color-secondary-foreground-inverted))]",
				"focus-visible:outline-[hsl(var(--color-secondary))]",
			].join(" "),
			tertiary: [
				"[--btn-bg:hsl(var(--color-tertiary))]",
				"[--btn-bg-hover:hsl(var(--color-tertiary)/0.75)]",
				"[--btn-bg-flat:hsl(var(--color-tertiary)/0.18)]",
				"[--btn-bg-flat-txt:hsl(var(--btn-bg))]",
				"[--btn-txt:hsl(var(--color-tertiary-foreground))]",
				"[--btn-txt-inverted:hsl(var(--color-tertiary-foreground-inverted))]",
				"focus-visible:outline-[hsl(var(--color-tertiary))]",
			].join(" "),
			default: [
				"[--btn-bg:hsl(var(--color-default))]",
				"[--btn-bg-hover:hsl(var(--color-default)/0.75)]",
				"[--btn-bg-flat:hsl(var(--color-default)/0.18)]",
				"[--btn-bg-flat-txt:hsl(var(--btn-bg))]",
				"[--btn-txt:hsl(var(--color-default-foreground))]",
				"[--btn-txt-inverted:hsl(var(--color-default-foreground-inverted))]",
				"focus-visible:outline-[hsl(var(--color-default))]",
			].join(" "),
			success: [
				"[--btn-bg:hsl(var(--color-success))]",
				"[--btn-bg-hover:hsl(var(--color-success)/0.75)]",
				"[--btn-bg-flat:hsl(var(--color-success)/0.18)]",
				"[--btn-bg-flat-txt:hsl(var(--btn-bg))]",
				"[--btn-txt:hsl(var(--color-success-foreground))]",
				"[--btn-txt-inverted:hsl(var(--color-success-foreground-inverted))]",
				"focus-visible:outline-[hsl(var(--color-success))]",
			].join(" "),
			info: [
				"[--btn-bg:hsl(var(--color-info))]",
				"[--btn-bg-hover:hsl(var(--color-info)/0.75)]",
				"[--btn-bg-flat:hsl(var(--color-info)/0.18)]",
				"[--btn-bg-flat-txt:hsl(var(--btn-bg))]",
				"[--btn-txt:hsl(var(--color-info-foreground))]",
				"[--btn-txt-inverted:hsl(var(--color-info-foreground-inverted))]",
				"focus-visible:outline-[hsl(var(--color-info))]",
			].join(" "),
			warning: [
				"[--btn-bg:hsl(var(--color-warning))]",
				"[--btn-bg-hover:hsl(var(--color-warning)/0.75)]",
				"[--btn-bg-flat:hsl(var(--color-warning)/0.18)]",
				"[--btn-bg-flat-txt:hsl(var(--color-warning-700))]",
				"[--btn-txt:hsl(var(--color-warning-foreground))]",
				"[--btn-txt-inverted:hsl(var(--color-warning-foreground-inverted))]",
				"focus-visible:outline-[hsl(var(--color-warning))]",
			].join(" "),
			danger: [
				"[--btn-bg:hsl(var(--color-danger))]",
				"[--btn-bg-hover:hsl(var(--color-danger)/0.75)]",
				"[--btn-bg-flat:hsl(var(--color-danger)/0.18)]",
				"[--btn-bg-flat-txt:hsl(var((--btn-bg))]",
				"[--btn-txt:hsl(var(--color-danger-foreground))]",
				"[--btn-txt-inverted:hsl(var(--color-danger-foreground-inverted))]",
				"focus-visible:outline-[hsl(var(--color-danger))]",
			].join(" "),
		} satisfies Record<ButtonColor, string>,
		variant: {
			solid: [
				"border-transparent",
				"bg-[var(--btn-bg)]",
				"text-[var(--btn-txt)]",
				"enabled:hover:bg-[var(--btn-bg-hover)]",
			].join(" "),
			outline: [
				"bg-transparent",
				"text-[var(--btn-bg)]",
				"border-[var(--btn-bg)]",
				"enabled:hover:bg-[color-mix(in_srgb,var(--btn-bg)_20%,transparent)]",
			].join(" "),
			outlineFill: [
				"bg-transparent",
				"text-[var(--btn-bg)]",
				"border-[var(--btn-bg)]",
				"enabled:hover:bg-[color-mix(in_srgb,var(--btn-bg)_100%,transparent)]",
				"enabled:hover:text-[var(--btn-txt)]",
			].join(" "),
			outlineRemove: [
				"bg-transparent",
				"text-[var(--btn-bg)]",
				"enabled:hover:border-transparent",
				"enabled:hover:bg-[color-mix(in_srgb,var(--btn-bg)_20%,transparent)]",
			].join(" "),
			outlineRemain: [
				"text-[var(--btn-bg)]",
				"enabled:hover:text-[color-mix(in_srgb,var(--btn-bg)_60%,transparent)]",
			].join(" "),
			ghost: [
				"border-transparent",
				"text-[var(--btn-bg)]",
				"enabled:hover:bg-[color-mix(in_srgb,var(--btn-bg)_20%,transparent)]",
			].join(" "),
			ghostOutline: [
				"border-transparent",
				"text-[var(--btn-bg)]",
				"enabled:hover:bg-[color-mix(in_srgb,var(--btn-bg)_20%,transparent)]",
				"enabled:hover:border-[var(--btn-bg)]",
			].join(" "),
			flat: [
				"border-transparent",
				"text-[var(--btn-bg-flat-txt)]",
				"bg-[var(--btn-bg-flat)]",
				"enabled:hover:bg-[color-mix(in_srgb,var(--btn-bg-flat)_65%,transparent)]",
			].join(" "),
			none: [
				"border-transparent",

				"text-[var(--btn-bg)]",
				"enabled:hover:text-[color-mix(in_srgb,var(--btn-bg)_60%,transparent)]",
			].join(" "),
			shadow: [
				"border-transparent",
				"bg-[var(--btn-bg)]",
				"text-[var(--btn-txt)]",
				"enabled:hover:bg-[var(--btn-bg-hover)]",
				"shadow-lg",
				"shadow-xl/20",
				"filter-[drop-shadow(1px_3px_4px_color-mix(in_srgb,var(--btn-bg)_70%,transparent))]",
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
			startContent,
			endContent,
			color = "primary",
			variant = "solid",
			size = "md",
			radius = "lg",
			fullWidth = false,
			isLoading = false,
			isDisabled = false,
			isDisableRipple = false,
			children,
			onClick,
			...rest
		},
		ref,
	) => {
		const [ripples, setRipples] = useState<Ripple[]>([]);
		const nextRippleId = useRef(0);
		const rippleTimers = useRef<
			Array<ReturnType<typeof globalThis.setTimeout>>
		>([]);

		useEffect(
			() => () => {
				rippleTimers.current.forEach((timerId) =>
					globalThis.clearTimeout(timerId),
				);
				rippleTimers.current = [];
			},
			[],
		);

		const addRipple = (event: MouseEvent<HTMLButtonElement>) => {
			const rect = event.currentTarget.getBoundingClientRect();
			const hasPointer = event.clientX !== 0 || event.clientY !== 0;
			const x = hasPointer ? event.clientX - rect.left : rect.width / 2;
			const y = hasPointer ? event.clientY - rect.top : rect.height / 2;
			const farthestX = Math.max(x, rect.width - x);
			const farthestY = Math.max(y, rect.height - y);
			const radius = Math.sqrt(farthestX ** 2 + farthestY ** 2);
			const diameter = radius * 2;
			const id = nextRippleId.current++;

			const style: CSSProperties = {
				width: diameter,
				height: diameter,
				left: x - radius,
				top: y - radius,
			};

			setRipples((prev) => [...prev, { id, style }]);
			const timeoutId = globalThis.setTimeout(() => {
				setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
				rippleTimers.current = rippleTimers.current.filter(
					(timerId) => timerId !== timeoutId,
				);
			}, RIPPLE_DURATION);

			rippleTimers.current.push(timeoutId);
		};

		const handleClick: ButtonProps["onClick"] = (event) => {
			onClick?.(event);
			if (
				event.defaultPrevented ||
				isDisabled ||
				isLoading ||
				isDisableRipple
			) {
				return;
			}

			addRipple(event);
		};

		const hasStartContent =
			startContent !== undefined && startContent !== null;
		const hasEndContent = endContent !== undefined && endContent !== null;
		const hasChildren = children !== undefined && children !== null;

		return (
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
				onClick={handleClick}
				{...rest}
			>
				{ripples.map((ripple) => (
					<span
						key={ripple.id}
						className="rfui-ripple"
						style={ripple.style}
						aria-hidden="true"
					/>
				))}
				<span className="rfui-button__content">
					{hasStartContent ? (
						<span className="rfui-button__start">
							{startContent}
						</span>
					) : null}
					{hasChildren ? (
						<span className="rfui-button__label">{children}</span>
					) : null}
					{hasEndContent ? (
						<span className="rfui-button__end">{endContent}</span>
					) : null}
				</span>
			</button>
		);
	},
);

Button.displayName = "Button";
