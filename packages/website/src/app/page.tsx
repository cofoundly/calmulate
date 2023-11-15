import React from 'react'

import { getPrices } from '@/billing/api/getPrices'
import { getProducts } from '@/billing/api/getProducts'
import { CallToAction } from '@/components/callToAction/CallToAction'
import { Faqs } from '@/components/faqs/Faqs'
import { Features } from '@/components/features/Features'
import { Hero } from '@/components/hero/Hero'
import { PainPoints } from '@/components/painPoints/PainPoints'
import { Pricing } from '@/components/pricing/Pricing'
import { Testimonials } from '@/components/testimonials/Testimonials'

export default async function Page() {
  const products = await getProducts()
  const prices = await getPrices()

  return (
    <>
      <Hero />

      <PainPoints />

      <Features />

      <Testimonials />

      <Pricing products={products} prices={prices} />

      <Faqs />

      <CallToAction />
    </>
  )
}
