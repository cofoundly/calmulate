import { confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth'

import { auth } from '@/firebase'

export const resetPassword = async ({ actionCode, newPassword }: { actionCode: string; newPassword: string }) => {
  await verifyPasswordResetCode(auth, actionCode)

  await confirmPasswordReset(auth, actionCode, newPassword)
}
