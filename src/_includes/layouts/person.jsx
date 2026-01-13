export const layout = "layouts/layout.vto";
export default ({
  accolades,
  aliases,
  avatar_url,
  birth_name,
  birth_place,
  children,
  dob,
  dob_resolution,
  dod,
  dod_resolution,
  cause_of_death,
  death_place,
  family,
  name,
  japanese_birth_name,
  japanese_name,
  spouses,
  comp,
  works,
}, { date, icon }) => {
  const display_date = (date_value, resolution) => {
    if (!date_value) {
      return "";
    }
    if (resolution === "year") {
      return date(new Date(date_value), "yyyy");
    } else if (resolution === "month") {
      return date(new Date(date_value), "MMM yyyy");
    } else {
      return date(new Date(date_value), "d MMM yyyy");
    }
  };

  const lifespan = (dob, dod) => {
    if (!dob || !dod) {
      return "";
    }
    const birth = new Date(dob);
    const death = new Date(dod);
    let age = death.getFullYear() - birth.getFullYear();
    const m = death.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && death.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const process_roles = (kaiju_roles, roles) => {
    const null_safe_kaiju_roles = kaiju_roles && kaiju_roles.length > 0
      ? kaiju_roles
      : [];
    const null_safe_roles = roles && roles.length > 0 ? roles : [];
    return null_safe_kaiju_roles.concat(null_safe_roles);
  };

  function process_role_name(role) {
    return role
      .replace("-maru", '<span class="italic">-maru</span>')
      .replace("-seijin", '<span class="italic">-seijin</span>')
      .replace("Gôtengô", '<span class="italic">Gôtengô</span>')
      .replace("Eclair", '<span class="italic">Eclair</span>')
      .replace("Karyû", '<span class="italic">Karyû</span>');
  }
  return (
    <>
      <div class="text-center w-fit m-auto">
        <h1 class="font-display tracking-wider uppercase text-2xl text-gray-700 p-4">
          {name}
        </h1>
        <div class="pb-4 lg:shrink-0 h-full w-fit m-auto">
          <img
            class="rounded-lg drop-shadow-lg"
            src={avatar_url}
            height="200px"
            width="200px"
          />
        </div>
      </div>
      <comp.named_divider name="Bio" />
      <div class="text-sm grid gap-6 sm:grid-cols-[repeat(auto-fit,minmax(110px,140px))] mb-4 mx-auto items-start justify-center">
        {japanese_name && (
          <div class="flex lg:break-inside-avoid-column gap-1 items-middle">
            <div>
              <img
                class="h-4 w-4 text-gray-500"
                src={icon("language", "tabler", "outline")}
                inline
              />
            </div>
            <div class="font-japanese text-gray-700">{japanese_name}</div>
          </div>
        )}
        {dob && (
          <div class="flex lg:break-inside-avoid-column gap-1 items-middle">
            <div>
              <img
                class="h-5 w-4 text-gray-500"
                src={icon("sun-high", "tabler", "outline")}
                inline
              />
            </div>
            <div class="space-y-1">
              <div class="font-content text-gray-700">
                {display_date(dob, dob_resolution)} <span id="age-span"></span>
                {!dod && (
                  <script>
                    {`
                            const dob = new Date("${dob}");
                            const ageDifMs = Date.now() - dob.getTime();
                            const ageDate = new Date(ageDifMs); // miliseconds from epoch
                            const age = Math.abs(ageDate.getUTCFullYear() - 1970);
                            const ageSpan = document.getElementById("age-span");
                            ageSpan.textContent = "(" + age + ")";
                        `}
                  </script>
                )}
              </div>

              {birth_name && (
                <div class="font-content text-gray-500 text-xs">
                  {birth_name}
                </div>
              )}
              {japanese_birth_name && (
                <div class="font-content text-gray-500 text-xs">
                  {japanese_birth_name}
                </div>
              )}
              {birth_place && (
                <div class="font-content text-gray-500 text-xs">
                  {birth_place}
                </div>
              )}
            </div>
          </div>
        )}
        {dod && typeof dod !== "string" && (
          <div class="flex lg:break-inside-avoid-column gap-1 items-middle">
            <div>
              <img
                class="h-5 w-4 text-gray-500"
                src={icon("moon", "tabler", "outline")}
                inline
              />
            </div>
            <div class="space-y-1">
              <div class="font-content text-gray-700">
                {display_date(dod, dod_resolution)} ({lifespan(dob, dod)})
              </div>
              {death_place && (
                <div class="font-content text-gray-500 text-xs">
                  {death_place}
                </div>
              )}
              {cause_of_death && (
                <div class="font-content text-gray-500 text-xs">
                  {cause_of_death}
                </div>
              )}
            </div>
          </div>
        )}
        {dod &&
          typeof dod === "string" &&
          dod.toLowerCase() === "unknown" && (
          <div class="flex lg:break-inside-avoid-column gap-1 items-middle">
            <div>
              <img
                class="h-5 w-4 text-gray-500"
                src={icon("moon", "tabler", "outline")}
                inline
              />
            </div>
            <div class="font-content text-gray-700">Unknown Date</div>
          </div>
        )}
        {aliases &&
          aliases.length > 0 &&
          aliases.map((a) => (
            <div class="flex lg:break-inside-avoid-column gap-1 items-middle">
              <div>
                <img
                  class="h-5 w-4 text-gray-500"
                  src={icon("at", "tabler", "outline")}
                  inline
                />
              </div>
              <div>
                <div class="font-content text-gray-700">{a.name}</div>

                {a.japanese_name && (
                  <div class="font-content text-gray-500 text-xs">
                    {a.japanese_name}
                  </div>
                )}
                {a.context && (
                  <div class="font-content text-gray-500 text-xs">
                    {a.context}
                  </div>
                )}
                {a.category == "mistranslation" && (
                  <div class="font-content text-gray-500 text-xs">
                    Mistranslation
                  </div>
                )}
              </div>
            </div>
          ))}

        {spouses &&
          spouses.length > 0 &&
          spouses.map((spouse) => (
            <div class="flex lg:break-inside-avoid-column gap-1 items-middle">
              <div>
                <img
                  class="h-5 w-5 text-gray-500"
                  src={icon("chart-circles", "tabler", "outline")}
                  inline
                />
              </div>
              <div>
                <div class="font-content text-gray-700">
                  <comp.person_showcase_link slug={spouse.slug}>
                    {spouse.name}
                  </comp.person_showcase_link>
                </div>
              </div>
            </div>
          ))}
        {family && family.length > 0 && (
          <div class="flex lg:break-inside-avoid-column gap-1 items-middle">
            <div>
              <img
                class="h-5 w-5 text-gray-500"
                src={icon("users-group", "tabler", "outline")}
                inline
              />
            </div>
            <div>
              {family.map((family) => (
                <>
                  <div class="font-content text-gray-700">
                    <comp.person_showcase_link slug={family.slug}>
                      {family.name}
                    </comp.person_showcase_link>
                  </div>
                  <div class="font-content text-gray-500 text-xs capitalize">
                    {family.relationship}
                  </div>
                </>
              ))}
            </div>
          </div>
        )}
      </div>
      <div class="
        text-sm font-content text-justify text-gray-700 mb-1 pt-2 mx-auto
        w-96 sm:w-fit
        columns-1 sm:columns-2 space-y-2
           
        sm:[&:has(>_:only-child)]:columns-1
        sm:[&:has(>_:only-child)]:w-96
        sm:[&:has(>_:only-child)]:justify-items-center
      ">
        {children}
      </div>
      {accolades && accolades.length > 0 && (
        <>
          <comp.named_divider name="Accolades" />
          <div class="grid gap-6 sm:grid-cols-[repeat(auto-fit,minmax(110px,150px))] justify-center mx-auto">
            {accolades.map((accolade) => (
              <div class="">
                <div
                  class={`font-content text-xs gap-1 ${
                    accolade.status === "won"
                      ? "text-amber-600"
                      : "text-gray-700"
                  }`}
                >
                  <div class="flex items-end gap-1">
                    <div>
                      <img
                        class="h-4 w-4"
                        src={icon(
                          "award",
                          "tabler",
                          accolade.status === "won" ? "filled" : "outline",
                        )}
                        inline
                      />
                    </div>
                    <div
                      class={`uppercase font-detail ${
                        accolade.status !== "won" ? "text-gray-500" : ""
                      }`}
                    >
                      {accolade.status === "won" ? "Won" : "Nominated"}
                    </div>
                  </div>
                  <div>
                    <div>{accolade.ceremony}</div>
                    <div>{accolade.category}</div>
                    {accolade.films && accolade.films.length > 0 && (
                      <div class="italic">
                        {accolade.films.map((f) => f.title).join(", ")}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      <comp.named_divider name="Selected Works" />
      <div class="full-filmography">
        <div class="flex flex-col sm:flex-row sm:flex-wrap gap-4 m-auto sm:w-fit w-96">
          {works &&
            works.length > 0 &&
            works.map((entry) => (
              <>
                {entry.format.toLowerCase() === "tv series" && (
                  <div class="flex flex-row w-60 items-start gap-3">
                    <div class="shrink-0">
                      <img
                        class="rounded-lg drop-shadow-lg"
                        width={101}
                        src={entry.title_card_url}
                      />
                    </div>
                    <div>
                      <div class="font-content text-xs text-gray-500 flex items-center gap-1">
                        <div>
                          <img
                            class="h-5 w-4 text-gray-500"
                            src={icon("device-tv-old", "tabler", "outline")}
                            inline
                          />
                        </div>
                        <div>{entry.year}</div>
                      </div>
                      <div class="font-content text-sm text-gray-700 mb-1">
                        <span class="italic">{entry.title}</span>
                      </div>

                      {entry.staff &&
                        entry.staff.length > 0 &&
                        entry.staff.map((s) => (
                          <div class="font-content text-xs text-gray-500 flex">
                            <div>
                              <img
                                class="h-4 w-4"
                                src={icon(
                                  "chair-director",
                                  "tabler",
                                  "outline",
                                )}
                                inline
                              />
                            </div>
                            <div>
                              <div>{s.role}</div>
                              {s.episode_count && (
                                <div>
                                  {s.episode_count}{" "}
                                  {s.episode_count > 1 ? "Episodes" : "Episode"}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      {entry.roles &&
                        entry.roles.length > 0 &&
                        entry.roles.map((r) => (
                          <div class="font-content text-xs text-gray-500 flex gap-1">
                            <div>
                              <img
                                class="h-4 w-4"
                                src={icon("masks-theater", "tabler", "outline")}
                                inline
                              />
                            </div>
                            <div>
                              <div>{r.name}</div>
                              {r.episode_count && (
                                <div>
                                  {r.episode_count}{" "}
                                  {r.episode_count > 1 ? "Episodes" : "Episode"}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
                {entry.format.toLowerCase() === "film" && (
                  <>
                    <div class="flex flex-row w-60 items-start gap-3">
                      <div class="shrink-0">
                        <img
                          class="rounded-lg drop-shadow-lg min-h-[150px] max-h-[150px]"
                          height={150}
                          width={101}
                          src={entry["poster_url"]}
                        />
                      </div>
                      <div>
                        <div class="font-content text-xs text-gray-500 flex items-center gap-1">
                          <div>
                            <img
                              class="h-5 w-4 text-gray-500"
                              src={icon("movie", "tabler", "outline")}
                              inline
                            />
                          </div>
                          <div>{entry.year}</div>
                        </div>
                        <div class="font-content text-sm text-gray-700 mb-1">
                          <comp.film_showcase_link slug={entry.slug}>
                            <span class="italic">{entry.title}</span>
                          </comp.film_showcase_link>
                        </div>
                        {entry.staff &&
                          entry.staff.length > 0 &&
                          entry.staff.map((s) => (
                            <div class="font-content text-xs text-gray-500 flex">
                              <div>
                                <img
                                  class="h-4 w-4"
                                  src={icon(
                                    "chair-director",
                                    "tabler",
                                    "outline",
                                  )}
                                  inline
                                />
                              </div>
                              <div>
                                <div>{s.role}</div>
                                {s.staff_alias && (
                                  <div>
                                    <img
                                      class="h-3 w-3"
                                      src={icon("at", "tabler", "outline")}
                                      inline
                                    />
                                    {s.staff_alias}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        {process_roles(entry.kaiju_roles, entry.roles).map(
                          (r) => (
                            <div class="font-content text-xs text-gray-500 flex gap-1">
                              <div>
                                <img
                                  class="h-4 w-4"
                                  src={icon(
                                    "masks-theater",
                                    "tabler",
                                    "outline",
                                  )}
                                  inline
                                />
                              </div>
                              <div>
                                <div>
                                  <span
                                    dangerouslySetInnerHTML={{
                                      __html: process_role_name(r.name),
                                    }}
                                  >
                                  </span>
                                </div>
                                {r.actor_alias && (
                                  <>
                                    <img
                                      class="h-3 w-3 inline"
                                      src={icon("at", "tabler", "outline")}
                                      inline
                                    />
                                    {r.actor_alias}
                                  </>
                                )}
                                <div class="flex">
                                  {r.qualifiers &&
                                    r.qualifiers.map((q) => (
                                      <comp.qualifier_icon qualifier={q} />
                                    ))}
                                  {r.uncredited && (
                                    <img
                                      class="text-red-700 h-4 w-4"
                                      src={icon("id-off", "tabler", "outline")}
                                      inline
                                    />
                                  )}
                                </div>
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </>
                )}
                {entry.format.toLowerCase() === "book" && (
                  <>
                    <div class="flex flex-row w-60 items-start gap-3">
                      <div class="shrink-0">
                        <img
                          class="rounded-lg drop-shadow-lg min-h-[125px]"
                          height={125}
                          width={101}
                          src={entry["cover_url"]}
                        />
                      </div>
                      <div>
                        <div class="font-content text-xs text-gray-500 flex items-center gap-1">
                          <div>
                            <img
                              class="h-5 w-4"
                              src={icon("book", "tabler", "outline")}
                              inline
                            />
                          </div>
                          <div>{entry.year}</div>
                        </div>
                        <div class="font-content text-sm text-gray-700 mb-1">
                          <span class="italic">{entry.title}</span>
                        </div>

                        {entry.staff &&
                          entry.staff.length > 0 &&
                          entry.staff.map((s) => (
                            <div class="font-content text-xs text-gray-500 flex gap-1">
                              <div>
                                <img
                                  class="h-4 w-4"
                                  src={icon("pencil", "tabler", "outline")}
                                  inline
                                />
                              </div>
                              <div>
                                <div>{s.role}</div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </>
                )}
              </>
            ))}
        </div>
      </div>
    </>
  );
};
