const LOAD_USERS = 'users/LOAD_USERS'

//user actions
export const loadUsers = users => {
    return {
        type: LOAD_USERS,
        users
    }
}
//thunk user info
export const fetchUsers = () => async dispatch =>{
    const response = await fetch('/api/users/')
    if (response.ok) {
        const users = await response.json()
        dispatch(loadUsers(users))
        return users
    }
}

const intitialState = {}
export default function userReducer (state= intitialState, action) {
    switch (action.type) {
        case LOAD_USERS:
            return {...state, users: {...action.users} }
        default:
            return state
    }
}
