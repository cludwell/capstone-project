const LOAD_ALBUMS = 'albums/LOAD_ALBUMS'
const LOAD_ONE_ALBUM = 'albums/LOAD_ONE_ALBUM'
const POST_ALBUM = 'albums/POST_ALBUM'
const EDIT_ALBUM = 'albums/EDIT_ALBUM'
const DELETE_ALBUM = 'albums/DELETE_ALBUM'
const CLEAR_ALBUMS ='albums/CLEAR_ALBUMS'
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
export const deleteAlbum = deleted => {
    return {
        type: DELETE_ALBUM,
        deleted
    }
}
export const clearData = data => {
    return {
        type: CLEAR_ALBUMS,
        data
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
    const formData = new FormData()
    for (let key in albumData) formData.append(`${key}`, albumData[key])
    formData.set('album_image', albumData.album_image[0])

    const response = await fetch(`/api/albums/`, {
        method: "POST",
        body: formData
    })
    const newAlbum = await response.json()
    if (response.ok) {
        dispatch(postAlbum(newAlbum))
        return newAlbum
    }
}
export const editAlbumRequest = (albumData, albumId) => async dispatch => {
    const formData = new FormData()
    for (let key in albumData) formData.append(`${key}`, albumData[key])
    formData.set('album_image', albumData.album_image[0])

    const response = await fetch(`/api/albums/${albumId}`, {
        method: "POST",
        body: formData
    })
    const edittedAlbum = await response.json()
    if (response.ok) {
        dispatch(editAlbum(edittedAlbum))
        return edittedAlbum
    }
}
export const deleteAlbumRequest = albumId => async dispatch => {
    const response = await fetch(`/api/albums/${albumId}`,
        {"method": "DELETE", "headers": {"Content-Type": "application/json"}})
    const deleted = await response.json()
    if (response.ok) {
        dispatch(deleteAlbum(deleted))
        return deleted
    }
}
export const clearAlbumState = data => async dispatch => {
    dispatch(clearData(data))
    return null
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
        case DELETE_ALBUM:
            const withRecord = { ...state}
            delete state.allAlbums[action.deleted.id]
            return withRecord
        case CLEAR_ALBUMS:
            return {...state, singleAlbum: null }
        default: return state
    }
}
