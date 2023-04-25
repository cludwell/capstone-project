const POST_WISH = 'wishLists/POST_WISH'


//actions
export const postWish = wish => {
    return {
        type: POST_WISH,
        wish
    }
}

//thunk for posting wish
export const fetchPostWish = wish => async dispatch => {
    const response = await fetch(`/api/wishlists`,
    {"method": "POST",
    "headers": {"Content-Type": "application/json"},
    "body": JSON.stringify(wish)})
    const newWish = await response.json()
    if (response.ok) {
        dispatch(postWish(newWish))
        return newWish
    }
}

const intitialState = {}
export default function wishReducer (state = intitialState, action) {
    switch (action.type) {
        case POST_WISH:
            return { ...state, wishLists: { [action.wish.userId]: [ ...action.wish] } }
        default: return state
    }
}
