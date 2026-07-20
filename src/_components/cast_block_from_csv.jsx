function isTruthy(value) {
  return value === true || value === "true";
}

function castEntryFromCsvRow(row) {
  const entry = {
    role: row.role,
    name: row.name,
  };

  if (isTruthy(row.showcased) && row.slug) entry.slug = row.slug;
  if (row.avatar_url) entry.avatar_url = row.avatar_url;
  if (isTruthy(row.uncredited)) entry.uncredited = true;
  if (row.alias) entry.alias = row.alias;
  if (row.qualifiers) entry.qualifiers = row.qualifiers;
  if (row.character_qualifiers) {
    entry.character_qualifiers = row.character_qualifiers;
  }

  return entry;
}

function castFromCsv(rows) {
  const topBilled = [];
  const supporting = [];

  for (const row of rows) {
    const entry = castEntryFromCsvRow(row);
    if (isTruthy(row.supporting)) {
      supporting.push(entry);
    } else {
      topBilled.push(entry);
    }
  }

  return { topBilled, supporting };
}

export default function ({ rows, comp }) {
  const { topBilled, supporting } = castFromCsv(rows);

  return (
    <>
      <comp.named_divider name="top billed cast" />
      <comp.cast_block block={topBilled} />
      {supporting.length > 0 && (
        <>
          <comp.named_divider name="supporting cast" />
          <comp.cast_block block={supporting} />
        </>
      )}
    </>
  );
}
