'use client'

import { useEffect } from 'react'

// https://grok.com/share/bGVnYWN5_984dd13d-52eb-4a3b-bb36-193eb8995d4bs
export function NewsletterForm() {
  useEffect(() => {
    // @ts-ignore
    if (typeof hbspt !== 'undefined') {
      // @ts-ignore
      hbspt.forms.create({
        region: 'na1',
        portalId: '4023639',
        formId: '6b4ee505-897f-4264-9d29-54fbf751ab62',
        target: '#hubspot-form-container'
      })
    }
  }, [])
  return (
    <>
      <div className="mt-4">Sign up for our newsletter!</div>
      <div id="hubspot-form-container" className="w-full max-w-xl mx-auto" />
    </>
  )
}
