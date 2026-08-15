const REVIEWS_DIR = new URL("./_data/reviews/", import.meta.url);

export type ReviewEntry = {
  slug: string;
  content: string;
};

let cachedReviews: ReviewEntry[] | null = null;

export function loadAllReviews(): ReviewEntry[] {
  if (cachedReviews) {
    return cachedReviews;
  }

  const reviews: ReviewEntry[] = [];

  for (const entry of Deno.readDirSync(REVIEWS_DIR)) {
    if (!entry.isFile || !entry.name.endsWith(".md")) {
      continue;
    }

    const slug = entry.name.replace(/\.md$/, "");
    const content = Deno.readTextFileSync(new URL(entry.name, REVIEWS_DIR));
    reviews.push({ slug, content });
  }

  cachedReviews = reviews.sort((a, b) => a.slug.localeCompare(b.slug));
  return cachedReviews;
}

export function hasWrittenReview(slug: string): boolean {
  return loadAllReviews().some((review) => review.slug === slug);
}
