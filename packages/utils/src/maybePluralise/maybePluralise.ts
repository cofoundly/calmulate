export const maybePluralise = (quantity: number, word: string) => {
  if (quantity === 1) {
    return word
  }

  return `${word}s`
}
