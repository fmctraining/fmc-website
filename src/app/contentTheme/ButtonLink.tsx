export function ButtonLink({ href, text }: { href: string; text: string }) {
  return (
    <a
      href={href}
      className="inline-block hover:underline decoration-2 underline-offset-8 py-2 px-3 sm:px-6 rounded-full bg-primary border-4 border-white transition-transform duration-75 active:scale-96"
    >
      {text}
    </a>
  )
}
