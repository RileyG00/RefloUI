/* eslint-env browser */
import {
	useEffect,
	useRef,
	useState,
	type CSSProperties,
	type MouseEvent,
} from "react";
import { useButton, useHover } from "react-aria";
import { ButtonProps, Ripple } from "./Button.types";
import buttonStyles from "./Button.styles";
import { RIPPLE_DURATION } from "./Button.constants";
import "./Button.css";
import "../../styles/tokens.css";

// Helper to safely sync the forwarded ref without triggering strict mutation errors
const syncRef = (ref: unknown, value: HTMLButtonElement | null) => {
	if (typeof ref === "function") {
		ref(value);
	} else if (ref && typeof ref === "object" && "current" in ref) {
		// We cast to a structural type to assign current, avoiding the deprecated MutableRefObject
		(ref as { current: HTMLButtonElement | null }).current = value;
	}
};

// No 'FC' or 'forwardRef' needed in React 19 for this pattern
export const Button = ({
	ref, // 1. Ref is now available directly in props
	children, // 2. Destructure children so 'hasChildren' works
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
	classNames,
	...props
}: ButtonProps) => {
	//-------------------------------------------------------------
	// Ref Handling (Critical for React Aria)
	//-------------------------------------------------------------
	// useButton requires a RefObject (object with .current).
	// The parent 'ref' prop might be a function, null, or object.
	// We use a local RefObject for the hook, and sync it to the DOM.
	const objRef = useRef<HTMLButtonElement>(null);

	// React Aria's useButton consumes 'props.onPress' (from ...props) automatically.
	// It returns 'isPressed' which is better than CSS :active for styling.
	const { buttonProps, isPressed } = useButton(props, objRef);

	//-------------------------------------------------------------
	// Hover Functionality
	//-------------------------------------------------------------
	let { hoverProps } = useHover({
		onHoverStart: () => props?.onHoverStart && props.onHoverStart(),
		onHoverEnd: () => props?.onHoverEnd && props.onHoverEnd(),
		onHoverChange: () => props?.onHoverChange && props.onHoverChange(),
	});

	//-------------------------------------------------------------
	// Variables
	//-------------------------------------------------------------
	const [ripples, setRipples] = useState<Ripple[]>([]);
	const nextRippleId = useRef(0);
	const rippleTimers = useRef<
		Array<ReturnType<typeof globalThis.setTimeout>>
	>([]);

	//-------------------------------------------------------------
	// Effects
	//-------------------------------------------------------------
	useEffect(
		() => () => {
			rippleTimers.current.forEach((timerId) =>
				globalThis.clearTimeout(timerId),
			);
			rippleTimers.current = [];
		},
		[],
	);

	//-------------------------------------------------------------
	// Methods
	//-------------------------------------------------------------
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

	const hasStartContent = startContent !== undefined && startContent !== null;
	const hasEndContent = endContent !== undefined && endContent !== null;

	const hasChildren = children !== undefined && children !== null;

	//-------------------------------------------------------------
	// Styling
	//-------------------------------------------------------------
	const { base, content, start, label, end } = buttonStyles({
		color,
		variant,
		size,
		radius,
		fullWidth,
	});

	//-------------------------------------------------------------
	// Return
	//-------------------------------------------------------------
	return (
		<button
			{...buttonProps}
			{...hoverProps}
			ref={(node) => {
				// 3. React 19 Ref Merging Pattern
				// Update our local ref for useButton
				objRef.current = node;

				// Update the parent's ref safely using the helper
				syncRef(ref, node);
			}}
			// Expose the pressed state to CSS for advanced styling
			data-pressed={isPressed || undefined}
			className={base({
				class: classNames?.base || (props.className ?? ""),
			})}
			disabled={isLoading || isDisabled}
			onClick={(e) => {
				if (!isDisableRipple && !isLoading && !isDisabled) {
					addRipple(e);
				}

				buttonProps.onClick?.(e);
			}}
		>
			{ripples.map((ripple) => (
				<span
					key={ripple.id}
					className="rfui-ripple"
					style={ripple.style}
					aria-hidden="true"
				/>
			))}
			<span className={content()}>
				{hasStartContent && (
					<span className={start()}>{startContent}</span>
				)}
				{hasChildren && <span className={label()}>{children}</span>}
				{hasEndContent && <span className={end()}>{endContent}</span>}
			</span>
		</button>
	);
};

Button.displayName = "Button";
