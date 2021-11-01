import { event } from '@pulsejs/core'

const logout = event()

const changeTitle = event<string>()

const events = {
    logout,

    changeTitle
}

export default events
