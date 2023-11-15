import { Product, ProductMetadata } from 'types'

export const makeProduct = ({
  id = '1',
  name = 'Test Product',
  description = 'Test Product Description',
  active = true,
  image = 'Test Product Image',
  features = '["Feature 1","Feature 2","Feature 3"]',
  freeTrialDays = 0,
  teamPlan = false,
}: Partial<Product> & Partial<ProductMetadata>): Product => ({
  id,
  name,
  description,
  active,
  image,
  metadata: {
    features,
    freeTrialDays,
    teamPlan,
  },
})
