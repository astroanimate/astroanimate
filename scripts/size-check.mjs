import { statSync } from "node:fs";
import { resolve } from "node:path";

const files = ["dist/index.js", "dist/components/index.js"];
const limitBytes = 5 * 1024;

for (const relativePath of files) {
  const absolutePath = resolve(relativePath);
  const size = statSync(absolutePath).size;

  if (size > limitBytes) {
    console.error(
      `${relativePath} is ${size} B, which exceeds the ${limitBytes} B limit.`
    );
    process.exit(1);
  }

  console.log(`${relativePath}: ${size} B / ${limitBytes} B`);
}
