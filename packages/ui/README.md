# @refloui/ui

Install with `pnpm add @refloui/ui`.

```tsx
import { Button } from "@refloui/ui";

export function Example() {
	return <Button>Click</Button>;
}
```

## Theming

All color tokens respond to the theme defined on the `html` element. Set both
the `data-theme` attribute and a matching class to toggle between light and dark
mode, HeroUI-style:

```ts
const root = document.documentElement;
const theme: "light" | "dark" = "dark";

root.dataset.theme = theme;
root.classList.remove("light", "dark");
root.classList.add(theme);
```

Light mode stays the default if no theme is provided.
