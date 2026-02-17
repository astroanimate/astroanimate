# astroanimate

Astro-native animation components: **TextRotate**, **FadeIn**, and **Reveal**.

## Install

```bash
npm install astroanimate
```

## Usage

### TextRotate

Cycling text with optional JS enhancement.

```astro
---
import TextRotate from "astroanimate/TextRotate";
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
import FadeIn from "astroanimate/FadeIn";
---

<FadeIn enhance direction="up" distance={20} once>
  <p>Content that fades in when scrolled into view.</p>
</FadeIn>
```

### Reveal

CSS + lightweight script reveal on scroll.

```astro
---
import Reveal from "astroanimate/Reveal";
---

<Reveal effect="slide-up" delay={100} once>
  <p>Revealed on scroll.</p>
</Reveal>
```

## Exports

| Import | Component |
|--------|-----------|
| `astroanimate/TextRotate` | TextRotate.astro |
| `astroanimate/FadeIn` | FadeIn.astro |
| `astroanimate/Reveal` | Reveal.astro |

## Peer dependency

- **astro** `>=4.0.0`

## License

MIT
