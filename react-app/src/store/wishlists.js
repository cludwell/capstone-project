const POST_WISH = 'wishLists/POST_WISH'
const DELETE_WISH = 'wishLists/DELETE_WISH'

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
    console.log('-----------------WISHID', wishId)
    const response = await fetch(`/api/wishlists/${wishId}`,
        {"method": "DELETE",
        "headers": {"Content-Type": "application/json"}})
    const deleted = await response.json()
    if (response.ok) {
        dispatch(deleteWish(deleted))
        return deleted
    }
}
const intitialState = {}
export default function wishReducer (state = intitialState, action) {
    switch (action.type) {
        case POST_WISH:
            return { ...state, wishLists: { [action.wish.userId]: [ ...action.wish] } }
        case DELETE_WISH:
            const beforeDelete = { ...state}
            const filtered = beforeDelete.wishLists[String(action.wish.userId)].filter(w=> w.id !== action.wish.id)
            return { ...state, wishLists: { [action.wish.userId]: filtered } }
        default: return state
    }
}
