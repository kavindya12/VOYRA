# shadcn/ui setup for Voyra

Voyra is a **JavaScript + Vite + Tailwind v4** project. shadcn/ui components are usually added as **TypeScript** (`.tsx`). This repo uses a **shadcn-compatible layout** without full TypeScript migration.

## Current structure

| Path | Purpose |
|------|---------|
| `src/components/ui/` | shadcn-style UI primitives (e.g. `contact-sections.jsx`, `contact-form.jsx`) |
| `src/lib/utils.js` | `cn()` helper (`clsx` + `tailwind-merge`) |
| `components.json` | shadcn CLI config (aliases, Tailwind CSS path) |
| `@/` import alias | Maps to `src/` (see `vite.config.js` + `jsconfig.json`) |

## Why `components/ui` matters

shadcn places reusable, composable UI pieces under **`components/ui`**. Keeping this folder:

- Matches [shadcn CLI](https://ui.shadcn.com/docs/cli) defaults so `npx shadcn@latest add button` installs to the right place
- Separates app sections (`ContactSection.jsx`) from low-level UI (`ui/contact-form.jsx`)
- Makes upgrades and new components predictable across projects

## Add more shadcn components (optional)

### Option A - Stay on JavaScript (current)

1. Install deps (already done): `clsx`, `tailwind-merge`, `lucide-react`
2. Manually copy/adapt component code into `src/components/ui/`
3. Replace `import { cn } from "@/lib/utils"` and use Voyra colors (`voyra-orange`, `voyra-navy`, etc.)

### Option B - Full TypeScript + shadcn CLI

```bash
# 1. Add TypeScript
npm install -D typescript @types/node
npx tsc --init

# 2. Rename entry files to .tsx and update vite.config / components.json "tsx": true

# 3. Initialize shadcn (from project root)
npx shadcn@latest init

# When prompted:
# - Style: New York
# - Base color: Slate
# - CSS: src/index.css
# - Aliases: @/components, @/lib/utils, @/components/ui

# 4. Add components
npx shadcn@latest add button input textarea
```

### Tailwind

Tailwind v4 is already configured via `@tailwindcss/vite` in `vite.config.js`. No separate `tailwind.config.js` is required for v4.

## Contact section usage

`ContactSection` on the home page composes:

- `src/components/ui/contact-sections.jsx` - “Let’s connect” + method cards
- `src/components/ui/contact-form.jsx` - “Get in touch” form

Navbar **Contact** links to `#contact` on the home page.
