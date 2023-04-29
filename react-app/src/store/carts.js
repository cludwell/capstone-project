const LOAD_CART = 'carts/LOAD_CART'
const POST_CART = 'carts/POST_CART'
const DELETE_CART_ITEM = 'carts/DELETE_CART_ITEM'
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
export const deleteCart = deleted => {
    return {
        type: DELETE_CART_ITEM,
        deleted
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
export const postCartRequest = cartData => async dispatch => {
    const response = await fetch('/api/carts/',
        {method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(cartData)})
        if (response.ok) {
            const cartInfo = await response.json()
            dispatch(postCart(cartInfo))
            return cartInfo
        }
}
export const deleteItemRequest = cartId => async dispatch => {
    const response = await fetch(`/api/carts/${cartId}`,
        {method: 'DELETE', headers: {"Content-Type": "application/json"}})
    if (response.ok) {
        const deleted = await response.json()
        dispatch(d)
    }
}
const intitialState = {
    userCart: []
}

export default function cartReducer (state =intitialState, action) {
    switch (action.type) {
        case LOAD_CART:
            return {...state, userCart: [ ...action.cartInfo ] }
        case POST_CART:
            const prePost = {...state, userCart:[...state.userCart]}
            prePost.userCart.push(action.itemInfo)
            return prePost
        default: return state
    }
}
