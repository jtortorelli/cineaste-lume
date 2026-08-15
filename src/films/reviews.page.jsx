import { loadAllReviews } from "./review_loader.ts";

export const layout = "layouts/review.jsx";

export default function* ({ search }) {
  for (const { slug, content } of loadAllReviews()) {
    const film = search.pages("cineaste films").find((page) =>
      page.basename === slug
    );
    if (!film) {
      continue;
    }

    yield {
      url: `/films/${slug}/review/`,
      title: `${film.title} Review`,
      film_title: film.title,
      film_url: film.url,
      poster_url: film.poster_url,
      video_review: film.video_review,
      star_rating: film.video_review?.star_rating,
      review_content: content,
    };
  }
}
