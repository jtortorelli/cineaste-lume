export const layout = "layouts/layout.vto";
export const title = "Films";

export default ({ comp, search }, { date, icon }) => (
  <>
    <div class="text-center w-fit m-auto">
      <h1 class="font-display tracking-wider uppercase p-4 text-2xl text-gray-700">
        Films
      </h1>
    </div>
    <div class="pb-6">
      <div class="relative shadow-lg">
        <div class="absolute inset-y-0 start-0 flex pl-4 items-center ps-3 pointer-events-none text-red-700">
          <img
            src={icon("search", "tabler", "outline")}
            class="h-5 w-5"
            inline
          />
        </div>
        <input
          type="text"
          id="default-search"
          class="font-content block w-full p-4 pl-12 ps-10 text-base text-red-700 border-none rounded-lg"
        />
      </div>
    </div>
    <div>
      <div class="flex flex-col sm:flex-row sm:flex-wrap justify-center items-start gap-4">
        {search.pages("cineaste films", "url").map((film) => (
          <div
            class="filterable sm:flex sm:flex-col sm:w-36 grid grid-cols-[101px_auto]"
            data-terms={`${film.title} ${(film.aliases || []).map((a) => a.alias).join(" ")}`}
          >
            <div>
              <a href={film.url}>
                <div class="text-center w-fit m-auto">
                  <img
                    class="rounded-lg drop-shadow-lg"
                    height={150}
                    width={101}
                    src={film.poster_url}
                  />
                </div>
              </a>
            </div>
            <div class="sm:text-center pt-3">
              <a href={film.url}>
                <comp.cineaste_link href={film.url}>
                  <div class="font-content italic text-sm text-gray-700">
                    {film.title}
                  </div>
                </comp.cineaste_link>
                <div class="font-content text-gray-500 text-xs">
                  {date(new Date(film.release_date), "yyyy")}
                </div>
              </a>
            </div>
          </div>
        ))}
        <div></div>
      </div>
    </div>
    <script src="/scripts/filter.js"></script>
  </>
);
