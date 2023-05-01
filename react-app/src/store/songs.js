const POST_SONG = 'songs/POST_SONG'
const PUT_SONG = 'songs/PUT_SONG'
const DELETE_SONG = 'songs/DELETE_SONG'

export const postSong = newSong => {
    return {
        type: POST_SONG,
        newSong
    }
}
export const editSong = edittedSong => {
    return {
        type: PUT_SONG,
        edittedSong
    }
}
export const deleteSong = deleted => {
    return {
        type: DELETE_SONG,
        deleted
    }
}
export const postSongRequest = (song, albumId) => async dispatch => {
    const response = await fetch(`/api/albums/${albumId}/songs/`,
        {method: 'POST', headers: {"Content-Type": "application/json"},
        body: JSON.stringify(song)})
    if (response.ok) {
        const newSong = await response.json()
        dispatch(postSong(newSong))
        return newSong
    }
}
export const putSongRequest = (songData, albumId) => async dispatch => {
    const response = await fetch(`/api/albums/${albumId}/songs/${songData.id}`,
        {method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(songData)} )
        if (response.ok) {
            const edittedSong = await response.json()
            dispatch(editSong(edittedSong))
        }

}
export const deleteSongRequest = songId => async dispatch => {
    const response = await fetch(`/api/songs/${songId}`,
        {method: 'DELETE',
        headers: {"Content-Type": "application/json"}})
        if (response.ok) {
        const deleted = await response.json()
        dispatch(deleteSong(deleted))
        return deleted
    }

}
const initialState = {
    allSongs: []
}
export default function songReducer( state = initialState, action) {
    switch (action.type) {
        case POST_SONG:
            const beforePost = { ...state, allSongs: [...state.allSongs]}
            return { ...state, allSongs :[ ...state.allSongs, action.newSong] }
        case PUT_SONG:
            const preEditState = { ...state, allSongs: [...state.allSongs]}
            const filtered = state.allSongs.filter(s=>s.id !== action.edittedSong.id )
            return {...preEditState, allSongs: [ ...filtered]}
        case DELETE_SONG:
            const preDelete = {...state, allSongs: [ ...state.allSongs ] }
            const deleteSong = preDelete.allSongs.filter(s=> s.id !== action.deleted.id)
            return { ...state, allSongs: [ ...deleteSong]}
        default:
            return state
    }
}
