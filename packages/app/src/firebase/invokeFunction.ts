import { httpsCallable } from 'firebase/functions'
import { FunctionsMap } from 'types'

import { functions } from '.'

export const invokeFunction = <T extends keyof FunctionsMap>(functionName: T) => {
  const functionRef = httpsCallable<FunctionsMap[T]['data'], FunctionsMap[T]['response']>(functions, functionName)

  const invokeFunction = async (data: FunctionsMap[T]['data']) => {
    const response = await functionRef(data)

    return response
  }

  return invokeFunction
}
