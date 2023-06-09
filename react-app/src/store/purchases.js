const LOAD_USER_PURCHASES = 'purchases/LOAD_USER_PURCHASES'
const LOAD_ALL_PURCHASES = 'purchases/LOAD_ALL_PURCHASES'
const POST_PURCHASE = 'purchases/POST_PURCHASE'
//load all user buys
export const loadUserPurchases = purchases => {
    return {
        type: LOAD_USER_PURCHASES,
        purchases
    }
}
export const loadAllPurchases = purchases => {
    return {
        type: LOAD_ALL_PURCHASES,
        purchases
    }
}
export const postPurchase = purchase => {
    return {
        type: POST_PURCHASE,
        purchase
    }
}
//thunk for loading purchases
export const fetchUserPurchases = () => async dispatch => {
    const response = await fetch('/api/purchases/user')
    if (response.ok) {
        const purchases = await response.json()
        dispatch(loadUserPurchases(purchases))
        return purchases
    }
}
export const fetchAllPurchases = () => async dispatch => {
    const response = await fetch('/api/purchases/')
    if (response.ok) {
        const purchases = await response.json()
        dispatch(loadAllPurchases(purchases))
        return purchases
    }
}
export const postPurchaseRequest = purchaseData => async dispatch => {
    const response = await fetch('/api/purchases/',
        {method: 'POST', headers: { "Content-Type": "application/json"},
        body: JSON.stringify(purchaseData)})
    if (response.ok) {
        const newPurchase = await response.json()
        dispatch(postPurchase(newPurchase))
        return newPurchase
    }
}
const initialState = {}
export default function purchasesReducer (state = initialState, action) {
    switch(action.type) {
        case LOAD_USER_PURCHASES:
            return { ...state, user:  [...action.purchases ] }
        case LOAD_ALL_PURCHASES:
            return { ...state, allPurchases: [ ...action.purchases ]}
        case POST_PURCHASE:
            const prePurchase = { ...state}
            return { ...state, user: [...prePurchase.user, ...action.newPurchase] }
        default: return state
    }
}
