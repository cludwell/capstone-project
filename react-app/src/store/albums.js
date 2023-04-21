const LOAD_ALBUMS = 'albums/LOAD_ALBUMS'

//load all shops
export const loadAlbums = albums => {
    return {
        type: LOAD_ALBUMS,
        albums
    }
}

//thunk for loading all albums
export const fetchAlbums = () => async dispatch => {
    const response = await fetch('/api/albums/')
    if (response.ok) {
        const albums = await response.json()
        dispatch(loadAlbums(albums))
    }
}

const initialState = {}

export default function albumReducer (state = initialState, action) {
    switch (action.type) {
        case LOAD_ALBUMS:
            return {...state, ...action.albums}
        default: return state
    }
}
