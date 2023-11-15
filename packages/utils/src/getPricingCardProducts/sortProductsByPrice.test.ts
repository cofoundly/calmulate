import { describe, expect, it } from 'vitest'

import { makePrice } from '../makePrice/makePrice'
import { makeProduct } from '../makeProduct/makeProduct'
import { sortProductsByPrice } from './sortProductsByPrice'

describe('sortProductsByPrice', () => {
  it('sorts products by price', () => {
    const productA = makeProduct({
      id: '1',
    })
    const productB = makeProduct({
      id: '2',
    })
    const productC = makeProduct({
      id: '3',
    })

    const priceA = makePrice({
      productId: '1',
      unitAmount: 100,
    })
    const priceB = makePrice({
      productId: '2',
      unitAmount: 200,
    })
    const priceC = makePrice({
      productId: '3',
      unitAmount: 300,
    })

    const sortedProducts = sortProductsByPrice({
      products: [productB, productA, productC],
      prices: [priceC, priceA, priceB],
    })

    expect(sortedProducts).toEqual([productA, productB, productC])
  })
})
