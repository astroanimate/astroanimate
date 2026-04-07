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
    const alertExport = packageJson.exports["./Alert"];
    const auraTrailExport = packageJson.exports["./AuraTrail"];
    const axisCarousel3DExport = packageJson.exports["./AxisCarousel3D"];
    const avatarExport = packageJson.exports["./Avatar"];
    const avatarStackExport = packageJson.exports["./AvatarStack"];
    const avatarTooltipExport = packageJson.exports["./AvatarTooltip"];
    const badgeExport = packageJson.exports["./Badge"];
    const breathingTextExport = packageJson.exports["./BreathingText"];
    const blurFadeInExport = packageJson.exports["./BlurFadeIn"];
    const fadeInExport = packageJson.exports["./FadeIn"];

    expect(packageJson.main).toBe("./dist/index.js");
    expect(packageJson.module).toBe("./dist/index.js");
    expect(packageJson.types).toBe("./dist/index.d.ts");
    expect(animatedButtonExport).toBeDefined();
    expect(animatedButtonExport?.import).toBe("./dist/components/AnimatedButton/index.js");
    expect(alertExport).toBeDefined();
    expect(alertExport?.import).toBe("./dist/components/Alert/index.js");
    expect(auraTrailExport).toBeDefined();
    expect(auraTrailExport?.import).toBe("./dist/components/AuraTrail/index.js");
    expect(axisCarousel3DExport).toBeDefined();
    expect(axisCarousel3DExport?.import).toBe("./dist/components/AxisCarousel3D/index.js");
    expect(avatarExport).toBeDefined();
    expect(avatarExport?.import).toBe("./dist/components/Avatar/index.js");
    expect(avatarStackExport).toBeDefined();
    expect(avatarStackExport?.import).toBe("./dist/components/AvatarStack/index.js");
    expect(avatarTooltipExport).toBeDefined();
    expect(avatarTooltipExport?.import).toBe("./dist/components/AvatarTooltip/index.js");
    expect(badgeExport).toBeDefined();
    expect(badgeExport?.import).toBe("./dist/components/Badge/index.js");
    expect(breathingTextExport).toBeDefined();
    expect(breathingTextExport?.import).toBe("./dist/components/BreathingText/index.js");
    expect(blurFadeInExport).toBeDefined();
    expect(blurFadeInExport?.import).toBe("./dist/components/BlurFadeIn/index.js");
    expect(fadeInExport).toBeDefined();
    expect(fadeInExport?.import).toBe("./dist/components/FadeIn/index.js");
  });

  it("uses Astro-aware typechecking", () => {
    const packageJson = JSON.parse(read("package.json")) as {
      scripts: Record<string, string>;
    };

    expect(packageJson.scripts.typecheck).toContain("astro check");
  });

  it("keeps component enhancement rules visible in source", () => {
    const animatedButton = read("src/components/AnimatedButton/AnimatedButton.astro");
    const alert = read("src/components/Alert/Alert.astro");
    const auraTrail = read("src/components/AuraTrail/AuraTrail.astro");
    const axisCarousel3D = read("src/components/AxisCarousel3D/AxisCarousel3D.astro");
    const avatar = read("src/components/Avatar/Avatar.astro");
    const avatarStack = read("src/components/AvatarStack/AvatarStack.astro");
    const avatarTooltip = read("src/components/AvatarTooltip/AvatarTooltip.astro");
    const badge = read("src/components/Badge/Badge.astro");
    const breathingText = read("src/components/BreathingText/BreathingText.astro");
    const blurFadeIn = read("src/components/BlurFadeIn/BlurFadeIn.astro");
    const fadeIn = read("src/components/FadeIn/FadeIn.astro");
    const reveal = read("src/components/Reveal/Reveal.astro");
    const textRotate = read("src/components/TextRotate/TextRotate.astro");

    expect(animatedButton).not.toContain("<script");
    expect(alert).toContain("<script is:inline>");
    expect(auraTrail).not.toContain("<script");
    expect(axisCarousel3D).toContain("<script is:inline>");
    expect(avatar).not.toContain("<script");
    expect(avatarStack).toContain("<script is:inline>");
    expect(avatarTooltip).not.toContain("<script");
    expect(badge).not.toContain("<script");
    expect(breathingText).not.toContain("<script");
    expect(blurFadeIn).not.toContain("<script");
    expect(fadeIn).toContain("<script is:inline>");
    expect(reveal).toContain("<script is:inline>");
    expect(textRotate).toContain("<script is:inline>");

    expect(animatedButton).not.toContain("astro:page-load");
    expect(animatedButton).not.toContain("client:");
    expect(alert).not.toContain("astro:page-load");
    expect(auraTrail).not.toContain("astro:page-load");
    expect(axisCarousel3D).not.toContain("astro:page-load");
    expect(avatar).not.toContain("astro:page-load");
    expect(avatarStack).not.toContain("astro:page-load");
    expect(avatarTooltip).not.toContain("astro:page-load");
    expect(badge).not.toContain("astro:page-load");
    expect(breathingText).not.toContain("astro:page-load");
    expect(blurFadeIn).not.toContain("astro:page-load");
    expect(fadeIn).not.toContain("astro:page-load");
    expect(reveal).not.toContain("astro:page-load");
    expect(alert).not.toContain("client:");
    expect(auraTrail).not.toContain("client:");
    expect(axisCarousel3D).not.toContain("client:");
    expect(avatar).not.toContain("client:");
    expect(avatarStack).not.toContain("client:");
    expect(avatarTooltip).not.toContain("client:");
    expect(badge).not.toContain("client:");
    expect(breathingText).not.toContain("client:");
    expect(blurFadeIn).not.toContain("client:");
    expect(textRotate).not.toContain("client:");
  });

  it("copies published Astro component files into dist", () => {
    expect(existsSync(resolve(process.cwd(), "dist/components/AnimatedButton/AnimatedButton.astro"))).toBe(true);
    expect(existsSync(resolve(process.cwd(), "dist/components/Alert/Alert.astro"))).toBe(true);
    expect(existsSync(resolve(process.cwd(), "dist/components/AuraTrail/AuraTrail.astro"))).toBe(true);
    expect(existsSync(resolve(process.cwd(), "dist/components/AxisCarousel3D/AxisCarousel3D.astro"))).toBe(true);
    expect(existsSync(resolve(process.cwd(), "dist/components/Avatar/Avatar.astro"))).toBe(true);
    expect(existsSync(resolve(process.cwd(), "dist/components/AvatarStack/AvatarStack.astro"))).toBe(true);
    expect(existsSync(resolve(process.cwd(), "dist/components/AvatarTooltip/AvatarTooltip.astro"))).toBe(true);
    expect(existsSync(resolve(process.cwd(), "dist/components/Badge/Badge.astro"))).toBe(true);
    expect(existsSync(resolve(process.cwd(), "dist/components/BreathingText/BreathingText.astro"))).toBe(true);
    expect(existsSync(resolve(process.cwd(), "dist/components/BlurFadeIn/BlurFadeIn.astro"))).toBe(true);
    expect(existsSync(resolve(process.cwd(), "dist/components/FadeIn/FadeIn.astro"))).toBe(true);
    expect(existsSync(resolve(process.cwd(), "dist/components/Reveal/Reveal.astro"))).toBe(true);
    expect(existsSync(resolve(process.cwd(), "dist/components/TextRotate/TextRotate.astro"))).toBe(true);
  });
});
