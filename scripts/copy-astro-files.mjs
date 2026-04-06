import { cpSync, existsSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

const filesToCopy = [
  "src/components/Alert/Alert.astro",
  "src/components/FadeIn/FadeIn.astro",
  "src/components/Reveal/Reveal.astro",
  "src/components/TextRotate/TextRotate.astro",
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
