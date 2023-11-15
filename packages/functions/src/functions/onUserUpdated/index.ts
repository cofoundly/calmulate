import { onDocumentUpdated } from 'firebase-functions/v2/firestore'
import { FirestoreCollection, User } from 'types'

import { firebase } from '@/firebase/admin'

export const onUserUpdated = onDocumentUpdated('users/{userId}', async event => {
  try {
    const after = event.data?.after.data() as User | undefined

    if (!after) {
      return
    }

    const before = event.data?.before.data() as User | undefined

    if (!before) {
      throw new Error('User not found')
    }

    // if the user updated their firstName, lastName or email, update their team member data
    const isFirstNameUpdated = before.firstName !== after.firstName
    const isLastNameUpdated = before.lastName !== after.lastName
    const isEmailUpdated = before.email !== after.email

    if (isFirstNameUpdated || isLastNameUpdated || isEmailUpdated) {
      const members = await firebase
        .firestore()
        .collectionGroup(FirestoreCollection.TeamMembers)
        .where('userId', '==', after.id)
        .get()

      members.forEach(async member => {
        await member.ref.update({
          firstName: after.firstName,
          lastName: after.lastName,
          email: after.email,
        })
      })
    }
  } catch (error) {
    console.error(error)

    throw error
  }
})
