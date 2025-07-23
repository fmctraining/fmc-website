import { requestInfo as r } from 'rwsdk/worker'
import { frontmatterIcons } from './icons'
import { ButtonLink } from './ButtonLink'

export function Footer() {
  const footer = r.ctx.pageContext?.siteData?.footer
  return (
    <footer className="max-w-6xl px-2 mx-auto mt-32 mb-4 flex flex-col items-center gap-4">
      <img
        src="/images/fmc_footer_white.png"
        alt="Future Media Courses Conferences Certifications"
        width="1344"
        height="364"
        className="w-[400px] max-w-[80vw]"
      />
      <div className="flex flex-wrap justify-center gap-4">
        {footer?.links.map((link) => <ButtonLink href={link.href} text={link.text} key={link.href} />)}
      </div>
      <hr className="w-full mt-8 border-gray-500" />
      <div className="mt-4">Sign up for our newsletter!</div>
      <div
        className="w-full max-w-xl mx-auto"
        dangerouslySetInnerHTML={{
          __html: `
<script charset="utf-8" type="text/javascript" src="https://js.hsforms.net/forms/v2.js"></script>
<script>
  hbspt.forms.create({
  region: "na1",
  portalId: "4023639",
  formId: "6b4ee505-897f-4264-9d29-54fbf751ab62"
});
</script>`
        }}
      />
      <hr className="w-full my-0 border-gray-500" />
      <div className="whitespace-pre-line text-center text-sm">{`FUTURE MEDIA CONCEPTS, INC.
        P.O. Box 1882
        Quogue, NY 11959
        212-233-3500
      `}</div>
      <div className="flex mb-4 mt-8 gap-8">
        {footer?.social?.map((link) => (
          <a className="" href={link.href} aria-label={link.text} key={link.href}>
            {link.icon
              ? frontmatterIcons[link.icon as keyof typeof frontmatterIcons]({
                  name: link.icon,
                  className: 'h-[25px] hover:text-primary transition-colors duration-100 ease-in-out'
                })
              : link.text}
          </a>
        ))}
      </div>
      <div className="flex gap-4">
        {footer?.terms?.map((link) => (
          <a className="underline" href={link.href} key={link.href}>
            {link.text}
          </a>
        ))}
      </div>
      <div className="text-sm text-center">
        If you are vision-impaired or have some other disability under the Americans with Disabilities Act or a similar
        law, and you wish to discuss potential accommodations related to using the Future Media Concepts website, please
        contact joeln@fmctraining.com
      </div>
      <div className="text-sm text-center">© 2024 Future Media Concepts. All rights reserved. Established 1994.</div>
    </footer>
  )
}
