import { cpSync, existsSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

const filesToCopy = [
  "src/components/AnimatedTabs/AnimatedTabs.astro",
  "src/components/AnimatedButton/AnimatedButton.astro",
  "src/components/AnimatedCard/AnimatedCard.astro",
  "src/components/ExpandableCard/ExpandableCard.astro",
  "src/components/FadeInText/FadeInText.astro",
  "src/components/GlassCard/GlassCard.astro",
  "src/components/Loader/Loader.astro",
  "src/components/ProgressBar/ProgressBar.astro",
  "src/components/RevealImage/RevealImage.astro",
  "src/components/ScaleIn/ScaleIn.astro",
  "src/components/Tooltip/Tooltip.astro",
  "src/components/TypewriterText/TypewriterText.astro",
  "src/components/CardStack/CardStack.astro",
  "src/components/CountUp/CountUp.astro",
  "src/components/Dock/Dock.astro",
  "src/components/Dock/DockItem.astro",
  "src/components/Dropdown/Dropdown.astro",
  "src/components/GridDotsBackground/GridDotsBackground.astro",
  "src/components/HighlightText/HighlightText.astro",
  "src/components/InfiniteMarquee/InfiniteMarquee.astro",
  "src/components/LiquidGlassCard/LiquidGlassCard.astro",
  "src/components/AnimatedBorderButton/AnimatedBorderButton.astro",
  "src/components/ArrowCTAButton/ArrowCTAButton.astro",
  "src/components/SlidingOverlayButton/SlidingOverlayButton.astro",
  "src/components/FillHoverButton/FillHoverButton.astro",
  "src/components/GitHubShineButton/GitHubShineButton.astro",
  "src/components/StaggerTextButton/StaggerTextButton.astro",
  "src/components/JobCard/JobCard.astro",
  "src/components/ProductReviewCard/ProductReviewCard.astro",
];

for (const relativePath of filesToCopy) {
  const sourcePath = resolve(relativePath);
  const destinationPath = resolve("dist", relativePath.replace(/^src\//, ""));

  if (!existsSync(sourcePath)) {
    continue;
  }

  mkdirSync(dirname(destinationPath), { recursive: true });
  cpSync(sourcePath, destinationPath);
}
