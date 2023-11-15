import yargs from 'yargs/yargs'

export const args = async () => {
  return await yargs(process.argv.slice(2)).options({
    themeColor: {
      type: 'string',
      describe: 'The tailwind base color, e.g. teal.',
    },
    neutralColor: {
      type: 'string',
      describe: 'The tailwind neutral color, e.g. gray.',
    },
  }).argv
}
