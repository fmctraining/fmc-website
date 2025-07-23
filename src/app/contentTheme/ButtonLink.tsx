export function ButtonLink({ href, text, key }: { href: string; text: string; key: string }) {
  return (
    <a
      href={href}
      className="inline-block hover:underline decoration-2 underline-offset-8 py-2 px-3 sm:px-6 rounded-full bg-primary border-4 border-white"
      key={key}
    >
      {text}
    </a>
  )
}
