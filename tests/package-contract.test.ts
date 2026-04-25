import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

function read(relativePath: string): string {
  return readFileSync(resolve(process.cwd(), relativePath), "utf8");
}

describe("package contract", () => {
  it("publishes dist-based entrypoints", () => {
    const packageJson = JSON.parse(read("package.json")) as {
      main: string;
      module: string;
      types: string;
      exports: Record<string, { import: string; types: string }>;
    };
    const animatedButtonExport = packageJson.exports["./AnimatedButton"];
    const fadeInTextExport = packageJson.exports["./FadeInText"];
    const loaderExport = packageJson.exports["./Loader"];
    const scaleInExport = packageJson.exports["./ScaleIn"];
    const tooltipExport = packageJson.exports["./Tooltip"];
    const typewriterTextExport = packageJson.exports["./TypewriterText"];

    expect(packageJson.main).toBe("./dist/index.js");
    expect(packageJson.module).toBe("./dist/index.js");
    expect(packageJson.types).toBe("./dist/index.d.ts");
    expect(animatedButtonExport).toBeDefined();
    expect(animatedButtonExport?.import).toBe(
      "./dist/components/AnimatedButton/AnimatedButton.astro",
    );
    expect(fadeInTextExport).toBeDefined();
    expect(fadeInTextExport?.import).toBe(
      "./dist/components/FadeInText/FadeInText.astro",
    );
    expect(loaderExport).toBeDefined();
    expect(loaderExport?.import).toBe("./dist/components/Loader/Loader.astro");
    expect(scaleInExport).toBeDefined();
    expect(scaleInExport?.import).toBe(
      "./dist/components/ScaleIn/ScaleIn.astro",
    );
    expect(tooltipExport).toBeDefined();
    expect(tooltipExport?.import).toBe(
      "./dist/components/Tooltip/Tooltip.astro",
    );
    expect(typewriterTextExport).toBeDefined();
    expect(typewriterTextExport?.import).toBe(
      "./dist/components/TypewriterText/TypewriterText.astro",
    );
  });

  it("uses Astro-aware typechecking", () => {
    const packageJson = JSON.parse(read("package.json")) as {
      scripts: Record<string, string>;
    };

    expect(packageJson.scripts.typecheck).toContain("astro check");
  });

  it("keeps component enhancement rules visible in source", () => {
    const animatedButton = read(
      "src/components/AnimatedButton/AnimatedButton.astro",
    );
    const animatedCard = read("src/components/AnimatedCard/AnimatedCard.astro");
    const loader = read("src/components/Loader/Loader.astro");
    const tooltip = read("src/components/Tooltip/Tooltip.astro");
    const fadeInText = read("src/components/FadeInText/FadeInText.astro");
    const scaleIn = read("src/components/ScaleIn/ScaleIn.astro");
    const typewriterText = read(
      "src/components/TypewriterText/TypewriterText.astro",
    );

    // Components without scripts (CSS-only)
    expect(animatedButton).not.toContain("<script");
    expect(loader).not.toContain("<script");

    // Components with conditional scripts
    expect(animatedCard).toContain("<script");
    expect(tooltip).toContain("<script is:inline>");
    expect(fadeInText).toContain("<script is:inline>");
    expect(scaleIn).toContain("<script is:inline>");
    expect(typewriterText).toContain("<script is:inline>");

    // No astro:* events or client: directives
    expect(animatedButton).not.toContain("astro:page-load");
    expect(animatedButton).not.toContain("client:");
    expect(animatedCard).not.toContain("astro:page-load");
    expect(animatedCard).not.toContain("client:");
    expect(loader).not.toContain("astro:page-load");
    expect(loader).not.toContain("client:");
    expect(tooltip).not.toContain("astro:page-load");
    expect(tooltip).not.toContain("client:");
    expect(fadeInText).not.toContain("astro:page-load");
    expect(fadeInText).not.toContain("client:");
    expect(scaleIn).not.toContain("astro:page-load");
    expect(scaleIn).not.toContain("client:");
    expect(typewriterText).not.toContain("astro:page-load");
    expect(typewriterText).not.toContain("client:");
  });

  it("copies published Astro component files into dist", () => {
    expect(
      existsSync(
        resolve(
          process.cwd(),
          "dist/components/AnimatedButton/AnimatedButton.astro",
        ),
      ),
    ).toBe(true);
    expect(
      existsSync(
        resolve(process.cwd(), "dist/components/FadeInText/FadeInText.astro"),
      ),
    ).toBe(true);
    expect(
      existsSync(resolve(process.cwd(), "dist/components/Loader/Loader.astro")),
    ).toBe(true);
    expect(
      existsSync(
        resolve(process.cwd(), "dist/components/ScaleIn/ScaleIn.astro"),
      ),
    ).toBe(true);
    expect(
      existsSync(
        resolve(process.cwd(), "dist/components/Tooltip/Tooltip.astro"),
      ),
    ).toBe(true);
    expect(
      existsSync(
        resolve(
          process.cwd(),
          "dist/components/TypewriterText/TypewriterText.astro",
        ),
      ),
    ).toBe(true);
  });
});
