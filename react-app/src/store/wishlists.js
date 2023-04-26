
const POST_WISH = 'wishLists/POST_WISH'
const DELETE_WISH = 'wishLists/DELETE_WISH'
const LOAD_WISHES = 'wishLists/LOAD_WISHES'
//actions
export const postWish = wish => {
    return {
        type: POST_WISH,
        wish
    }
}
export const deleteWish = wish => {
    return {
        type: DELETE_WISH,
        wish
    }
}
export const loadWishes = wishes => {
    return {
        type: LOAD_WISHES,
        wishes
    }
}
//thunk for posting wish
export const fetchPostWish = wish => async dispatch => {
    const response = await fetch(`/api/wishlists/`,
    {"method": "POST",
    "headers": {"Content-Type": "application/json"},
    "body": JSON.stringify(wish)})
    const newWish = await response.json()
    if (response.ok) {
        dispatch(postWish(newWish))
        return newWish
    }
}
export const deleteWishRequest = wishId => async dispatch => {
    const response = await fetch(`/api/wishlists/${wishId}`,
        {"method": "DELETE",
        "headers": {"Content-Type": "application/json"}})
    const deleted = await response.json()
    if (response.ok) {
        dispatch(deleteWish(deleted))
        return deleted
    }
}

export const fetchWishLists = () => async dispatch => {
    const response = await fetch(`/api/wishlists/`)
    const wishes = await response.json()
    if (response.ok) {
        dispatch(loadWishes(wishes))
        return wishes
    }
}
const intitialState = {}
export default function wishReducer (state = intitialState, action) {
    switch (action.type) {
        case LOAD_WISHES:
            return { ...state, userWishes : [ ...action.wishes]}
        case POST_WISH:
            return { ...state, userWishes: [ action.wish, ...state.userWishes ] }
        case DELETE_WISH:
            const filtered = state && state.userWishes && state.userWishes.length ? state.userWishes.filter(w=> w.id !== action.wish.id) : []
            return { ...state, userWishes: filtered }
        default:
            return state
    }
}
