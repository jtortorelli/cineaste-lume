export const layout = "layouts/layout.vto";
export default ({
  title,
  poster_url,
  release_date,
  runtime,
  japanese_title,
  transliteration,
  aliases,
  series,
  staff,
  translation,
  top_billed_cast,
  supporting_cast,
  kaiju,
  original_works,
  studios,
  comp,
}, { icon }) => (
  <>
    <div class="text-center w-fit m-auto">
      <h1 class="font-display tracking-wider uppercase p-2 text-2xl text-gray-700">
        {title}
      </h1>
    </div>
    <comp.named_divider name="Overview" />
    <div class="lg:grid lg:grid-flow-col lg:auto-cols-auto lg:gap-4 lg:justify-center lg:items-center lg:max-w-2xl m-auto">
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
      <div class="text-sm m-auto w-fit space-y-3 h-full">
        <div class="text-gray-700 font-content flex items-center gap-1">
          <div>
            <img
              class="inline h-5 w-4 text-gray-500"
              src={icon("calendar-event", "tabler", "outline")}
              inline
            />
          </div>
          <div>{new Date(release_date).toLocaleDateString()}</div>
        </div>
        <div class="text-gray-700 font-content flex items-center gap-1">
          <div>
            <img
              class="inline h-5 w-4 text-gray-500"
              src={icon("stopwatch", "tabler", "outline")}
              inline
            />
          </div>
          <div>{runtime}m</div>
        </div>
        <div class="flex lg:break-inside-avoid-column gap-1 items-baseline">
          <div>
            <img
              class="inline h-5 w-4 text-gray-500"
              src={icon("language", "tabler", "outline")}
              inline
            />
          </div>
          <div class="space-y-1">
            <div class="font-japanese tracking-wide text-gray-700">
              {japanese_title}
            </div>
            <div class="font-content italic text-xs text-gray-500">
              {transliteration}
            </div>
            {transliteration !== translation && (
              <div class="font-content italic text-xs text-gray-500">
                {translation}
              </div>
            )}
          </div>
        </div>
        {original_works && original_works.length > 0 &&
          original_works.map((work) => (
            <div class="flex lg:break-inside-avoid-column gap-1 items-baseline">
              <div>
                <img
                  class="inline h-5 w-4 text-gray-500"
                  src={icon("book", "tabler", "outline")}
                  inline
                />
              </div>
              <div>
                <div class="font-content italic text-gray-700">
                  {work.title}
                </div>
                <div class="uppercase font-detail text-xs text-gray-500">
                  {work.format} by
                </div>
                {work.authors && work.authors.length > 0 &&
                  work.authors.map((a) => (
                    <div class="font-content text-gray-700">
                      <comp.person_showcase_link slug={a.slug}>
                        {a.name}
                      </comp.person_showcase_link>
                    </div>
                  ))}
                {work.studios && work.studios.length > 0 &&
                  work.studios.map((s) => (
                    <div class="font-content text-gray-700">
                      {s.name}
                    </div>
                  ))}
              </div>
            </div>
          ))}

        {aliases && aliases.length > 0 && (
          <div class="space-y-1">
            {aliases.map((alias) => (
              <div class="lg:break-inside-avoid-column flex gap-1 items-baseline">
                <div>
                  <img
                    class="inline h-5 w-4 text-gray-500"
                    src={icon("at", "tabler", "outline")}
                    inline
                  />
                </div>
                <div>
                  <div class="font-content italic text-gray-700">
                    {alias.alias}
                  </div>
                  <div class="font-detail text-xs text-gray-500">
                    {alias.context}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {series && (
          <div class="lg:break-inside-avoid-column space-y-1">
            <div class="text-gray-700 flex font-content gap-1 items-baseline">
              <div>
                <img
                  class="inline h-5 w-4 text-gray-500"
                  src={icon("affiliate", "tabler", "outline")}
                  inline
                />
              </div>
              <div class="flex gap-1 items-baseline">
                <div>
                  <i>{series.title}</i> Series No. {series.entry_number}
                </div>
                {
                  /* <div>
                  <a phx-click={show_modal("series-modal")}>
                    <img
                      class="inline h-5 w-4 text-red-700 hover:cursor-pointer"
                      src={icon("layers-subtract", "tabler", { variant: "outline" })}
                      inline
                    />
                  </a>
                </div> */
                }
              </div>
            </div>

            {/* <.series_modal series={@series} /> */}
            {series.previous_entry && (
              <div class="flex gap-1 items-baseline font-content text-gray-700">
                <div>
                  <img
                    class="inline h-5 w-4 text-gray-500"
                    src={icon("square-rounded-arrow-left", "tabler", "outline")}
                    inline
                  />
                </div>
                <div>
                  <comp.film_showcase_link slug={series.previous_entry.slug}>
                    <span class="italic text-wrap">
                      {series.previous_entry.title}
                    </span>&nbsp;
                    <span class="text-sm">
                      ({series.previous_entry.year})
                    </span>
                  </comp.film_showcase_link>
                </div>
              </div>
            )}
            {series.next_entry && (
              <div class="flex gap-1 items-baseline font-content text-gray-700">
                <div>
                  <img
                    class="inline h-5 w-4 text-gray-500"
                    src={icon(
                      "square-rounded-arrow-right",
                      "tabler",
                      "outline",
                    )}
                    inline
                  />
                </div>
                <div>
                  <comp.film_showcase_link slug={series.next_entry.slug}>
                    <span class="italic text-wrap">
                      {series.next_entry.title}
                    </span>&nbsp;
                    <span class="text-sm">({series.next_entry.year})</span>
                  </comp.film_showcase_link>
                </div>
              </div>
            )}
          </div>
        )}

        <div class="font-content text-gray-700 flex gap-1 items-baseline">
          <div>
            <img
              class="inline h-5 w-4 text-gray-500"
              src={icon("buildings", "tabler", "outline")}
              inline
            />
          </div>
          <div>
            <div class="font-content text-gray-700">
              {studios.map((studio) => (
                <>
                  {studio}
                  <br />
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    <comp.named_divider name="Staff" />
    <div class="w-fit m-auto lg:columns-3 lg:gap-x-8">
      {staff.map((staff) => (
        <div class="lg:text-center text-left lg:break-inside-avoid-column pb-1">
          <div class="">
            <span class="font-detail text-xs uppercase text-gray-500">
              {staff.role}
            </span>
          </div>
          <div class="">
            {staff.people.map((person) => (
              <div class="text-gray-700 text-sm font-content">
                <comp.person_showcase_link slug={person.slug}>
                  {person.disambig_chars
                    ? (
                      <>
                        {person.name}
                        <span class="text-xs">
                          (<span class="font-japanese">
                            {person.disambig_chars}
                          </span>)
                        </span>
                      </>
                    )
                    : (
                      <>
                        {person.name}
                      </>
                    )}
                </comp.person_showcase_link>

                <br />
                {person.alias && (
                  <span class="text-gray-500 text-xs">
                    <img
                      class="inline h-3 w-3 text-gray-500"
                      src={icon("at", "tabler", "outline")}
                      inline
                    />
                    {person.alias}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
    {
      /* <div
      :if={@credits}
      class="w-fit m-auto font-detail text-xs text-red-700 hover:cursor-pointer pt-2"
    >
      <a phx-click={show_modal("credits-modal")} class="uppercase">
        Full Cast & Crew <.icon name="tabler-layers-subtract" class="h-4 w-4" />
      </a>
      <.full_credits_modal film={@film} credits={@credits} />
    </div> */
    }
    <comp.named_divider name="top billed cast" />
    <comp.cast_block block={top_billed_cast} />
    {supporting_cast && supporting_cast.length > 0 && (
      <>
        <comp.named_divider name="supporting cast" />
        <comp.cast_block block={supporting_cast} />
      </>
    )}
    {kaiju && kaiju.length > 0 && (
      <>
        <comp.named_divider name="kaiju, etc." />
        <div class="flex flex-col sm:flex-row sm:flex-wrap sm:w-fit w-96 m-auto gap-4">
          {kaiju.map((kaiju) => (
            <div class="flex flex-row sm:flex-col sm:w-32 items-center gap-3">
              <div class="shrink-0">
                <img
                  class="h-[75px] w-[75px] sm:h-[100px] sm:w-[100px] max-w-[150px] rounded-lg drop-shadow-lg"
                  src={kaiju.avatar_url}
                />
              </div>
              <div class="flex flex-col sm:items-center">
                <div class="font-content text-gray-500 text-xs">
                  {kaiju.name}
                </div>
                {kaiju.portrayals.map((portrayal) => (
                  <>
                    {portrayal.people
                      ? portrayal.people.map((person) => (
                        <div class="font-content text-sm sm:text-center text-gray-700">
                          <comp.person_showcase_link slug={person.slug}>
                            {person.name}
                          </comp.person_showcase_link>

                          {person.alias && (
                            <div class="font-content text-xs text-gray-500">
                              <img
                                class="inline h-3 w-3 text-gray-500"
                                src={icon("at", "tabler", "outline")}
                                inline
                              />
                              {person.alias}
                            </div>
                          )}
                          <div class="font-detail text-xs text-gray-500 uppercase">
                            <comp.qualifier_icon qualifier={portrayal.type} />
                          </div>
                        </div>
                      ))
                      : (
                        <div class="font-detail text-xs text-gray-500 uppercase">
                          <comp.qualifier_icon qualifier={portrayal.type} />
                        </div>
                      )}
                  </>
                ))}
              </div>
            </div>
          ))}
        </div>
      </>
    )}
  </>
);
