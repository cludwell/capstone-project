
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
export const deleteWish = deleted => {
    return {
        type: DELETE_WISH,
        deleted
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
    if (response.ok) {
        const newWish = await response.json()
        dispatch(postWish(newWish))
        return newWish
    }
}
export const deleteWishRequest = wishId => async dispatch => {
    // console.log('@@@@@@@@@WISH THUNK')
    const response = await fetch(`/api/wishlists/${wishId}`,
        {"method": "DELETE",
        "headers": {"Content-Type": "application/json"}})

        if (response.ok) {
        // console.log('=======DELETE RESPONSE=======')
        const deleted = await response.json()
        console.log('DELETED WISH', deleted)
        dispatch(deleteWish(deleted))
        return deleted
    }
}

export const fetchWishLists = () => async dispatch => {
    const response = await fetch(`/api/wishlists/`)
    if (response.ok) {
        const wishes = await response.json()
        dispatch(loadWishes(wishes))
        return wishes
    }
}

const intitialState = {
    userWishes: [],
}

export default function wishReducer (state = intitialState, action) {
    switch (action.type) {
        case LOAD_WISHES:
            return { ...state, userWishes : [ ...state.userWishes, ...action.wishes]}
        case POST_WISH:
            return { ...state, userWishes: [ ...state.userWishes, action.newWish  ] }
        case DELETE_WISH:
            const filtered =  state.userWishes.filter(w=> w.albumId !== action.deleted.albumId)
            return { ...state, userWishes: filtered }
        default:
            return state
    }
}
