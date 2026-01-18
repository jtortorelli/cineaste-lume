export default function ({ href, children }) {
  return (
    <a
      class="underline decoration-red-700 decoration-1 underline-offset-2 hover:cursor-pointer hover:text-red-700 hover:decoration-red-700"
      href={href}
    >
      {children}
    </a>
  );
}
