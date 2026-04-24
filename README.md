# astroanimate

Astro-native animation components: **AnimatedButton**, **AnimatedCard**, **Alert**, **AuraTrail**, **Avatar**, **AvatarStack**, **AvatarTooltip**, **Badge**, **BreathingText**, **BlurFadeIn**, **FadeInText**, **Loader**, **Reveal**, **SlideIn**, **TextRotate**, and **Tooltip**.

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

### Alert

Dismissible alert with a visible no-JS baseline and optional JS enhancement.

```astro
---
import Alert from "@astroanimate/core/Alert";
---

<Alert variant="success" dismissible>
  Profile updated successfully.
</Alert>
```

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

### AuraTrail

CSS-only glowing text trails with a visible no-JS baseline.

```astro
---
import AuraTrail from "@astroanimate/core/AuraTrail";
---

<AuraTrail text="AuraTrail" as="h2" fontSize="clamp(2rem, 8vw, 5rem)" />
```

### Avatar

CSS-first avatar and avatar-group patterns with a visible no-JS baseline.

```astro
---
import Avatar from "@astroanimate/core/Avatar";
---

<Avatar src="/team/ada.jpg" alt="Ada Lovelace" tooltip="Ada Lovelace" />
```

### AvatarStack

```astro
---
import AvatarStack from "@astroanimate/core/AvatarStack";
---

<AvatarStack
  enhance
  avatars={[
    { src: "/team/ada.jpg", name: "Ada Lovelace" },
    { src: "/team/grace.jpg", name: "Grace Hopper" },
    { src: "/team/margaret.jpg", name: "Margaret Hamilton" },
  ]}
/>
```

### AvatarTooltip

CSS-first overlapping avatars with hover and keyboard-focus tooltips.

```astro
---
import AvatarTooltip from "@astroanimate/core/AvatarTooltip";
---

<AvatarTooltip
  avatars={[
    { src: "/team/ada.jpg", name: "Ada Lovelace", role: "Mathematician" },
    { src: "/team/grace.jpg", name: "Grace Hopper", role: "Computer Scientist" },
    { src: "/team/margaret.jpg", name: "Margaret Hamilton", role: "Software Engineer" },
  ]}
/>
```

### Badge

CSS-first badge styles with an always-visible no-JS baseline.

```astro
---
import Badge from "@astroanimate/core/Badge";
---

<Badge variant="glow" color="success" animation="shine">
  New
</Badge>
```

### BlurFadeIn

CSS-only blur-and-rise text entry with an always-visible no-JS baseline.

```astro
---
import BlurFadeIn from "@astroanimate/core/BlurFadeIn";
---

<BlurFadeIn text="Hello from AstroAnimate" duration={1.2} delay={0.1} />
```

### BreathingText

CSS-only rhythmic text scaling with an always-visible no-JS baseline.

```astro
---
import BreathingText from "@astroanimate/core/BreathingText";
---

<BreathingText text="Steady signal" speed={4} />
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

### SlideIn

Slide-in animation with optional JS enhancement.

```astro
---
import SlideIn from "@astroanimate/core/SlideIn";
---

<SlideIn enhance direction="left" distance={50} once>
  <p>Slides in when scrolled into view.</p>
</SlideIn>
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

## Exports

| Import                              | Component            |
| ----------------------------------- | -------------------- |
| `@astroanimate/core/AnimatedButton` | AnimatedButton.astro |
| `@astroanimate/core/AnimatedCard`   | AnimatedCard.astro   |
| `@astroanimate/core/Alert`          | Alert.astro          |
| `@astroanimate/core/AuraTrail`      | AuraTrail.astro      |
| `@astroanimate/core/Avatar`         | Avatar.astro         |
| `@astroanimate/core/AvatarStack`    | AvatarStack.astro    |
| `@astroanimate/core/AvatarTooltip`  | AvatarTooltip.astro  |
| `@astroanimate/core/AxisCarousel3D` | AxisCarousel3D.astro |
| `@astroanimate/core/Badge`          | Badge.astro          |
| `@astroanimate/core/BreathingText`  | BreathingText.astro  |
| `@astroanimate/core/BlurFadeIn`     | BlurFadeIn.astro     |
| `@astroanimate/core/FadeInText`     | FadeInText.astro     |
| `@astroanimate/core/Loader`         | Loader.astro         |
| `@astroanimate/core/Reveal`         | Reveal.astro         |
| `@astroanimate/core/SlideIn`        | SlideIn.astro        |
| `@astroanimate/core/TextRotate`     | TextRotate.astro     |
| `@astroanimate/core/Tooltip`        | Tooltip.astro        |

## Peer dependency

- **astro** `^4.0.0 || ^5.0.0`

## License

MIT
