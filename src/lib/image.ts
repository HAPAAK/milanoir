import type { StaticImageData } from "next/image";

/**
 * Resolves a Next.js static image import (or plain string URL) to a string src.
 * Eliminates the repeated `typeof img === "string" ? img : img.src` pattern.
 */
export const getImageSrc = (img: string | StaticImageData): string =>
  typeof img === "string" ? img : img.src;
