export const layout = "layouts/layout.jsx";

export default ({
  film_title,
  film_url,
  poster_url,
  star_rating,
  video_review,
  review_content,
  comp,
}, { md, icon }) => (
  <>
    <div class="pb-4 font-content text-sm">
      <comp.cineaste_link href={film_url}>
        <img
          class="inline h-4 w-4 text-gray-500 -translate-y-[2px] mr-1"
          src={icon("square-rounded-arrow-left", "tabler", "outline")}
          inline
        />
        Back to <i>{film_title}</i>
      </comp.cineaste_link>
    </div>
    <div class="text-center w-fit m-auto">
      <h1 class="font-display tracking-wider uppercase p-4 text-2xl text-gray-700">
        {film_title}
      </h1>
    </div>
    <div class="text-center w-fit m-auto pb-2">
      <div class="font-content text-red-700">godzillacineaste.net review</div>
    </div>
    <div class="pb-4 lg:shrink-0">
      <div class="text-center w-fit m-auto">
        <img
          class="rounded-lg drop-shadow-lg"
          height={400}
          width={270}
          src={poster_url}
        />
      </div>
    </div>
    <div class="pb-4">
      <comp.review_stars star_rating={star_rating} show_label={true} />
    </div>
    <div
      class="
        text-sm font-content text-justify text-gray-700 pb-4 pt-2 mx-auto
        w-96 sm:w-fit
        columns-1 sm:columns-2 space-y-2

        sm:[&:has(>_:only-child)]:columns-1
        sm:[&:has(>_:only-child)]:w-96
        sm:[&:has(>_:only-child)]:justify-items-center
      "
      dangerouslySetInnerHTML={{ __html: md(review_content) }}
    />
    <div class="pb-4">
      <comp.review_stars star_rating={star_rating} show_label={true} />
    </div>
    <comp.review_video_links video_review={video_review} />
  </>
);
