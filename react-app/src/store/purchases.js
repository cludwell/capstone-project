import { response } from "express"

const LOAD_PURCHASES = 'purchases/LOAD_PURCHASES'

//load all user buys
export const loadPurchases = purchases => {
    return {
        type: LOAD_PURCHASES,
        purchases
    }
}

//thunk for loading purchases
export const fetchUserPurchases = () => async dispatch => {
    const response = await fetch('/api/purchases/user')
    if (response.ok) {
        const purchases = await response.json()
        dispatch(loadPurchases(purchases))
        return purchases
    }
}
const initialState = {}
export default function purchasesReducer (state = initialState, action) {
    switch(action.type) {
        case LOAD_PURCHASES:
            return {...state, user: {...action.purchases}}
        default: return state
    }
}
