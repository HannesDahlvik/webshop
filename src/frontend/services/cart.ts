import core from '../logic/core'

const addToCart = async (product_id: string, qty?: number) => {
    let currentCart = core.state.cart.value
    let duplicate: boolean = false
    let returnMsg: string = ''

    if (currentCart) {
        currentCart.map((row, i: number) => {
            if (currentCart[i].product_id === product_id) {
                if (qty) currentCart[i].qty += qty
                else currentCart[i].qty++
                duplicate = true
                returnMsg = 'Increased quantity of product!'
            }
        })

        if (duplicate === false) {
            currentCart.push({
                product_id,
                qty: qty ? qty : 1
            })
            returnMsg = 'Added to cart!'
        }
    } else {
        currentCart = [
            {
                product_id,
                qty: qty ? qty : 1
            }
        ]
        returnMsg = 'Added to cart!'
    }

    core.state.cart.set(currentCart)
    localStorage.setItem('cart', JSON.stringify(currentCart))
    return returnMsg
}

const removeFromCart = async (index: number) => {
    let oldCart = core.state.cart.value
    oldCart.splice(index, 1)
    core.state.cart.set(oldCart)
    localStorage.setItem('cart', JSON.stringify(oldCart))
}

const clearCart = async () => {
    let returnMsg: string = 'Cleared cart!'
    core.state.cart.set([])
    localStorage.setItem('cart', '[]')
    return returnMsg
}

const cart = {
    add: addToCart,
    remove: removeFromCart,
    clear: clearCart
}

export default cart
