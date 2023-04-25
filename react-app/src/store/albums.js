const LOAD_ALBUMS = 'albums/LOAD_ALBUMS'
const LOAD_ONE_ALBUM = 'albums/LOAD_ONE_ALBUM'
const POST_ALBUM = 'albums/POST_ALBUM'
const EDIT_ALBUM = 'albums/EDIT_ALBUM'
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
export const postAlbum = newAlbum => {
    return {
        type:POST_ALBUM,
        newAlbum
    }
}
export const editAlbum = edittedAlbum => {
    return {
        type: EDIT_ALBUM,
        edittedAlbum
    }
}
//thunk for loading all albums
export const fetchAlbums = () => async dispatch => {
    const response = await fetch('/api/albums/')
    if (response.ok) {
        const albums = await response.json()
        dispatch(loadAlbums(albums))
        return albums
    }
}
//load single album details
export const fetchSingleAlbum = albumId => async dispatch => {
    const response = await fetch(`/api/albums/${albumId}`)
    if (response.ok) {
        const album = await response.json()
        dispatch(loadOneAlbum(album))
        return album
    }
}
export const createAlbumRequest = albumData => async dispatch => {
    const response = await fetch(`/api/albums/`,
    {"method": "POST",
    "headers": {"Content-Type": "application/json"},
    "body": JSON.stringify(albumData)})
    const newAlbum = await response.json()
    if (response.ok) {
        dispatch(postAlbum(newAlbum))
        return newAlbum
    }
}
export const editAlbumRequest = (albumData, albumId) => async dispatch => {
    const response = await fetch(`/api/albums/${albumId}`,
    {"method": "PUT",
    "headers": {"Content-Type": "application/json"},
    "body": JSON.stringify(albumData)})
    const edittedAlbum = await response.json()
    if (response.ok) {
        dispatch(editAlbum(edittedAlbum))
        return edittedAlbum
    }
}

const initialState = {}
//album reducer
export default function albumReducer (state = initialState, action) {
    switch (action.type) {
        case LOAD_ALBUMS:
            return { ...state, allAlbums: { ...action.albums } }
        case LOAD_ONE_ALBUM:
            return { ...state, singleAlbum: { ...action.album } }
        case POST_ALBUM:
            return {...state, allAlbums: { ...action.newAlbum } }
        case EDIT_ALBUM:
            return { ...state, allAlbums: { ...action.edittedAlbum } }
        default: return state
    }
}
