import core from '../logic/core'
import { User } from '../config/types'

/**
 * Auth functions
 */
const signOut = () => {
    core.state.user.set(null)
    core.state.token.set('')
    localStorage.removeItem('token')
}

/**
 * Utils functions
 */
const setToken = (token: string) => {
    core.state.token.set(token)
    localStorage.setItem('token', token)
}

const setUser = (decoded: User) => {
    core.state.user.set(decoded)
}

const auth = {
    logout: signOut,
    setToken: setToken,
    setUser: setUser
}

export default auth
