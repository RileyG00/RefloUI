import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
	it("renders children", () => {
		render(<Button>Click me</Button>);
		expect(screen.getByRole("button", { name: /click me/i })).toBeVisible();
	});

	it("supports variant prop", () => {
		render(<Button variant="outline">Outline</Button>);
		expect(screen.getByRole("button")).toHaveTextContent("Outline");
	});
});
