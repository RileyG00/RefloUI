import "@testing-library/jest-dom/vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, expect, it, vi, afterEach } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
	afterEach(() => {
		vi.useRealTimers();
	});

	const mockRect = (node: HTMLElement) =>
		vi.spyOn(node, "getBoundingClientRect").mockReturnValue({
			width: 100,
			height: 40,
			top: 0,
			left: 0,
			bottom: 40,
			right: 100,
			x: 0,
			y: 0,
			toJSON: () => ({}),
		} as DOMRect);

	it("renders children", () => {
		render(<Button>Click me</Button>);
		expect(screen.getByRole("button", { name: /click me/i })).toBeVisible();
	});

	it("supports variant prop", () => {
		render(<Button variant="outline">Outline</Button>);
		expect(screen.getByRole("button")).toHaveTextContent("Outline");
	});

	it("renders start and end content around the label", () => {
		render(
			<Button startContent="Start" endContent={<span>End</span>}>
				Center
			</Button>,
		);
		const button = screen.getByRole("button");
		expect(button).toHaveTextContent("Start");
		expect(button).toHaveTextContent("Center");
		expect(button).toHaveTextContent("End");
	});

	it("adds a ripple on click and removes it after the animation", () => {
		vi.useFakeTimers();
		render(<Button>Ripple</Button>);
		const button = screen.getByRole("button");
		const rectSpy = mockRect(button);

		fireEvent.click(button, { clientX: 10, clientY: 10 });
		expect(rectSpy).toHaveBeenCalled();
		expect(button.querySelector(".rfui-ripple")).toBeInTheDocument();

		act(() => {
			vi.advanceTimersByTime(700);
		});
		expect(button.querySelector(".rfui-ripple")).not.toBeInTheDocument();
	});

	it("does not create a ripple when disabled via prop", () => {
		vi.useFakeTimers();
		render(
			<Button isDisableRipple startContent="start">
				No ripple
			</Button>,
		);
		const button = screen.getByRole("button");
		mockRect(button);

		fireEvent.click(button);
		expect(button.querySelector(".rfui-ripple")).not.toBeInTheDocument();
	});

	it("respects isDisabled for interactivity and ripple", () => {
		vi.useFakeTimers();
		render(
			<Button isDisabled startContent="start">
				Disabled
			</Button>,
		);
		const button = screen.getByRole("button");
		mockRect(button);

		expect(button).toBeDisabled();
		fireEvent.click(button);
		expect(button.querySelector(".rfui-ripple")).not.toBeInTheDocument();
	});

	it("applies layout props such as fullWidth and radius", () => {
		render(
			<Button fullWidth radius="full">
				Layout
			</Button>,
		);
		const button = screen.getByRole("button");
		expect(button.className).toContain("w-full");
		expect(button.className).toContain("rounded-full");
	});
});
