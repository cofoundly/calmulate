import { Functions } from 'types'

import { invokeFunction } from '@/firebase/invokeFunction'

const changeUserEmailFunction = invokeFunction(Functions.changeUserEmail)

export const changeUserEmail = async ({ oldEmail, newEmail }: { oldEmail: string; newEmail: string }) => {
  await changeUserEmailFunction({
    oldEmail,
    newEmail,
  })
}
