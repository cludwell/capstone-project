const LOAD_ALBUMS = 'albums/LOAD_ALBUMS'

//load all shops
export const loadShopsAction = albums => {
    return {
        type: LOAD_ALBUMS,
        albums
    }
}

const initialState = {}

export default function albumReducer (state = initialState, action) {
    switch (action.type) {
        case LOAD_ALBUMS:
            return {...state, albums: {...action.albums}}
        default: return state
    }
}
