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
    const dropdownExport = packageJson.exports["./Dropdown"];
    const gridDotsBackgroundExport = packageJson.exports["./GridDotsBackground"];
    const highlightTextExport = packageJson.exports["./HighlightText"];
    const infiniteMarqueeExport = packageJson.exports["./InfiniteMarquee"];
    const slidingOverlayButtonExport = packageJson.exports["./SlidingOverlayButton"];
    const staggerTextButtonExport = packageJson.exports["./StaggerTextButton"];
    const jobCardExport = packageJson.exports["./JobCard"];
    const productReviewCardExport = packageJson.exports["./ProductReviewCard"];
    const articleCardExport = packageJson.exports["./ArticleCard"];
    const newsletterPopupCardExport = packageJson.exports["./NewsletterPopupCard"];

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
    expect(dropdownExport).toBeDefined();
    expect(dropdownExport?.import).toBe(
      "./dist/components/Dropdown/Dropdown.astro",
    );
    expect(gridDotsBackgroundExport).toBeDefined();
    expect(gridDotsBackgroundExport?.import).toBe(
      "./dist/components/GridDotsBackground/GridDotsBackground.astro",
    );
    expect(highlightTextExport).toBeDefined();
    expect(highlightTextExport?.import).toBe(
      "./dist/components/HighlightText/HighlightText.astro",
    );
    expect(infiniteMarqueeExport).toBeDefined();
    expect(infiniteMarqueeExport?.import).toBe(
      "./dist/components/InfiniteMarquee/InfiniteMarquee.astro",
    );
    expect(slidingOverlayButtonExport).toBeDefined();
    expect(slidingOverlayButtonExport?.import).toBe(
      "./dist/components/SlidingOverlayButton/SlidingOverlayButton.astro",
    );
    expect(staggerTextButtonExport).toBeDefined();
    expect(staggerTextButtonExport?.import).toBe(
      "./dist/components/StaggerTextButton/StaggerTextButton.astro",
    );
    expect(jobCardExport).toBeDefined();
    expect(jobCardExport?.import).toBe(
      "./dist/components/JobCard/JobCard.astro",
    );
    expect(productReviewCardExport).toBeDefined();
    expect(productReviewCardExport?.import).toBe(
      "./dist/components/ProductReviewCard/ProductReviewCard.astro",
    );
    expect(articleCardExport).toBeDefined();
    expect(articleCardExport?.import).toBe(
      "./dist/components/ArticleCard/ArticleCard.astro",
    );
    expect(newsletterPopupCardExport).toBeDefined();
    expect(newsletterPopupCardExport?.import).toBe(
      "./dist/components/NewsletterPopupCard/NewsletterPopupCard.astro",
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
    const gridDotsBackground = read(
      "src/components/GridDotsBackground/GridDotsBackground.astro",
    );
    const highlightText = read(
      "src/components/HighlightText/HighlightText.astro",
    );
    const infiniteMarquee = read(
      "src/components/InfiniteMarquee/InfiniteMarquee.astro",
    );
    const slidingOverlayButton = read(
      "src/components/SlidingOverlayButton/SlidingOverlayButton.astro",
    );
    const staggerTextButton = read(
      "src/components/StaggerTextButton/StaggerTextButton.astro",
    );
    const jobCard = read("src/components/JobCard/JobCard.astro");
    const productReviewCard = read("src/components/ProductReviewCard/ProductReviewCard.astro");
    const articleCard = read("src/components/ArticleCard/ArticleCard.astro");
    const newsletterPopupCard = read("src/components/NewsletterPopupCard/NewsletterPopupCard.astro");

    // Components without scripts (CSS-only)
    expect(animatedButton).not.toContain("<script");
    expect(loader).not.toContain("<script");
    expect(gridDotsBackground).not.toContain("<script");
    expect(highlightText).not.toContain("<script");
    expect(infiniteMarquee).not.toContain("<script");
    expect(slidingOverlayButton).not.toContain("<script");
    expect(staggerTextButton).not.toContain("<script");
    expect(jobCard).not.toContain("<script");
    expect(productReviewCard).not.toContain("<script");
    expect(articleCard).not.toContain("<script");

    // Components with conditional scripts
    expect(animatedCard).toContain("<script");
    expect(tooltip).toContain("<script is:inline>");
    expect(fadeInText).toContain("<script is:inline>");
    expect(scaleIn).toContain("<script is:inline>");
    expect(typewriterText).toContain("<script is:inline>");
    expect(newsletterPopupCard).toContain("<script is:inline>");

    // No astro:* events or client: directives
    expect(animatedButton).not.toContain("astro:page-load");
    expect(animatedButton).not.toContain("client:");
    expect(animatedCard).not.toContain("astro:page-load");
    expect(animatedCard).not.toContain("client:");
    expect(loader).not.toContain("astro:page-load");
    expect(loader).not.toContain("client:");
    expect(gridDotsBackground).not.toContain("astro:page-load");
    expect(gridDotsBackground).not.toContain("client:");
    expect(highlightText).not.toContain("astro:page-load");
    expect(highlightText).not.toContain("client:");
    expect(infiniteMarquee).not.toContain("astro:page-load");
    expect(infiniteMarquee).not.toContain("client:");
    expect(slidingOverlayButton).not.toContain("astro:page-load");
    expect(slidingOverlayButton).not.toContain("client:");
    expect(staggerTextButton).not.toContain("astro:page-load");
    expect(staggerTextButton).not.toContain("client:");
    expect(jobCard).not.toContain("astro:page-load");
    expect(jobCard).not.toContain("client:");
    expect(productReviewCard).not.toContain("astro:page-load");
    expect(productReviewCard).not.toContain("client:");
    expect(articleCard).not.toContain("astro:page-load");
    expect(articleCard).not.toContain("client:");
    expect(newsletterPopupCard).not.toContain("astro:page-load");
    expect(newsletterPopupCard).not.toContain("client:");
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
    expect(
      existsSync(
        resolve(
          process.cwd(),
          "dist/components/Dropdown/Dropdown.astro",
        ),
      ),
    ).toBe(true);
    expect(
      existsSync(
        resolve(
          process.cwd(),
          "dist/components/GridDotsBackground/GridDotsBackground.astro",
        ),
      ),
    ).toBe(true);
    expect(
      existsSync(
        resolve(
          process.cwd(),
          "dist/components/HighlightText/HighlightText.astro",
        ),
      ),
    ).toBe(true);
    expect(
      existsSync(
        resolve(
          process.cwd(),
          "dist/components/InfiniteMarquee/InfiniteMarquee.astro",
        ),
      ),
    ).toBe(true);
    expect(
      existsSync(
        resolve(
          process.cwd(),
          "dist/components/SlidingOverlayButton/SlidingOverlayButton.astro",
        ),
      ),
    ).toBe(true);
    expect(
      existsSync(
        resolve(
          process.cwd(),
          "dist/components/StaggerTextButton/StaggerTextButton.astro",
        ),
      ),
    ).toBe(true);
    expect(
      existsSync(
        resolve(
          process.cwd(),
          "dist/components/JobCard/JobCard.astro",
        ),
      ),
    ).toBe(true);
    expect(
      existsSync(
        resolve(
          process.cwd(),
          "dist/components/ProductReviewCard/ProductReviewCard.astro",
        ),
      ),
    ).toBe(true);
    expect(
      existsSync(
        resolve(
          process.cwd(),
          "dist/components/ArticleCard/ArticleCard.astro",
        ),
      ),
    ).toBe(true);
    expect(
      existsSync(
        resolve(
          process.cwd(),
          "dist/components/NewsletterPopupCard/NewsletterPopupCard.astro",
        ),
      ),
    ).toBe(true);
  });
});
