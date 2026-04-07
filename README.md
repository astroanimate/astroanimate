# astroanimate

Astro-native animation components: **AnimatedButton**, **Alert**, **AuraTrail**, **Avatar**, **AvatarStack**, **AvatarTooltip**, **Badge**, **BreathingText**, **BlurFadeIn**, **TextRotate**, **FadeIn**, and **Reveal**.

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

### AnimatedButton

CSS-first button effects with no hydration and a visible no-JS baseline.

```astro
---
import AnimatedButton from "@astroanimate/core/AnimatedButton";
---

<AnimatedButton variant="shimmer">Explore</AnimatedButton>
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
| `@astroanimate/core/AnimatedButton` | AnimatedButton.astro |
| `@astroanimate/core/Alert` | Alert.astro |
| `@astroanimate/core/AuraTrail` | AuraTrail.astro |
| `@astroanimate/core/Avatar` | Avatar.astro |
| `@astroanimate/core/AvatarStack` | AvatarStack.astro |
| `@astroanimate/core/AvatarTooltip` | AvatarTooltip.astro |
| `@astroanimate/core/Badge` | Badge.astro |
| `@astroanimate/core/BreathingText` | BreathingText.astro |
| `@astroanimate/core/BlurFadeIn` | BlurFadeIn.astro |
| `@astroanimate/core/TextRotate` | TextRotate.astro |
| `@astroanimate/core/FadeIn` | FadeIn.astro |
| `@astroanimate/core/Reveal` | Reveal.astro |

## Peer dependency

- **astro** `^4.0.0 || ^5.0.0`

## License

MIT
