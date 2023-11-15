import { Functions } from 'types'

import { invokeFunction } from '@/firebase/invokeFunction'

import { signOut } from './signOut'

const deleteUserAccountFunction = invokeFunction(Functions.deleteUserAccount)

export const deleteUserAccount = async () => {
  const response = await deleteUserAccountFunction({ siteUrl: window.location.origin })

  await signOut()

  return response
}
