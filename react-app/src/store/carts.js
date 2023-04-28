const LOAD_CART = 'carts/LOAD_CART'
const POST_CART = 'carts/POST_CART'

export const fetchCart = cartInfo => {
    return {
        type: LOAD_CART,
        cartInfo
    }
}
export const postCart = itemInfo => {
    return {
        type: POST_CART,
        itemInfo
    }
}
export const fetchUserCart = () => async dispatch => {
    const response = await fetch(`/api/carts/`)
    if (response.ok) {
        const cartInfo = await response.json()
        dispatch(fetchCart(cartInfo))
        return cartInfo
    }
}
export const postCartRequest = albumId => async dispatch => {
    const response = await fetch('/api/carts',
        {method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(albumId)})
        if (response.ok) {
            const cartInfo = await response.json()
            dispatch(postCart(cartInfo))
            return cartInfo
        }
}
const intitialState = {}

export default function cartReducer (state =intitialState, action) {
    switch (action.type) {
        case LOAD_CART:
            return {...state, ...action.cartInfo}
        case POST_CART:
            return {...state, ...action.itemInfo}
        default: return state
    }
}
