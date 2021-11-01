import core from '../logic/core'
import { User } from '../config/types'

/**
 * Auth functions
 */
export const signOut = () => {
    core.state.user.set(null)
    localStorage.removeItem('token')
}

/**
 * Utils functions
 */
export const setToken = (token: string) => {
    core.state.token.set(token)
    localStorage.setItem('token', token)
}

export const setUser = (decoded: User) => {
    core.state.user.set(decoded)
}

const auth = {
    logout: signOut,
    setToken: setToken,
    setUser: setUser
}

export default auth
