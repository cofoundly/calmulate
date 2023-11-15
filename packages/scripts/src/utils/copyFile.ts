import { execCommand } from './execCommand'

export const copyFile = async ({ inputPath, outputPath }: { inputPath: string; outputPath: string }): Promise<void> => {
  await execCommand(`cp ${inputPath} ${outputPath}`)
}
