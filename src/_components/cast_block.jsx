export default function ({ block, comp }, { icon }) {
  function process_role_name(role) {
    return role
      .replace("-maru", '<span class="italic">-maru</span>')
      .replace("-seijin", '<span class="italic">-seijin</span>')
      .replace("Gôtengô", '<span class="italic">Gôtengô</span>')
      .replace("Eclair", '<span class="italic">Eclair</span>')
      .replace("Karyû", '<span class="italic">Karyû</span>');
  }

  return (
    <div class="flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:w-fit w-96 m-auto justify-center">
      {block.map((cast) => (
        <div class="flex flex-row sm:flex-col sm:w-32 items-center gap-3">
          <div class="shrink-0">
            <img
              class="h-[75px] w-[75px] sm:h-[100px] sm:w-[100px] max-w-[150px] rounded-lg drop-shadow-lg"
              src={cast.avatar_url}
            />
          </div>
          <div class="flex flex-col sm:items-center">
            <div class="font-content sm:text-center text-gray-500 text-xs">
              <span
                dangerouslySetInnerHTML={{
                  __html: process_role_name(cast.role),
                }}
              />
              {cast.character_qualifiers && (
                <>
                  <br />
                  <span class="text-xs">({cast.character_qualifiers})</span>
                </>
              )}
            </div>
            <div class="font-content text-sm sm:text-center text-gray-700">
              <comp.person_showcase_link slug={cast.slug}>
                {cast.name}
                {cast.disambig_chars && (
                  <span class="text-xs">
                    (<span class="font-japanese">{cast.disambig_chars}</span>)
                  </span>
                )}
              </comp.person_showcase_link>
            </div>
            {cast.alias && (
              <div class="font-content text-xs text-gray-500">
                <img
                  class="inline h-3 w-3 text-gray-500"
                  src={icon("at", "tabler", "outline")}
                />
                {cast.alias}
              </div>
            )}

            {cast.qualifiers && (
              <comp.qualifier_badge>{cast.qualifiers}</comp.qualifier_badge>
            )}

            {cast.uncredited && <comp.uncredited_badge />}
            {cast.secondary &&
              cast.secondary.map((secondary) => (
                <div class="font-content text-sm sm:text-center text-gray-700">
                  <comp.person_showcase_link slug={secondary.slug}>
                    {secondary.name}
                    {secondary.disambig_chars && (
                      <span class="text-xs">
                        (
                        <span class="font-japanese">
                          {secondary.disambig_chars}
                        </span>
                        )
                      </span>
                    )}
                  </comp.person_showcase_link>
                  {secondary.alias && (
                    <div class="font-content text-xs text-gray-500">
                      <img
                        class="inline h-3 w-3 text-gray-500"
                        src={icon("at", "tabler", "outline")}
                      />
                      {secondary.alias}
                    </div>
                  )}
                  {secondary.qualifiers && (
                    <comp.qualifier_badge>
                      {secondary.qualifiers}
                    </comp.qualifier_badge>
                  )}

                  {secondary.uncredited && <comp.uncredited_badge />}
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
