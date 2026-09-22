import fs from "fs";
import path from "path";
import type { PhotoInput, PhotoRef } from "@/types";

/**
 * Checks whether a file referenced by a `/public`-relative path has actually
 * been added to the project yet. This runs only at data-definition time (see
 * data/stories.ts, data/destinations.ts), which are server-only modules —
 * never import this file from a client component.
 */
export function imageExists(publicPath: string): boolean {
  try {
    const filePath = path.join(process.cwd(), "public", publicPath);
    return fs.existsSync(filePath) && fs.statSync(filePath).isFile();
  } catch {
    return false;
  }
}

/** Resolves a PhotoInput into a plain-data PhotoRef the rest of the app can
 * consume (client or server) without ever touching the filesystem itself. */
export function resolvePhoto(input: PhotoInput): PhotoRef {
  return { ...input, exists: imageExists(input.src) };
}

export function resolvePhotos(inputs: PhotoInput[]): PhotoRef[] {
  return inputs.map(resolvePhoto);
}
