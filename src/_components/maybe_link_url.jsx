export default function ({ resource_url, children }) {
  return (
    <>
      {resource_url ? <a href={resource_url}>{children}</a> : <>{children}</>}
    </>
  );
}
