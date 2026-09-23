const STORAGE_KEY = "wanderlouge-bookmarks";
const listeners = new Set<() => void>();

// Cached so repeated reads (as required by useSyncExternalStore) return the
// same array reference until a write actually changes it — otherwise every
// snapshot check looks like a change and React loops forever.
let cachedSlugs: string[] | null = null;

function readAll(): string[] {
  if (cachedSlugs) return cachedSlugs;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    cachedSlugs = raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    cachedSlugs = [];
  }
  return cachedSlugs;
}

function writeAll(slugs: string[]) {
  cachedSlugs = slugs;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
  } catch {
    // Storage unavailable (private browsing, blocked cookies, etc.) — bookmark just won't persist.
  }
  listeners.forEach((listener) => listener());
}

export function isBookmarked(slug: string): boolean {
  return readAll().includes(slug);
}

export function getBookmarkedSlugs(): string[] {
  return readAll();
}

export function toggleBookmark(slug: string): void {
  const current = readAll();
  const next = current.includes(slug)
    ? current.filter((s) => s !== slug)
    : [...current, slug];
  writeAll(next);
}

export function subscribeBookmarks(callback: () => void): () => void {
  listeners.add(callback);
  return () => listeners.delete(callback);
}
