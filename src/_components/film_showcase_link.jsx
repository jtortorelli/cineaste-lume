export default function ({ children, slug, comp }) {
  return (
    <>
      {slug
        ? (
          <comp.cineaste_link href={`/films/${slug}`}>
            {children}
          </comp.cineaste_link>
        )
        : <>{children}</>}
    </>
  );
}
