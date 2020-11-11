import { Machine } from 'xstate'
import config from './config'
import implementation from './implementation'

import { Context } from './types'

export const spawnMachine = ( context: Context) => {
  return Machine({
    ...config,
    context
  }, implementation)
}