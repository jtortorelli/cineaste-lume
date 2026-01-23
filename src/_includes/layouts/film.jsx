export const layout = "layouts/layout.vto";
export default (
  {
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
    film_series,
    credits,
    basename,
  },
  { date, icon },
) => (
  <>
    <div class="text-center w-fit m-auto">
      <h1 class="font-display tracking-wider uppercase p-4 text-2xl text-gray-700">
        {title}
      </h1>
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
    <comp.named_divider name="Overview" />
    <div class="font-content text-sm text-gray-700 max-w-96 w-fit m-auto">
      <div class="flex pb-2 gap-2">
        <div class="-translate-y-[2px]">
          <img
            class="inline h-4 w-4 text-gray-500"
            src={icon("calendar-event", "tabler", "outline")}
            inline
          />
        </div>
        <div>{date(new Date(release_date), "d MMM yyyy")}</div>
      </div>
      <div class="flex pb-2 gap-2">
        <div class="-translate-y-[2px]">
          <img
            class="inline h-4 w-4 text-gray-500"
            src={icon("stopwatch", "tabler", "outline")}
            inline
          />
        </div>
        <div>{runtime}m</div>
      </div>
      <div class="flex pb-2 gap-2">
        <div class="-translate-y-[2px]">
          <img
            class="inline h-4 w-4 text-gray-500"
            src={icon("language", "tabler", "outline")}
            inline
          />
        </div>
        <div>
          <span
            class="font-japanese tracking-wide"
            dangerouslySetInnerHTML={{ __html: japanese_title }}
          ></span>
          <br />
          <span class="font-content italic text-xs text-gray-500">
            {transliteration}
          </span>
          {transliteration !== translation && (
            <>
              <br />
              <span class="font-content italic text-xs text-gray-500">
                {translation}
              </span>
            </>
          )}
        </div>
      </div>
      {original_works &&
        original_works.length > 0 &&
        original_works.map((work) => (
          <div class="flex pb-2 gap-2">
            <div class="-translate-y-[2px]">
              <img
                class="inline h-4 w-4 text-gray-500"
                src={icon("book", "tabler", "outline")}
                inline
              />
            </div>
            <div>
              {work.title && (
                <>
                  <span class="italic">{work.title}</span>
                  <br />
                </>
              )}
              <span class="uppercase font-detail text-xs text-gray-500">
                {work.format} by
              </span>
              {work.authors &&
                work.authors.length > 0 &&
                work.authors.map((a) => (
                  <>
                    <br />{" "}
                    <comp.person_showcase_link slug={a.slug}>
                      {a.name}
                    </comp.person_showcase_link>
                  </>
                ))}
              {work.studios &&
                work.studios.length > 0 &&
                work.studios.map((s) => (
                  <>
                    <br />
                    {s.name}
                  </>
                ))}
            </div>
          </div>
        ))}
      {aliases &&
        aliases.length > 0 &&
        aliases.map((a) => (
          <div class="flex pb-2 gap-2">
            <div class="-translate-y-[2px]">
              <img
                class="inline h-4 w-4 text-gray-500"
                src={icon("at", "tabler", "outline")}
                inline
              />
            </div>
            <div>
              <span class="italic">{a.alias}</span>
              <br />
              <span class="text-xs text-gray-500">{a.context}</span>
            </div>
          </div>
        ))}
      {series && (
        <div class="flex pb-2 gap-2">
          <div class="-translate-y-[2px]">
            <img
              class="inline h-4 w-4 text-gray-500"
              src={icon("affiliate", "tabler", "outline")}
              inline
            />
          </div>
          <div>
            <span>
              {series.title} Series No. {series.entry_number}{" "}
              {film_series[series.slug] && (
                <>
                  &nbsp;
                  <button
                    class="-translate-y-[2px]"
                    onclick="series_modal.showModal()"
                  >
                    <img
                      class="inline h-5 w-5 text-red-700 hover:cursor-pointer"
                      src={icon("layers-subtract", "tabler", "outline")}
                      inline
                    />
                  </button>
                  <dialog id="series_modal" class="modal">
                    <div class="modal-box">
                      <form method="dialog">
                        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                          <img
                            class="h-5 w-5"
                            src={icon("x", "tabler", "outline")}
                            inline
                          />
                        </button>
                      </form>
                      <comp.named_divider
                        name={`${film_series[series.slug].title} Series`}
                      />
                      <div class="text-gray-700 font-content text-sm">
                        <ol class="list-decimal list-outside gap-2">
                          {film_series[series.slug].entries.map(
                            (series_entry) => (
                              <li class="ml-8 my-1">
                                {series_entry.slug ? (
                                  <comp.film_showcase_link
                                    slug={series_entry.slug}
                                  >
                                    <i>{series_entry.title}</i> (
                                    {series_entry.year})
                                  </comp.film_showcase_link>
                                ) : (
                                  <>
                                    <i>{series_entry.title}</i> (
                                    {series_entry.year})
                                  </>
                                )}
                              </li>
                            ),
                          )}
                        </ol>
                      </div>
                    </div>
                    <form method="dialog" class="modal-backdrop">
                      <button>close</button>
                    </form>
                  </dialog>
                </>
              )}
            </span>
            {series.previous_entry && (
              <>
                <br />
                <span class="pr-2">
                  <img
                    class="inline h-4 w-4 text-gray-500 -translate-y-[2px]"
                    src={icon("square-rounded-arrow-left", "tabler", "outline")}
                    inline
                  />
                </span>
                <comp.film_showcase_link slug={series.previous_entry.slug}>
                  <span class="italic">{series.previous_entry.title}</span> (
                  {series.previous_entry.year})
                </comp.film_showcase_link>
              </>
            )}
            {series.next_entry && (
              <>
                <br />
                <span class="pr-2">
                  <img
                    class="inline h-4 w-4 text-gray-500 -translate-y-[2px]"
                    src={icon(
                      "square-rounded-arrow-right",
                      "tabler",
                      "outline",
                    )}
                    inline
                  />
                </span>
                <comp.film_showcase_link slug={series.next_entry.slug}>
                  <span class="italic">{series.next_entry.title}</span> (
                  {series.next_entry.year})
                </comp.film_showcase_link>
              </>
            )}
          </div>
        </div>
      )}
      <div class="flex pb-2 gap-2">
        <div class="-translate-y-[2px]">
          <img
            class="inline h-4 w-4 text-gray-500"
            src={icon("buildings", "tabler", "outline")}
            inline
          />
        </div>
        <div>{studios && studios.join(", ")}</div>
      </div>
    </div>
    <comp.named_divider name="Staff" />
    <div class="w-fit m-auto lg:columns-3 lg:gap-x-8">
      {staff.map((staff) => (
        <div class="lg:text-center text-left lg:break-inside-avoid-column pb-1">
          <div class="">
            <span class="font-content text-xs text-gray-500">{staff.role}</span>
          </div>
          <div class="">
            {staff.people.map((person) => (
              <div class="text-gray-700 text-sm font-content">
                <comp.person_showcase_link slug={person.slug}>
                  {person.disambig_chars ? (
                    <>
                      {person.name}
                      <span class="text-xs">
                        (
                        <span class="font-japanese">
                          {person.disambig_chars}
                        </span>
                        )
                      </span>
                    </>
                  ) : (
                    <>{person.name}</>
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
    {credits[basename] && (
      <>
        <div class="w-fit m-auto font-content text-sm text-red-700 hover:cursor-pointer pt-2">
          <a onclick="credits_modal.showModal()">
            Credits{" "}
            <img
              class="h-5 w-5 inline"
              src={icon("layers-subtract", "tabler", "outline")}
              inline
            />
          </a>
        </div>
        <dialog id="credits_modal" class="modal">
          <div class="modal-box">
            <form method="dialog">
              <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                <img
                  class="h-5 w-5"
                  src={icon("x", "tabler", "outline")}
                  inline
                />
              </button>
            </form>
            <comp.named_divider name="Credits" />
            <div class="grid grid-cols-2 gap-2 text-gray-700 font-content text-sm">
              {credits[basename].map(
                ({ japanese_role, japanese_name, role, name }) => (
                  <>
                    <div>
                      <span class="text-gray-500 font-mono text-xs">
                        {japanese_role}
                      </span>{" "}
                      <br />
                      <span>{role}</span>
                    </div>
                    <div>
                      <span class="text-gray-500 font-mono text-xs">
                        {japanese_name}
                      </span>{" "}
                      <br />
                      <span>{name}</span>
                    </div>
                  </>
                ),
              )}
            </div>
          </div>
          <form method="dialog" class="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </>
    )}
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
        <div class="flex flex-col sm:flex-row sm:flex-wrap sm:w-fit w-96 m-auto gap-4 justify-center">
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
                    {portrayal.people ? (
                      portrayal.people.map((person) => (
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
                          <comp.qualifier_badge>
                            {portrayal.type}
                          </comp.qualifier_badge>
                        </div>
                      ))
                    ) : (
                      <comp.qualifier_badge>
                        {portrayal.type}
                      </comp.qualifier_badge>
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
