export const layout = "layouts/layout.vto";
export default (
  {
    active_period_start,
    active_period_end,
    avatar_url,
    japanese_name,
    members,
    name,
    type,
    comp,
    works,
  },
  { date, icon },
) => {
  function process_role_name(role) {
    return role
      .replace("-maru", '<span class="italic">-maru</span>')
      .replace("-seijin", '<span class="italic">-seijin</span>')
      .replace("Gôtengô", '<span class="italic">Gôtengô</span>')
      .replace("Eclair", '<span class="italic">Eclair</span>')
      .replace("Karyû", '<span class="italic">Karyû</span>');
  }
  const process_roles = (kaiju_roles, roles) => {
    const null_safe_kaiju_roles =
      kaiju_roles && kaiju_roles.length > 0 ? kaiju_roles : [];
    const null_safe_roles = roles && roles.length > 0 ? roles : [];
    return null_safe_kaiju_roles.concat(null_safe_roles);
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
        <comp.named_divider name="Overview" />
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
          {type === "group" && active_period_start && (
            <div className="flex lg:break-inside-avoid-column gap-1 items-middle">
              <div>
                <img
                  class="h-4 w-4 text-gray-500"
                  src={icon("calendar-time", "tabler", "outline")}
                  inline
                />
              </div>
              <div class="font-content text-gray-700">
                {active_period_start} - {active_period_end ?? "Present"}
              </div>
            </div>
          )}
        </div>
      </div>
      {type === "group" && members && members.length > 0 && (
        <>
          <comp.named_divider name="Members" />
          <div class="w-96 m-auto sm:w-fit flex flex-col sm:flex-row flex-wrap gap-6 justify-center">
            {members.map((member) => (
              <>
                <div class="flex flex-col text-sm gap-3">
                  <div class="sm:text-center text-base font-content text-gray-700">
                    {member.name}
                  </div>
                  <div>
                    {member.dob && (
                      <div class="flex lg:break-inside-avoid-column gap-1 items-middle">
                        <div>
                          <img
                            class="h-4 w-4 text-gray-500"
                            src={icon("sun-high", "tabler", "outline")}
                            inline
                          />
                        </div>
                        <div class="space-y-1">
                          <div class="font-content text-gray-700">
                            {display_date(member.dob, member.dob_resolution)}
                            {!member.dod && <>({age(member.dob)})</>}
                          </div>
                          {member.birth_name && (
                            <div class="font-content text-gray-500 text-xs">
                              {member.birth_name}
                            </div>
                          )}
                          {member.japanese_birth_name && (
                            <div class="font-content text-gray-500 text-xs">
                              {member.japanese_birth_name}
                            </div>
                          )}
                          {member.birth_place && (
                            <div class="font-content text-gray-500 text-xs">
                              {member.birth_place}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  <div>
                    {member.dod && typeof member.dod !== "string" && (
                      <div class="flex lg:break-inside-avoid-column gap-1 items-baseline">
                        <div>
                          <img
                            class="h-4 w-4 text-gray-500"
                            src={icon("moon", "tabler", "outline")}
                            inline
                          />
                        </div>
                        <div class="space-y-1">
                          <div class="font-content text-gray-700">
                            {display_date(member.dod, member.dod_resolution)} (
                            {lifespan(member.dob, member.dod)})
                          </div>
                          {member.death_place && (
                            <div class="font-content text-gray-500 text-xs">
                              {member.death_place}
                            </div>
                          )}
                          {member.cause_of_death && (
                            <div class="font-content text-gray-500 text-xs">
                              {member.cause_of_death}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
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
                                  ></span>
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
                                      <comp.qualifier_badge>
                                        {q}
                                      </comp.qualifier_badge>
                                    ))}
                                  {r.uncredited && <comp.uncredited_badge />}
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
