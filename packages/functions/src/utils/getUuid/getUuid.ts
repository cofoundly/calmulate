import { v4 as uuidv4 } from 'uuid'

// NOTE: this needs to be compiled by functions for node.js crypto to work correctly, do not move to utils package
export const getUuid = () => uuidv4()
