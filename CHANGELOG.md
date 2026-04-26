# Changelog

All notable changes to this project will be documented in this file.

## [0.1.0] - 2026-04-26

### Added

- Initial MVP release of @astroanimate/core
- **AnimatedButton** - CSS-first button effects with shimmer, glow, and ripple variants
- **AnimatedCard** - Interactive card with lift, scale, shine, and flip effects
- **FadeInText** - Scroll-triggered fade-in with blur effect and optional JS enhancement
- **GlassCard** - Glassmorphism UI with 3D tilt effect and dynamic glare
- **ExpandableCard** - Expandable/collapsible card with CSS baseline and optional JS enhancement
- **Loader** - CSS-only loading indicators (spinner, dots, pulse variants)
- **ProgressBar** - Progress bar with size variants (small, medium, large)
- **RevealImage** - Text with two images that reveal on hover (pure CSS)
- **ScaleIn** - Scale-in animation with optional JS enhancement
- **Tooltip** - Hover-based tooltip with positioning options
- **TypewriterText** - Typewriter effect with optional JS enhancement
- Core utilities: `canEnhance()` guard for `prefers-reduced-motion` respect
- Fade-in enhancement system using IntersectionObserver for scroll-triggered animations
- Comprehensive test suite with unit and contract tests
- Size limit enforcement (5 kB max for bundle)
- TypeScript support with full type definitions
- ESLint configuration and linting workflow

### Features

- CSS-first approach with visible no-JS baseline for all components
- Optional JavaScript enhancement gated by `enhance` prop
- Respects `prefers-reduced-motion` across all animations
- Subpath exports for Astro component resolution
- ESM output with TypeScript declarations
- Zero hydration overhead for non-enhanced components
