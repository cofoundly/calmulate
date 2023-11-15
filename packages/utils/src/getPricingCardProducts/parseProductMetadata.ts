type RawProductMetadata = {
  features?: string
  freeTrialDays?: string
}

const validateProductMetadata = (object: unknown): object is RawProductMetadata => {
  if (!object) {
    return false
  }

  if (typeof object !== 'object') {
    return false
  }

  const castedObject = object as Record<string, any>

  if (castedObject.features && typeof castedObject.features !== 'string') {
    return false
  }

  if (castedObject.freeTrialDays && typeof castedObject.freeTrialDays !== 'string') {
    return false
  }

  return true
}

type ProductMetadata = {
  features: string[]
  freeTrialDays?: number
}

export const parseProductMetadata = (metadata: any): ProductMetadata => {
  if (!validateProductMetadata(metadata)) {
    throw new Error('Invalid product metadata')
  }

  const parsed: ProductMetadata = {
    ...metadata,
    features: [],
    freeTrialDays: 0,
  }

  if (metadata.features) {
    parsed.features = JSON.parse(metadata.features) as string[]
  }

  if (metadata.freeTrialDays) {
    parsed.freeTrialDays = parseInt(metadata.freeTrialDays)
  }

  return parsed
}
