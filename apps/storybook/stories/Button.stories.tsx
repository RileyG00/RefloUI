import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@refloui/ui";

const meta: Meta<typeof Button> = {
	title: "Components/Button",
	component: Button,
	args: { children: "Button" },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Solid: Story = {};
export const Outline: Story = { args: { variant: "outline" } };
export const OutlineFill: Story = { args: { variant: "outlineFill" } };
export const OutlineRemove: Story = { args: { variant: "outlineRemove" } };
export const Ghost: Story = { args: { variant: "ghost" } };
export const Flat: Story = { args: { variant: "flat" } };
