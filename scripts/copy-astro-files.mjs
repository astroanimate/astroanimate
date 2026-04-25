import { cpSync, existsSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

const filesToCopy = [
  "src/components/AnimatedButton/AnimatedButton.astro",
  "src/components/AnimatedCard/AnimatedCard.astro",
  "src/components/ExpandableCard/ExpandableCard.astro",
  "src/components/FadeInText/FadeInText.astro",
  "src/components/GlassCard/GlassCard.astro",
  "src/components/Loader/Loader.astro",
  "src/components/ProgressBar/ProgressBar.astro",
  "src/components/ScaleIn/ScaleIn.astro",
  "src/components/Tooltip/Tooltip.astro",
  "src/components/TypewriterText/TypewriterText.astro",
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
