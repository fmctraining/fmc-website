export function ButtonLink({ href, text }: { href: string; text: string }) {
  return (
    <a
      href={href}
      className="inline-block py-2 px-3 sm:px-6 rounded-full bg-primary border-4 border-white/70 hover:border-white active:border-white no-underline"
    >
      {text}
    </a>
  )
}
