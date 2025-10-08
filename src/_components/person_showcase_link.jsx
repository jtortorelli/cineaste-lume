export default function ({ slug, children, comp }) {
  return (
    <>
      {slug
        ? (
          <comp.cineaste_link href={`/people/${slug}`}>
            {children}
          </comp.cineaste_link>
        )
        : <>{children}</>}
    </>
  );
}
