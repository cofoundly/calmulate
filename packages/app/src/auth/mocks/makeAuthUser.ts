import { User } from 'firebase/auth'

export const makeAuthUser = ({ uid = '12345678', email = 'frank.gallagher@gmail.com' }: Partial<User>): User => ({
  uid,
  email,
  emailVerified: false,
  isAnonymous: false,
  providerData: [],
  tenantId: null,
  displayName: null,
  phoneNumber: null,
  photoURL: null,
  providerId: 'firebase',
  metadata: {
    creationTime: '',
    lastSignInTime: '',
  },
  refreshToken: '',
  getIdToken: () => Promise.resolve(''),
  getIdTokenResult: () => Promise.resolve({} as any),
  toJSON: () => ({}),
  delete: () => Promise.resolve(),
  reload: () => Promise.resolve(),
})
