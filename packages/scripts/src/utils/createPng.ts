import sharp from 'sharp'

export const createPng = async ({
  inputPath,
  outputPath,
  size,
  quality = 70,
}: {
  inputPath: string
  outputPath: string
  size: number
  quality?: number
}): Promise<void> => {
  await sharp(inputPath).png({ quality }).resize({ width: size, height: size }).toFile(outputPath)
}
