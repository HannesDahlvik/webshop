import Pulse from '@pulsejs/next'
import { setCore } from '@pulsejs/core'

import state from './state'
import events from './events'

export const App = new Pulse()

const core = {
    state,
    events
}

export default setCore(core)

export type ICore = typeof core
