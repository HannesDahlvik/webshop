import { state } from '@pulsejs/core'
import { Cart, User } from '../config/types'

const user = state<User | null>(null)
const token = state('')

const cart = state<Cart[]>([])
const wishlist = state<string[]>([])

const wrapperSize = state<'7xl' | '4xl' | '2xl' | '90%'>('7xl')

const searchValue = state('')

export default {
    user,
    token,

    cart,
    wishlist,

    wrapperSize,

    searchValue
}
