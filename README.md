# astroanimate

Astro-native animation components: **TextRotate**, **FadeIn**, and **Reveal**.

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

### TextRotate

Cycling text with optional JS enhancement.

```astro
---
import TextRotate from "@astroanimate/core/TextRotate";
---

<TextRotate
  texts={["Fast", "Accessible", "Astro-native"]}
  enhance
  rotationInterval={2000}
  transitionDuration={500}
  variant="slideUp"
/>
```

### FadeIn

Scroll-triggered fade-in (opt-in enhancement).

```astro
---
import FadeIn from "@astroanimate/core/FadeIn";
---

<FadeIn enhance direction="up" distance={20} once>
  <p>Content that fades in when scrolled into view.</p>
</FadeIn>
```

### Reveal

CSS + lightweight script reveal on scroll.

```astro
---
import Reveal from "@astroanimate/core/Reveal";
---

<Reveal enhance effect="slide-up" delay={100} once>
  <p>Revealed on scroll.</p>
</Reveal>
```

## Exports

| Import | Component |
|--------|-----------|
| `@astroanimate/core/TextRotate` | TextRotate.astro |
| `@astroanimate/core/FadeIn` | FadeIn.astro |
| `@astroanimate/core/Reveal` | Reveal.astro |

## Peer dependency

- **astro** `^4.0.0 || ^5.0.0`

## License

MIT
