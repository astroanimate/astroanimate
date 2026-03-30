export type TextRotateVariant = "slideUp" | "slideDown" | "fade";

interface TextRotateVariantStyles {
  enterFrom: string;
  exitTo: string;
}

export function getTextRotateVariantStyles(
  variant: TextRotateVariant
): TextRotateVariantStyles {
  switch (variant) {
    case "slideDown":
      return {
        enterFrom: "translateY(-100%)",
        exitTo: "translateY(120%)",
      };
    case "fade":
      return {
        enterFrom: "none",
        exitTo: "none",
      };
    case "slideUp":
    default:
      return {
        enterFrom: "translateY(100%)",
        exitTo: "translateY(-120%)",
      };
  }
}
