const LOAD_ALBUMS = 'albums/LOAD_ALBUMS'
const LOAD_ONE_ALBUM = 'albums/LOAD_ONE_ALBUM'
//load all shops
export const loadAlbums = albums => {
    return {
        type: LOAD_ALBUMS,
        albums
    }
}
export const loadOneAlbum = album => {
    return {
        type: LOAD_ONE_ALBUM,
        album
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
//load single album details
export const fetchSingleAlbum = albumId => async dispatch => {
    const response = await fetch(`/api/albums/${albumId}`)
    if (response.ok) {
        const album = await response.json()
        dispatch(loadOneAlbum(album))
    }
}
const initialState = {}
//album reducer
export default function albumReducer (state = initialState, action) {
    switch (action.type) {
        case LOAD_ALBUMS:
            return {...state, allAlbums: {...action.albums} }
        case LOAD_ONE_ALBUM:
            return {...state, singleAlbum: {...action.album}}
        default: return state
    }
}
