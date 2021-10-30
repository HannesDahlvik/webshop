import { state } from '@pulsejs/core'
import { Cart, User } from '../config/types'

const user = state<User | null>(null)
const token = state('')

const cart = state<Cart[]>([])
const wishlist = state<string[]>([])

const wrapperSize = state('7xl')

export default {
    user,
    token,

    cart,
    wishlist,

    wrapperSize
}
