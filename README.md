# astroanimate

Astro-native animation components: **AnimatedButton**, **AnimatedCard**, **FadeInText**, **Loader**, **ScaleIn**, **Tooltip**, and **TypewriterText**.

## Install

```bash
npm install @astroanimate/core
```

## Quality Gates

- `npm run build` builds ESM output into `dist/`
- `npm run typecheck` runs `astro check` and TypeScript validation
- `npm run lint` validates the package source and tooling config
- `npm run test` runs the unit and contract test suite

## Usage

**Important:** Due to Astro's component resolution limitations, components must be imported via subpath exports. Named imports from the main barrel (e.g., `import { Tooltip } from "@astroanimate/core"`) will not work.

### AnimatedButton

CSS-first button effects with no hydration and a visible no-JS baseline.

```astro
---
import AnimatedButton from "@astroanimate/core/AnimatedButton";
---

<AnimatedButton variant="shimmer">Explore</AnimatedButton>
```

### AnimatedCard

Interactive card with lift, scale, shine, and flip effects.

```astro
---
import AnimatedCard from "@astroanimate/core/AnimatedCard";
---

<AnimatedCard
  title="Lift Card"
  description="Hover to see the lift effect with ambient glow"
  variant="lift"
  color="rose"
/>
```

### FadeInText

Scroll-triggered fade-in with blur effect (opt-in enhancement).

```astro
---
import FadeInText from "@astroanimate/core/FadeInText";
---

<FadeInText duration={0.6} delay={0} enhance={true}>
  <h3>Fade In Text</h3>
  <p>This text fades in with blur effect on page load.</p>
</FadeInText>
```

### Loader

CSS-only loading indicators with multiple variants.

```astro
---
import Loader from "@astroanimate/core/Loader";
---

<Loader type="spinner" size={40} color="#3b82f6" />
<Loader type="dots" size={40} color="#10b981" />
<Loader type="pulse" size={40} color="#f59e0b" />
```

### Tooltip

Hover-based tooltip with positioning options and optional enhancement.

```astro
---
import Tooltip from "@astroanimate/core/Tooltip";
---

<Tooltip content="Tooltip on top" position="top">
  <button>Hover me</button>
</Tooltip>
```

### ScaleIn

Scale-in animation with optional JS enhancement.

```astro
---
import ScaleIn from "@astroanimate/core/ScaleIn";
---

<ScaleIn enhance duration={0.6} delay={0}>
  <h3>Scale In Content</h3>
  <p>This content scales in when scrolled into view.</p>
</ScaleIn>
```

### TypewriterText

Typewriter effect with optional JS enhancement.

```astro
---
import TypewriterText from "@astroanimate/core/TypewriterText";
---

<TypewriterText text="Hello, World!" enhance speed={50} />
```

## Exports

| Import                              | Component            |
| ----------------------------------- | -------------------- |
| `@astroanimate/core/AnimatedButton` | AnimatedButton.astro |
| `@astroanimate/core/AnimatedCard`   | AnimatedCard.astro   |
| `@astroanimate/core/FadeInText`     | FadeInText.astro     |
| `@astroanimate/core/Loader`         | Loader.astro         |
| `@astroanimate/core/ScaleIn`        | ScaleIn.astro        |
| `@astroanimate/core/Tooltip`        | Tooltip.astro        |
| `@astroanimate/core/TypewriterText` | TypewriterText.astro |

## Peer dependency

- **astro** `^4.0.0 || ^5.0.0`

## License

MIT
