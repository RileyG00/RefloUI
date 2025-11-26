import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@refloui/ui";
import { fn } from "storybook/test";

const meta: Meta<typeof Button> = {
	title: "Components/Button",
	component: Button,
	args: {
		children: "Button",
		onPress: fn(),
		onPressChange: fn(),
		onPressStart: fn(),
		onPressEnd: fn(),
		onFocus: fn(),
		onFocusChange: fn(),
		onHoverStart: fn(),
		onHoverEnd: fn(),
		onHoverChange: fn(),
	},
	argTypes: {
		children: { control: "text" },
		startContent: { control: false },
		endContent: { control: false },
		ref: { control: false },
		onPress: { control: false },
		onPressChange: { control: false },
		onPressStart: { control: false },
		onPressEnd: { control: false },
		onFocus: { control: false },
		onFocusChange: { control: false },
		onHoverStart: { control: false },
		onHoverEnd: { control: false },
		onHoverChange: { control: false },
	},
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Solid: Story = {};
export const Outline: Story = { args: { variant: "outline" } };
export const OutlineFill: Story = { args: { variant: "outlineFill" } };
export const OutlineRemove: Story = { args: { variant: "outlineRemove" } };
export const OutlineRemain: Story = { args: { variant: "outlineRemain" } };
export const Ghost: Story = { args: { variant: "ghost" } };
export const Flat: Story = { args: { variant: "flat" } };
export const WithSlots: Story = {
	render: (args) => (
		<Button
			{...args}
			startContent={
				<span role="img" aria-label="start">
					S
				</span>
			}
			endContent={
				<span role="img" aria-label="end">
					E
				</span>
			}
		>
			{args.children}
		</Button>
	),
	args: { children: "Button" },
};
export const Shadow: Story = { args: { variant: "shadow" } };
